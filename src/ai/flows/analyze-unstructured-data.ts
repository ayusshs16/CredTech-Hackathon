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
  riskFactors: z.array(z.string()).describe('An array of financial or market-related risk factors identified in the data.'),
  summary: z.string().describe('A summary of the financial risk analysis.'),
  overallSentiment: z.string().describe('The overall sentiment of the data source from a financial risk perspective (positive, negative, neutral).'),
});
export type AnalyzeUnstructuredDataOutput = z.infer<typeof AnalyzeUnstructuredDataOutputSchema>;

export async function analyzeUnstructuredData(input: AnalyzeUnstructuredDataInput): Promise<AnalyzeUnstructuredDataOutput> {
  return analyzeUnstructuredDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeUnstructuredDataPrompt',
  input: {schema: AnalyzeUnstructuredDataInputSchema},
  output: {schema: AnalyzeUnstructuredDataOutputSchema},
  prompt: `You are an expert financial market analyst. Your task is to analyze the following unstructured text for signals related to stock market risk and general financial stability. The text could be from news articles, social media, or financial reports.

Analyze the following data source:
---
{{{dataSource}}}
---

Based on the text, please perform a financial risk analysis and provide the following:
1.  Identify a list of key financial and market-related risk factors. These could be related to market volatility, company performance, economic indicators, geopolitical events, regulatory changes, etc. If no specific risks are found, return an empty array.
2.  Provide a concise summary of your financial risk analysis.
3.  Determine the overall sentiment of the data source from a financial risk perspective (positive, negative, or neutral). Your sentiment analysis should be based on the potential impact on financial markets.`,
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
