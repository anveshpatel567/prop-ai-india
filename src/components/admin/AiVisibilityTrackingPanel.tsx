
import React, { useEffect } from 'react';
import { useAiVisibilityTracking } from '@/hooks/useAiVisibilityTracking';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, MousePointer, Activity } from 'lucide-react';

export default function AiVisibilityTrackingPanel() {
  const { user } = useAuth();
  const { visibilityLogs, loading, fetchVisibilityLogs } = useAiVisibilityTracking();

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchVisibilityLogs();
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
          <p>Loading visibility tracking data...</p>
        </CardContent>
      </Card>
    );
  }

  const totalViews = visibilityLogs.length;
  const interactions = visibilityLogs.filter(log => log.interaction_taken).length;
  const interactionRate = totalViews > 0 ? (interactions / totalViews * 100).toFixed(1) : '0';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          AI Visibility Tracking ({totalViews} views)
        </CardTitle>
        <div className="flex items-center gap-4">
          <Badge className="bg-green-100 text-green-700 text-sm">
            <Activity className="h-3 w-3 mr-1" />
            {interactionRate}% interaction rate
          </Badge>
          <Badge className="bg-blue-100 text-blue-700 text-sm">
            <MousePointer className="h-3 w-3 mr-1" />
            {interactions} interactions
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {visibilityLogs.length === 0 ? (
          <p className="text-gray-500">No visibility tracking data available yet.</p>
        ) : (
          <div className="space-y-4">
            {visibilityLogs.slice(0, 10).map((log) => (
              <div
                key={log.id}
                className="p-4 border rounded-lg bg-gradient-to-br from-purple-50 to-pink-50"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {log.ai_feature}
                    </Badge>
                    <Badge className={`text-xs ${log.interaction_taken ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {log.interaction_taken ? <MousePointer className="h-3 w-3 mr-1" /> : <Eye className="h-3 w-3 mr-1" />}
                      {log.interaction_taken ? 'Interacted' : 'Viewed'}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(log.viewed_at).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="mt-2 text-xs text-gray-600">
                  User: {log.user_id?.slice(0, 8)}...
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
