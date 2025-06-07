
import React, { useEffect } from 'react';
import { usePromptRegenLogs } from '@/hooks/usePromptRegenLogs';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RotateCcw, RefreshCw } from 'lucide-react';

export function PromptRegenLogsPanel(): JSX.Element {
  const { user } = useAuth();
  const { regenLogs, loading, fetchRegenLogs, getTopRetriedFeatures } = usePromptRegenLogs();

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchRegenLogs();
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
          <p>Loading prompt regeneration logs...</p>
        </CardContent>
      </Card>
    );
  }

  const topRetriedFeatures = getTopRetriedFeatures();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RotateCcw className="h-5 w-5" />
          Prompt Regeneration Logs ({regenLogs.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {regenLogs.length === 0 ? (
          <p className="text-gray-500">No prompt regenerations recorded yet.</p>
        ) : (
          <div className="space-y-4">
            <div className="p-3 bg-slate-50 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Top 5 Most Retried Features</h3>
              <div className="space-y-2">
                {topRetriedFeatures.map((item, index) => (
                  <div key={item.feature} className="flex justify-between items-center">
                    <span className="text-slate-700">{index + 1}. {item.feature}</span>
                    <Badge className="bg-slate-100 text-slate-900">
                      {item.count} retries
                    </Badge>
                  </div>
                ))}
              </div>
              {topRetriedFeatures.length === 0 && (
                <p className="text-slate-600">No retry data available yet.</p>
              )}
            </div>

            <h3 className="text-lg font-semibold text-gray-700">Recent Regenerations</h3>
            {regenLogs.slice(0, 10).map((log) => (
              <div
                key={log.id}
                className="p-4 border rounded-lg bg-gradient-to-br from-white to-gray-50"
              >
                <div className="flex items-center justify-between mb-3">
                  <Badge className="text-xs flex items-center gap-1 bg-slate-100 text-slate-900">
                    <RefreshCw className="h-4 w-4" />
                    Regenerated
                  </Badge>
                  <div className="text-xs text-gray-500">
                    {new Date(log.regenerated_at).toLocaleString()}
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Feature:</span>
                    <span className="font-bold text-gray-700">{log.feature}</span>
                  </div>
                  {log.regenerated_from_prompt && (
                    <div className="bg-slate-50 p-3 rounded">
                      <strong>Original Prompt:</strong>
                      <div className="mt-1 text-gray-700">{log.regenerated_from_prompt}</div>
                    </div>
                  )}
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
