
import React, { useEffect } from 'react';
import { useAiCorrections } from '@/hooks/useAiCorrections';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserCheck, Check, X } from 'lucide-react';

export function UserCorrectionReviewPanel(): JSX.Element {
  const { user } = useAuth();
  const { corrections, loading, fetchCorrections, moderateCorrection } = useAiCorrections();

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchCorrections();
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
          <p>Loading user corrections...</p>
        </CardContent>
      </Card>
    );
  }

  const getStatusDisplay = (reviewed: boolean, approved: boolean | null) => {
    if (!reviewed) return { text: 'Pending', class: 'text-gray-500' };
    if (approved === true) return { text: 'Approved', class: 'text-green-600' };
    if (approved === false) return { text: 'Rejected', class: 'text-red-600' };
    return { text: 'Reviewed', class: 'text-gray-600' };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserCheck className="h-5 w-5" />
          User Correction Review ({corrections.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {corrections.length === 0 ? (
          <p className="text-gray-500">No user corrections to review.</p>
        ) : (
          <div className="space-y-4">
            {corrections.map((correction) => {
              const status = getStatusDisplay(correction.reviewed, correction.approved);
              return (
                <div
                  key={correction.id}
                  className="p-4 border rounded-lg bg-gradient-to-br from-white to-gray-50"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-gray-700">{correction.feature}</h4>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${status.class}`}>
                        {status.text}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(correction.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded mb-3">
                    <strong className="text-sm">Suggested Text:</strong>
                    <div className="mt-1 text-gray-700 text-sm">
                      {correction.suggested_text}
                    </div>
                  </div>

                  {!correction.reviewed && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => moderateCorrection(correction.id, true)}
                        className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition"
                      >
                        <Check className="h-4 w-4" />
                        Approve
                      </button>
                      <button
                        onClick={() => moderateCorrection(correction.id, false)}
                        className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                      >
                        <X className="h-4 w-4" />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
