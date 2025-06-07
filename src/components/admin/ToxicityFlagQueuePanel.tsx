
import React, { useEffect, useState } from 'react';
import { useToxicityFlags } from '@/hooks/useToxicityFlags';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Flag, CheckCircle, Filter } from 'lucide-react';

export function ToxicityFlagQueuePanel(): JSX.Element {
  const { user } = useAuth();
  const { flags, loading, fetchToxicityFlags, updateFlag } = useToxicityFlags();
  const [reviewFilter, setReviewFilter] = useState('pending');
  const [reviewingId, setReviewingId] = useState<string | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchToxicityFlags(reviewFilter === 'pending' ? false : undefined);
    }
  }, [user?.role, reviewFilter]);

  const handleReview = async (flagId: string, severity: 'low' | 'medium' | 'high') => {
    await updateFlag(flagId, {
      reviewed: true,
      severity,
      reviewer_notes: reviewNotes
    });
    setReviewingId(null);
    setReviewNotes('');
  };

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
          <p>Loading toxicity flags...</p>
        </CardContent>
      </Card>
    );
  }

  const pendingCount = flags.filter(flag => !flag.reviewed).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flag className="h-5 w-5" />
          Toxicity Flag Queue ({flags.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  value={reviewFilter}
                  onChange={(e) => setReviewFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <option value="pending">Pending Review</option>
                  <option value="all">All Flags</option>
                  <option value="reviewed">Reviewed</option>
                </select>
              </div>
            </div>
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
              Pending: {pendingCount}
            </Badge>
          </div>

          {flags.length === 0 ? (
            <p className="text-gray-500">No toxicity flags found.</p>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {flags.map((flag) => (
                <div key={flag.id} className="border border-gray-200 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {flag.reviewed ? (
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-700 flex items-center gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Reviewed
                          </Badge>
                          {flag.severity && (
                            <Badge 
                              className={
                                flag.severity === 'high' ? 'bg-red-100 text-red-700' :
                                flag.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-blue-100 text-blue-700'
                              }
                            >
                              {flag.severity}
                            </Badge>
                          )}
                        </div>
                      ) : (
                        <Badge className="bg-yellow-100 text-yellow-700">
                          Pending Review
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(flag.flagged_at).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Content:</h4>
                      <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                        {flag.content_snippet}
                      </p>
                    </div>
                    
                    {flag.reviewer_notes && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Review Notes:</h4>
                        <p className="text-sm text-gray-600">{flag.reviewer_notes}</p>
                      </div>
                    )}

                    {!flag.reviewed && (
                      <div className="space-y-2">
                        {reviewingId === flag.id ? (
                          <div className="space-y-2">
                            <Textarea
                              placeholder="Add review notes..."
                              value={reviewNotes}
                              onChange={(e) => setReviewNotes(e.target.value)}
                              rows={2}
                            />
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleReview(flag.id, 'low')}
                                className="bg-blue-100 text-blue-700 hover:bg-blue-200"
                              >
                                Low Severity
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleReview(flag.id, 'medium')}
                                className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                              >
                                Medium Severity
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleReview(flag.id, 'high')}
                                className="bg-red-100 text-red-700 hover:bg-red-200"
                              >
                                High Severity
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setReviewingId(null)}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => setReviewingId(flag.id)}
                            className="bg-gray-100 text-gray-700 hover:bg-gray-200"
                          >
                            Review Flag
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
