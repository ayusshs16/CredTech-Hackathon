'use server';

import { z } from 'zod';
import { analyzeUnstructuredData } from '@/ai/flows/analyze-unstructured-data';
import { summarizeRiskFactors } from '@/ai/flows/summarize-risk-factors';
import { processData } from '@/ai/flows/process-data';

const analysisSchema = z.object({
  text: z.string().min(50, 'Please provide at least 50 characters for analysis.'),
});

export type AnalysisState = {
  analysis?: {
    riskFactors: string[];
    summary: string;
    overallSentiment: string;
  };
  summary?: {
    summary: string;
  };
  error?: string;
};

export async function performAnalysis(
  formData: FormData
): Promise<AnalysisState> {
  const validatedFields = analysisSchema.safeParse({
    text: formData.get('text'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.text?.[0],
    };
  }

  try {
    const text = validatedFields.data.text;
    const [analysisResult, summaryResult] = await Promise.all([
      analyzeUnstructuredData({ dataSource: text }),
      summarizeRiskFactors({ unstructuredData: text }),
    ]);

    if (!analysisResult || !summaryResult) {
      return { error: 'Analysis failed. The AI model did not return a result.' };
    }

    return {
      analysis: analysisResult,
      summary: summaryResult,
    };
  } catch (error) {
    console.error(error);
    return {
      error: 'An unexpected error occurred. Please try again later.',
    };
  }
}

const urlSchema = z.string().url('Please provide a valid URL.');

export async function fetchData(url: string): Promise<{ items: {title: string, link: string, pubDate: string}[] } | { error: string }> {
  const validatedUrl = urlSchema.safeParse(url);
  if (!validatedUrl.success) {
    return { error: validatedUrl.error.flatten().formErrors[0] };
  }

  try {
    const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(validatedUrl.data));
    const data = await response.json();

    if (data.status !== 'ok') {
      return { error: data.message || 'Failed to fetch data from RSS feed.' };
    }

    const processedData = await processData({data: data.items});

    return { items: processedData.processedItems.slice(0, 10) };
  } catch (e) {
    console.error(e);
    return { error: 'Failed to fetch or parse RSS feed.' };
  }
}
