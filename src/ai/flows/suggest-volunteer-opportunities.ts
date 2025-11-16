// src/ai/flows/suggest-volunteer-opportunities.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting relevant volunteer opportunities
 *  based on a user's skills and interests provided in a volunteer application.
 *
 * - suggestVolunteerOpportunities - A function that takes volunteer application data and suggests relevant projects.
 * - SuggestVolunteerOpportunitiesInput - The input type for the suggestVolunteerOpportunities function.
 * - SuggestVolunteerOpportunitiesOutput - The return type for the suggestVolunteerOpportunities function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestVolunteerOpportunitiesInputSchema = z.object({
  name: z.string().describe('The full name of the volunteer applicant.'),
  skills: z.string().describe('A comma-separated list of skills the applicant possesses.'),
  interests: z.string().describe('A paragraph describing the applicant\'s interests and motivations for volunteering.'),
  availability: z.string().describe('The applicant\'s availability for volunteering (e.g., hours per week, specific days).'),
});
export type SuggestVolunteerOpportunitiesInput = z.infer<typeof SuggestVolunteerOpportunitiesInputSchema>;

const SuggestVolunteerOpportunitiesOutputSchema = z.object({
  suggestedProjects: z.array(
    z.object({
      projectName: z.string().describe('The name of the suggested project.'),
      projectDescription: z.string().describe('A brief description of the project and its goals.'),
      relevanceScore: z.number().describe('A score (0-1) indicating how relevant the project is to the applicant\'s skills and interests.'),
    })
  ).describe('A list of suggested projects that match the applicant\'s profile, ordered by relevance score.'),
});
export type SuggestVolunteerOpportunitiesOutput = z.infer<typeof SuggestVolunteerOpportunitiesOutputSchema>;

export async function suggestVolunteerOpportunities(input: SuggestVolunteerOpportunitiesInput): Promise<SuggestVolunteerOpportunitiesOutput> {
  return suggestVolunteerOpportunitiesFlow(input);
}

const suggestVolunteerOpportunitiesPrompt = ai.definePrompt({
  name: 'suggestVolunteerOpportunitiesPrompt',
  input: {schema: SuggestVolunteerOpportunitiesInputSchema},
  output: {schema: SuggestVolunteerOpportunitiesOutputSchema},
  prompt: `You are an AI assistant designed to suggest relevant volunteer projects based on an applicant's skills and interests.

  Applicant Name: {{{name}}}
  Applicant Skills: {{{skills}}}
  Applicant Interests: {{{interests}}}
  Applicant Availability: {{{availability}}}

  Here is a list of available projects:

  [PROJECTS_DATA]

  Suggest projects that are a good match for the applicant, and provide a relevance score between 0 and 1. The relevance score should represent how well the project aligns with the applicant's provided skills and interests. Order the suggestions by relevance score, highest to lowest.
  `,
});

const suggestVolunteerOpportunitiesFlow = ai.defineFlow(
  {
    name: 'suggestVolunteerOpportunitiesFlow',
    inputSchema: SuggestVolunteerOpportunitiesInputSchema,
    outputSchema: SuggestVolunteerOpportunitiesOutputSchema,
  },
  async input => {
    // Assume projects data is fetched from a database or CMS
    const projectsData = [
      {
        projectName: 'Community Education Program',
        projectDescription: 'Provides educational resources and support to underserved communities.',
      },
      {
        projectName: 'Environmental Cleanup Initiative',
        projectDescription: 'Organizes cleanup events and promotes environmental awareness.',
      },
      {
        projectName: 'Elderly Support Services',
        projectDescription: 'Offers companionship and assistance to elderly residents.',
      },
      {
        projectName: 'Youth Mentorship Program',
        projectDescription: 'Matches young people with mentors to provide guidance and support.',
      },
    ];

    // Convert projects data to a string format suitable for the prompt
    const projectsString = projectsData
      .map(project => `- Project: ${project.projectName}\n  Description: ${project.projectDescription}`) // Reduced indentation
      .join('\n');

    const promptInput = {
      ...input,
      projectsData: projectsString,
    };

    const {output} = await suggestVolunteerOpportunitiesPrompt({
      ...input,
      ...{projectsData: projectsString},
    });
    return output!;
  }
);
