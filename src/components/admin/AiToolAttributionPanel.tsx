
import React, { useEffect, useState } from 'react';
import { useAiToolAttribution } from '@/hooks/useAiToolAttribution';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Filter, Settings } from 'lucide-react';

export function AiToolAttributionPanel(): JSX.Element {
  const { user } = useAuth();
  const { logs, loading, fetchAttributionLogs } = useAiToolAttribution();
  const [featureFilter, setFeatureFilter] = useState('all');
  const [toolFilter, setToolFilter] = useState('all');

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchAttributionLogs();
    }
  }, [user?.role]);

  useEffect(() => {
    fetchAttributionLogs(featureFilter, toolFilter);
  }, [featureFilter, toolFilter]);

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
          <p>Loading attribution logs...</p>
        </CardContent>
      </Card>
    );
  }

  const uniqueFeatures = Array.from(new Set(logs.map(log => log.feature_area)));
  const uniqueTools = Array.from(new Set(logs.map(log => log.tool_name)));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          AI Tool Attribution Logs ({logs.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4 flex-wrap">
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
            
            <select
              value={toolFilter}
              onChange={(e) => setToolFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <option value="all">All Tools</option>
              {uniqueTools.map((tool) => (
                <option key={tool} value={tool}>{tool}</option>
              ))}
            </select>
          </div>

          {logs.length === 0 ? (
            <p className="text-gray-500">No attribution logs found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 p-2 text-left">Tool</th>
                    <th className="border border-gray-200 p-2 text-left">Feature Area</th>
                    <th className="border border-gray-200 p-2 text-left">Context</th>
                    <th className="border border-gray-200 p-2 text-left">Invoked At</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="border border-gray-200 p-2">
                        <Badge className="bg-gray-100 text-gray-700">
                          {log.tool_name}
                        </Badge>
                      </td>
                      <td className="border border-gray-200 p-2 font-medium">
                        {log.feature_area}
                      </td>
                      <td className="border border-gray-200 p-2 text-sm">
                        {log.context_info || 'No context provided'}
                      </td>
                      <td className="border border-gray-200 p-2 text-sm">
                        {new Date(log.invoked_at).toLocaleString()}
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
