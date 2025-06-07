
import React, { useEffect } from 'react';
import { useAiResponseQualityLogs } from '@/hooks/useAiResponseQualityLogs';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Star } from 'lucide-react';

export default function AiResponseQualityDisplay() {
  const { user } = useAuth();
  const { qualityLogs, loading, fetchUserQualityLogs, getAverageQualityScore } = useAiResponseQualityLogs();

  useEffect(() => {
    if (user?.id) {
      fetchUserQualityLogs(user.id);
    }
  }, [user?.id]);

  if (!user || loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <p>Loading quality logs...</p>
        </CardContent>
      </Card>
    );
  }

  const averageScore = getAverageQualityScore();

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          AI Response Quality ({qualityLogs.length})
        </CardTitle>
        {qualityLogs.length > 0 && (
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            <span className={`font-medium ${getScoreColor(averageScore)}`}>
              Average Score: {averageScore}/10
            </span>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {qualityLogs.length === 0 ? (
          <p className="text-gray-500">No quality logs yet. AI responses will be automatically evaluated!</p>
        ) : (
          <div className="space-y-4">
            {qualityLogs.map((log) => (
              <div
                key={log.id}
                className="p-4 border rounded-lg bg-gradient-to-br from-white to-gray-50"
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {log.feature_context}
                  </Badge>
                  <div className={`font-bold ${getScoreColor(log.quality_score)}`}>
                    {log.quality_score}/10
                  </div>
                </div>
                
                <div className="text-sm text-gray-600 mb-2 line-clamp-2">
                  <strong>Response:</strong> {log.response_text}
                </div>
                
                {log.critique && (
                  <div className="text-sm text-blue-600 bg-blue-50 p-2 rounded">
                    <strong>AI Critique:</strong> {log.critique}
                  </div>
                )}
                
                <div className="text-xs text-gray-500 mt-2">
                  Evaluated on {new Date(log.evaluated_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
