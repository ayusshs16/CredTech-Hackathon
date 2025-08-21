import { Header } from '@/components/header';
import { MainNav } from '@/components/main-nav';
import { RiskScoreCard } from '@/components/dashboard/risk-score-card';
import { ComparativeAnalysisChart } from '@/components/dashboard/comparative-analysis-chart';
import { RiskFactorsChart } from '@/components/dashboard/risk-factors-chart';
import { UnstructuredDataAnalysis } from '@/components/dashboard/unstructured-data-analysis';
import { DataIngestion } from '@/components/dashboard/data-ingestion';

export default function DashboardPage() {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <MainNav />
      <div className="flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <RiskScoreCard />
            <ComparativeAnalysisChart />
            <RiskFactorsChart />
          </div>
          <div className="grid gap-4 md:gap-8 lg:grid-cols-1">
            <UnstructuredDataAnalysis />
          </div>
          <div className="grid gap-4 md:gap-8 lg:grid-cols-1">
            <DataIngestion />
          </div>
        </main>
      </div>
    </div>
  );
}
