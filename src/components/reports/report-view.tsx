'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ExternalLink } from 'lucide-react';
import type { Report } from './report-list';

interface ReportViewProps {
    report: Report;
}

export function ReportView({ report }: ReportViewProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">{report.title}</CardTitle>
                <CardDescription>
                    Generated on {new Date(report.generatedDate).toLocaleString()}
                </CardDescription>
                <a href={report.url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1">
                    Original Source <ExternalLink className="h-4 w-4" />
                </a>
            </CardHeader>
            <CardContent className="space-y-4">
                <Separator />
                <div>
                    <h3 className="text-lg font-semibold mb-2">AI-Generated Summary</h3>
                    <p className="text-muted-foreground whitespace-pre-wrap">{report.summary}</p>
                </div>
            </CardContent>
        </Card>
    );
}
