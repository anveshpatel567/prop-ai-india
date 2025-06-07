
import React, { useEffect } from 'react';
import { useAiFormFillLogs } from '@/hooks/useAiFormFillLogs';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FormInput, Brain } from 'lucide-react';

export default function AiFormFillDisplay() {
  const { user } = useAuth();
  const { formFillLogs, loading, fetchUserFormFillLogs, getAverageConfidenceScore } = useAiFormFillLogs();

  useEffect(() => {
    if (user?.id) {
      fetchUserFormFillLogs(user.id);
    }
  }, [user?.id]);

  if (!user || loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <p>Loading form fill logs...</p>
        </CardContent>
      </Card>
    );
  }

  const averageConfidence = getAverageConfidenceScore();

  const getConfidenceColor = (score: number | null) => {
    if (!score) return 'text-gray-500';
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FormInput className="h-5 w-5" />
          AI Form Auto-Fill History ({formFillLogs.length})
        </CardTitle>
        {formFillLogs.length > 0 && (
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            <span className={`font-medium ${getConfidenceColor(averageConfidence)}`}>
              Average Confidence: {averageConfidence}/10
            </span>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {formFillLogs.length === 0 ? (
          <p className="text-gray-500">No auto-fill history yet. AI will help you fill forms faster!</p>
        ) : (
          <div className="space-y-4">
            {formFillLogs.map((log) => (
              <div
                key={log.id}
                className="p-4 border rounded-lg bg-gradient-to-br from-white to-gray-50"
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs capitalize">
                    {log.form_context.replace('_', ' ')}
                  </Badge>
                  {log.confidence_score && (
                    <div className={`font-bold ${getConfidenceColor(log.confidence_score)}`}>
                      {log.confidence_score}/10
                    </div>
                  )}
                </div>
                
                <div className="text-sm text-gray-600 mb-2">
                  <strong>Fields Auto-Filled:</strong> {Object.keys(log.fields_auto_filled).length} fields
                </div>
                
                <div className="text-xs bg-gray-50 p-2 rounded max-h-20 overflow-y-auto">
                  <pre className="whitespace-pre-wrap">
                    {JSON.stringify(log.fields_auto_filled, null, 2)}
                  </pre>
                </div>
                
                <div className="text-xs text-gray-500 mt-2">
                  {new Date(log.created_at).toLocaleDateString()} at {new Date(log.created_at).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
