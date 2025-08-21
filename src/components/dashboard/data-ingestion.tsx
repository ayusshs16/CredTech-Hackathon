"use client";

import { useState, useTransition } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Rss } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { fetchData } from '@/app/actions';

interface FetchedDataItem {
  title: string;
  link: string;
  pubDate: string;
}

export function DataIngestion() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [sourceType, setSourceType] = useState('structured');
  const [sourceUrl, setSourceUrl] = useState('');
  const [fetchedData, setFetchedData] = useState<FetchedDataItem[]>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startTransition(async () => {
      try {
        const result = await fetchData(sourceUrl);
        if ('error' in result) {
            toast({
              variant: 'destructive',
              title: 'Error fetching data',
              description: result.error,
            });
            setFetchedData([]);
        } else {
            setFetchedData(result.items);
            toast({
                title: 'Success',
                description: `Successfully fetched ${result.items.length} items.`,
            });
        }
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'An unexpected error occurred.',
        });
        setFetchedData([]);
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Ingestion & Processing</CardTitle>
        <CardDescription>
          Fetch and process data from structured and unstructured sources.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="sourceType">Source Type</Label>
              <Select value={sourceType} onValueChange={setSourceType}>
                <SelectTrigger id="sourceType">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="structured">Structured (API)</SelectItem>
                  <SelectItem value="unstructured">Unstructured (RSS)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="sourceUrl">Source URL</Label>
              <Input
                id="sourceUrl"
                name="sourceUrl"
                placeholder="Enter URL..."
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                required
              />
            </div>
          </div>
          <Button type="submit" disabled={isPending || !sourceUrl}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Fetching Data...
              </>
            ) : (
              <>
                <Rss className="mr-2 h-4 w-4" />
                Fetch Data
              </>
            )}
          </Button>
        </form>

        {fetchedData.length > 0 && (
          <div>
            <h3 className="font-semibold text-lg mb-2">Ingested Data</h3>
            <div className="rounded-md border max-h-72 overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Publication Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fetchedData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          {item.title}
                        </a>
                      </TableCell>
                      <TableCell>{new Date(item.pubDate).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
