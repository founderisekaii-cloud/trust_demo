import { z } from 'zod';
import { sendEmail } from './send-email';

const subscribeSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

const createSubscriberConfirmationHtml = (subscriberEmail: string) => `
  <div style="font-family: sans-serif; background-color: #f6f9fc; padding: 20px;">
    <div style="background-color: #ffffff; border: 1px solid #f0f0f0; border-radius: 4px; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="font-size: 24px; text-align: center;">Welcome to the Movement!</h1>
      <p>Thank you for subscribing to the Vikhyat Foundation newsletter. You'll now be among the first to hear about our latest initiatives and success stories.</p>
      <p style="text-align:center;">
        <a href="https://www.vikhyatfoundation.com" style="background-color: #3399cc; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Explore Our Work</a>
      </p>
      <hr style="border: none; border-top: 1px solid #e9ecef; margin: 20px 0;" />
      <p>Sincerely,<br/>The Vikhyat Foundation Team</p>
    </div>
  </div>
`;

const createAdminNotificationHtml = (subscriberEmail: string) => `
  <div style="font-family: sans-serif; padding: 20px;">
    <h1>New Newsletter Subscriber</h1>
    <p>A new person has subscribed to your newsletter:</p>
    <p style="background-color: #e6f9ff; border: 1px solid #b3ecff; padding: 12px; border-radius: 4px; font-weight: bold; text-align: center;">
      ${subscriberEmail}
    </p>
  </div>
`;

export async function subscribeToAction(formData: { email: string }) {
   // This is a placeholder for static export.
  // The original server action is incompatible with a static site.
  console.log("subscribeToAction called, but it's a placeholder for static export.", formData);
  const parsed = subscribeSchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten().fieldErrors.email?.join(', ') };
  }
  return { success: true, error: null };
}
