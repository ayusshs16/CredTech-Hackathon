
'use client';

import * as React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { ChartConfig } from '@/components/ui/chart';

const chartData = [
  { factor: 'market', value: 35, fill: 'var(--color-market)' },
  {
    factor: 'sentiment',
    value: 25,
    fill: 'var(--color-sentiment)',
  },
  { factor: 'economic', value: 20, fill: 'var(--color-economic)' },
  {
    factor: 'financials',
    value: 20,
    fill: 'var(--color-financials)',
  },
];

const chartConfig = {
  value: {
    label: 'Value',
  },
  market: {
    label: 'Market Risk',
    color: 'hsl(var(--chart-1))',
  },
  sentiment: {
    label: 'Social Sentiment',
    color: 'hsl(var(--chart-2))',
  },
  economic: {
    label: 'Economic Data',
    color: 'hsl(var(--chart-3))',
  },
  financials: {
    label: 'Company Financials',
    color: 'hsl(var(--chart-4))',
  },
} satisfies ChartConfig;

export function RiskFactorsChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Risk Factor Breakdown</CardTitle>
        <CardDescription>Primary drivers of the risk score</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <div className="space-y-4">
            <div className="font-medium text-foreground">
              Top Risk Factors
            </div>
            <div className="grid grid-cols-1 gap-x-4 gap-y-3">
              {chartData.map((entry) => (
                <div key={entry.factor} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: entry.fill }}
                    />
                    <div className="font-medium" style={{ color: entry.fill }}>
                      {chartConfig[entry.factor as keyof typeof chartConfig]?.label}
                    </div>
                  </div>
                  <div className="text-right font-medium" style={{ color: entry.fill }}>{entry.value}%</div>
                </div>
              ))}
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
