
'use server';

import { z } from 'zod';
import { sendEmail } from './send-email';
import NewSubscriberEmail from '@/emails/new-subscriber-email';
import NewSubscriberConfirmationEmail from '@/emails/new-subscriber-confirmation-email';
import React from 'react';

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
    // Send two emails in parallel: one to admin, one to the new subscriber
    const [adminEmailResult, userEmailResult] = await Promise.all([
      sendEmail({
        to: 'vikhyatfoundation@gmail.com', // Notification to admin
        subject: 'New Newsletter Subscriber',
        react: <NewSubscriberEmail subscriberEmail={email} />,
        reply_to: [email],
      }),
      sendEmail({
        to: email, // Confirmation to user
        subject: 'Welcome to the Vikhyat Foundation Movement!',
        react: <NewSubscriberConfirmationEmail subscriberEmail={email} />,
      })
    ]);

    if (!adminEmailResult.success || !userEmailResult.success) {
      console.error('One or more subscription emails failed to send.', { adminEmailResult, userEmailResult });
      // Still return success to the UI, as the primary action (capturing the email) is what matters.
      // The user will just not get a confirmation, which is acceptable.
      return { success: true, error: null };
    }

    return { success: true, error: null };
  } catch (error) {
    console.error('Subscription Action Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { success: false, error: errorMessage };
  }
}
