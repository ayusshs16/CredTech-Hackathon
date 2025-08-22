
'use client';

import { TrendingUp } from 'lucide-react';
import { Pie, PieChart, Cell, Tooltip } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Risk Factor Breakdown</CardTitle>
        <CardDescription>Primary drivers of the risk score</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[250px]"
        >
          <PieChart>
            <Tooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="factor"
              innerRadius={50}
              strokeWidth={5}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {chartData.map((entry) => (
                <div key={entry.factor} className="flex items-center gap-1.5">
                    <div className="h-2 w-2 shrink-0 rounded-full" style={{backgroundColor: entry.fill}} />
                    <span>{chartConfig[entry.factor as keyof typeof chartConfig]?.label}</span>
                </div>
            ))}
        </div>
        <div className="flex items-center gap-2 font-medium leading-none text-center">
          Market Risk is the highest contributing factor{' '}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground text-center">
          Shows the weighted influence of each risk category.
        </div>
      </CardFooter>
    </Card>
  );
}
