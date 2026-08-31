import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { guestbookMessageSchema } from '@/lib/validation';
import { cleanText } from '@/lib/sanitize';

// In-memory sliding window rate limiter per user id: max 5 submissions per 2 minutes
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 2 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(userId: string): boolean {
  const now = Date.now();
  const timestamps = (rateLimitMap.get(userId) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }
  timestamps.push(now);
  rateLimitMap.set(userId, timestamps);
  return false;
}

/**
 * GET /api/guestbook
 * Retrieves public guestbook messages in reverse chronological order.
 * Safe public projection: id, message, createdAt, user (name, image), isOwner.
 */
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    const currentUserId = session?.user?.id;

    const { searchParams } = new URL(request.url);
    const limit = Math.min(Math.max(Number(searchParams.get('limit') || 20), 1), 50);
    const cursor = searchParams.get('cursor');

    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        {
          messages: [],
          total: 0,
          hasMore: false,
          nextCursor: null,
          dbConfigured: false,
        },
        { status: 200 }
      );
    }

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
        name: item.user?.name || 'Anonymous Visitor',
        image: item.user?.image || null,
      },
      isOwner: Boolean(currentUserId && item.userId === currentUserId),
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
 * Creates a new guestbook message.
 * Requires authenticated session.
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in to leave a message.' },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    if (isRateLimited(userId)) {
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

    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: 'Database is not yet connected. Please configure DATABASE_URL.' },
        { status: 503 }
      );
    }

    const created = await prisma.guestbookMessage.create({
      data: {
        userId,
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
        name: created.user?.name || session.user.name || 'Anonymous Visitor',
        image: created.user?.image || session.user.image || null,
      },
      isOwner: true,
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
 * Deletes a guestbook message owned by the authenticated user.
 */
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in.' },
        { status: 401 }
      );
    }

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

    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: 'Database is not yet connected.' },
        { status: 503 }
      );
    }

    const existing = await prisma.guestbookMessage.findUnique({
      where: { id: messageId },
      select: { id: true, userId: true },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Message not found.' }, { status: 404 });
    }

    if (existing.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Forbidden. You can only delete your own messages.' },
        { status: 403 }
      );
    }

    await prisma.guestbookMessage.delete({
      where: { id: messageId },
    });

    return NextResponse.json({ success: true, id: messageId }, { status: 200 });
  } catch (error) {
    console.error('[guestbook-api] DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error while deleting message.' },
      { status: 500 }
    );
  }
}
