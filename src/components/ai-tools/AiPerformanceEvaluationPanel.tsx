
import React, { useEffect } from 'react';
import { useAiPerformanceEvaluations } from '@/hooks/useAiPerformanceEvaluations';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Award, TrendingUp } from 'lucide-react';

export default function AiPerformanceEvaluationPanel() {
  const { user } = useAuth();
  const { evaluations, loading, fetchPerformanceEvaluations, getAverageScore } = useAiPerformanceEvaluations();

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchPerformanceEvaluations();
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
          <p>Loading performance evaluations...</p>
        </CardContent>
      </Card>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'bg-green-100 text-green-700';
    if (score >= 6) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  const averageScore = getAverageScore();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart className="h-5 w-5" />
          AI Performance Evaluations ({evaluations.length})
        </CardTitle>
        <div className="flex items-center gap-4">
          <Badge className={`${getScoreColor(averageScore)} text-sm`}>
            <Award className="h-3 w-3 mr-1" />
            Avg Score: {averageScore.toFixed(1)}/10
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {evaluations.length === 0 ? (
          <p className="text-gray-500">No performance evaluations available yet.</p>
        ) : (
          <div className="space-y-4">
            {evaluations.map((evaluation) => (
              <div
                key={evaluation.id}
                className="p-4 border rounded-lg bg-gradient-to-br from-white to-gray-50"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {evaluation.ai_module}
                    </Badge>
                    <Badge className={`text-xs ${getScoreColor(evaluation.quality_score)}`}>
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {evaluation.quality_score}/10
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(evaluation.evaluated_at).toLocaleDateString()}
                  </div>
                </div>
                
                {evaluation.evaluation_context && (
                  <div className="mb-2 text-sm">
                    <strong>Context:</strong> {evaluation.evaluation_context}
                  </div>
                )}
                
                {evaluation.feedback && (
                  <div className="text-sm bg-blue-50 p-3 rounded">
                    <strong>Feedback:</strong> {evaluation.feedback}
                  </div>
                )}
                
                {evaluation.evaluated_by && (
                  <div className="mt-2 text-xs text-gray-600">
                    Evaluated by: {evaluation.evaluated_by}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
