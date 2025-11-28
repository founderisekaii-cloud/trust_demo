import { Resend } from 'resend';

interface SendEmailProps {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail({ to, subject, html, from }: SendEmailProps) {
  // This is a placeholder for static export.
  // The original server action is incompatible with a static site.
  console.log("sendEmail called, but it's a placeholder for static export.");
  console.log(`TO: ${to}, SUBJECT: ${subject}`);
  return { success: true, message: 'Email sent (simulated)!' };
}
