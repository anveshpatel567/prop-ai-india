
import React, { useEffect } from 'react';
import { useAiAutoresponseFeedback } from '@/hooks/useAiAutoresponseFeedback';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, ThumbsUp, ThumbsDown, BarChart } from 'lucide-react';

export default function AiAutoresponseFeedbackPanel() {
  const { user } = useAuth();
  const { feedbackLogs, loading, fetchAutoresponseFeedback, getHelpfulnessRate } = useAiAutoresponseFeedback();

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchAutoresponseFeedback();
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
          <p>Loading autoresponse feedback...</p>
        </CardContent>
      </Card>
    );
  }

  const helpfulnessRate = getHelpfulnessRate();
  const helpfulCount = feedbackLogs.filter(log => log.was_helpful === true).length;
  const notHelpfulCount = feedbackLogs.filter(log => log.was_helpful === false).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          AI Autoresponse Feedback ({feedbackLogs.length} responses)
        </CardTitle>
        <div className="flex items-center gap-4">
          <Badge className="bg-green-100 text-green-700 text-sm">
            <BarChart className="h-3 w-3 mr-1" />
            {helpfulnessRate.toFixed(1)}% helpful
          </Badge>
          <Badge className="bg-blue-100 text-blue-700 text-sm">
            <ThumbsUp className="h-3 w-3 mr-1" />
            {helpfulCount} positive
          </Badge>
          <Badge className="bg-orange-100 text-orange-700 text-sm">
            <ThumbsDown className="h-3 w-3 mr-1" />
            {notHelpfulCount} negative
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {feedbackLogs.length === 0 ? (
          <p className="text-gray-500">No autoresponse feedback available yet.</p>
        ) : (
          <div className="space-y-4">
            {feedbackLogs.map((log) => (
              <div
                key={log.id}
                className="p-4 border rounded-lg bg-gradient-to-br from-white to-gray-50"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {log.message_id && (
                      <Badge variant="outline" className="text-xs">
                        Msg: {log.message_id.slice(0, 8)}...
                      </Badge>
                    )}
                    <Badge className={`text-xs ${log.was_helpful ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {log.was_helpful ? <ThumbsUp className="h-3 w-3 mr-1" /> : <ThumbsDown className="h-3 w-3 mr-1" />}
                      {log.was_helpful ? 'Helpful' : 'Not Helpful'}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(log.created_at).toLocaleDateString()}
                  </div>
                </div>
                
                {log.feedback && (
                  <div className="text-sm bg-blue-50 p-3 rounded">
                    <strong>Feedback:</strong> {log.feedback}
                  </div>
                )}
                
                <div className="mt-2 text-xs text-gray-600">
                  User: {log.user_id.slice(0, 8)}...
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
