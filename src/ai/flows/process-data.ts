'use server';
/**
 * @fileOverview A data processing AI agent.
 *
 * - processData - A function that handles cleaning, normalization, and feature extraction.
 * - ProcessDataInput - The input type for the processData function.
 * - ProcessDataOutput - The return type for the processData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DataItemSchema = z.object({
    title: z.string(),
    pubDate: z.string(),
    link: z.string(),
    guid: z.string().optional(),
    author: z.string().optional(),
    thumbnail: z.string().optional(),
    description: z.string().optional(),
    content: z.string().optional(),
    enclosure: z.object({}).optional(),
    categories: z.array(z.string()).optional(),
});

const ProcessDataInputSchema = z.object({
  data: z.array(DataItemSchema).describe("An array of data items to be processed."),
});
export type ProcessDataInput = z.infer<typeof ProcessDataInputSchema>;

const ProcessDataOutputSchema = z.object({
  processedItems: z.array(z.object({
      title: z.string().describe("The cleaned title of the item."),
      link: z.string().describe("The URL link to the item."),
      pubDate: z.string().describe("The publication date of the item."),
      extractedKeywords: z.array(z.string()).describe("Keywords extracted from the item's content or title."),
  })).describe("An array of processed data items."),
});
export type ProcessDataOutput = z.infer<typeof ProcessDataOutputSchema>;

export async function processData(input: ProcessDataInput): Promise<ProcessDataOutput> {
  return processDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'processDataPrompt',
  input: {schema: ProcessDataInputSchema},
  output: {schema: ProcessDataOutputSchema},
  prompt: `You are a data processing engine. Your task is to clean, normalize, and extract features from the given data. 
  
For each item in the data array, perform the following actions:
1.  Clean the title to be concise and readable.
2.  Extract relevant keywords from the title and description.
3.  Keep the original link and publication date.

Return an array of processed items.

Data:
{{{jsonStringify data}}}
`,
});

const processDataFlow = ai.defineFlow(
  {
    name: 'processDataFlow',
    inputSchema: ProcessDataInputSchema,
    outputSchema: ProcessDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
