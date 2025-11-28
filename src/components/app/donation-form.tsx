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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import * as React from 'react';


declare const Razorpay: any;

const donationSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  amount: z.coerce.number().min(500, { message: 'Donation amount must be at least ₹500.' }),
});

type DonationFormValues = z.infer<typeof donationSchema>;


export function DonationForm() {
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
    startTransition(() => {
        console.log('Form submitted with:', data);
        alert(`Thank you for your interest, ${data.name}! We have received your submission to donate ₹${data.amount}. As this is a static site, payment processing is currently disabled.`);
        form.reset();
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
                            {isPending ? 'Processing...' : 'Donate Now'}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
  );
}
