
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
import { Loader2, Sparkles, Wand2 } from 'lucide-react';
import React from 'react';
import { suggestVolunteerOpportunities, SuggestVolunteerOpportunitiesOutput } from '@/ai/flows/suggest-volunteer-opportunities';
import Link from 'next/link';
import { Badge } from '../ui/badge';
import { sendEmail } from '@/actions/send-email';
import VolunteerApplicationEmail from '@/emails/volunteer-application-email';
import NewVolunteerEmail from '@/emails/new-volunteer-email';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  skills: z.string().min(3, { message: 'Please list at least one skill.' }),
  interests: z.string().min(10, { message: 'Please tell us a bit about your interests.' }),
  availability: z.string().min(2, { message: 'Please describe your availability.' }),
});

type VolunteerFormValues = z.infer<typeof formSchema>;

export function VolunteerForm() {
  const { toast } = useToast();
  const [suggestions, setSuggestions] = React.useState<SuggestVolunteerOpportunitiesOutput | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<VolunteerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      skills: '',
      interests: '',
      availability: '',
    },
  });

  async function onSubmit(formData: VolunteerFormValues) {
    setIsSubmitting(true);
    setSuggestions(null);

    try {
      const suggested_opportunities = await suggestVolunteerOpportunities(formData);

      if (suggested_opportunities && suggested_opportunities.suggestedProjects) {
        setSuggestions(suggested_opportunities);
      }
      
      // We can send emails even if AI suggestions fail
      const [userEmailResult, adminEmailResult] = await Promise.all([
        sendEmail({
          to: formData.email,
          subject: "We've Received Your Volunteer Application | Vikhyat Foundation",
          react: React.createElement(VolunteerApplicationEmail, {
            name: formData.name,
            skills: formData.skills,
            interests: formData.interests,
            availability: formData.availability,
            suggestions: suggested_opportunities.suggestedProjects,
          }),
        }),
        sendEmail({
          to: 'vikhyatfoundation@gmail.com',
          subject: `New Volunteer Application: ${formData.name}`,
          react: React.createElement(NewVolunteerEmail, {
            name: formData.name,
            email: formData.email,
            skills: formData.skills,
            interests: formData.interests,
            availability: formData.availability,
            suggestions: suggested_opportunities.suggestedProjects,
          }),
        })
      ]);
      
      if (userEmailResult.success) {
          toast({
              title: "Application Sent!",
              description: "Thank you! We've sent a confirmation email with some suggested projects.",
          });
      } else {
          toast({
              title: "Application Submitted!",
              description: "Your application was received, but we had trouble sending a confirmation email.",
          });
      }

    } catch (e) {
      console.error(e);
      toast({
        variant: 'destructive',
        title: 'An Error Occurred',
        description: 'Your application was submitted, but an unexpected error occurred while generating suggestions. Please check your email for a confirmation.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="volunteer-form" className="scroll-mt-20">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-2xl md:text-3xl">
            <Wand2 className="h-8 w-8 text-accent" />
            Find Your Perfect Volunteer Role
          </CardTitle>
          <CardDescription>
            Tell us about yourself, and our AI assistant will suggest the best-fit projects for you. We'll also email you a copy of your application and our suggestions.
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
                            <Input type="email" placeholder="Enter your email address" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Skills</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Project Management, Teaching, Event Planning" {...field} />
                    </FormControl>
                     <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interests & Motivations</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tell us what you're passionate about" className="min-h-[120px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="availability"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Availability</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Evenings, Weekends, 10 hours/week" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSubmitting ? 'Analyzing & Sending...' : 'Get Suggestions'}
              </Button>
            </form>
          </Form>

          {isSubmitting && (
            <div className="mt-8 text-center">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
              <p className="mt-2 text-muted-foreground">Finding the best matches for you...</p>
            </div>
          )}

          {suggestions && suggestions.suggestedProjects.length > 0 && !isSubmitting && (
            <div className="mt-10">
              <h3 className="flex items-center gap-2 text-xl md:text-2xl font-headline font-semibold">
                <Sparkles className="h-6 w-6 text-accent" />
                Recommended Opportunities
              </h3>
              <p className="text-muted-foreground mt-1">Based on your profile, we think you'd be a great fit for these projects. We've also emailed you this list!</p>
              <div className="mt-6 grid gap-4">
                {suggestions.suggestedProjects.map((project) => {
                    const slug = project.projectName.toLowerCase().replace(/\s+/g, '-');
                    return (
                        <Card key={project.projectName} className="hover:shadow-md transition-shadow">
                            <CardHeader>
                                <div className='flex justify-between items-start'>
                                    <CardTitle>{project.projectName}</CardTitle>
                                    <Badge variant={project.relevanceScore > 0.7 ? "default" : "secondary"}>
                                        {Math.round(project.relevanceScore * 100)}% Match
                                    </Badge>
                                </div>
                                <CardDescription>{project.projectDescription}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button asChild variant="link" className="p-0 h-auto">
                                    <Link href={`/initiatives/${slug}`}>
                                        Learn More & Apply
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
