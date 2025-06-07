
import React, { useEffect } from 'react';
import { useAiDeactivationLogs } from '@/hooks/useAiDeactivationLogs';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Power, Settings, AlertTriangle } from 'lucide-react';

export function DeactivationLogsPanel(): JSX.Element {
  const { user } = useAuth();
  const { deactivationLogs, loading, fetchDeactivationLogs, getRecentDeactivations } = useAiDeactivationLogs();

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchDeactivationLogs();
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
          <p>Fetching deactivation logs...</p>
        </CardContent>
      </Card>
    );
  }

  const getToolIcon = (toolName: string) => {
    switch (toolName) {
      case 'ai_chat': return <Settings className="h-4 w-4" />;
      case 'ai_search': return <Power className="h-4 w-4" />;
      case 'ai_recommendations': return <AlertTriangle className="h-4 w-4" />;
      default: return <Power className="h-4 w-4" />;
    }
  };

  const getToolColor = (toolName: string) => {
    switch (toolName) {
      case 'ai_chat': return 'bg-blue-100 text-blue-700';
      case 'ai_search': return 'bg-green-100 text-green-700';
      case 'ai_recommendations': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const recentDeactivations = getRecentDeactivations(24);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Power className="h-5 w-5" />
          AI Feature Deactivation Logs ({deactivationLogs.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {deactivationLogs.length === 0 ? (
          <p className="text-gray-500">No deactivations recorded yet.</p>
        ) : (
          <div className="space-y-4">
            <div className="p-3 bg-orange-50 rounded-lg">
              <strong>Recent Deactivations (24h):</strong> {recentDeactivations.length}
            </div>
            {deactivationLogs.map((log) => (
              <div
                key={log.id}
                className="p-4 border rounded-lg bg-gradient-to-br from-white to-gray-50"
              >
                <div className="flex items-center justify-between mb-3">
                  <Badge className={`text-xs flex items-center gap-1 ${getToolColor(log.tool_name)}`}>
                    {getToolIcon(log.tool_name)}
                    {log.tool_name}
                  </Badge>
                  <div className="text-xs text-gray-500">
                    {new Date(log.deactivated_at).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  {log.reason && (
                    <div className="bg-red-50 p-3 rounded">
                      <strong>Reason:</strong>
                      <div className="mt-1 text-gray-700">{log.reason}</div>
                    </div>
                  )}
                  {log.deactivated_by && (
                    <div className="text-xs text-gray-600">
                      Deactivated by: {log.deactivated_by.substring(0, 8)}...
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
