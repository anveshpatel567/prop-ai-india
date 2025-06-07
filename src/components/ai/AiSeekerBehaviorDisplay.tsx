
import React, { useEffect } from 'react';
import { useAiSeekerBehaviorLogs } from '@/hooks/useAiSeekerBehaviorLogs';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, TrendingUp } from 'lucide-react';

export default function AiSeekerBehaviorDisplay() {
  const { user } = useAuth();
  const { behaviorLogs, loading, fetchSeekerBehaviorLogs, getUniquePreferences } = useAiSeekerBehaviorLogs();

  useEffect(() => {
    if (user?.id) {
      fetchSeekerBehaviorLogs(user.id);
    }
  }, [user?.id]);

  if (!user || loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <p>Loading behavior patterns...</p>
        </CardContent>
      </Card>
    );
  }

  const uniquePreferences = getUniquePreferences();

  const getBehaviorTypeColor = (type: string) => {
    switch (type) {
      case 'search_pattern': return 'bg-blue-100 text-blue-700';
      case 'click_flow': return 'bg-green-100 text-green-700';
      case 'time_spent': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          AI Behavior Analysis ({behaviorLogs.length})
        </CardTitle>
        {uniquePreferences.length > 0 && (
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm text-gray-600">
              {uniquePreferences.length} preference{uniquePreferences.length !== 1 ? 's' : ''} identified
            </span>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {behaviorLogs.length === 0 ? (
          <p className="text-gray-500">No behavior patterns recorded yet. AI is learning your preferences!</p>
        ) : (
          <div className="space-y-4">
            {behaviorLogs.map((log) => (
              <div
                key={log.id}
                className="p-4 border rounded-lg bg-gradient-to-br from-white to-gray-50"
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge className={`text-xs ${getBehaviorTypeColor(log.behavior_type)}`}>
                    {log.behavior_type.replace('_', ' ')}
                  </Badge>
                  <div className="text-xs text-gray-500">
                    {new Date(log.created_at).toLocaleDateString()}
                  </div>
                </div>
                
                {log.inferred_preference && (
                  <div className="text-sm text-blue-600 bg-blue-50 p-2 rounded mb-2">
                    <strong>AI Insight:</strong> {log.inferred_preference}
                  </div>
                )}
                
                <div className="text-xs bg-gray-50 p-2 rounded max-h-16 overflow-y-auto">
                  <strong>Data:</strong>
                  <pre className="whitespace-pre-wrap mt-1">
                    {JSON.stringify(log.behavior_data, null, 2)}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
