
'use client';

import { TrendingUp } from 'lucide-react';
import { Pie, PieChart, Cell } from 'recharts';

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
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
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="factor"
              innerRadius={60}
              strokeWidth={5}
            >
              {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="factor" />}
              className="-mt-4"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Market Risk is the highest contributing factor{' '}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Shows the weighted influence of each risk category.
        </div>
      </CardFooter>
    </Card>
  );
}
