
import React, { useEffect } from 'react';
import { useAiRecommendationOverrides } from '@/hooks/useAiRecommendationOverrides';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Settings, User, Bot } from 'lucide-react';

export default function AiRecommendationOverridesPanel() {
  const { user } = useAuth();
  const { overrides, loading, fetchUserOverrides, getOverridesByTrigger } = useAiRecommendationOverrides();

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

  const getTriggerIcon = (trigger: string) => {
    switch (trigger) {
      case 'user': return <User className="h-4 w-4" />;
      case 'admin': return <Settings className="h-4 w-4" />;
      case 'ai': return <Bot className="h-4 w-4" />;
      default: return <Settings className="h-4 w-4" />;
    }
  };

  const getTriggerColor = (trigger: string) => {
    switch (trigger) {
      case 'user': return 'bg-blue-100 text-blue-700';
      case 'admin': return 'bg-red-100 text-red-700';
      case 'ai': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          AI Recommendation Overrides ({overrides.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {overrides.length === 0 ? (
          <p className="text-gray-500">No recommendation overrides recorded yet.</p>
        ) : (
          <div className="space-y-4">
            {overrides.map((override) => (
              <div
                key={override.id}
                className="p-4 border rounded-lg bg-gradient-to-br from-white to-gray-50"
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge className={`text-xs flex items-center gap-1 ${getTriggerColor(override.triggered_by)}`}>
                    {getTriggerIcon(override.triggered_by)}
                    {override.triggered_by}
                  </Badge>
                  <div className="text-xs text-gray-500">
                    {new Date(override.created_at).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="text-sm mb-2">
                  <strong>Reason:</strong> {override.override_reason}
                </div>
                
                <div className="text-xs bg-gray-50 p-2 rounded max-h-16 overflow-y-auto">
                  <strong>Override Data:</strong>
                  <pre className="whitespace-pre-wrap mt-1">
                    {JSON.stringify(override.override_data, null, 2)}
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
