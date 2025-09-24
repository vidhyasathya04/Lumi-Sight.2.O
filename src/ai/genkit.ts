import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {nextJS} from '@genkit-ai/next';

export const ai = genkit({
  plugins: [googleAI(), nextJS()],
  model: 'googleai/gemini-2.5-flash',
});
