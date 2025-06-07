
import React, { useEffect } from 'react';
import { useAiLearningFeedback } from '@/hooks/useAiLearningFeedback';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, ThumbsUp, MessageSquare } from 'lucide-react';

export default function AiLearningFeedbackPanel() {
  const { user } = useAuth();
  const { learningFeedback, loading, fetchLearningFeedback, getHelpfulnessRate } = useAiLearningFeedback();

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchLearningFeedback();
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
          <p>Loading learning feedback...</p>
        </CardContent>
      </Card>
    );
  }

  const helpfulnessRate = getHelpfulnessRate();
  const totalFeedback = learningFeedback.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          AI Learning Mode Feedback ({totalFeedback} entries)
        </CardTitle>
        <div className="flex items-center gap-4">
          <Badge className="bg-purple-100 text-purple-700 text-sm">
            <ThumbsUp className="h-3 w-3 mr-1" />
            {helpfulnessRate}% helpful
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {learningFeedback.length === 0 ? (
          <p className="text-gray-500">No learning feedback submitted yet.</p>
        ) : (
          <div className="space-y-4">
            {learningFeedback.slice(0, 10).map((feedback) => (
              <div
                key={feedback.id}
                className="p-4 border rounded-lg bg-gradient-to-br from-purple-50 to-pink-50"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {feedback.module_name}
                    </Badge>
                    {feedback.helpful !== null && (
                      <Badge className={`text-xs ${
                        feedback.helpful 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        {feedback.helpful ? 'Helpful' : 'Not Helpful'}
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(feedback.submitted_at).toLocaleDateString()}
                  </div>
                </div>
                
                {feedback.question && (
                  <div className="mb-2 text-sm bg-blue-50 p-3 rounded">
                    <strong>Question:</strong> {feedback.question}
                  </div>
                )}
                
                {feedback.answer && (
                  <div className="mb-2 text-sm bg-green-50 p-3 rounded">
                    <strong>Answer:</strong> {feedback.answer}
                  </div>
                )}
                
                <div className="mt-2 text-xs text-gray-600">
                  User: {feedback.user_id.slice(0, 8)}...
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
