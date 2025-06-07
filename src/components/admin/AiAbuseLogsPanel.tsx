
import React, { useEffect } from 'react';
import { useAiAbuseLogs } from '@/hooks/useAiAbuseLogs';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Shield, Clock } from 'lucide-react';

export function AiAbuseLogsPanel(): JSX.Element {
  const { user } = useAuth();
  const { abuseLogs, loading, fetchAbuseLogs, getAbuseCount } = useAiAbuseLogs();

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchAbuseLogs();
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
          <p>Scanning abuse logs...</p>
        </CardContent>
      </Card>
    );
  }

  const getAbuseIcon = (abuseType: string) => {
    switch (abuseType) {
      case 'rate_limit': return <Clock className="h-4 w-4" />;
      case 'spam': return <AlertTriangle className="h-4 w-4" />;
      case 'suspicious': return <Shield className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getAbuseColor = (abuseType: string) => {
    switch (abuseType) {
      case 'rate_limit': return 'bg-yellow-100 text-yellow-700';
      case 'spam': return 'bg-red-100 text-red-700';
      case 'suspicious': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          AI Abuse Detection ({abuseLogs.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {abuseLogs.length === 0 ? (
          <p className="text-gray-500">No abuse detected yet.</p>
        ) : (
          <div className="space-y-4">
            <div className="p-3 bg-red-50 rounded-lg">
              <strong>Total Abuse Events:</strong> {getAbuseCount()}
            </div>
            {abuseLogs.map((log) => (
              <div
                key={log.id}
                className="p-4 border rounded-lg bg-gradient-to-br from-white to-gray-50"
              >
                <div className="flex items-center justify-between mb-3">
                  <Badge className={`text-xs flex items-center gap-1 ${getAbuseColor(log.abuse_type)}`}>
                    {getAbuseIcon(log.abuse_type)}
                    {log.abuse_type}
                  </Badge>
                  <div className="text-xs text-gray-500">
                    {new Date(log.detected_at).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  {log.detail && (
                    <div className="bg-red-50 p-3 rounded">
                      <strong>Details:</strong>
                      <div className="mt-1 text-gray-700">{log.detail}</div>
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
