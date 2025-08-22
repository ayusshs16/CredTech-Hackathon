
'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from 'recharts';
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
  { name: 'Your_Score', label: 'Your Score', score: 68 },
  { name: 'Industry_Avg', label: 'Industry Avg.', score: 55 },
  { name: 'Top_Performers', label: 'Top Performers', score: 85 },
];

const chartConfig = {
  score: {
    label: 'Score',
  },
  Your_Score: {
    label: 'Your Score',
    color: 'hsl(var(--chart-1))',
  },
  Industry_Avg: {
    label: 'Industry Avg.',
    color: 'hsl(var(--chart-2))',
  },
  Top_Performers: {
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
              dataKey="label"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <XAxis dataKey="score" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="score" layout="vertical" radius={5}>
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={`var(--color-${entry.name})`} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
