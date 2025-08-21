
'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

function getRiskLevel(score: number): string {
    if (score > 75) return 'High';
    if (score > 50) return 'Moderate';
    return 'Low';
}

export function RiskScoreCard({ score, onRefresh }: { score: number, onRefresh: () => void }) {
  const riskLevel = getRiskLevel(score);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [canRefresh, setCanRefresh] = useState(false);

  useEffect(() => {
    const lastUpdatedString = localStorage.getItem('riskScoreLastUpdated');
    if (lastUpdatedString) {
      setLastUpdated(new Date(lastUpdatedString));
    } else {
      // Set initial date if it's not there
      const now = new Date();
      localStorage.setItem('riskScoreLastUpdated', now.toISOString());
      setLastUpdated(now);
    }
  }, []);

  useEffect(() => {
    if (!lastUpdated) return;

    const checkRefresh = () => {
      const oneDay = 24 * 60 * 60 * 1000;
      const timeSinceUpdate = new Date().getTime() - lastUpdated.getTime();
      setCanRefresh(timeSinceUpdate > oneDay);
    };
    
    checkRefresh();
    const interval = setInterval(checkRefresh, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [lastUpdated]);
  

  const handleRefresh = () => {
    if (canRefresh) {
      onRefresh();
      const now = new Date();
      localStorage.setItem('riskScoreLastUpdated', now.toISOString());
      setLastUpdated(now);
      setCanRefresh(false);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
            <CardDescription>Overall Risk Score</CardDescription>
            <Button variant="ghost" size="icon" onClick={handleRefresh} disabled={!canRefresh} aria-label="Refresh Score">
                <RefreshCw className={`h-4 w-4 ${!canRefresh ? 'text-muted-foreground' : ''}`} />
            </Button>
        </div>
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
       <CardFooter>
        <div className="text-xs text-muted-foreground">
            {lastUpdated ? `Last updated: ${lastUpdated.toLocaleString()}`: 'Loading...'}
        </div>
      </CardFooter>
    </Card>
  );
}
