
'use server';

import { z } from 'zod';
import { sendEmail } from './send-email';
import NewSubscriberEmail from '@/emails/new-subscriber-email';

const subscribeSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

export async function subscribeToAction(formData: unknown) {
  const parsed = subscribeSchema.safeParse(formData);

  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten().fieldErrors.email?.join(', ') };
  }

  const { email } = parsed.data;

  try {
    const emailResult = await sendEmail({
      to: 'vikhyatfoundation@gmail.com', // Send notification to admin
      subject: 'New Newsletter Subscriber',
      react: <NewSubscriberEmail subscriberEmail={email} />,
      reply_to: [email], // Set reply-to so you can respond directly to the subscriber
    });

    if (!emailResult.success) {
      // Don't throw an error, but let the client know something went wrong
      console.error('Failed to send subscription notification:', emailResult.error);
      return { success: false, error: 'There was an issue sending the notification email.' };
    }

    return { success: true, error: null };
  } catch (error) {
    console.error('Subscription Action Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { success: false, error: errorMessage };
  }
}
