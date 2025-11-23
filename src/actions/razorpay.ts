
'use server';

import { z } from 'zod';
import Razorpay from 'razorpay';
import { randomBytes } from 'crypto';

const donationSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  amount: z.coerce.number().min(1, { message: 'Donation amount must be at least ₹1.' }),
});

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
