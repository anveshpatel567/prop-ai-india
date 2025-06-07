
import React, { useEffect, useState } from 'react';
import { useLatencyIncidents } from '@/hooks/useLatencyIncidents';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function LatencyIncidentPanel(): JSX.Element {
  const { user } = useAuth();
  const { incidents, loading, fetchIncidents, getSlowIncidents, getTopSlowFeatures } = useLatencyIncidents();
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchIncidents();
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
          <p>Loading latency incidents...</p>
        </CardContent>
      </Card>
    );
  }

  const slowIncidents = getSlowIncidents();
  const topSlowFeatures = getTopSlowFeatures();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          AI Latency Incidents ({incidents.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {incidents.length === 0 ? (
          <p className="text-gray-500">No latency incidents recorded yet.</p>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <strong>Total Incidents:</strong> {incidents.length}
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <strong>Slow Responses (&gt;5s):</strong> {slowIncidents.length}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-700">Top Slow Features</h3>
              <button
                onClick={() => setShowChart(!showChart)}
                className="px-3 py-1 bg-slate-100 text-slate-700 rounded hover:bg-slate-200 transition"
              >
                {showChart ? 'Hide Chart' : 'Show Chart'}
              </button>
            </div>

            {showChart && topSlowFeatures.length > 0 && (
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topSlowFeatures}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="feature" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}ms`, 'Avg Duration']} />
                    <Bar dataKey="avgDuration" fill="#64748b" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {incidents.slice(0, 10).map((incident) => (
              <div
                key={incident.id}
                className="p-4 border rounded-lg bg-gradient-to-br from-white to-gray-50"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge 
                      className={`text-xs flex items-center gap-1 ${
                        incident.duration_ms > 5000 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      <TrendingUp className="h-4 w-4" />
                      {incident.duration_ms}ms
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(incident.triggered_at).toLocaleString()}
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Feature:</span>
                    <span className="font-bold text-gray-700">{incident.feature_name}</span>
                  </div>
                  <div className="text-xs text-gray-600">
                    User ID: {incident.user_id.substring(0, 8)}...
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
