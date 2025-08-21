'use client';
import { useState } from 'react';
import { Header } from '@/components/header';
import { MainNav } from '@/components/main-nav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, FileText, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateReportAction } from '@/app/actions';
import { ReportView } from '@/components/reports/report-view';
import { ReportList, Report } from '@/components/reports/report-list';

export default function ReportsPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [url, setUrl] = useState('');
    const [content, setContent] = useState('');
    const [reports, setReports] = useState<Report[]>([]);
    const [activeReport, setActiveReport] = useState<Report | null>(null);

    const handleGenerateReport = async () => {
        if (!url || !content) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'URL and content are required to generate a report.',
            });
            return;
        }

        setIsLoading(true);
        try {
            const result = await generateReportAction(url, content);
            if ('error' in result) {
                toast({
                    variant: 'destructive',
                    title: 'Error generating report',
                    description: result.error,
                });
            } else {
                const newReport: Report = {
                    id: `report-${reports.length + 1}`,
                    title: result.report.title,
                    url,
                    summary: result.report.summary,
                    generatedDate: new Date().toISOString(),
                };
                setReports(prev => [newReport, ...prev]);
                setActiveReport(newReport);
                toast({
                    title: 'Success',
                    description: 'Report generated successfully.',
                });
            }
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'An unexpected error occurred.',
            });
        }
        setIsLoading(false);
    };

    if (activeReport) {
        return (
            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
                <MainNav />
                <div className="flex flex-col">
                    <Header />
                    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                        <Button onClick={() => setActiveReport(null)} className="w-fit">
                            Back to Reports
                        </Button>
                        <ReportView report={activeReport} />
                    </main>
                </div>
            </div>
        );
    }

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <MainNav />
            <div className="flex flex-col">
                <Header />
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Generate a New Report</CardTitle>
                            <CardDescription>
                                Provide a URL and some content to generate a credit risk report.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="url">URL</Label>
                                <Input
                                    id="url"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    placeholder="https://example.com/article"
                                />
                            </div>
                            <div>
                                <Label htmlFor="content">Content</Label>
                                <Input
                                    id="content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Enter content to analyze..."
                                />
                            </div>
                            <Button onClick={handleGenerateReport} disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <FileText className="mr-2 h-4 w-4" />
                                        Generate Report
                                    </>
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                    <ReportList reports={reports} onSelectReport={setActiveReport} />
                </main>
            </div>
        </div>
    );
}
