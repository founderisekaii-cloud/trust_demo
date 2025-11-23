'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import React from 'react';
import { sendEmail } from '@/actions/send-email';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type ContactFormValues = z.infer<typeof formSchema>;

const createConfirmationHtml = (name: string, subject: string, message: string) => `
  <div style="font-family: sans-serif; background-color: #f6f9fc; padding: 20px;">
    <div style="background-color: #ffffff; border: 1px solid #f0f0f0; border-radius: 4px; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="font-size: 24px; text-align: center;">Thank You for Contacting Us, ${name}!</h1>
      <p>We have received your message and will get back to you shortly.</p>
      <p>For your reference, here is a copy of your submission:</p>
      <hr style="border: none; border-top: 1px solid #e9ecef; margin: 20px 0;" />
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <div style="background-color: #f8f9fa; padding: 10px; border-radius: 4px; border: 1px solid #e9ecef;">
        <p style="white-space: pre-wrap; word-wrap: break-word;">${message}</p>
      </div>
      <hr style="border: none; border-top: 1px solid #e9ecef; margin: 20px 0;" />
      <p>Sincerely,<br/>The Vikhyat Foundation Team</p>
    </div>
  </div>
`;

const createAdminNotificationHtml = (name: string, email: string, subject: string, message: string) => `
  <div style="font-family: sans-serif; padding: 20px;">
    <h1>New Contact Inquiry</h1>
    <p>From: ${name} (${email})</p>
    <p>Subject: ${subject}</p>
    <p>Message:</p>
    <div style="background-color: #f8f9fa; padding: 10px; border-radius: 4px; border: 1px solid #e9ecef;">
       <p style="white-space: pre-wrap; word-wrap: break-word;">${message}</p>
    </div>
  </div>
`;

export function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    
    try {
      // Parallelize email sending
      const [userEmailResult, adminEmailResult] = await Promise.all([
        sendEmail({
          to: data.email,
          subject: "We've Received Your Message | Vikhyat Foundation",
          html: createConfirmationHtml(data.name, data.subject, data.message),
        }),
        sendEmail({
          to: 'vikhyatfoundation@gmail.com',
          subject: `New Inquiry: ${data.subject}`,
          html: createAdminNotificationHtml(data.name, data.email, data.subject, data.message),
          from: `Vikhyat Foundation Forms <contact@vikhyatfoundation.com>`, // Use a specific 'from'
        })
      ]);

      if (userEmailResult.success && adminEmailResult.success) {
        toast({
          title: 'Success!',
          description: 'Your message has been sent successfully!',
        });
        form.reset();
      } else {
         toast({
          title: 'Message Submitted!',
          description: "We've received your inquiry, but there may have been an issue sending a confirmation email.",
        });
        form.reset();
      }
    } catch (error) {
      console.error('Failed to send contact form email', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was an error sending your message. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <Input placeholder="Enter your email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="Enter the subject of your message" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter your message" className="min-h-[150px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </Form>
  );
}
