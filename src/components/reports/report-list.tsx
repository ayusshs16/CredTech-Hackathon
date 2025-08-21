'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

export interface Report {
    id: string;
    title: string;
    url: string;
    generatedDate: string;
    summary: string;
}

interface ReportListProps {
    reports: Report[];
    onSelectReport: (report: Report) => void;
}

export function ReportList({ reports, onSelectReport }: ReportListProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Generated Reports</CardTitle>
                <CardDescription>
                    View and manage your previously generated credit risk reports.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {reports.length > 0 ? (
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Report Title</TableHead>
                                    <TableHead>Date Generated</TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {reports.map((report) => (
                                    <TableRow key={report.id}>
                                        <TableCell className="font-medium">{report.title}</TableCell>
                                        <TableCell>{new Date(report.generatedDate).toLocaleString()}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm" onClick={() => onSelectReport(report)}>
                                                View Report
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-8 border rounded-md">
                        <FileText className="h-12 w-12 mb-4" />
                        <p className="font-semibold">No reports generated yet.</p>
                        <p className="text-sm">Use the form above to create your first report.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
