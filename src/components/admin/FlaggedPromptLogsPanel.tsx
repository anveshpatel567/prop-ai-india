
import React, { useEffect, useState } from 'react';
import { useFlaggedPrompts } from '@/hooks/useFlaggedPrompts';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Filter } from 'lucide-react';

export function FlaggedPromptLogsPanel(): JSX.Element {
  const { user } = useAuth();
  const { flaggedPrompts, loading, fetchFlaggedPrompts } = useFlaggedPrompts();
  const [severityFilter, setSeverityFilter] = useState('all');

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchFlaggedPrompts(severityFilter);
    }
  }, [user?.role, severityFilter]);

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
          <p>Loading flagged prompt logs...</p>
        </CardContent>
      </Card>
    );
  }

  const severityLevels = ['low', 'moderate', 'high'];
  const severityCounts = severityLevels.reduce((acc, level) => {
    acc[level] = flaggedPrompts.filter(p => p.severity === level).length;
    return acc;
  }, {} as Record<string, number>);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'moderate': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Flagged Prompt Logs ({flaggedPrompts.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  value={severityFilter}
                  onChange={(e) => setSeverityFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <option value="all">All Severities</option>
                  <option value="high">High</option>
                  <option value="moderate">Moderate</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-red-50 text-red-700">
                High: {severityCounts.high}
              </Badge>
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                Moderate: {severityCounts.moderate}
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                Low: {severityCounts.low}
              </Badge>
            </div>
          </div>

          {flaggedPrompts.length === 0 ? (
            <p className="text-gray-500">No flagged prompts found.</p>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {flaggedPrompts.map((prompt) => (
                <div key={prompt.id} className="border border-gray-200 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={getSeverityColor(prompt.severity)}>
                      {prompt.severity.toUpperCase()}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {new Date(prompt.flagged_at).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Flagged Prompt:</h4>
                    <p className="text-sm text-gray-600 bg-red-50 p-2 rounded font-mono">
                      {prompt.prompt}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Reason:</h4>
                    <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                      {prompt.reason}
                    </p>
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
