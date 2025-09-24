'use server';

/**
 * @fileOverview Analyzes eye screening images for signs of diabetic retinopathy.
 *
 * - eyeScreeningAnalysis - A function that handles the eye screening analysis process.
 * - EyeScreeningAnalysisInput - The input type for the eyeScreeningAnalysis function.
 * - EyeScreeningAnalysisOutput - The return type for the eyeScreeningAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EyeScreeningAnalysisInputSchema = z.object({
  leftEyePhotoDataUri: z
    .string()
    .describe(
      "A photo of the user's left eye, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  rightEyePhotoDataUri: z
    .string()
    .describe(
      "A photo of the user's right eye, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  userDescription: z
    .string()
    .optional()
    .describe('Optional description of the user and their eye health.'),
});
export type EyeScreeningAnalysisInput = z.infer<typeof EyeScreeningAnalysisInputSchema>;

const EyeScreeningAnalysisOutputSchema = z.object({
  leftEyeAnalysis: z.string().describe('Analysis results for the left eye.'),
  rightEyeAnalysis: z.string().describe('Analysis results for the right eye.'),
  summary: z.string().describe('A summary of the eye screening results.'),
  recommendations: z
    .string()
    .describe('Personalized recommendations based on the analysis.'),
});
export type EyeScreeningAnalysisOutput = z.infer<typeof EyeScreeningAnalysisOutputSchema>;

export async function eyeScreeningAnalysis(
  input: EyeScreeningAnalysisInput
): Promise<EyeScreeningAnalysisOutput> {
  return eyeScreeningAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'eyeScreeningAnalysisPrompt',
  input: {schema: EyeScreeningAnalysisInputSchema},
  output: {schema: EyeScreeningAnalysisOutputSchema},
  prompt: `You are an expert ophthalmologist specializing in diabetic retinopathy screening.

You will analyze the provided images of the patient's eyes and provide a summary of your findings, checking for early signs of diabetic retinopathy.

Provide a detailed analysis for each eye, and a summary of the overall findings, along with personalized recommendations.

User Description: {{{userDescription}}}
Left Eye Photo: {{media url=leftEyePhotoDataUri}}
Right Eye Photo: {{media url=rightEyePhotoDataUri}}`,
});

const eyeScreeningAnalysisFlow = ai.defineFlow(
  {
    name: 'eyeScreeningAnalysisFlow',
    inputSchema: EyeScreeningAnalysisInputSchema,
    outputSchema: EyeScreeningAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
