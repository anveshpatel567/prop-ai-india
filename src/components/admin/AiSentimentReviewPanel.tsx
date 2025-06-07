
import React, { useEffect, useState } from 'react';
import { useAiSentimentLogs } from '@/hooks/useAiSentimentLogs';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Filter, Heart, Meh, Frown } from 'lucide-react';

export function AiSentimentReviewPanel(): JSX.Element {
  const { user } = useAuth();
  const { logs, breakdown, loading, fetchSentimentLogs } = useAiSentimentLogs();
  const [featureFilter, setFeatureFilter] = useState('all');

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchSentimentLogs();
    }
  }, [user?.role]);

  useEffect(() => {
    fetchSentimentLogs(featureFilter);
  }, [featureFilter]);

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
          <p>Loading sentiment logs...</p>
        </CardContent>
      </Card>
    );
  }

  const uniqueFeatures = Array.from(new Set(logs.map(log => log.feature)));
  
  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <Heart className="h-4 w-4 text-green-600" />;
      case 'neutral':
        return <Meh className="h-4 w-4 text-gray-500" />;
      case 'negative':
        return <Frown className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getSentimentBadgeClass = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-100 text-green-700';
      case 'neutral':
        return 'bg-gray-100 text-gray-700';
      case 'negative':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPercentage = (count: number) => {
    return breakdown.total > 0 ? Math.round((count / breakdown.total) * 100) : 0;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5" />
          AI Sentiment Review ({logs.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Filter className="h-4 w-4 text-gray-500" />
            <select
              value={featureFilter}
              onChange={(e) => setFeatureFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <option value="all">All Features</option>
              {uniqueFeatures.map((feature) => (
                <option key={feature} value={feature}>{feature}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Heart className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-700">Positive</span>
              </div>
              <div className="text-2xl font-bold text-green-600">{getPercentage(breakdown.positive)}%</div>
              <div className="text-sm text-green-600">({breakdown.positive} feedback)</div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Meh className="h-5 w-5 text-gray-500" />
                <span className="font-medium text-gray-700">Neutral</span>
              </div>
              <div className="text-2xl font-bold text-gray-600">{getPercentage(breakdown.neutral)}%</div>
              <div className="text-sm text-gray-600">({breakdown.neutral} feedback)</div>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Frown className="h-5 w-5 text-red-600" />
                <span className="font-medium text-red-700">Negative</span>
              </div>
              <div className="text-2xl font-bold text-red-600">{getPercentage(breakdown.negative)}%</div>
              <div className="text-sm text-red-600">({breakdown.negative} feedback)</div>
            </div>
          </div>

          {logs.length === 0 ? (
            <p className="text-gray-500">No sentiment feedback found.</p>
          ) : (
            <div className="space-y-3">
              <h4 className="font-medium text-gray-700">Recent Feedback</h4>
              {logs.slice(0, 10).map((log) => (
                <div
                  key={log.id}
                  className="p-4 border rounded-lg bg-gradient-to-br from-white to-gray-50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge className={getSentimentBadgeClass(log.sentiment)}>
                        <div className="flex items-center gap-1">
                          {getSentimentIcon(log.sentiment)}
                          {log.sentiment}
                        </div>
                      </Badge>
                      <span className="font-medium text-gray-700">{log.feature}</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(log.submitted_at).toLocaleDateString()}
                    </span>
                  </div>
                  
                  {log.feedback && (
                    <p className="text-sm text-gray-600 mt-2">"{log.feedback}"</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
