import type { NextRequest } from 'next/server';

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Only POST is allowed — return 405 for everything else */
export async function GET() {
  return Response.json({ error: 'Method not allowed.' }, { status: 405 });
}

export async function POST(request: NextRequest) {
  try {
    let body: ContactPayload;

    try {
      body = await request.json();
    } catch {
      return Response.json({ error: 'Invalid request body.' }, { status: 400 });
    }

    const { name, email, message } = body;

    // Server-side validation (mirrors client-side rules)
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return Response.json(
        { error: 'Name must be at least 2 characters.' },
        { status: 422 },
      );
    }

    if (!email || !isValidEmail(email)) {
      return Response.json(
        { error: 'A valid email address is required.' },
        { status: 422 },
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return Response.json(
        { error: 'Message must be at least 10 characters.' },
        { status: 422 },
      );
    }

    // TODO (production): wire up Resend / Nodemailer / SendGrid here.
    // For now we log server-side so the form works end-to-end without a mailer.
    console.log('[contact] New submission:', {
      name: name.trim(),
      email: email.trim(),
      // Truncate message in logs to avoid PII sprawl
      messagePreview: message.trim().slice(0, 80),
      timestamp: new Date().toISOString(),
    });

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('[contact] Error processing submission:', error);
    return Response.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

