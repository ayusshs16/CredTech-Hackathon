'use server';

/**
 * @fileOverview Summarizes key risk factors identified from unstructured data analysis.
 *
 * - summarizeRiskFactors - A function that summarizes the key risk factors.
 * - SummarizeRiskFactorsInput - The input type for the summarizeRiskFactors function.
 * - SummarizeRiskFactorsOutput - The return type for the summarizeRiskFactors function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeRiskFactorsInputSchema = z.object({
  unstructuredData: z.string().describe('Unstructured data from news articles and social media posts.'),
});
export type SummarizeRiskFactorsInput = z.infer<typeof SummarizeRiskFactorsInputSchema>;

const SummarizeRiskFactorsOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the key risk factors.'),
});
export type SummarizeRiskFactorsOutput = z.infer<typeof SummarizeRiskFactorsOutputSchema>;

export async function summarizeRiskFactors(input: SummarizeRiskFactorsInput): Promise<SummarizeRiskFactorsOutput> {
  return summarizeRiskFactorsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeRiskFactorsPrompt',
  input: {schema: SummarizeRiskFactorsInputSchema},
  output: {schema: SummarizeRiskFactorsOutputSchema},
  prompt: `You are an expert financial risk analyst specializing in stock markets.

  Please summarize the key financial and market-related risk factors identified from the following unstructured data:

  {{{unstructuredData}}}

  Provide a concise overview of potential risks that could impact stock prices or market stability.
  `,
});

const summarizeRiskFactorsFlow = ai.defineFlow(
  {
    name: 'summarizeRiskFactorsFlow',
    inputSchema: SummarizeRiskFactorsInputSchema,
    outputSchema: SummarizeRiskFactorsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
