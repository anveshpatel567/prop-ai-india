
import React, { useEffect, useState } from 'react';
import { useModeratorLogs } from '@/hooks/useModeratorLogs';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Search } from 'lucide-react';

export function ModeratorDecisionTrailPanel(): JSX.Element {
  const { user } = useAuth();
  const { actions, loading, fetchModeratorLogs, searchByTable } = useModeratorLogs();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredActions, setFilteredActions] = useState(actions);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchModeratorLogs();
    }
  }, [user?.role]);

  useEffect(() => {
    if (searchTerm) {
      setFilteredActions(searchByTable(searchTerm));
    } else {
      setFilteredActions(actions);
    }
  }, [searchTerm, actions]);

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
          <p>Loading moderator logs...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Moderator Decision Trail ({actions.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {actions.length === 0 ? (
          <p className="text-gray-500">No moderator actions recorded yet.</p>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search by target table..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>

            <div className="space-y-3">
              {filteredActions.slice(0, 20).map((action) => (
                <div
                  key={action.id}
                  className="p-4 border rounded-lg bg-gradient-to-br from-white to-gray-50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-700">{action.target_table}</span>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-600">{action.action_taken}</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(action.decided_at).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="text-sm">
                    <span className="font-medium text-gray-600">Decision: </span>
                    <span className="text-gray-700">{action.decision}</span>
                  </div>
                  
                  {action.notes && (
                    <div className="mt-2 text-sm">
                      <span className="font-medium text-gray-600">Notes: </span>
                      <span className="text-gray-700">{action.notes}</span>
                    </div>
                  )}
                  
                  <div className="mt-2 text-xs text-gray-500">
                    Target ID: {action.target_id}
                  </div>
                </div>
              ))}
            </div>

            {filteredActions.length > 20 && (
              <div className="text-center text-sm text-gray-500">
                Showing first 20 of {filteredActions.length} actions
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
