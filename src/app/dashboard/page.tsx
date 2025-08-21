
'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { MainNav } from '@/components/main-nav';
import { RiskScoreCard } from '@/components/dashboard/risk-score-card';
import { ComparativeAnalysisChart } from '@/components/dashboard/comparative-analysis-chart';
import { RiskFactorsChart } from '@/components/dashboard/risk-factors-chart';
import { UnstructuredDataAnalysis } from '@/components/dashboard/unstructured-data-analysis';
import { DataIngestion } from '@/components/dashboard/data-ingestion';
import type { AnalysisState } from '@/app/actions';
import { EvaluationFocus } from '@/components/dashboard/evaluation-focus';

function calculateRiskScore(analysisResult: AnalysisState['analysis']) {
  if (!analysisResult) {
    return 68; // Default score
  }

  let score = 50; // Base score

  // Adjust score based on sentiment
  switch (analysisResult.overallSentiment.toLowerCase()) {
    case 'negative':
      score += 25;
      break;
    case 'neutral':
      score += 10;
      break;
    case 'positive':
      score -= 10;
      break;
  }

  // Adjust score based on number of risk factors
  score += analysisResult.riskFactors.length * 3;

  // Clamp score between 0 and 100
  return Math.max(0, Math.min(100, score));
}


export default function DashboardPage() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisState | null>(null);

  const riskScore = calculateRiskScore(analysisResult?.analysis);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <MainNav />
      <div className="flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <RiskScoreCard score={riskScore} />
            <ComparativeAnalysisChart />
            <RiskFactorsChart />
          </div>
          <div className="grid gap-4 md:gap-8 lg:grid-cols-1">
            <EvaluationFocus />
          </div>
          <div className="grid gap-4 md:gap-8 lg:grid-cols-1">
            <UnstructuredDataAnalysis onAnalysisComplete={setAnalysisResult} />
          </div>
          <div className="grid gap-4 md:gap-8 lg:grid-cols-1">
            <DataIngestion />
          </div>
        </main>
      </div>
    </div>
  );
}
