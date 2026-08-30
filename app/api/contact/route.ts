import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { purpose, name, email, message, _hp, honeypot } = body || {};

    // Silent honeypot rejection for automated bots
    if (_hp || honeypot) {
      return NextResponse.json({ success: true, message: 'Message received' });
    }

    const cleanName = (name || '').trim();
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanMessage = (message || '').trim();

    if (!cleanName || cleanName.length < 2) {
      return NextResponse.json({ error: 'Please provide a valid name (minimum 2 characters).' }, { status: 400 });
    }

    if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    if (!cleanMessage || cleanMessage.length < 5) {
      return NextResponse.json({ error: 'Please provide a valid message (minimum 5 characters).' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Email service is not configured.' }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'rop.martel@gmail.com',
      replyTo: cleanEmail,
      subject: `New Portfolio Message: ${purpose || 'General Inquiry'} from ${cleanName}`,
      html: `
        <h2>New Message from your Portfolio Contact Funnel</h2>
        <p><strong>From:</strong> ${cleanName}</p>
        <p><strong>Email:</strong> ${cleanEmail}</p>
        <p><strong>Reason:</strong> ${purpose || 'General Inquiry'}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${cleanMessage.replace(/\n/g, '<br>')}</p>
      `
    });

    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Contact route error:", error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
