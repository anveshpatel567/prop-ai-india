
import React, { useEffect } from 'react';
import { useDriftLogs } from '@/hooks/useDriftLogs';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp } from 'lucide-react';

export function DriftDetectionPanel(): JSX.Element {
  const { user } = useAuth();
  const { logs, loading, fetchDriftLogs } = useDriftLogs();

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchDriftLogs();
    }
  }, [user?.role]);

  const getDriftSeverity = (score: number) => {
    if (score < 0.3) return { label: 'Low', color: 'bg-green-100 text-green-700' };
    if (score < 0.7) return { label: 'Medium', color: 'bg-yellow-100 text-yellow-700' };
    return { label: 'High', color: 'bg-red-100 text-red-700' };
  };

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
          <p>Loading drift detection logs...</p>
        </CardContent>
      </Card>
    );
  }

  // Group logs by model version
  const groupedLogs = logs.reduce((acc, log) => {
    if (!acc[log.model_version]) {
      acc[log.model_version] = [];
    }
    acc[log.model_version].push(log);
    return acc;
  }, {} as Record<string, typeof logs>);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Drift Detection Logs ({logs.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.keys(groupedLogs).length === 0 ? (
            <p className="text-gray-500">No drift detection logs found.</p>
          ) : (
            Object.entries(groupedLogs).map(([version, versionLogs]) => (
              <div key={version} className="space-y-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-gray-900">Model {version}</h3>
                  <Badge variant="outline">{versionLogs.length} events</Badge>
                </div>
                
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {versionLogs.map((log) => {
                    const severity = getDriftSeverity(log.drift_score);
                    return (
                      <div key={log.id} className="border border-gray-200 p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <Badge className={severity.color}>
                            {severity.label} Drift ({(log.drift_score * 100).toFixed(1)}%)
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {new Date(log.detected_at).toLocaleString()}
                          </span>
                        </div>
                        
                        {log.detection_method && (
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Method:</span> {log.detection_method}
                          </div>
                        )}
                        
                        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              log.drift_score < 0.3 ? 'bg-green-500' :
                              log.drift_score < 0.7 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${log.drift_score * 100}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
