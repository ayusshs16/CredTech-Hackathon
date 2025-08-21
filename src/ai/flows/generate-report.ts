'use server';

/**
 * @fileOverview Generates a summary report based on a URL and content.
 *
 * - generateReport - A function that creates a report summary.
 * - GenerateReportInput - The input type for the generateReport function.
 * - GenerateReportOutput - The return type for the generateReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateReportInputSchema = z.object({
  url: z.string().describe('The URL of the source article or document.'),
  content: z.string().describe('The main content to be analyzed for the report.'),
});
export type GenerateReportInput = z.infer<typeof GenerateReportInputSchema>;

const GenerateReportOutputSchema = z.object({
  title: z.string().describe('A concise and descriptive title for the report.'),
  summary: z.string().describe('A detailed summary of the key findings, risks, and insights from the content.'),
});
export type GenerateReportOutput = z.infer<typeof GenerateReportOutputSchema>;

export async function generateReport(input: GenerateReportInput): Promise<GenerateReportOutput> {
  return generateReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateReportPrompt',
  input: {schema: GenerateReportInputSchema},
  output: {schema: GenerateReportOutputSchema},
  prompt: `
    You are a professional credit risk analyst. Your task is to generate a detailed report based on the provided content and source URL.

    Source URL: {{{url}}}
    Content for Analysis:
    ---
    {{{content}}}
    ---

    Based on the information above, please generate:
    1.  A concise title for the report that captures the main subject.
    2.  A comprehensive summary that identifies key credit risk factors, potential impacts, and an overall assessment. The summary should be well-structured and easy to understand for a financial professional.
    `,
});

const generateReportFlow = ai.defineFlow(
  {
    name: 'generateReportFlow',
    inputSchema: GenerateReportInputSchema,
    outputSchema: GenerateReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
