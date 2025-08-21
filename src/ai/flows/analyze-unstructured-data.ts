'use server';
/**
 * @fileOverview Analyzes unstructured data sources (news articles, social media posts, etc.) to identify risk factors related to creditworthiness.
 *
 * - analyzeUnstructuredData - A function that handles the analysis of unstructured data.
 * - AnalyzeUnstructuredDataInput - The input type for the analyzeUnstructuredData function.
 * - AnalyzeUnstructuredDataOutput - The return type for the analyzeUnstructuredData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeUnstructuredDataInputSchema = z.object({
  dataSource: z.string().describe('The unstructured data source (e.g., news article, social media post).'),
});
export type AnalyzeUnstructuredDataInput = z.infer<typeof AnalyzeUnstructuredDataInputSchema>;

const AnalyzeUnstructuredDataOutputSchema = z.object({
  riskFactors: z.array(z.string()).describe('An array of risk factors identified in the unstructured data.'),
  summary: z.string().describe('A summary of the analysis of the unstructured data.'),
  overallSentiment: z.string().describe('The overall sentiment of the data source (positive, negative, neutral).'),
});
export type AnalyzeUnstructuredDataOutput = z.infer<typeof AnalyzeUnstructuredDataOutputSchema>;

export async function analyzeUnstructuredData(input: AnalyzeUnstructuredDataInput): Promise<AnalyzeUnstructuredDataOutput> {
  return analyzeUnstructuredDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeUnstructuredDataPrompt',
  input: {schema: AnalyzeUnstructuredDataInputSchema},
  output: {schema: AnalyzeUnstructuredDataOutputSchema},
  prompt: `You are a financial risk analyst. Analyze the following unstructured data source and identify any risk factors related to creditworthiness. Provide a summary of your analysis and the overall sentiment of the data source.\n\nData Source:\n{{{dataSource}}}`,
});

const analyzeUnstructuredDataFlow = ai.defineFlow(
  {
    name: 'analyzeUnstructuredDataFlow',
    inputSchema: AnalyzeUnstructuredDataInputSchema,
    outputSchema: AnalyzeUnstructuredDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
