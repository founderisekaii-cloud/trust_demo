'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HeartHandshake, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import * as React from 'react';


declare const Razorpay: any;

const donationSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  amount: z.coerce.number().min(500, { message: 'Donation amount must be at least ₹500.' }),
});

type DonationFormValues = z.infer<typeof donationSchema>;


export function DonationForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      name: '',
      email: '',
      amount: 500,
    },
  });

  const onSubmit = (data: DonationFormValues) => {
    startTransition(async () => {
      try {
        // Step 1: Create the order by calling our PHP script
        const orderResponse = await fetch('/api/create-order.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: data.amount * 100 }), // Amount in paise
        });

        if (!orderResponse.ok) {
            const errorData = await orderResponse.json();
            throw new Error(errorData.error || `Server responded with ${orderResponse.status}`);
        }

        const orderData = await orderResponse.json();
        const order_id = orderData.order_id;
        
        if (!order_id) {
          throw new Error("Failed to create Razorpay order.");
        }

        // Step 2: Open Razorpay Checkout
        const options = {
            key: 'YOUR_RAZORPAY_KEY_ID', // Your public key from Razorpay dashboard
            amount: data.amount * 100,
            currency: 'INR',
            name: 'Vikhyat Foundation',
            description: 'Donation to support our cause',
            image: '/images/logo.png',
            order_id: order_id,
            handler: function (response: any) {
                // This function is called after a successful payment
                console.log('Payment successful:', response);
                toast({
                    title: 'Thank You!',
                    description: 'Your generous donation has been received.',
                });
                form.reset();
                // Here you could also send payment details to your backend for verification
            },
            prefill: {
                name: data.name,
                email: data.email,
            },
            notes: {
                address: 'Vikhyat Foundation Office',
            },
            theme: {
                color: '#3399cc',
            },
        };
        
        const rzpy = new Razorpay(options);
        rzpy.on('payment.failed', function (response: any) {
            console.error('Payment failed:', response.error);
            toast({
                variant: 'destructive',
                title: 'Payment Failed',
                description: response.error.description || 'An unknown error occurred.',
            });
        });
        
        rzpy.open();

      } catch (error: any) {
         toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: error.message || 'Could not initiate payment.',
        });
      }
    });
  };


  return (
        <Card>
            <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                <HeartHandshake className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="font-headline text-2xl md:text-3xl mt-4">Support Our Cause</CardTitle>
                <CardDescription>
                Your contribution empowers us to continue our work and make a lasting impact. Every donation, no matter the size, helps us build a better future.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your full name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email Address</FormLabel>

                                    <FormControl>
                                        <Input type="email" placeholder="Enter your email" {...field} />
                                    </FormControl>
                                     <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Donation Amount (INR)</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Enter amount" {...field} min="500" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={isPending}>
                            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            {isPending ? 'Processing...' : 'Donate Now (min ₹500)'}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
  );
}
