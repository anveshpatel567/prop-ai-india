
import React, { useEffect, useState } from 'react';
import { useManualReviewFlags } from '@/hooks/useManualReviewFlags';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Flag, Filter } from 'lucide-react';

export function ManualReviewFlagPanel(): JSX.Element {
  const { user } = useAuth();
  const { flags, loading, fetchManualReviewFlags, flagForManualReview } = useManualReviewFlags();
  const [tableFilter, setTableFilter] = useState('');
  const [newFlag, setNewFlag] = useState({
    source_table: '',
    source_id: '',
    reason: ''
  });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchManualReviewFlags();
    }
  }, [user?.role]);

  const handleAddFlag = async () => {
    if (!newFlag.source_table || !newFlag.source_id || !newFlag.reason) return;
    
    await flagForManualReview(newFlag.source_table, newFlag.source_id, newFlag.reason);
    setNewFlag({ source_table: '', source_id: '', reason: '' });
    setShowAddForm(false);
  };

  const filteredFlags = tableFilter 
    ? flags.filter(flag => flag.source_table.toLowerCase().includes(tableFilter.toLowerCase()))
    : flags;

  // Group flags by source table
  const groupedFlags = filteredFlags.reduce((acc, flag) => {
    if (!acc[flag.source_table]) {
      acc[flag.source_table] = [];
    }
    acc[flag.source_table].push(flag);
    return acc;
  }, {} as Record<string, typeof flags>);

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
          <p>Loading manual review flags...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flag className="h-5 w-5" />
          Manual Review Flags ({flags.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Filter by table..."
                  value={tableFilter}
                  onChange={(e) => setTableFilter(e.target.value)}
                  className="w-48"
                />
              </div>
            </div>
            <Button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-blue-100 text-blue-700 hover:bg-blue-200"
            >
              {showAddForm ? 'Cancel' : 'Add Flag'}
            </Button>
          </div>

          {showAddForm && (
            <div className="border border-gray-200 p-4 rounded-lg bg-gray-50">
              <h3 className="font-medium mb-3">Add Manual Review Flag</h3>
              <div className="space-y-3">
                <Input
                  placeholder="Source table (e.g., ai_tool_transactions)"
                  value={newFlag.source_table}
                  onChange={(e) => setNewFlag({ ...newFlag, source_table: e.target.value })}
                />
                <Input
                  placeholder="Source ID (UUID)"
                  value={newFlag.source_id}
                  onChange={(e) => setNewFlag({ ...newFlag, source_id: e.target.value })}
                />
                <Textarea
                  placeholder="Reason for manual review..."
                  value={newFlag.reason}
                  onChange={(e) => setNewFlag({ ...newFlag, reason: e.target.value })}
                  rows={2}
                />
                <Button
                  onClick={handleAddFlag}
                  disabled={!newFlag.source_table || !newFlag.source_id || !newFlag.reason}
                  className="bg-blue-100 text-blue-700 hover:bg-blue-200"
                >
                  Add Flag
                </Button>
              </div>
            </div>
          )}

          {Object.keys(groupedFlags).length === 0 ? (
            <p className="text-gray-500">No manual review flags found.</p>
          ) : (
            Object.entries(groupedFlags).map(([table, tableFlags]) => (
              <div key={table} className="space-y-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-gray-900">{table}</h3>
                  <Badge variant="outline">{tableFlags.length} flags</Badge>
                </div>
                
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {tableFlags.map((flag) => (
                    <div key={flag.id} className="border border-gray-200 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-orange-100 text-orange-700">
                          Needs Review
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {new Date(flag.flagged_at).toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium text-gray-700">ID:</span>
                          <span className="text-sm text-gray-600 ml-2 font-mono">
                            {flag.source_id}
                          </span>
                        </div>
                        
                        <div>
                          <span className="text-sm font-medium text-gray-700">Reason:</span>
                          <p className="text-sm text-gray-600 mt-1">
                            {flag.reason}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
