import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    const { type, message } = await request.json();

    const typeMap = {
      sparing: 'Propozycja sparingu/meczu',
      join: 'Chęć dołączenia do klubu',
      partner: 'Propozycja współpracy',
    };

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL,
      subject: `Nowa wiadomość: ${typeMap[type as keyof typeof typeMap]}`,
      text: message,
      html: `
        <h2>${typeMap[type as keyof typeof typeMap]}</h2>
        <p>${message}</p>
      `,
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
