
import React, { useEffect } from 'react';
import { useAiUsageAnomalyLogs } from '@/hooks/useAiUsageAnomalyLogs';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

export function AiUsageAnomalyLogsPanel(): JSX.Element {
  const { user } = useAuth();
  const { anomalyLogs, loading, fetchAnomalyLogs, getAnomaliesByType } = useAiUsageAnomalyLogs();

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchAnomalyLogs();
    }
  }, [user?.role]);

  if (!user || user.role !== 'admin') {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-gray-500">Access restricted to administrators only.</p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <p>Loading usage anomaly logs...</p>
        </CardContent>
      </Card>
    );
  }

  const getAnomalyIcon = (anomalyType: string) => {
    switch (anomalyType) {
      case 'spike': return <TrendingUp className="h-4 w-4" />;
      case 'drop': return <TrendingDown className="h-4 w-4" />;
      case 'abuse': return <AlertTriangle className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getAnomalyColor = (anomalyType: string) => {
    switch (anomalyType) {
      case 'spike': return 'bg-yellow-100 text-yellow-700';
      case 'drop': return 'bg-blue-100 text-blue-700';
      case 'abuse': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const spikeAnomalies = getAnomaliesByType('spike');
  const abuseAnomalies = getAnomaliesByType('abuse');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          AI Usage Anomaly Logs ({anomalyLogs.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {anomalyLogs.length === 0 ? (
          <p className="text-gray-500">No usage anomalies detected yet.</p>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <strong>Usage Spikes:</strong> {spikeAnomalies.length}
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <strong>Abuse Detected:</strong> {abuseAnomalies.length}
              </div>
            </div>
            {anomalyLogs.map((log) => (
              <div
                key={log.id}
                className="p-4 border rounded-lg bg-gradient-to-br from-white to-gray-50"
              >
                <div className="flex items-center justify-between mb-3">
                  <Badge className={`text-xs flex items-center gap-1 ${getAnomalyColor(log.anomaly_type)}`}>
                    {getAnomalyIcon(log.anomaly_type)}
                    {log.anomaly_type}
                  </Badge>
                  <div className="text-xs text-gray-500">
                    {new Date(log.observed_at).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Module:</span>
                    <span className="font-bold text-gray-700">{log.module}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Usage Count:</span>
                    <span className="font-bold">{log.usage_count}</span>
                  </div>
                  <div className="text-xs text-gray-600">
                    User ID: {log.user_id.substring(0, 8)}...
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
