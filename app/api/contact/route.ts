import type { NextRequest } from 'next/server';

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  let body: ContactPayload;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { name, email, message } = body;

  // Server-side validation
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return Response.json({ error: 'Name must be at least 2 characters.' }, { status: 422 });
  }

  if (!email || !isValidEmail(email)) {
    return Response.json({ error: 'A valid email address is required.' }, { status: 422 });
  }

  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    return Response.json({ error: 'Message must be at least 10 characters.' }, { status: 422 });
  }

  // In production: send via Resend / Nodemailer / SendGrid here.
  // For now we log server-side and return success so the form works end-to-end.
  console.log('[contact] New submission:', {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    timestamp: new Date().toISOString(),
  });

  return Response.json({ success: true }, { status: 200 });
}
