
import React, { useEffect, useState } from 'react';
import { useModelVersionLogs } from '@/hooks/useModelVersionLogs';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GitBranch, Search } from 'lucide-react';

export function ModelVersionTrackerPanel(): JSX.Element {
  const { user } = useAuth();
  const { logs, loading, fetchModelVersionLogs, getGroupedByFeature, searchByFeature } = useModelVersionLogs();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLogs, setFilteredLogs] = useState(logs);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchModelVersionLogs();
    }
  }, [user?.role]);

  useEffect(() => {
    if (searchTerm) {
      setFilteredLogs(searchByFeature(searchTerm));
    } else {
      setFilteredLogs(logs);
    }
  }, [searchTerm, logs]);

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
          <p>Loading model version logs...</p>
        </CardContent>
      </Card>
    );
  }

  const groupedFeatures = getGroupedByFeature();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GitBranch className="h-5 w-5" />
          Model Version Tracker ({logs.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {logs.length === 0 ? (
          <p className="text-gray-500">No model version logs recorded yet.</p>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search by feature name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {groupedFeatures.map((group) => (
                <div key={group.feature_area} className="p-4 border rounded-lg bg-gradient-to-br from-white to-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-gray-700">{group.feature_area}</h4>
                    <Badge className="bg-blue-100 text-blue-700">
                      Current: v{group.currentVersion}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    {group.logs.slice(0, 3).map((log) => (
                      <div key={log.id} className="flex items-center justify-between text-sm">
                        <div>
                          <span className="font-medium">{log.model_name}</span>
                          <span className="text-gray-500 ml-2">v{log.version}</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(log.timestamp).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                    {group.logs.length > 3 && (
                      <div className="text-xs text-gray-500">
                        +{group.logs.length - 3} more versions
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="overflow-x-auto">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">All Version Logs</h3>
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 p-2 text-left">Feature</th>
                    <th className="border border-gray-200 p-2 text-left">Model</th>
                    <th className="border border-gray-200 p-2 text-left">Version</th>
                    <th className="border border-gray-200 p-2 text-left">Time</th>
                    <th className="border border-gray-200 p-2 text-left">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.slice(0, 20).map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="border border-gray-200 p-2 font-medium">
                        {log.feature_area}
                      </td>
                      <td className="border border-gray-200 p-2">
                        {log.model_name}
                      </td>
                      <td className="border border-gray-200 p-2">
                        <Badge className="bg-blue-100 text-blue-700">
                          v{log.version}
                        </Badge>
                      </td>
                      <td className="border border-gray-200 p-2 text-sm text-gray-600">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="border border-gray-200 p-2 text-sm text-gray-600">
                        {log.notes || '-'}
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
