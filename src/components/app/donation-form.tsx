
'use client';

import { useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import React, { useEffect, useTransition } from 'react';
import { createDonationOrder } from '@/actions/razorpay';
import { HeartHandshake, Loader2 } from 'lucide-react';

declare const Razorpay: any;

const donationSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  amount: z.coerce.number().min(1, { message: 'Donation amount must be at least ₹1.' }),
});

type DonationFormValues = z.infer<typeof donationSchema>;


const initialState = {
  success: false,
  order: null,
  error: null,
};

export function DonationForm() {
  const { toast } = useToast();
  const [state, formAction] = useActionState(createDonationOrder, initialState);
  const [isPending, startTransition] = useTransition();

  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      name: '',
      email: '',
      amount: 0,
    },
  });

  function onSubmit(values: DonationFormValues) {
    startTransition(() => {
        formAction(values);
    });
  }


  useEffect(() => {
    if (state.success && state.order) {
      const { amount, id: order_id, key, name, email } = state.order;

      const options = {
        key,
        amount,
        currency: "INR",
        name: "Vikhyat Foundation",
        description: "Donation to support our causes",
        image: "/images/logo.png",
        order_id,
        handler: function (response: any) {
          console.log(response);
          toast({
            title: 'Payment Successful!',
            description: `Thank you for your generous donation, ${name}!`,
          });
          form.reset();
        },
        prefill: {
          name,
          email,
        },
        theme: {
          color: "#3399cc",
        },
        modal: {
            ondismiss: function() {
                toast({
                    variant: 'destructive',
                    title: 'Payment Canceled',
                    description: 'The payment process was not completed.',
                });
            }
        }
      };

      const rzp = new Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        console.error(response);
        toast({
          variant: 'destructive',
          title: 'Uh oh! Payment Failed.',
          description: response.error.description || 'Something went wrong. Please try again.',
        });
      });
      rzp.open();

    } else if (!state.success && state.error) {
      const formErrors = state.error as any;
       if (formErrors._form) {
         toast({
            variant: 'destructive',
            title: 'An error occurred',
            description: formErrors._form.join(', '),
         });
       }
    }
  }, [state, toast, form]);

  useEffect(() => {
    if (state.error) {
        const fieldErrors = state.error as any;
        for (const fieldName in fieldErrors) {
            if (Object.prototype.hasOwnProperty.call(fieldErrors, fieldName) && fieldName !== '_form') {
                form.setError(fieldName as keyof DonationFormValues, {
                    type: 'manual',
                    message: fieldErrors[fieldName][0],
                });
            }
        }
    }
  }, [state.error, form]);


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
                                <Input type="number" placeholder="Enter amount" {...field} min="1" />
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
