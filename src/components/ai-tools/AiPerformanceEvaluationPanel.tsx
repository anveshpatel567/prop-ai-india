
import React, { useEffect } from 'react';
import { useAiPerformanceEvaluations } from '@/hooks/useAiPerformanceEvaluations';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Star, MessageSquare, TrendingUp } from 'lucide-react';

export default function AiPerformanceEvaluationPanel() {
  const { user } = useAuth();
  const { evaluations, loading, fetchPerformanceEvaluations, getEvaluationsByModule, getAverageScore } = useAiPerformanceEvaluations();

  useEffect(() => {
    if (user?.id) {
      if (user.role === 'admin') {
        fetchPerformanceEvaluations(); // Admin sees all evaluations
      } else {
        fetchPerformanceEvaluations(undefined, user.id); // User sees their own evaluations
      }
    }
  }, [user?.id, user?.role]);

  if (!user || loading) {
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

  const getModuleColor = (aiModule: string) => {
    switch (aiModule) {
      case 'pricing': return 'bg-purple-100 text-purple-700';
      case 'search': return 'bg-blue-100 text-blue-700';
      case 'faq': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const renderStars = (score: number) => {
    return Array.from({ length: 10 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${i < score ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  // Get unique modules for average score display
  const uniqueModules = [...new Set(evaluations.map(eval => eval.ai_module))];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          AI Performance Evaluations ({evaluations.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Average Score Summary */}
        {uniqueModules.length > 0 && user.role === 'admin' && (
          <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Average Scores by Module
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {uniqueModules.map((module) => (
                <div key={module} className="flex items-center justify-between bg-white p-3 rounded">
                  <span className="text-sm font-medium">{module}</span>
                  <Badge className={getScoreColor(getAverageScore(module))}>
                    {getAverageScore(module).toFixed(1)}/10
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

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
                    <Badge className={`text-xs ${getModuleColor(evaluation.ai_module)}`}>
                      {evaluation.ai_module}
                    </Badge>
                    {evaluation.evaluation_context && (
                      <Badge variant="outline" className="text-xs">
                        {evaluation.evaluation_context}
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(evaluation.evaluated_at).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Quality Score:</span>
                      <Badge className={`text-sm ${getScoreColor(evaluation.quality_score)}`}>
                        {evaluation.quality_score}/10
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      {renderStars(evaluation.quality_score)}
                    </div>
                  </div>
                  
                  {evaluation.feedback && (
                    <div className="bg-blue-50 p-3 rounded">
                      <div className="flex items-center gap-2 mb-1">
                        <MessageSquare className="h-4 w-4 text-blue-600" />
                        <strong className="text-sm">Feedback:</strong>
                      </div>
                      <div className="text-sm text-gray-700">{evaluation.feedback}</div>
                    </div>
                  )}
                  
                  {user.role === 'admin' && evaluation.evaluated_by && (
                    <div className="text-xs text-gray-600">
                      Evaluated by: {evaluation.evaluated_by}
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
