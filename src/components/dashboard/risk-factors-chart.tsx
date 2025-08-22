
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
  const totalValue = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Risk Factor Breakdown</CardTitle>
        <CardDescription>Primary drivers of the risk score</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex items-center justify-center">
        <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-6">
          <div className="flex flex-col gap-4 text-sm w-full sm:w-1/2">
            <div className="grid gap-2">
              {chartData.map((entry) => (
                <div key={entry.factor} className="flex items-center">
                  <div className="flex items-center gap-2 flex-1">
                    <div
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: entry.fill }}
                    />
                    <span>{chartConfig[entry.factor as keyof typeof chartConfig]?.label}</span>
                  </div>
                  <div className="font-medium text-right">{entry.value}%</div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full sm:w-1/2 flex items-center justify-center">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square h-[200px]"
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
                  innerRadius={60}
                  strokeWidth={5}
                >
                  <Cell
                    key="total"
                    fill="var(--color-background)"
                    stroke="var(--color-border)"
                    className="outline-none"
                  />
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
