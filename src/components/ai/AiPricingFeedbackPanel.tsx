
import React, { useEffect } from 'react';
import { useAiPricingFeedbackLogs } from '@/hooks/useAiPricingFeedbackLogs';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function AiPricingFeedbackPanel() {
  const { user } = useAuth();
  const { feedbackLogs, loading, fetchUserFeedback, getAveragePriceDifference } = useAiPricingFeedbackLogs();

  useEffect(() => {
    if (user?.id) {
      fetchUserFeedback(user.id);
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

  const averageDifference = getAveragePriceDifference();

  const getFeedbackIcon = (feedback: string) => {
    switch (feedback) {
      case 'too_high': return <TrendingUp className="h-4 w-4" />;
      case 'too_low': return <TrendingDown className="h-4 w-4" />;
      case 'accurate': return <Minus className="h-4 w-4" />;
      default: return <DollarSign className="h-4 w-4" />;
    }
  };

  const getFeedbackColor = (feedback: string) => {
    switch (feedback) {
      case 'too_high': return 'bg-red-100 text-red-700';
      case 'too_low': return 'bg-yellow-100 text-yellow-700';
      case 'accurate': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          AI Pricing Feedback ({feedbackLogs.length})
        </CardTitle>
        {feedbackLogs.length > 0 && (
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm text-gray-600">
              Avg Price Difference: ₹{averageDifference.toLocaleString()}
            </span>
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
                  <Badge className={`text-xs flex items-center gap-1 ${getFeedbackColor(log.user_feedback)}`}>
                    {getFeedbackIcon(log.user_feedback)}
                    {log.user_feedback.replace('_', ' ')}
                  </Badge>
                  <div className="text-xs text-gray-500">
                    {new Date(log.created_at).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm mb-2">
                  {log.previous_price && (
                    <div>
                      <strong>Previous:</strong> ₹{log.previous_price.toLocaleString()}
                    </div>
                  )}
                  {log.ai_suggested_price && (
                    <div>
                      <strong>AI Suggested:</strong> ₹{log.ai_suggested_price.toLocaleString()}
                    </div>
                  )}
                </div>
                
                {log.notes && (
                  <div className="text-xs bg-blue-50 p-2 rounded">
                    <strong>Notes:</strong> {log.notes}
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
