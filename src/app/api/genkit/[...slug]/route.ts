'use server';
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {nextJSHandler} from '@genkit-ai/next/server';
import {z} from 'zod';

import '@/ai/flows/eye-screening-analysis';
import '@/ai/flows/ai-summarize-eye-screen';
import '@/ai/flows/personalized-health-advice';

export const ai = genkit({
  plugins: [googleAI()],
});

export const {POST} = nextJSHandler();
