
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useFeatureSummaries } from '@/hooks/useFeatureSummaries';
import { format } from 'date-fns';
import { BarChart3 } from 'lucide-react';

export function FeatureSummaryPanel() {
  const { summaries, loading } = useFeatureSummaries();

  const getFlagRatio = (flagged: number, total: number) => {
    if (total === 0) return "0";
    return ((flagged / total) * 100).toFixed(1);
  };

  const getFlagStatus = (ratio: string) => {
    const ratioNum = parseFloat(ratio);
    if (ratioNum < 5) return { label: 'Low', variant: 'default' as const };
    if (ratioNum < 15) return { label: 'Medium', variant: 'secondary' as const };
    return { label: 'High', variant: 'destructive' as const };
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Feature Summary Metrics
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-muted-foreground">Loading feature summaries...</p>
        ) : (
          <div className="space-y-4">
            {summaries.map((summary) => {
              const flagRatio = getFlagRatio(summary.flagged_count, summary.usage_count);
              const status = getFlagStatus(flagRatio);
              return (
                <div key={summary.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{summary.feature}</span>
                    <Badge variant={status.variant}>Flag Rate: {flagRatio}%</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Usage: </span>
                      <span className="font-medium">{summary.usage_count}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Flagged: </span>
                      <span className="text-orange-600">{summary.flagged_count}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Shadowbans: </span>
                      <span className="text-red-600">{summary.shadowban_count}</span>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    Last Synced: {format(new Date(summary.last_synced), 'PPp')}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
