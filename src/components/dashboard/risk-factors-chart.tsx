
'use client';

import * as React from 'react';
import { Pie, PieChart, Cell, Tooltip } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  type ChartConfig,
  ChartTooltipContent,
} from '@/components/ui/chart';

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
  const totalValue = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Risk Factor Breakdown</CardTitle>
        <CardDescription>Primary drivers of the risk score</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="flex flex-col items-start gap-4 sm:flex-row">
          <div className="grid w-full gap-2 text-sm sm:w-1/2">
            <div className="font-medium text-foreground">
              Top Risk Factors
            </div>
            <div className="grid grid-cols-1 gap-x-4 gap-y-2">
              {chartData.map((entry) => (
                <div key={entry.factor} className="flex items-center gap-2">
                  <div
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: entry.fill }}
                  />
                  <div className="flex-1" style={{ color: entry.fill }}>
                    {chartConfig[entry.factor as keyof typeof chartConfig]?.label}
                  </div>
                  <div className="text-right font-medium">{entry.value}%</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex w-full items-center justify-center sm:w-1/2">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square h-full max-h-[250px] pb-0"
            >
              <PieChart>
                <Tooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="factor"
                  innerRadius={50}
                  strokeWidth={5}
                >
                  {chartData.map((entry) => (
                    <Cell key={entry.factor} fill={entry.fill} className="outline-none" />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
