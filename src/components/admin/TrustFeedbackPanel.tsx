
import React, { useEffect, useState } from 'react';
import { useTrustFeedback } from '@/hooks/useTrustFeedback';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Filter, Star } from 'lucide-react';

export function TrustFeedbackPanel(): JSX.Element {
  const { user } = useAuth();
  const { feedback, stats, loading, fetchTrustFeedback } = useTrustFeedback();
  const [featureFilter, setFeatureFilter] = useState('all');

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchTrustFeedback();
    }
  }, [user?.role]);

  useEffect(() => {
    fetchTrustFeedback(featureFilter);
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
          <p>Loading trust feedback...</p>
        </CardContent>
      </Card>
    );
  }

  const uniqueFeatures = Array.from(new Set(feedback.map(item => item.feature_name)));

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5" />
          Trust Signal Feedback ({feedback.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
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
          </div>

          {stats.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium text-gray-700">Feature Trust Ratings</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <div key={stat.feature_name} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-gray-100 text-gray-700">
                        {stat.feature_name}
                      </Badge>
                      <div className="flex items-center gap-1">
                        {renderStars(Math.round(stat.avg_rating))}
                        <span className="text-sm text-gray-600 ml-1">
                          {stat.avg_rating}/5
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {stat.total_feedback} feedback entries
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {feedback.length === 0 ? (
            <p className="text-gray-500">No trust feedback found.</p>
          ) : (
            <div className="space-y-3">
              <h4 className="font-medium text-gray-700">Recent Feedback</h4>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {feedback.slice(0, 20).map((item) => (
                  <div key={item.id} className="border border-gray-200 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-gray-100 text-gray-700">
                        {item.feature_name}
                      </Badge>
                      <div className="flex items-center gap-1">
                        {renderStars(item.trust_rating)}
                      </div>
                    </div>
                    {item.comment && (
                      <p className="text-sm text-gray-600 mb-2">{item.comment}</p>
                    )}
                    <div className="text-xs text-gray-500">
                      {new Date(item.submitted_at).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
