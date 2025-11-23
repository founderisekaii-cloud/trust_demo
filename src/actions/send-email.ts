
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
    return { success: false, error: 'RESEND_API_KEY is not configured.' };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Vikhyat Foundation <onboarding@resend.dev>',
      to: to,
      subject: subject,
      react: react,
      reply_to: ['vikhyatfoundation@gmail.com', 'vikasashokdubey98@gmail.com'],
    });

    if (error) {
      console.error('Resend error:', error);
      // We will not throw an error here to prevent the whole action from failing.
      // We'll log it and return an error state.
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    // Also catch any other exceptions during the process.
    return { success: false, error: (error as Error).message };
  }
}
