
import React, { useEffect, useState } from 'react';
import { useAiReviewQueue } from '@/hooks/useAiReviewQueue';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ClipboardList, Filter } from 'lucide-react';

export function AiFeatureReviewPanel(): JSX.Element {
  const { user } = useAuth();
  const { items, loading, fetchReviewQueue, updateReviewStatus } = useAiReviewQueue();
  const [severityFilter, setSeverityFilter] = useState('all');
  const [editingNotes, setEditingNotes] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchReviewQueue();
    }
  }, [user?.role]);

  useEffect(() => {
    fetchReviewQueue(severityFilter);
  }, [severityFilter]);

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
          <p>Loading feature review queue...</p>
        </CardContent>
      </Card>
    );
  }

  const getSeverityBadgeClass = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'bg-gray-100 text-gray-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'high':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleNotesChange = (id: string, notes: string) => {
    setEditingNotes(prev => ({ ...prev, [id]: notes }));
  };

  const handleReviewUpdate = async (id: string, reviewed: boolean) => {
    const notes = editingNotes[id] || '';
    await updateReviewStatus(id, reviewed, notes);
    setEditingNotes(prev => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardList className="h-5 w-5" />
          AI Feature Review Queue ({items.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-gray-500">No feature reviews in queue.</p>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <option value="all">All Severities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 p-2 text-left">Feature</th>
                    <th className="border border-gray-200 p-2 text-left">Issue</th>
                    <th className="border border-gray-200 p-2 text-left">Severity</th>
                    <th className="border border-gray-200 p-2 text-left">Date</th>
                    <th className="border border-gray-200 p-2 text-left">Reviewed</th>
                    <th className="border border-gray-200 p-2 text-left">Notes</th>
                    <th className="border border-gray-200 p-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="border border-gray-200 p-2 font-medium">
                        {item.feature_name}
                      </td>
                      <td className="border border-gray-200 p-2 text-sm">
                        {item.issue_description.length > 100 
                          ? `${item.issue_description.substring(0, 100)}...`
                          : item.issue_description}
                      </td>
                      <td className="border border-gray-200 p-2">
                        <Badge className={getSeverityBadgeClass(item.severity)}>
                          {item.severity}
                        </Badge>
                      </td>
                      <td className="border border-gray-200 p-2 text-sm text-gray-600">
                        {new Date(item.submitted_at).toLocaleDateString()}
                      </td>
                      <td className="border border-gray-200 p-2">
                        {item.reviewed ? '✅' : '❌'}
                      </td>
                      <td className="border border-gray-200 p-2">
                        <textarea
                          value={editingNotes[item.id] !== undefined ? editingNotes[item.id] : (item.review_notes || '')}
                          onChange={(e) => handleNotesChange(item.id, e.target.value)}
                          className="w-full p-1 text-sm border border-gray-300 rounded resize-none"
                          rows={2}
                          placeholder="Add review notes..."
                        />
                      </td>
                      <td className="border border-gray-200 p-2">
                        <button
                          onClick={() => handleReviewUpdate(item.id, !item.reviewed)}
                          className={`px-3 py-1 text-xs rounded ${
                            item.reviewed
                              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              : 'bg-gray-700 text-white hover:bg-gray-800'
                          } transition`}
                        >
                          {item.reviewed ? 'Mark Unreviewed' : 'Mark Reviewed'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
