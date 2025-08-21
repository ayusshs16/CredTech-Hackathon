'use server';

import { z } from 'zod';
import { analyzeUnstructuredData } from '@/ai/flows/analyze-unstructured-data';
import { summarizeRiskFactors } from '@/ai/flows/summarize-risk-factors';

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
