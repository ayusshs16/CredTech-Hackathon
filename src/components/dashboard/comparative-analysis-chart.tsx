
'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip as RechartsTooltip } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';

const chartData = [
  { name: 'Your Score', score: 68 },
  { name: 'Industry Avg.', score: 55 },
  { name: 'Top Performers', score: 85 },
];

const chartConfig = {
  score: {
    label: 'Score',
  },
  'Your Score': {
    label: 'Your Score',
    color: 'hsl(var(--chart-1))',
  },
  'Industry Avg.': {
    label: 'Industry Avg.',
    color: 'hsl(var(--chart-2))',
  },
  'Top Performers': {
    label: 'Top Performers',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;

export function ComparativeAnalysisChart() {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Comparative Analysis</CardTitle>
        <CardDescription>
          Your score vs. industry benchmarks
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{ left: 10, right: 10 }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="score" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="score" layout="vertical" radius={5}>
              {chartData.map((entry) => (
                <RechartsTooltip
                  key={entry.name}
                  content={
                    <p>
                      This chart compares your generated risk score against the
                      industry average and top-performing benchmarks.
                    </p>
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
