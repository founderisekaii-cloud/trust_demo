'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Wand2 } from 'lucide-react';
import React from 'react';
import { sendEmail } from '@/actions/send-email';
import NewVolunteerEmail from '@/emails/new-volunteer-email';
import VolunteerApplicationEmail from '@/emails/volunteer-application-email';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  inquiryType: z.enum(['volunteer', 'partner'], { required_error: 'Please select an inquiry type.' }),
  message: z.string().min(10, { message: 'Please tell us a bit about your interests or proposal.' }),
  skills: z.string().optional(),
});

type GetInvolvedFormValues = z.infer<typeof formSchema>;

export function GetInvolvedForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<GetInvolvedFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      inquiryType: undefined,
      message: '',
      skills: '',
    },
  });

  const inquiryType = form.watch('inquiryType');

  async function onSubmit(formData: GetInvolvedFormValues) {
    setIsSubmitting(true);
    
    try {
      const subject = `We've Received Your ${formData.inquiryType === 'volunteer' ? 'Volunteer Application' : 'Partnership Inquiry'}`;
      const adminSubject = `New ${formData.inquiryType === 'volunteer' ? 'Volunteer Application' : 'Partnership Inquiry'}: ${formData.name}`;

      const [userEmailResult, adminEmailResult] = await Promise.all([
        sendEmail({
          to: formData.email,
          subject: subject,
          react: <VolunteerApplicationEmail
            name={formData.name}
            interests={formData.message}
            skills={formData.skills || ''}
            availability=""
            inquiryType={formData.inquiryType}
          />,
        }),
        sendEmail({
          to: 'vikhyatfoundation@gmail.com',
          subject: adminSubject,
          react: <NewVolunteerEmail
            name={formData.name}
            email={formData.email}
            interests={formData.message}
            skills={formData.skills || ''}
            availability=""
            inquiryType={formData.inquiryType}
          />,
          reply_to: formData.email,
        })
      ]);
      
      if (userEmailResult.success) {
          toast({
              title: "Application Sent!",
              description: "Thank you! We've received your inquiry and sent you a confirmation email.",
          });
          form.reset();
      } else {
          toast({
              title: "Application Submitted!",
              description: "Your inquiry was received, but we had trouble sending a confirmation email.",
          });
          form.reset();
      }

    } catch (e) {
      console.error(e);
      toast({
        variant: 'destructive',
        title: 'An Error Occurred',
        description: 'There was an error submitting your inquiry. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="get-involved-form" className="scroll-mt-20">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-2xl md:text-3xl">
            <Wand2 className="h-8 w-8 text-accent" />
            Become a Volunteer or Partner
          </CardTitle>
          <CardDescription>
            Tell us about yourself and how you'd like to contribute. We're excited to explore how we can work together.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name or Organization Name</FormLabel>
                            <FormControl>
                            <Input placeholder="Enter your name" {...field} />
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
                            <Input type="email" placeholder="Enter your email address" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="inquiryType"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>How would you like to get involved?</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="volunteer">I want to volunteer</SelectItem>
                                <SelectItem value="partner">I'm interested in a partnership</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                />

                {inquiryType === 'volunteer' && (
                     <FormField
                        control={form.control}
                        name="skills"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Your Skills (Optional)</FormLabel>
                            <FormControl>
                            <Input placeholder="e.g., Project Management, Teaching, Event Planning" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                )}
             
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{inquiryType === 'volunteer' ? 'Interests & Motivations' : 'Partnership Proposal'}</FormLabel>
                    <FormControl>
                      <Textarea placeholder={inquiryType === 'volunteer' ? "Tell us what you're passionate about" : "Describe your organization and partnership idea"} className="min-h-[120px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
