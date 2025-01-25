import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_BOT_EMAIL,
    pass: process.env.SMTP_BOT_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    const { type, email, phone, message } = await request.json();

    const typeMap = {
      sparing: 'Propozycja sparingu/meczu',
      join: 'Chęć dołączenia do klubu',
      partner: 'Propozycja współpracy',
    };

    const subject = typeMap[type as keyof typeof typeMap];
    const htmlContent = `
      <h2>${subject}</h2>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Telefon:</strong> ${phone}</p>
      <p><strong>Wiadomość:</strong></p>
      <p>${message}</p>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_BOT_EMAIL,
      to: `${process.env.HCW_CONTACT_EMAIL}, ${process.env.HCW_CONTACT_EMAIL2}`,
      subject: `${subject} - strona HC Wrocław`,
      text: `
        ${subject}
        Email: ${email}
        Telefon: ${phone}
        Wiadomość: ${message}
      `,
      html: htmlContent,
      replyTo: email,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Mail error:', error);
    return NextResponse.json(
      { error: 'Błąd wysyłania wiadomości' },
      { status: 500 }
    );
  }
}
