
import React, { useEffect } from 'react';
import { useUserTrustLogs } from '@/hooks/useUserTrustLogs';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, TrendingUp, TrendingDown } from 'lucide-react';

export function UserTrustLogsPanel(): JSX.Element {
  const { user } = useAuth();
  const { trustLogs, loading, fetchTrustLogs, getAverageTrustScore } = useUserTrustLogs();

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchTrustLogs();
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
          <p>Loading trust logs...</p>
        </CardContent>
      </Card>
    );
  }

  const getTrustIcon = (score: number) => {
    if (score >= 0.8) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (score >= 0.6) return <Shield className="h-4 w-4 text-yellow-600" />;
    return <TrendingDown className="h-4 w-4 text-red-600" />;
  };

  const getTrustColor = (score: number) => {
    if (score >= 0.8) return 'bg-green-100 text-green-700';
    if (score >= 0.6) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          AI Trust Rating Logs ({trustLogs.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {trustLogs.length === 0 ? (
          <p className="text-gray-500">No trust logs available yet.</p>
        ) : (
          <div className="space-y-4">
            <div className="p-3 bg-orange-50 rounded-lg">
              <strong>Average Trust Score:</strong> {getAverageTrustScore()}
            </div>
            {trustLogs.map((log) => (
              <div
                key={log.id}
                className="p-4 border rounded-lg bg-gradient-to-br from-white to-gray-50"
              >
                <div className="flex items-center justify-between mb-3">
                  <Badge className={`text-xs flex items-center gap-1 ${getTrustColor(log.trust_score)}`}>
                    {getTrustIcon(log.trust_score)}
                    {log.ai_module}
                  </Badge>
                  <div className="text-xs text-gray-500">
                    {new Date(log.computed_at).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Trust Score:</span>
                    <span className="font-bold text-orange-600">{log.trust_score}</span>
                  </div>
                  {log.reason && (
                    <div className="bg-blue-50 p-3 rounded">
                      <strong>Reason:</strong>
                      <div className="mt-1 text-gray-700">{log.reason}</div>
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
