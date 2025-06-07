
import React, { useEffect } from 'react';
import { useAiUiAttentionHeatmaps } from '@/hooks/useAiUiAttentionHeatmaps';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Monitor, Smartphone } from 'lucide-react';

export default function AiUiAttentionDisplay() {
  const { user } = useAuth();
  const { heatmaps, loading, fetchUserHeatmaps } = useAiUiAttentionHeatmaps();

  useEffect(() => {
    if (user?.id) {
      fetchUserHeatmaps(user.id);
    }
  }, [user?.id]);

  if (!user || loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <p>Loading attention heatmaps...</p>
        </CardContent>
      </Card>
    );
  }

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType.toLowerCase()) {
      case 'mobile': return <Smartphone className="h-3 w-3" />;
      case 'desktop': return <Monitor className="h-3 w-3" />;
      default: return <Monitor className="h-3 w-3" />;
    }
  };

  const getAttentionColor = (score: number) => {
    if (score >= 8) return 'text-red-600'; // High attention
    if (score >= 6) return 'text-orange-600'; // Medium attention
    if (score >= 4) return 'text-yellow-600'; // Low attention
    return 'text-gray-600'; // Very low attention
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          UI Attention Heatmaps ({heatmaps.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {heatmaps.length === 0 ? (
          <p className="text-gray-500">No attention data recorded yet. AI is tracking your interaction patterns!</p>
        ) : (
          <div className="space-y-4">
            {heatmaps.map((heatmap) => (
              <div
                key={heatmap.id}
                className="p-4 border rounded-lg bg-gradient-to-br from-white to-gray-50"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {heatmap.page_path}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      {getDeviceIcon(heatmap.device_type)}
                      {heatmap.device_type}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(heatmap.created_at).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="text-sm text-gray-600 mb-2">
                  <strong>Session:</strong> {heatmap.session_id.slice(0, 8)}...
                </div>
                
                <div className="space-y-1">
                  <div className="text-xs font-medium text-gray-700">Element Attention Scores:</div>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(heatmap.attention_map).map(([element, score]) => (
                      <div key={element} className="flex justify-between items-center bg-gray-50 px-2 py-1 rounded text-xs">
                        <span className="truncate">{element}</span>
                        <span className={`font-bold ${getAttentionColor(score)}`}>
                          {score.toFixed(1)}
                        </span>
                      </div>
                    ))}
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
