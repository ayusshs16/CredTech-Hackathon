
'use client';

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
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
    { month: 'Jan', score: 65, reports: 5 },
    { month: 'Feb', score: 68, reports: 7 },
    { month: 'Mar', score: 72, reports: 6 },
    { month: 'Apr', score: 70, reports: 8 },
    { month: 'May', score: 75, reports: 9 },
    { month: 'Jun', score: 73, reports: 7 },
];

const chartConfig = {
  score: {
    label: 'Avg. Risk Score',
    color: 'hsl(var(--chart-1))',
  },
  reports: {
    label: 'Reports Generated',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function TrendsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Trends</CardTitle>
        <CardDescription>
          Your activity and average risk score over the last 6 months.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
            <LineChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                    dataKey="score"
                    type="monotone"
                    stroke="var(--color-score)"
                    strokeWidth={2}
                    dot={false}
                />
                <Line
                    dataKey="reports"
                    type="monotone"
                    stroke="var(--color-reports)"
                    strokeWidth={2}
                    dot={false}
                />
            </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
