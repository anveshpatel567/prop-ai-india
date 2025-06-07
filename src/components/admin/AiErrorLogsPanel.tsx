
import React, { useEffect } from 'react';
import { useAiFeatureErrorLogs } from '@/hooks/useAiFeatureErrorLogs';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Bug, Code } from 'lucide-react';

export default function AiErrorLogsPanel() {
  const { user } = useAuth();
  const { errorLogs, loading, fetchErrorLogs, getErrorRate } = useAiFeatureErrorLogs();

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchErrorLogs();
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
          <p>Loading error logs...</p>
        </CardContent>
      </Card>
    );
  }

  const uniqueTools = [...new Set(errorLogs.map(log => log.tool_name))];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bug className="h-5 w-5" />
          AI Feature Error Logs ({errorLogs.length} errors)
        </CardTitle>
        <div className="flex items-center gap-4 flex-wrap">
          {uniqueTools.slice(0, 3).map(tool => (
            <Badge key={tool} className="bg-red-100 text-red-700 text-sm">
              <AlertTriangle className="h-3 w-3 mr-1" />
              {tool}: {getErrorRate(tool)} errors
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        {errorLogs.length === 0 ? (
          <p className="text-gray-500">No error logs available yet.</p>
        ) : (
          <div className="space-y-4">
            {errorLogs.map((log) => (
              <div
                key={log.id}
                className="p-4 border rounded-lg bg-gradient-to-br from-red-50 to-orange-50"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {log.tool_name}
                    </Badge>
                    <Badge className="bg-red-100 text-red-700 text-xs">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Error
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(log.created_at).toLocaleDateString()}
                  </div>
                </div>
                
                {log.error_message && (
                  <div className="mb-2 text-sm">
                    <strong>Error:</strong> {log.error_message}
                  </div>
                )}
                
                {log.context && (
                  <div className="mb-2 text-sm bg-yellow-50 p-3 rounded">
                    <strong>Context:</strong> {log.context}
                  </div>
                )}
                
                {log.stack_trace && (
                  <div className="mb-2 text-xs bg-gray-100 p-3 rounded font-mono">
                    <div className="flex items-center gap-1 mb-1">
                      <Code className="h-3 w-3" />
                      <strong>Stack Trace:</strong>
                    </div>
                    <div className="text-gray-700 whitespace-pre-wrap max-h-20 overflow-y-auto">
                      {log.stack_trace}
                    </div>
                  </div>
                )}
                
                <div className="mt-2 text-xs text-gray-600">
                  User: {log.user_id.slice(0, 8)}...
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
