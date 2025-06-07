
import React, { useEffect, useState } from 'react';
import { useAiInfluenceLogs } from '@/hooks/useAiInfluenceLogs';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, TrendingUp } from 'lucide-react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function AiInfluencePanel(): JSX.Element {
  const { user } = useAuth();
  const { logs, loading, fetchInfluenceLogs, getTopFactors } = useAiInfluenceLogs();
  const [viewMode, setViewMode] = useState<'table' | 'chart'>('table');

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchInfluenceLogs();
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
          <p>Loading influence logs...</p>
        </CardContent>
      </Card>
    );
  }

  const truncateSummary = (summary: string): string => {
    return summary.length > 150 ? summary.substring(0, 150) + '...' : summary;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          AI Output Influence Logs ({logs.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {logs.length === 0 ? (
          <p className="text-gray-500">No influence logs recorded yet.</p>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-700">Influence Analysis</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-1 rounded ${
                    viewMode === 'table' 
                      ? 'bg-gray-700 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } transition`}
                >
                  Table
                </button>
                <button
                  onClick={() => setViewMode('chart')}
                  className={`px-3 py-1 rounded ${
                    viewMode === 'chart' 
                      ? 'bg-gray-700 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } transition`}
                >
                  Chart
                </button>
              </div>
            </div>

            {viewMode === 'table' ? (
              <div className="space-y-4">
                {logs.slice(0, 10).map((log) => {
                  const topFactors = getTopFactors(log);
                  return (
                    <div
                      key={log.id}
                      className="p-4 border rounded-lg bg-gradient-to-br from-white to-gray-50"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-gray-700">{log.feature_name}</h4>
                        <div className="text-xs text-gray-500">
                          {new Date(log.recorded_at).toLocaleString()}
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-3">
                        <h5 className="text-sm font-medium text-gray-600">Top 3 Influencing Factors:</h5>
                        {topFactors.map((factor, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-slate-600 h-2 rounded-full" 
                                style={{ width: `${Math.min(factor.weight * 100, 100)}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-700 w-32 truncate">
                              {factor.factor}
                            </span>
                            <span className="text-xs text-gray-500 w-12">
                              {(factor.weight * 100).toFixed(1)}%
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="bg-slate-50 p-3 rounded">
                        <strong className="text-sm">Output Summary:</strong>
                        <div className="mt-1 text-gray-700 text-sm">
                          {truncateSummary(log.output_summary)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart 
                    data={logs.slice(0, 5).map(log => {
                      const topFactors = getTopFactors(log);
                      return {
                        feature: log.feature_name,
                        factor1: topFactors[0]?.weight || 0,
                        factor2: topFactors[1]?.weight || 0,
                        factor3: topFactors[2]?.weight || 0,
                      };
                    })}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="feature" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${(Number(value) * 100).toFixed(1)}%`, 'Weight']} />
                    <Bar dataKey="factor1" fill="#64748b" name="Top Factor" />
                    <Bar dataKey="factor2" fill="#94a3b8" name="2nd Factor" />
                    <Bar dataKey="factor3" fill="#cbd5e1" name="3rd Factor" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
