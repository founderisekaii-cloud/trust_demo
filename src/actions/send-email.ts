'use server';

import { Resend } from 'resend';

interface SendEmailProps {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail({ to, subject, html, from }: SendEmailProps) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { data, error } = await resend.emails.send({
      from: from || 'Vikhyat Foundation <contact@vikhyatfoundation.com>',
      to: to,
      subject: subject,
      html: html,
    });

    if (error) {
      console.error('Resend Error:', error);
      throw new Error(error.message);
    }

    return { success: true, message: 'Email sent successfully!' };
  } catch (error) {
    console.error('Email Sending Error:', error);
    throw error;
  }
}
