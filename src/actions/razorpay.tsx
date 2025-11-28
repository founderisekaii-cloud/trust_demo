'use server';

import { z } from 'zod';
import Razorpay from 'razorpay';
import { randomBytes } from 'crypto';
import { sendEmail } from './send-email';

const donationSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  amount: z.coerce.number().min(500, { message: 'Donation amount must be at least ₹500.' }),
});

const createDonationEmailHtml = (donorName: string, amount: number, orderId: string) => `
  <div style="font-family: sans-serif; background-color: #f6f9fc; padding: 20px;">
    <div style="background-color: #ffffff; border: 1px solid #f0f0f0; border-radius: 4px; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="font-size: 24px; text-align: center;">Thank You, ${donorName}!</h1>
      <p>We are incredibly grateful for your generous donation to the Vikhyat Foundation. Your support is vital to our mission.</p>
      <div style="background-color: #e6f9ff; border-left: 4px solid #00b0f0; padding: 16px; margin: 16px 0; font-weight: bold;">
          Your contribution of ₹${(amount / 100).toLocaleString()} will make a real difference.
      </div>
      <p>Your transaction ID is: ${orderId}</p>
      <hr style="border: none; border-top: 1px solid #e9ecef; margin: 20px 0;" />
      <p style="text-align:center;">
        <a href="https://www.vikhyatfoundation.com" style="background-color: #3399cc; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Visit Our Website</a>
      </p>
      <hr style="border: none; border-top: 1px solid #e9ecef; margin: 20px 0;" />
      <p>With heartfelt thanks,<br/>The Vikhyat Foundation Team</p>
    </div>
  </div>
`;

export async function createDonationOrder(prevState: any, formData: FormData) {
  const parsed = donationSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    amount: formData.get('amount'),
  });

  if (!parsed.success) {
    return {
      success: false,
      order: null,
      error: parsed.error.flatten().fieldErrors,
    };
  }

  const { name, email, amount } = parsed.data;

  // Razorpay expects the amount in the smallest currency unit (paise).
  const amountInPaise = amount * 100;

  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const options = {
      amount: amountInPaise,
      currency: 'INR',
      receipt: `receipt_order_${randomBytes(10).toString('hex')}`,
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      return { success: false, order: null, error: { _form: ['Failed to create Razorpay order.'] } };
    }

    // Send confirmation email after successful payment (this should be handled by webhook ideally)
    // For now, let's assume payment is successful after order creation for simplicity
    await sendEmail({
      to: email,
      subject: `Thank you for your donation, ${name}!`,
      html: createDonationEmailHtml(name, amount, order.id),
      from: 'Vikhyat Foundation <contact@vikhyatfoundation.com>',
    });

    return { success: true, order, error: null };

  } catch (error) {
    console.error('Razorpay Order Creation Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred creating the order.';
    return { success: false, order: null, error: { _form: [errorMessage] } };
  }
}
