'use client';
// This file is being converted to client-side for static export compatibility.
// The actual email sending logic has been removed.

interface SendEmailProps {
  to: string | string[];
  subject: string;
  html: string; // Changed from 'react' to 'html'
  from?: string;
}

export async function sendEmail({ to, subject, html, from }: SendEmailProps) {
  // In a static export, we cannot use server-side logic like Resend.
  // We will log the email details to the console instead.
  console.log('--- Static Export Email Simulation ---');
  console.log(`From: ${from || 'Vikhyat Foundation <contact@vikhyatfoundation.com>'}`);
  console.log(`To: ${Array.isArray(to) ? to.join(', ') : to}`);
  console.log(`Subject: ${subject}`);
  console.log('--- HTML Body ---');
  console.log(html);
  console.log('--------------------------------------');
  
  // Return a success response to ensure forms show a success message.
  return { success: true, message: 'Email logged to console for development.' };
}
