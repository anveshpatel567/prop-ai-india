
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useModuleHealth } from '@/hooks/useModuleHealth';
import { format } from 'date-fns';
import { Activity } from 'lucide-react';

export function ModuleHealthPanel() {
  const { metrics, loading } = useModuleHealth();

  const getHealthStatus = (uptime: number) => {
    if (uptime >= 95) return { label: 'Healthy', variant: 'default' as const, color: 'text-green-600' };
    if (uptime >= 80) return { label: 'Warning', variant: 'secondary' as const, color: 'text-yellow-600' };
    return { label: 'Critical', variant: 'destructive' as const, color: 'text-red-600' };
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Module Health Metrics
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-muted-foreground">Loading module health metrics...</p>
        ) : (
          <div className="space-y-4">
            {metrics.map((metric) => {
              const status = getHealthStatus(metric.uptime_percentage);
              return (
                <div key={metric.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{metric.module}</span>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Uptime: </span>
                      <span className={status.color}>{metric.uptime_percentage}%</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Avg Latency: </span>
                      <span>{metric.average_latency_ms || 'N/A'}ms</span>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    Last Updated: {format(new Date(metric.last_updated), 'PPp')}
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
