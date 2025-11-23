
'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import React, { useEffect } from 'react';
import { createDonationOrder } from '@/actions/razorpay';
import { HeartHandshake, Loader2 } from 'lucide-react';

declare const Razorpay: any;

const initialState = {
  success: false,
  order: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {pending ? 'Processing...' : 'Donate Now'}
    </Button>
  );
}

export function DonationForm() {
  const { toast } = useToast();
  const [state, formAction] = useFormState(createDonationOrder, initialState);

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
          // Here you would typically verify the payment signature on your server
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
      let errorMessage = 'Please correct the errors and try again.';
      if (formErrors._form) {
        errorMessage = formErrors._form.join(', ');
      }
      toast({
        variant: 'destructive',
        title: 'Validation Error',
        description: errorMessage,
      });
    }
  }, [state, toast]);

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
        <form action={formAction} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" placeholder="Enter your full name" required />
            {state.error?.name && <p className="text-sm font-medium text-destructive">{state.error.name[0]}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" name="email" type="email" placeholder="Enter your email" required />
             {state.error?.email && <p className="text-sm font-medium text-destructive">{state.error.email[0]}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Donation Amount (INR)</Label>
            <Input id="amount" name="amount" type="number" placeholder="Enter amount" required min="1" />
             {state.error?.amount && <p className="text-sm font-medium text-destructive">{state.error.amount[0]}</p>}
          </div>
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
