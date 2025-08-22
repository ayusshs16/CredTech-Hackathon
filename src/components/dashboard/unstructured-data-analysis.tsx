
'use client';

import { useState, useTransition } from 'react';
import { AlertCircle, Loader2, Sparkles, ThumbsDown, ThumbsUp, Pilcrow } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { performAnalysis, type AnalysisState } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';


function getSentimentInfo(sentiment: string) {
  switch (sentiment.toLowerCase()) {
    case 'positive':
      return {
        icon: ThumbsUp,
        color: 'bg-green-500 hover:bg-green-500',
        text: 'Positive',
      };
    case 'negative':
      return {
        icon: ThumbsDown,
        color: 'bg-red-500 hover:bg-red-500',
        text: 'Negative',
      };
    default:
      return {
        icon: Pilcrow,
        color: 'bg-yellow-500 hover:bg-yellow-500',
        text: 'Neutral',
      };
  }
}

interface UnstructuredDataAnalysisProps {
    onAnalysisComplete: (result: AnalysisState) => void;
}

export function UnstructuredDataAnalysis({ onAnalysisComplete }: UnstructuredDataAnalysisProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<AnalysisState | null>(null);
  const [text, setText] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setResult(null);
    startTransition(async () => {
      const response = await performAnalysis(formData);
      if (response.error) {
        toast({
          variant: 'destructive',
          title: 'Analysis Failed',
          description: response.error,
        });
      }
      setResult(response);
      onAnalysisComplete(response);
    });
  };

  const AnalysisSkeleton = () => (
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold mb-2">Key Risk Summary</h4>
        <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[80%]" />
        </div>
      </div>
      <Separator/>
      <div>
          <h4 className="font-semibold mb-2">Identified Risk Factors</h4>
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-32 rounded-full" />
            <Skeleton className="h-6 w-28 rounded-full" />
          </div>
      </div>
       <Separator/>
       <div>
          <h4 className="font-semibold mb-2">Overall Sentiment</h4>
          <Skeleton className="h-6 w-24 rounded-full" />
       </div>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Unstructured Data Analysis</CardTitle>
        <CardDescription>
          Analyze news articles, social media, or reports for credit risk signals.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              name="text"
              placeholder="Paste text here for analysis..."
              className="min-h-72"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
            <Button type="submit" disabled={isPending || text.length < 50}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Analyze Risk
                </>
              )}
            </Button>
          </form>

          <div className="rounded-lg border bg-muted/20 p-4 space-y-4">
            <h3 className="font-semibold text-lg">Analysis Results</h3>
            {isPending && <AnalysisSkeleton />}
            {!isPending && !result && (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                 <p>Your analysis will appear here.</p>
              </div>
            )}
             {!isPending && result?.error && (
              <div className="flex flex-col items-center justify-center h-full text-destructive">
                 <AlertCircle className="h-8 w-8 mb-2" />
                 <p>{result.error}</p>
              </div>
            )}
            {!isPending && result?.analysis && result.summary && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Key Risk Summary</h4>
                  <p className="text-sm text-muted-foreground">{result.summary.summary}</p>
                </div>
                <Separator/>
                <div>
                    <h4 className="font-semibold mb-2">Identified Risk Factors</h4>
                    <div className="flex flex-wrap gap-2">
                        {result.analysis.riskFactors.length > 0 ? (
                          result.analysis.riskFactors.map((factor) => (
                            <Badge key={factor} variant="secondary">{factor}</Badge>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">No specific risk factors identified.</p>
                        )}
                    </div>
                </div>
                 <Separator/>
                 <div>
                    <h4 className="font-semibold mb-2">Overall Sentiment</h4>
                    <div className="flex items-center gap-2">
                        {(() => {
                            const { icon: Icon, color, text } = getSentimentInfo(result.analysis.overallSentiment);
                            return <Badge className={color}><Icon className="h-4 w-4 mr-1"/>{text}</Badge>
                        })()}
                    </div>
                 </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
