'use server';

import { Resend } from 'resend';
import * as React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailProps {
  to: string | string[];
  subject: string;
  react: React.ReactElement;
  from?: string;
  reply_to?: string | string[];
}

export async function sendEmail({ to, subject, react, from, reply_to }: SendEmailProps) {
  const fromAddress = from || 'Vikhyat Foundation <contact@vikhyatfoundation.com>';
  
  if (!process.env.RESEND_API_KEY) {
    console.log('RESEND_API_KEY is not set. In a real environment, this would be an error.');
    // In a real app, you might want to throw an error here
    return { success: false, error: 'Email sending is not configured.' };
  }
  
  try {
    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: to,
      subject: subject,
      react: react,
      reply_to: reply_to,
    });

    if (error) {
      console.error('Resend Error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (exception) {
    console.error('Catch Exception:', exception);
    return { success: false, error: (exception as Error).message };
  }
}
