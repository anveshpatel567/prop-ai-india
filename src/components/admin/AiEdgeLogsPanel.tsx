
import React, { useEffect } from 'react';
import { useAiEdgeLogs } from '@/hooks/useAiEdgeLogs';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Cloud, Zap, Clock } from 'lucide-react';

export default function AiEdgeLogsPanel() {
  const { user } = useAuth();
  const { edgeLogs, loading, fetchEdgeLogs, getAverageResponseTime } = useAiEdgeLogs();

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchEdgeLogs();
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
          <p>Loading edge invocation logs...</p>
        </CardContent>
      </Card>
    );
  }

  const avgResponseTime = getAverageResponseTime();
  const successfulInvocations = edgeLogs.filter(log => log.status_code && log.status_code < 400).length;
  const successRate = edgeLogs.length > 0 ? (successfulInvocations / edgeLogs.length * 100).toFixed(1) : '0';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cloud className="h-5 w-5" />
          AI Edge Function Logs ({edgeLogs.length} invocations)
        </CardTitle>
        <div className="flex items-center gap-4">
          <Badge className="bg-green-100 text-green-700 text-sm">
            <Zap className="h-3 w-3 mr-1" />
            {successRate}% success rate
          </Badge>
          <Badge className="bg-blue-100 text-blue-700 text-sm">
            <Clock className="h-3 w-3 mr-1" />
            {avgResponseTime}ms avg response
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {edgeLogs.length === 0 ? (
          <p className="text-gray-500">No edge function invocations logged yet.</p>
        ) : (
          <div className="space-y-4">
            {edgeLogs.slice(0, 10).map((log) => (
              <div
                key={log.id}
                className="p-4 border rounded-lg bg-gradient-to-br from-cyan-50 to-blue-50"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {log.edge_function}
                    </Badge>
                    <Badge className={`text-xs ${
                      log.status_code && log.status_code < 400 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {log.status_code || 'N/A'}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(log.invocation_time).toLocaleString()}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <strong>Response Time:</strong> {log.response_time_ms ? `${log.response_time_ms}ms` : 'N/A'}
                  </div>
                  <div>
                    <strong>User:</strong> {log.user_id ? `${log.user_id.slice(0, 8)}...` : 'Anonymous'}
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
