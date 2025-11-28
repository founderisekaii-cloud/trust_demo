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
          Your contribution of ₹${amount.toLocaleString()} will make a real difference.
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

export async function createDonationOrder(prevState: any, formData: unknown) {
  const parsed = donationSchema.safeParse(formData);

  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten().fieldErrors };
  }

  const { amount, email, name } = parsed.data;

  try {
    if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      throw new Error("Razorpay keys are not configured in the environment.");
    }

    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount * 100, // amount in the smallest currency unit
      currency: "INR",
      receipt: `receipt_order_${randomBytes(10).toString('hex')}`,
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      throw new Error("Order creation failed");
    }

    // Send notification email using HTML string
    await sendEmail({
        to: ['vikhyatfoundation@gmail.com', email],
        subject: 'Thank You for Your Donation!',
        html: createDonationEmailHtml(name, amount, order.id),
    });

    return {
      success: true,
      order: {
        ...order,
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        name,
        email,
      },
      error: null,
    };
  } catch (error) {
    console.error('Razorpay Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { success: false, order: null, error: { _form: [errorMessage] } };
  }
}
