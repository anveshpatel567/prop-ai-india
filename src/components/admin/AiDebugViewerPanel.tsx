
import React, { useEffect, useState } from 'react';
import { useAiDebugLogs } from '@/hooks/useAiDebugLogs';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Filter, Code, Eye } from 'lucide-react';

export function AiDebugViewerPanel(): JSX.Element {
  const { user } = useAuth();
  const { logs, loading, fetchDebugLogs } = useAiDebugLogs();
  const [featureFilter, setFeatureFilter] = useState('all');

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchDebugLogs();
    }
  }, [user?.role]);

  useEffect(() => {
    fetchDebugLogs(featureFilter);
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
          <p>Loading debug logs...</p>
        </CardContent>
      </Card>
    );
  }

  const uniqueFeatures = Array.from(new Set(logs.map(log => log.feature_name)));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="h-5 w-5" />
          AI Debug Viewer ({logs.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
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

          {logs.length === 0 ? (
            <p className="text-gray-500">No debug logs found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 p-2 text-left">Feature</th>
                    <th className="border border-gray-200 p-2 text-left">Debug Notes</th>
                    <th className="border border-gray-200 p-2 text-left">Payload</th>
                    <th className="border border-gray-200 p-2 text-left">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="border border-gray-200 p-2">
                        <Badge className="bg-gray-100 text-gray-700">
                          {log.feature_name}
                        </Badge>
                      </td>
                      <td className="border border-gray-200 p-2 text-sm">
                        {log.debug_notes || 'No notes'}
                      </td>
                      <td className="border border-gray-200 p-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <button className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200">
                              <Eye className="h-3 w-3" />
                              View
                            </button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
                            <DialogHeader>
                              <DialogTitle>Debug Payload - {log.feature_name}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-medium text-gray-700 mb-2">Request:</h4>
                                <pre className="bg-gray-50 p-3 rounded text-xs overflow-auto">
                                  {JSON.stringify(log.request_payload, null, 2)}
                                </pre>
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-700 mb-2">Response:</h4>
                                <pre className="bg-gray-50 p-3 rounded text-xs overflow-auto">
                                  {JSON.stringify(log.response_payload, null, 2)}
                                </pre>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </td>
                      <td className="border border-gray-200 p-2 text-sm">
                        {new Date(log.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
