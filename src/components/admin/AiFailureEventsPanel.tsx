
import React, { useEffect } from 'react';
import { useAiFailureEvents } from '@/hooks/useAiFailureEvents';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, X, Clock } from 'lucide-react';

export default function AiFailureEventsPanel() {
  const { user } = useAuth();
  const { failureEvents, loading, fetchFailureEvents } = useAiFailureEvents();

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchFailureEvents();
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
          <p>Loading failure events...</p>
        </CardContent>
      </Card>
    );
  }

  const recentFailures = failureEvents.filter(
    event => new Date(event.occurred_at) > new Date(Date.now() - 24 * 60 * 60 * 1000)
  ).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          AI Failure Events ({failureEvents.length} total)
        </CardTitle>
        <div className="flex items-center gap-4">
          <Badge className="bg-red-100 text-red-700 text-sm">
            <Clock className="h-3 w-3 mr-1" />
            {recentFailures} in last 24h
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {failureEvents.length === 0 ? (
          <p className="text-gray-500">No failure events logged yet.</p>
        ) : (
          <div className="space-y-4">
            {failureEvents.slice(0, 10).map((event) => (
              <div
                key={event.id}
                className="p-4 border rounded-lg bg-gradient-to-br from-red-50 to-orange-50"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {event.module}
                    </Badge>
                    <Badge className="bg-red-100 text-red-700 text-xs">
                      <X className="h-3 w-3 mr-1" />
                      {event.failure_type}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(event.occurred_at).toLocaleString()}
                  </div>
                </div>
                
                {event.description && (
                  <div className="mb-2 text-sm bg-yellow-50 p-3 rounded">
                    <strong>Description:</strong> {event.description}
                  </div>
                )}
                
                <div className="mt-2 text-xs text-gray-600">
                  User: {event.user_id ? `${event.user_id.slice(0, 8)}...` : 'System'}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
