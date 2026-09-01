import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { guestbookMessageSchema } from '@/lib/validation';
import { cleanText } from '@/lib/sanitize';

export interface LocalGuestbookReply {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

export interface LocalGuestbookEntry {
  id: string;
  name: string;
  image: string | null;
  message: string;
  createdAt: string;
  userId?: string | null;
  reply?: LocalGuestbookReply | null;
}

const LOCAL_DATA_FILE = path.join(process.cwd(), 'data', 'guestbook-messages.json');

// In-memory sliding window rate limiter: max 5 submissions per 2 minutes
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 2 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(identifier: string): boolean {
  const now = Date.now();
  const timestamps = (rateLimitMap.get(identifier) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }
  timestamps.push(now);
  rateLimitMap.set(identifier, timestamps);
  return false;
}

async function readLocalMessages(): Promise<LocalGuestbookEntry[]> {
  try {
    const data = await fs.readFile(LOCAL_DATA_FILE, 'utf-8');
    return JSON.parse(data) as LocalGuestbookEntry[];
  } catch {
    return [];
  }
}

async function saveLocalMessages(messages: LocalGuestbookEntry[]): Promise<void> {
  try {
    const dir = path.dirname(LOCAL_DATA_FILE);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(LOCAL_DATA_FILE, JSON.stringify(messages, null, 2), 'utf-8');
  } catch (err) {
    console.error('[guestbook-api] Error writing local messages:', err);
  }
}

/**
 * GET /api/guestbook
 * Retrieves public guestbook messages in reverse chronological order.
 */
export async function GET(request: NextRequest) {
  try {
    const session = await auth().catch(() => null);
    const currentUserId = session?.user?.id;

    const { searchParams } = new URL(request.url);
    const limit = Math.min(Math.max(Number(searchParams.get('limit') || 20), 1), 50);
    const cursor = searchParams.get('cursor');

    // If Database is configured, use Prisma (PostgreSQL / Supabase)
    if (process.env.DATABASE_URL) {
      try {
        const [rawMessages, totalCount] = await Promise.all([
          prisma.guestbookMessage.findMany({
            take: limit + 1,
            skip: cursor ? 1 : 0,
            cursor: cursor ? { id: cursor } : undefined,
            orderBy: { createdAt: 'desc' },
            include: {
              user: {
                select: {
                  name: true,
                  image: true,
                },
              },
            },
          }),
          prisma.guestbookMessage.count(),
        ]);

        const hasMore = rawMessages.length > limit;
        const messagesToReturn = hasMore ? rawMessages.slice(0, limit) : rawMessages;
        const nextCursor = hasMore ? messagesToReturn[messagesToReturn.length - 1].id : null;

        const messages = messagesToReturn.map((item) => ({
          id: item.id,
          message: item.message,
          createdAt: item.createdAt.toISOString(),
          user: {
            name: item.name || item.user?.name || 'Visitor',
            image: item.image || item.user?.image || null,
          },
          isOwner: Boolean(currentUserId && item.userId === currentUserId),
          reply: item.reply
            ? {
                id: `reply-${item.id}`,
                name: item.replyName || 'Rahmat Ivaldy',
                message: item.reply,
                createdAt: item.repliedAt ? item.repliedAt.toISOString() : item.updatedAt.toISOString(),
              }
            : null,
        }));

        return NextResponse.json(
          {
            messages,
            total: totalCount,
            hasMore,
            nextCursor,
            dbConfigured: true,
          },
          { status: 200 }
        );
      } catch (dbErr) {
        console.warn('[guestbook-api] Database query failed, falling back to local file:', dbErr);
      }
    }

    // Fallback: Local JSON File storage
    const allMessages = await readLocalMessages();
    const sorted = [...allMessages].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    let startIndex = 0;
    if (cursor) {
      const cursorIndex = sorted.findIndex((m) => m.id === cursor);
      if (cursorIndex !== -1) {
        startIndex = cursorIndex + 1;
      }
    }

    const paged = sorted.slice(startIndex, startIndex + limit);
    const hasMore = startIndex + limit < sorted.length;
    const nextCursor = hasMore && paged.length > 0 ? paged[paged.length - 1].id : null;

    const messages = paged.map((item) => ({
      id: item.id,
      message: item.message,
      createdAt: item.createdAt,
      user: {
        name: item.name || 'Visitor',
        image: item.image || null,
      },
      isOwner: Boolean(currentUserId && item.userId === currentUserId),
      reply: item.reply || null,
    }));

    return NextResponse.json(
      {
        messages,
        total: sorted.length,
        hasMore,
        nextCursor,
        dbConfigured: false,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[guestbook-api] GET error:', error);
    return NextResponse.json(
      {
        error: 'Unable to load messages. Please try again later.',
        messages: [],
        total: 0,
        hasMore: false,
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/guestbook
 * Creates a new guestbook message. Open to public visitors without requiring OAuth.
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth().catch(() => null);
    const clientIp =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'anonymous-client';

    const rateKey = session?.user?.id || clientIp;

    if (isRateLimited(rateKey)) {
      return NextResponse.json(
        { error: 'Too many messages sent. Please wait a moment before trying again.' },
        { status: 429 }
      );
    }

    let jsonBody: unknown;
    try {
      jsonBody = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
    }

    const validationResult = guestbookMessageSchema.safeParse(jsonBody);
    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0]?.message || 'Invalid message payload.';
      return NextResponse.json({ error: firstError }, { status: 422 });
    }

    const cleanedMessage = cleanText(validationResult.data.message);
    const formName = cleanText(validationResult.data.name || '');
    const authorName =
      formName.length > 0
        ? formName
        : session?.user?.name || 'Pengunjung';
    const authorImage = session?.user?.image || null;
    const userId = session?.user?.id || null;

    // If Database is configured, attempt Prisma write
    if (process.env.DATABASE_URL) {
      try {
        const created = await prisma.guestbookMessage.create({
          data: {
            userId: userId || undefined,
            name: authorName,
            image: authorImage,
            message: cleanedMessage,
          },
          include: {
            user: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        });

        const formatted = {
          id: created.id,
          message: created.message,
          createdAt: created.createdAt.toISOString(),
          user: {
            name: created.name || created.user?.name || authorName,
            image: created.image || created.user?.image || authorImage,
          },
          isOwner: true,
          reply: null,
        };

        return NextResponse.json({ success: true, message: formatted }, { status: 201 });
      } catch (dbErr) {
        console.warn('[guestbook-api] Database write failed, falling back to local file:', dbErr);
      }
    }

    // Local JSON File storage write
    const localMessages = await readLocalMessages();
    const newEntry: LocalGuestbookEntry = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: authorName,
      image: authorImage,
      message: cleanedMessage,
      createdAt: new Date().toISOString(),
      userId: userId,
    };

    localMessages.unshift(newEntry);
    await saveLocalMessages(localMessages);

    const formatted = {
      id: newEntry.id,
      message: newEntry.message,
      createdAt: newEntry.createdAt,
      user: {
        name: newEntry.name,
        image: newEntry.image,
      },
      isOwner: true,
      reply: null,
    };

    return NextResponse.json({ success: true, message: formatted }, { status: 201 });
  } catch (error) {
    console.error('[guestbook-api] POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error while posting message.' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/guestbook
 * Deletes a guestbook message.
 */
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth().catch(() => null);
    const { searchParams } = new URL(request.url);
    let messageId = searchParams.get('id');

    if (!messageId) {
      try {
        const body = await request.json();
        messageId = body?.id;
      } catch {
        // Continue
      }
    }

    if (!messageId || typeof messageId !== 'string') {
      return NextResponse.json({ error: 'Message ID is required.' }, { status: 400 });
    }

    // Delete from Prisma (Supabase) if database is configured
    if (process.env.DATABASE_URL) {
      try {
        await prisma.guestbookMessage.delete({ where: { id: messageId } });
      } catch (dbErr) {
        console.warn('[guestbook-api] DB delete failed:', dbErr);
      }
    }

    // Delete from Local JSON file
    const localMessages = await readLocalMessages();
    const updated = localMessages.filter((m) => m.id !== messageId);
    await saveLocalMessages(updated);

    return NextResponse.json({ success: true, id: messageId }, { status: 200 });
  } catch (error) {
    console.error('[guestbook-api] DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error while deleting message.' },
      { status: 500 }
    );
  }
}
