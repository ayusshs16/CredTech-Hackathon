
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

function getRiskLevel(score: number): string {
    if (score > 75) return 'High';
    if (score > 50) return 'Moderate';
    return 'Low';
}

export function RiskScoreCard({ score }: { score: number }) {
  const riskLevel = getRiskLevel(score);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>Overall Risk Score</CardDescription>
        <CardTitle className="text-4xl">{score}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">
          Risk Level: <strong>{riskLevel}</strong>
        </div>
      </CardContent>
      <CardContent>
        <Progress value={score} aria-label={`${score}% risk score`} />
      </CardContent>
    </Card>
  );
}
