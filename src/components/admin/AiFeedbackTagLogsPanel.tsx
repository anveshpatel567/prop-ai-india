
import React, { useEffect } from 'react';
import { useAiFeedbackTagLogs } from '@/hooks/useAiFeedbackTagLogs';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Tag, Clock } from 'lucide-react';

export function AiFeedbackTagLogsPanel(): JSX.Element {
  const { user } = useAuth();
  const { feedbackLogs, loading, fetchFeedbackLogs, getFeedbackByTag } = useAiFeedbackTagLogs();

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchFeedbackLogs();
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
          <p>Loading feedback tag logs...</p>
        </CardContent>
      </Card>
    );
  }

  const getTagIcon = (tag: string) => {
    switch (tag) {
      case 'confusing': return <MessageSquare className="h-4 w-4" />;
      case 'slow': return <Clock className="h-4 w-4" />;
      default: return <Tag className="h-4 w-4" />;
    }
  };

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'confusing': return 'bg-red-100 text-red-700';
      case 'not helpful': return 'bg-orange-100 text-orange-700';
      case 'slow': return 'bg-yellow-100 text-yellow-700';
      case 'helpful': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const confusingFeedback = getFeedbackByTag('confusing');
  const slowFeedback = getFeedbackByTag('slow');
  const helpfulFeedback = getFeedbackByTag('helpful');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tag className="h-5 w-5" />
          AI Feedback Tag Logs ({feedbackLogs.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {feedbackLogs.length === 0 ? (
          <p className="text-gray-500">No feedback tags submitted yet.</p>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <strong>Helpful:</strong> {helpfulFeedback.length}
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <strong>Confusing:</strong> {confusingFeedback.length}
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <strong>Slow:</strong> {slowFeedback.length}
              </div>
            </div>
            {feedbackLogs.map((log) => (
              <div
                key={log.id}
                className="p-4 border rounded-lg bg-gradient-to-br from-white to-gray-50"
              >
                <div className="flex items-center justify-between mb-3">
                  <Badge className={`text-xs flex items-center gap-1 ${getTagColor(log.tag)}`}>
                    {getTagIcon(log.tag)}
                    {log.tag}
                  </Badge>
                  <div className="text-xs text-gray-500">
                    {new Date(log.submitted_at).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Feature:</span>
                    <span className="font-bold text-orange-600">{log.feature_used}</span>
                  </div>
                  {log.context_snippet && (
                    <div className="bg-blue-50 p-3 rounded">
                      <strong>Context:</strong>
                      <div className="mt-1 text-gray-700">{log.context_snippet}</div>
                    </div>
                  )}
                  <div className="text-xs text-gray-600">
                    User ID: {log.user_id.substring(0, 8)}...
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
