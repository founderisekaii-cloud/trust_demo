'use client';

import { useForm, useFormState } from 'react-hook-form';
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

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  skills: z.string().min(3, { message: 'Please list at least one skill.' }),
  interests: z.string().min(10, { message: 'Please tell us a bit about your interests.' }),
  availability: z.string().min(2, { message: 'Please describe your availability.' }),
});

type VolunteerFormValues = z.infer<typeof formSchema>;

async function suggestOpportunitiesAction(
  prevState: any,
  formData: VolunteerFormValues
): Promise<{ suggestions: SuggestVolunteerOpportunitiesOutput | null; error: string | null }> {
  try {
    const suggestions = await suggestVolunteerOpportunities(formData);
    if (!suggestions || !suggestions.suggestedProjects) {
        return { suggestions: null, error: "Could not generate suggestions." };
    }
    return { suggestions, error: null };
  } catch (e) {
    console.error(e);
    return { suggestions: null, error: 'An unexpected error occurred. Please try again.' };
  }
}

export function VolunteerForm() {
  const { toast } = useToast();
  const [state, formAction] = React.useReducer(suggestOpportunitiesAction, {
    suggestions: null,
    error: null,
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<VolunteerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      skills: '',
      interests: '',
      availability: '',
    },
  });

  const onSubmit = async (values: VolunteerFormValues) => {
    setIsSubmitting(true);
    await formAction(values);
    setIsSubmitting(false);
  };
  
  React.useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'Suggestion Error',
        description: state.error,
      });
    }
  }, [state.error, toast]);


  return (
    <div id="volunteer-form" className="scroll-mt-20">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-2xl md:text-3xl">
            <Wand2 className="h-8 w-8 text-accent" />
            Find Your Perfect Volunteer Role
          </CardTitle>
          <CardDescription>
            Tell us about yourself, and our AI assistant will suggest the best-fit projects for you.
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
                      <Input placeholder="Jane Appleseed" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Skills</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Project Management, Graphic Design, Public Speaking" {...field} />
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
                      <Textarea placeholder="I'm passionate about child education and community building..." className="min-h-[120px]" {...field} />
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
                      <Input placeholder="e.g., 5-10 hours/week, weekends only" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSubmitting ? 'Analyzing...' : 'Get Suggestions'}
              </Button>
            </form>
          </Form>

          {isSubmitting && (
            <div className="mt-8 text-center">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
              <p className="mt-2 text-muted-foreground">Finding the best matches for you...</p>
            </div>
          )}

          {state.suggestions && state.suggestions.suggestedProjects.length > 0 && (
            <div className="mt-10">
              <h3 className="flex items-center gap-2 text-xl md:text-2xl font-headline font-semibold">
                <Sparkles className="h-6 w-6 text-accent" />
                Recommended Opportunities
              </h3>
              <p className="text-muted-foreground mt-1">Based on your profile, we think you'd be a great fit for these projects:</p>
              <div className="mt-6 grid gap-4">
                {state.suggestions.suggestedProjects.map((project) => {
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
