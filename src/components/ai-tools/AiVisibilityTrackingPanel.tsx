
import React, { useEffect } from 'react';
import { useAiVisibilityTracking } from '@/hooks/useAiVisibilityTracking';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, MousePointer, Search, Zap, TrendingUp } from 'lucide-react';

export default function AiVisibilityTrackingPanel() {
  const { user } = useAuth();
  const { visibilityLogs, loading, fetchVisibilityLogs, getLogsByFeature, getInteractionRate } = useAiVisibilityTracking();

  useEffect(() => {
    if (user?.id) {
      if (user.role === 'admin') {
        fetchVisibilityLogs(); // Admin sees all logs
      } else {
        fetchVisibilityLogs(user.id); // User sees only their logs
      }
    }
  }, [user?.id, user?.role]);

  if (!user || loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <p>Loading visibility tracking data...</p>
        </CardContent>
      </Card>
    );
  }

  const getFeatureIcon = (aiFeature: string) => {
    switch (aiFeature) {
      case 'listing_boost': return <TrendingUp className="h-4 w-4" />;
      case 'search_match': return <Search className="h-4 w-4" />;
      case 'pricing': return <Zap className="h-4 w-4" />;
      default: return <Eye className="h-4 w-4" />;
    }
  };

  const getFeatureColor = (aiFeature: string) => {
    switch (aiFeature) {
      case 'listing_boost': return 'bg-green-100 text-green-700';
      case 'search_match': return 'bg-blue-100 text-blue-700';
      case 'pricing': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Get unique features for interaction rate display
  const uniqueFeatures = [...new Set(visibilityLogs.map(log => log.ai_feature))];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          AI Visibility Tracking ({visibilityLogs.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Interaction Rate Summary */}
        {uniqueFeatures.length > 0 && user.role === 'admin' && (
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <h3 className="font-semibold mb-3">Interaction Rates by Feature</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {uniqueFeatures.map((feature) => (
                <div key={feature} className="flex items-center justify-between bg-white p-2 rounded">
                  <span className="text-sm">{feature}</span>
                  <Badge variant="outline">
                    {getInteractionRate(feature).toFixed(1)}%
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {visibilityLogs.length === 0 ? (
          <p className="text-gray-500">No visibility tracking data available yet.</p>
        ) : (
          <div className="space-y-4">
            {visibilityLogs.map((log) => (
              <div
                key={log.id}
                className="p-4 border rounded-lg bg-gradient-to-br from-white to-gray-50"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge className={`text-xs flex items-center gap-1 ${getFeatureColor(log.ai_feature)}`}>
                      {getFeatureIcon(log.ai_feature)}
                      {log.ai_feature}
                    </Badge>
                    {log.interaction_taken && (
                      <Badge className="text-xs bg-green-100 text-green-700 flex items-center gap-1">
                        <MousePointer className="h-3 w-3" />
                        Interacted
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(log.viewed_at).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="text-sm">
                  <div className="bg-gray-50 p-2 rounded">
                    <strong>Status:</strong> {log.interaction_taken ? 'User took action' : 'View only'}
                  </div>
                  {user.role === 'admin' && (
                    <div className="mt-2 text-xs text-gray-600">
                      User ID: {log.user_id}
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
