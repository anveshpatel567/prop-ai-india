
import React, { useEffect } from 'react';
import { usePricingFeedback } from '@/hooks/usePricingFeedback';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, ThumbsUp, ThumbsDown, MessageCircle } from 'lucide-react';

export default function PricingFeedbackPanel() {
  const { user } = useAuth();
  const { feedbackLogs, loading, fetchListerFeedback, getAcceptedFeedback, getRejectedFeedback } = usePricingFeedback();

  useEffect(() => {
    if (user?.id) {
      fetchListerFeedback(user.id);
    }
  }, [user?.id]);

  if (!user || loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <p>Loading pricing feedback...</p>
        </CardContent>
      </Card>
    );
  }

  const acceptedCount = getAcceptedFeedback().length;
  const rejectedCount = getRejectedFeedback().length;
  const acceptanceRate = feedbackLogs.length > 0 ? ((acceptedCount / feedbackLogs.length) * 100).toFixed(1) : '0';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          AI Pricing Feedback ({feedbackLogs.length})
        </CardTitle>
        {feedbackLogs.length > 0 && (
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <ThumbsUp className="h-4 w-4 text-green-600" />
              {acceptedCount} accepted
            </span>
            <span className="flex items-center gap-1">
              <ThumbsDown className="h-4 w-4 text-red-600" />
              {rejectedCount} rejected
            </span>
            <span>Acceptance Rate: {acceptanceRate}%</span>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {feedbackLogs.length === 0 ? (
          <p className="text-gray-500">No pricing feedback recorded yet.</p>
        ) : (
          <div className="space-y-4">
            {feedbackLogs.map((log) => (
              <div
                key={log.id}
                className="p-4 border rounded-lg bg-gradient-to-br from-white to-gray-50"
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge className={`text-xs flex items-center gap-1 ${
                    log.user_accepted === true 
                      ? 'bg-green-100 text-green-700' 
                      : log.user_accepted === false 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {log.user_accepted === true ? (
                      <ThumbsUp className="h-3 w-3" />
                    ) : log.user_accepted === false ? (
                      <ThumbsDown className="h-3 w-3" />
                    ) : (
                      <MessageCircle className="h-3 w-3" />
                    )}
                    {log.user_accepted === true ? 'Accepted' : log.user_accepted === false ? 'Rejected' : 'Pending'}
                  </Badge>
                  <div className="text-xs text-gray-500">
                    {new Date(log.created_at).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  {log.ai_price_suggested && (
                    <div className="bg-blue-50 p-2 rounded">
                      <strong>AI Suggested Price:</strong> ₹{log.ai_price_suggested.toLocaleString()}
                    </div>
                  )}
                  {log.feedback_text && (
                    <div className="bg-gray-50 p-2 rounded">
                      <strong>Feedback:</strong> {log.feedback_text}
                    </div>
                  )}
                  {log.rejection_reason && (
                    <div className="bg-red-50 p-2 rounded">
                      <strong>Rejection Reason:</strong> {log.rejection_reason}
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
