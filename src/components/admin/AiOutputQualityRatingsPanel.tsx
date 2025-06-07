
import React, { useEffect } from 'react';
import { useAiOutputQualityRatings } from '@/hooks/useAiOutputQualityRatings';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react';

export function AiOutputQualityRatingsPanel(): JSX.Element {
  const { user } = useAuth();
  const { qualityRatings, loading, fetchQualityRatings, getAverageRating } = useAiOutputQualityRatings();

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchQualityRatings();
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
          <p>Loading quality ratings...</p>
        </CardContent>
      </Card>
    );
  }

  const getRatingIcon = (rating: number) => {
    if (rating >= 4) return <ThumbsUp className="h-4 w-4 text-green-600" />;
    if (rating >= 3) return <Star className="h-4 w-4 text-yellow-600" />;
    return <ThumbsDown className="h-4 w-4 text-red-600" />;
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'bg-green-100 text-green-700';
    if (rating >= 3) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'fill-orange-400 text-orange-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const averageRating = getAverageRating();
  const highRatings = qualityRatings.filter(rating => rating.rating >= 4);
  const lowRatings = qualityRatings.filter(rating => rating.rating <= 2);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5" />
          AI Output Quality Ratings ({qualityRatings.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {qualityRatings.length === 0 ? (
          <p className="text-gray-500">No quality ratings submitted yet.</p>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <strong>Average Rating:</strong> {averageRating}/5
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <strong>High Ratings (4-5):</strong> {highRatings.length}
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <strong>Low Ratings (1-2):</strong> {lowRatings.length}
              </div>
            </div>
            {qualityRatings.map((rating) => (
              <div
                key={rating.id}
                className="p-4 border rounded-lg bg-gradient-to-br from-white to-gray-50"
              >
                <div className="flex items-center justify-between mb-3">
                  <Badge className={`text-xs flex items-center gap-1 ${getRatingColor(rating.rating)}`}>
                    {getRatingIcon(rating.rating)}
                    {rating.feature_name}
                  </Badge>
                  <div className="text-xs text-gray-500">
                    {new Date(rating.rated_at).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Rating:</span>
                    <div className="flex items-center gap-1">
                      {renderStars(rating.rating)}
                      <span className="font-bold text-orange-600 ml-2">{rating.rating}/5</span>
                    </div>
                  </div>
                  {rating.comments && (
                    <div className="bg-blue-50 p-3 rounded">
                      <strong>Comments:</strong>
                      <div className="mt-1 text-gray-700">{rating.comments}</div>
                    </div>
                  )}
                  <div className="text-xs text-gray-600">
                    User ID: {rating.user_id.substring(0, 8)}...
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
