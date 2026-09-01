import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { prisma } from '@/lib/db';
import { cleanText } from '@/lib/sanitize';
import { LocalGuestbookEntry } from '../route';

const LOCAL_DATA_FILE = path.join(process.cwd(), 'data', 'guestbook-messages.json');

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
    console.error('[guestbook-reply-api] Error writing messages:', err);
  }
}

/**
 * POST /api/guestbook/reply
 * Adds or updates a reply to a guestbook message.
 */
export async function POST(request: NextRequest) {
  try {
    let body: { messageId?: string; reply?: string; pin?: string };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
    }

    const { messageId, reply, pin } = body;

    if (!messageId || typeof messageId !== 'string') {
      return NextResponse.json({ error: 'Message ID is required.' }, { status: 400 });
    }

    const cleanedReply = cleanText(reply || '');
    if (!cleanedReply || cleanedReply.length < 2) {
      return NextResponse.json(
        { error: 'Balasan minimal terdiri dari 2 karakter.' },
        { status: 422 }
      );
    }

    if (cleanedReply.length > 500) {
      return NextResponse.json(
        { error: 'Balasan tidak boleh melebihi 500 karakter.' },
        { status: 422 }
      );
    }

    // Optional PIN check if GUESTBOOK_ADMIN_PIN is configured in env
    const configuredPin = process.env.GUESTBOOK_ADMIN_PIN;
    if (configuredPin && configuredPin.trim() !== '') {
      if (!pin || pin.trim() !== configuredPin.trim()) {
        return NextResponse.json(
          { error: 'PIN Admin salah atau tidak valid.' },
          { status: 403 }
        );
      }
    }

    // If Database is configured, update in Prisma
    if (process.env.DATABASE_URL) {
      try {
        const updated = await prisma.guestbookMessage.update({
          where: { id: messageId },
          data: {
            reply: cleanedReply,
            replyName: 'Rahmat Ivaldy',
            repliedAt: new Date(),
          },
        });

        const replyObj = {
          id: `reply-${updated.id}`,
          name: updated.replyName || 'Rahmat Ivaldy',
          message: updated.reply || cleanedReply,
          createdAt: (updated.repliedAt || new Date()).toISOString(),
        };

        return NextResponse.json({ success: true, reply: replyObj }, { status: 200 });
      } catch (dbErr) {
        console.warn('[guestbook-reply-api] DB update failed, falling back to local file:', dbErr);
      }
    }

    // Local JSON fallback
    const messages = await readLocalMessages();
    const index = messages.findIndex((m) => m.id === messageId);

    if (index === -1) {
      return NextResponse.json({ error: 'Pesan tidak ditemukan.' }, { status: 404 });
    }

    const replyObj = {
      id: `reply-${Date.now()}`,
      name: 'Rahmat Ivaldy',
      message: cleanedReply,
      createdAt: new Date().toISOString(),
    };

    messages[index].reply = replyObj;
    await saveLocalMessages(messages);

    return NextResponse.json({ success: true, reply: replyObj }, { status: 200 });
  } catch (error) {
    console.error('[guestbook-reply-api] POST error:', error);
    return NextResponse.json(
      { error: 'Gagal mengirim balasan. Silakan coba lagi.' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/guestbook/reply
 * Removes a reply from a guestbook message.
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const messageId = searchParams.get('messageId');

    if (!messageId) {
      return NextResponse.json({ error: 'Message ID is required.' }, { status: 400 });
    }

    // If Database is configured, clear reply in Prisma
    if (process.env.DATABASE_URL) {
      try {
        await prisma.guestbookMessage.update({
          where: { id: messageId },
          data: {
            reply: null,
            replyName: null,
            repliedAt: null,
          },
        });

        return NextResponse.json({ success: true }, { status: 200 });
      } catch (dbErr) {
        console.warn('[guestbook-reply-api] DB delete failed:', dbErr);
      }
    }

    // Local JSON fallback
    const messages = await readLocalMessages();
    const index = messages.findIndex((m) => m.id === messageId);

    if (index === -1) {
      return NextResponse.json({ error: 'Pesan tidak ditemukan.' }, { status: 404 });
    }

    messages[index].reply = null;
    await saveLocalMessages(messages);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('[guestbook-reply-api] DELETE error:', error);
    return NextResponse.json(
      { error: 'Gagal menghapus balasan.' },
      { status: 500 }
    );
  }
}
