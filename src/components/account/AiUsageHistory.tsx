
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useAiCreditLogs } from '@/hooks/useAiCreditLogs';
import { useAuth } from '@/hooks/useAuth';
import { format } from 'date-fns';
import { History } from 'lucide-react';

export default function AiUsageHistory() {
  const { user } = useAuth();
  const userId = user?.id || '';
  const { logs, loading, error } = useAiCreditLogs(userId);

  if (!userId) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-red-600">Please log in to view usage history</p>
        </CardContent>
      </Card>
    );
  }

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-red-600">Error loading usage history: {error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          AI Usage History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {logs.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No usage history found</p>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="font-medium">{log.tool_name}</span>
                  <Badge variant="outline">
                    {log.credits_used} credits
                  </Badge>
                </div>
                <span className="text-sm text-gray-500">
                  {format(new Date(log.created_at), 'MMM dd, yyyy HH:mm')}
                </span>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
