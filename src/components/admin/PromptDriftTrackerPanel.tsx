
import React, { useEffect, useState } from 'react';
import { usePromptDriftLogs } from '@/hooks/usePromptDriftLogs';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, CheckCircle, Filter } from 'lucide-react';

export function PromptDriftTrackerPanel(): JSX.Element {
  const { user } = useAuth();
  const { logs, loading, fetchDriftLogs, resolveLog } = usePromptDriftLogs();
  const [resolvedFilter, setResolvedFilter] = useState('unresolved');

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchDriftLogs(resolvedFilter === 'unresolved' ? false : undefined);
    }
  }, [user?.role, resolvedFilter]);

  const handleResolve = async (logId: string) => {
    await resolveLog(logId);
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
          <p>Loading prompt drift logs...</p>
        </CardContent>
      </Card>
    );
  }

  const unresolvedCount = logs.filter(log => !log.resolved).length;
  const features = Array.from(new Set(logs.map(log => log.feature)));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Prompt Drift Tracker ({logs.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  value={resolvedFilter}
                  onChange={(e) => setResolvedFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <option value="unresolved">Unresolved</option>
                  <option value="all">All Issues</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-red-50 text-red-700">
                Unresolved: {unresolvedCount}
              </Badge>
              <Badge variant="outline" className="bg-gray-100 text-gray-700">
                Features: {features.length}
              </Badge>
            </div>
          </div>

          {logs.length === 0 ? (
            <p className="text-gray-500">No prompt drift issues found.</p>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {logs.map((log) => (
                <div key={log.id} className="border border-gray-200 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-gray-100 text-gray-700">
                        {log.feature}
                      </Badge>
                      {log.resolved ? (
                        <Badge className="bg-green-100 text-green-700 flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Resolved
                        </Badge>
                      ) : (
                        <Badge className="bg-yellow-100 text-yellow-700">
                          Active Issue
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(log.drift_detected_at).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Expected Behavior:</h4>
                      <p className="text-sm text-gray-600 bg-green-50 p-2 rounded">
                        {log.expected_behavior}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Observed Behavior:</h4>
                      <p className="text-sm text-gray-600 bg-red-50 p-2 rounded">
                        {log.observed_behavior}
                      </p>
                    </div>

                    {!log.resolved && (
                      <div className="flex justify-end">
                        <Button
                          size="sm"
                          onClick={() => handleResolve(log.id)}
                          className="bg-green-100 text-green-700 hover:bg-green-200"
                        >
                          Mark as Resolved
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
