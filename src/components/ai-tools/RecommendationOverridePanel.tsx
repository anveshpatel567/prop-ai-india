
import React, { useEffect } from 'react';
import { useRecommendationOverrides } from '@/hooks/useRecommendationOverrides';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Settings, FileText, DollarSign, MessageSquare } from 'lucide-react';

export default function RecommendationOverridePanel() {
  const { user } = useAuth();
  const { overrideLogs, loading, fetchUserOverrides, getOverridesByFeature } = useRecommendationOverrides();

  useEffect(() => {
    if (user?.id) {
      fetchUserOverrides(user.id);
    }
  }, [user?.id]);

  if (!user || loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <p>Loading recommendation overrides...</p>
        </CardContent>
      </Card>
    );
  }

  const getFeatureIcon = (featureArea: string) => {
    switch (featureArea) {
      case 'pricing': return <DollarSign className="h-4 w-4" />;
      case 'listing_desc': return <FileText className="h-4 w-4" />;
      case 'crm_reply': return <MessageSquare className="h-4 w-4" />;
      default: return <Settings className="h-4 w-4" />;
    }
  };

  const getFeatureColor = (featureArea: string) => {
    switch (featureArea) {
      case 'pricing': return 'bg-green-100 text-green-700';
      case 'listing_desc': return 'bg-blue-100 text-blue-700';
      case 'crm_reply': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          AI Recommendation Overrides ({overrideLogs.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {overrideLogs.length === 0 ? (
          <p className="text-gray-500">No AI recommendation overrides recorded yet.</p>
        ) : (
          <div className="space-y-4">
            {overrideLogs.map((log) => (
              <div
                key={log.id}
                className="p-4 border rounded-lg bg-gradient-to-br from-white to-gray-50"
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge className={`text-xs flex items-center gap-1 ${getFeatureColor(log.feature_area)}`}>
                    {getFeatureIcon(log.feature_area)}
                    {log.feature_area.replace('_', ' ')}
                  </Badge>
                  <div className="text-xs text-gray-500">
                    {new Date(log.created_at).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="bg-red-50 p-2 rounded">
                    <strong>AI Suggested:</strong> {log.original_ai_suggestion}
                  </div>
                  <div className="bg-green-50 p-2 rounded">
                    <strong>User Input:</strong> {log.final_user_input}
                  </div>
                  {log.override_reason && (
                    <div className="bg-blue-50 p-2 rounded">
                      <strong>Reason:</strong> {log.override_reason}
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
