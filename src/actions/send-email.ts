'use server';

import { Resend } from 'resend';

// NOTE: This is a placeholder API key. In a real application, you would
// use process.env.RESEND_API_KEY. For this demo, we use a test key.
const resend = new Resend(process.env.RESEND_API_KEY || 're_123456789');

interface SendEmailProps {
  to: string | string[];
  subject: string;
  html: string; // Changed from 'react' to 'html'
  from?: string;
}

export async function sendEmail({ to, subject, html, from }: SendEmailProps) {
  const fromAddress = from || `Vikhyat Foundation <contact@vikhyatfoundation.com>`;
  
  if (!process.env.RESEND_API_KEY) {
    console.log('RESEND_API_KEY is not set. In a real environment, this would be an error.');
    console.log(`Email details: To: ${to}, Subject: ${subject}`);
    // In a real app, you might want to throw an error here
    return { success: true, message: 'Email sending is not configured, but logged for dev.' };
  }
  
  try {
    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: to,
      subject: subject,
      html: html, // Use the 'html' property
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
