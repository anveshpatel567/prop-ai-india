
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDailySnapshots } from '@/hooks/useDailySnapshots';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';

export function DailySnapshotPanel() {
  const { snapshots, loading } = useDailySnapshots();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Daily AI Snapshots
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-muted-foreground">Loading daily snapshots...</p>
        ) : (
          <div className="space-y-4">
            {snapshots.map((snapshot) => (
              <div key={snapshot.id} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium">
                    {format(new Date(snapshot.snapshot_date), 'PPP')}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {snapshot.top_feature && `Top Feature: ${snapshot.top_feature}`}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center p-2 bg-blue-50 rounded">
                    <div className="font-semibold text-blue-600">
                      {snapshot.total_prompts || 0}
                    </div>
                    <div className="text-xs text-muted-foreground">Total Prompts</div>
                  </div>
                  <div className="text-center p-2 bg-orange-50 rounded">
                    <div className="font-semibold text-orange-600">
                      {snapshot.total_flags || 0}
                    </div>
                    <div className="text-xs text-muted-foreground">Total Flags</div>
                  </div>
                  <div className="text-center p-2 bg-green-50 rounded">
                    <div className="font-semibold text-green-600">
                      {snapshot.avg_latency_ms || 0}ms
                    </div>
                    <div className="text-xs text-muted-foreground">Avg Latency</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
