
import React, { useEffect, useState } from 'react';
import { useAiFailureLogs } from '@/hooks/useAiFailureLogs';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Filter } from 'lucide-react';

export function AiFailureLogsPanel(): JSX.Element {
  const { user } = useAuth();
  const { failureLogs, loading, fetchFailureLogs, markRetryAttempted } = useAiFailureLogs();
  const [errorTypeFilter, setErrorTypeFilter] = useState('all');

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchFailureLogs(errorTypeFilter);
    }
  }, [user?.role, errorTypeFilter]);

  const handleRetry = async (logId: string) => {
    await markRetryAttempted(logId);
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
          <p>Loading AI failure logs...</p>
        </CardContent>
      </Card>
    );
  }

  const errorTypes = Array.from(new Set(failureLogs.map(log => log.error_type)));
  const unretried = failureLogs.filter(log => !log.retry_attempted).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          AI Failure Logs ({failureLogs.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  value={errorTypeFilter}
                  onChange={(e) => setErrorTypeFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <option value="all">All Error Types</option>
                  {errorTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-red-50 text-red-700">
                Unretried: {unretried}
              </Badge>
              <Badge variant="outline" className="bg-gray-100 text-gray-700">
                Types: {errorTypes.length}
              </Badge>
            </div>
          </div>

          {failureLogs.length === 0 ? (
            <p className="text-gray-500">No failure logs found.</p>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {failureLogs.map((log) => (
                <div key={log.id} className="border border-gray-200 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-red-100 text-red-700">
                        {log.error_type}
                      </Badge>
                      <Badge className="bg-gray-100 text-gray-700">
                        {log.feature}
                      </Badge>
                      {log.retry_attempted && (
                        <Badge className="bg-blue-100 text-blue-700 flex items-center gap-1">
                          <RefreshCw className="h-3 w-3" />
                          Retried
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(log.failed_at).toLocaleString()}
                    </span>
                  </div>
                  
                  {log.error_message && (
                    <div className="mb-3">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Error Message:</h4>
                      <p className="text-sm text-gray-600 bg-red-50 p-2 rounded font-mono">
                        {log.error_message}
                      </p>
                    </div>
                  )}

                  {!log.retry_attempted && (
                    <div className="flex justify-end">
                      <Button
                        size="sm"
                        onClick={() => handleRetry(log.id)}
                        className="bg-blue-100 text-blue-700 hover:bg-blue-200 flex items-center gap-1"
                      >
                        <RefreshCw className="h-3 w-3" />
                        Mark as Retried
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
