
import React, { useEffect, useState } from 'react';
import { useHallucinationReports } from '@/hooks/useHallucinationReports';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

export function HallucinationReviewPanel(): JSX.Element {
  const { user } = useAuth();
  const { 
    reports, 
    loading, 
    fetchReports, 
    updateReview, 
    getUnreviewedReports, 
    getReviewedReports 
  } = useHallucinationReports();
  const [filter, setFilter] = useState<'all' | 'reviewed' | 'unreviewed'>('all');
  const [reviewNotes, setReviewNotes] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchReports();
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
          <p>Loading hallucination reports...</p>
        </CardContent>
      </Card>
    );
  }

  const unreviewedReports = getUnreviewedReports();
  const reviewedReports = getReviewedReports();

  const filteredReports = filter === 'reviewed' 
    ? reviewedReports 
    : filter === 'unreviewed' 
    ? unreviewedReports 
    : reports;

  const handleReview = async (reportId: string, reviewed: boolean) => {
    const notes = reviewNotes[reportId] || '';
    await updateReview(reportId, reviewed, notes);
    setReviewNotes(prev => ({ ...prev, [reportId]: '' }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Hallucination Reports ({reports.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {reports.length === 0 ? (
          <p className="text-gray-500">No hallucination reports submitted yet.</p>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <strong>Total Reports:</strong> {reports.length}
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <strong>Unreviewed:</strong> {unreviewedReports.length}
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <strong>Reviewed:</strong> {reviewedReports.length}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded ${
                  filter === 'all' 
                    ? 'bg-gray-700 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } transition`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('unreviewed')}
                className={`px-3 py-1 rounded ${
                  filter === 'unreviewed' 
                    ? 'bg-gray-700 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } transition`}
              >
                Unreviewed ❌
              </button>
              <button
                onClick={() => setFilter('reviewed')}
                className={`px-3 py-1 rounded ${
                  filter === 'reviewed' 
                    ? 'bg-gray-700 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } transition`}
              >
                Reviewed ✅
              </button>
            </div>

            {filteredReports.map((report) => (
              <div
                key={report.id}
                className="p-4 border rounded-lg bg-gradient-to-br from-white to-gray-50"
              >
                <div className="flex items-center justify-between mb-3">
                  <Badge 
                    className={`text-xs flex items-center gap-1 ${
                      report.reviewed 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {report.reviewed ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <XCircle className="h-4 w-4" />
                    )}
                    {report.reviewed ? 'Reviewed' : 'Unreviewed'}
                  </Badge>
                  <div className="text-xs text-gray-500">
                    {new Date(report.reported_at).toLocaleString()}
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Feature:</span>
                    <span className="font-bold text-gray-700">{report.feature}</span>
                  </div>
                  <div className="bg-red-50 p-3 rounded">
                    <strong>Report:</strong>
                    <div className="mt-1 text-gray-700">{report.report_text}</div>
                  </div>
                  {report.review_notes && (
                    <div className="bg-green-50 p-3 rounded">
                      <strong>Review Notes:</strong>
                      <div className="mt-1 text-gray-700">{report.review_notes}</div>
                    </div>
                  )}
                  <div className="text-xs text-gray-600">
                    User ID: {report.user_id.substring(0, 8)}...
                  </div>
                </div>

                {!report.reviewed && (
                  <div className="mt-4 space-y-2">
                    <textarea
                      placeholder="Add review notes (optional)..."
                      value={reviewNotes[report.id] || ''}
                      onChange={(e) => setReviewNotes(prev => ({ 
                        ...prev, 
                        [report.id]: e.target.value 
                      }))}
                      className="w-full p-2 border rounded text-sm"
                      rows={2}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleReview(report.id, true)}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition text-sm"
                      >
                        Mark as Reviewed
                      </button>
                    </div>
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
