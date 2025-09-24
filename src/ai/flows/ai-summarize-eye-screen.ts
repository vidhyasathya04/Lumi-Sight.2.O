'use server';
/**
 * @fileOverview Summarizes eye screening results using AI.
 *
 * - summarizeEyeScreen - A function that takes eye screening results as input and returns a summary.
 * - SummarizeEyeScreenInput - The input type for the summarizeEyeScreen function.
 * - SummarizeEyeScreenOutput - The return type for the summarizeEyeScreen function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const SummarizeEyeScreenInputSchema = z.object({
  leftEyeResult: z.string().describe('The result of the left eye screening.'),
  rightEyeResult: z.string().describe('The result of the right eye screening.'),
  analysisSummary: z.string().describe('The AI analysis summary of the screening.'),
  recommendations: z.string().describe('The personalized recommendations based on the screening.'),
});
export type SummarizeEyeScreenInput = z.infer<typeof SummarizeEyeScreenInputSchema>;

const SummarizeEyeScreenOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the eye screening results and recommendations.'),
});
export type SummarizeEyeScreenOutput = z.infer<typeof SummarizeEyeScreenOutputSchema>;

export async function summarizeEyeScreen(input: SummarizeEyeScreenInput): Promise<SummarizeEyeScreenOutput> {
  return summarizeEyeScreenFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeEyeScreenPrompt',
  input: {schema: SummarizeEyeScreenInputSchema},
  output: {schema: SummarizeEyeScreenOutputSchema},
  prompt: `You are an AI assistant that summarizes eye screening results for users.

  Here are the results from the eye screening:
  Left Eye: {{{leftEyeResult}}}
  Right Eye: {{{rightEyeResult}}}
  AI Analysis Summary: {{{analysisSummary}}}
  Recommendations: {{{recommendations}}}

  Please provide a concise and easy-to-understand summary of the results and recommendations for the user.`,
});

const summarizeEyeScreenFlow = ai.defineFlow(
  {
    name: 'summarizeEyeScreenFlow',
    inputSchema: SummarizeEyeScreenInputSchema,
    outputSchema: SummarizeEyeScreenOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
