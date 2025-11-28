'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { createDonationOrder } from '@/actions/razorpay';
import { HeartHandshake, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';

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
  const [isRzpyOpen, setIsRzpyOpen] = useState(false);
  
  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      name: '',
      email: '',
      amount: 500,
    },
  });

  function onSubmit(values: DonationFormValues) {
    // This functionality requires a server and is disabled for static export.
    console.log("Donation form submitted with values:", values);
    toast({
        variant: 'destructive',
        title: 'Functionality Disabled',
        description: 'Online donations require a server and are not available in this static version of the site.',
    });
  }

  return (
    <Dialog open={isRzpyOpen} onOpenChange={setIsRzpyOpen}>
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="sr-only">Razorpay Payment</DialogTitle>
            <DialogDescription className="sr-only">Complete your donation through the Razorpay payment gateway.</DialogDescription>
          </DialogHeader>
        </DialogContent>
    </Dialog>
  );
}
