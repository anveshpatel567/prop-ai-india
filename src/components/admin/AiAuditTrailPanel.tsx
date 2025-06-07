
import React, { useEffect, useState } from 'react';
import { useAiAuditTrail } from '@/hooks/useAiAuditTrail';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Filter, History, ArrowRight } from 'lucide-react';

export function AiAuditTrailPanel(): JSX.Element {
  const { user } = useAuth();
  const { auditTrail, loading, fetchAuditTrail } = useAiAuditTrail();
  const [toolFilter, setToolFilter] = useState('all');

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchAuditTrail(toolFilter);
    }
  }, [user?.role, toolFilter]);

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
          <p>Loading admin audit trail...</p>
        </CardContent>
      </Card>
    );
  }

  const tools = Array.from(new Set(auditTrail.map(entry => entry.tool_name)));
  const changeTypes = Array.from(new Set(auditTrail.map(entry => entry.change_type)));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          AI Admin Audit Trail ({auditTrail.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  value={toolFilter}
                  onChange={(e) => setToolFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <option value="all">All Tools</option>
                  {tools.map((tool) => (
                    <option key={tool} value={tool}>{tool}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                Tools: {tools.length}
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                Change Types: {changeTypes.length}
              </Badge>
            </div>
          </div>

          {auditTrail.length === 0 ? (
            <p className="text-gray-500">No audit trail entries found.</p>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {auditTrail.map((entry) => (
                <div key={entry.id} className="border border-gray-200 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-purple-100 text-purple-700">
                        {entry.tool_name}
                      </Badge>
                      <Badge className="bg-gray-100 text-gray-700">
                        {entry.change_type}
                      </Badge>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(entry.changed_at).toLocaleString()}
                    </span>
                  </div>
                  
                  {(entry.previous_value || entry.new_value) && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium text-gray-700">Value Change:</span>
                      </div>
                      <div className="flex items-center gap-2 bg-gray-50 p-3 rounded">
                        <div className="flex-1">
                          <div className="text-xs text-gray-500 mb-1">Previous:</div>
                          <div className="text-sm font-mono bg-red-50 p-2 rounded">
                            {entry.previous_value || 'null'}
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                        <div className="flex-1">
                          <div className="text-xs text-gray-500 mb-1">New:</div>
                          <div className="text-sm font-mono bg-green-50 p-2 rounded">
                            {entry.new_value || 'null'}
                          </div>
                        </div>
                      </div>
                    </div>
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
