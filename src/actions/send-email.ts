
'use server';

import { Resend } from 'resend';
import * as React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailProps {
  to: string | string[];
  subject: string;
  react: React.ReactElement;
}

export async function sendEmail({ to, subject, react }: SendEmailProps) {
  if (!process.env.RESEND_API_KEY) {
    console.log('RESEND_API_KEY is not set. Skipping email sending.');
    // In a real app, you might want to throw an error here
    // For this demo, we'll just log and continue
    return;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Vikhyat Foundation <noreply@vikhyatfoundation.org>', // You must verify this domain in Resend
      to: to,
      subject: subject,
      react: react,
      reply_to: ['vikhyatfoundation@gmail.com', 'vikasashokdubey98@gmail.com'],
    });

    if (error) {
      console.error('Resend error:', error);
      throw new Error('Failed to send email.');
    }

    return data;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
