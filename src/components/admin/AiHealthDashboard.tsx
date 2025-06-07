
import React, { useEffect } from 'react';
import { useAiHealth } from '@/hooks/useAiHealth';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Users, Zap, AlertTriangle } from 'lucide-react';

export function AiHealthDashboard(): JSX.Element {
  const { user } = useAuth();
  const { snapshots, summary, loading, fetchHealthData } = useAiHealth();

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchHealthData();
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
          <p>Loading AI health data...</p>
        </CardContent>
      </Card>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-700';
      case 'warning':
        return 'bg-yellow-100 text-yellow-700';
      case 'critical':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <Activity className="h-4 w-4" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      case 'critical':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          AI Health Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {summary.length === 0 ? (
            <p className="text-gray-500">No health data available.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {summary.map((model) => (
                  <div key={model.model_name} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="font-medium text-gray-700">{model.model_name}</h5>
                      <Badge className={getStatusColor(model.status)}>
                        {getStatusIcon(model.status)}
                        {model.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          Latency: {model.latest_latency}ms
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          Active Users: {model.latest_users}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          Error Rate: {(model.latest_error_rate * 100).toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {snapshots.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-700">Recent Health Snapshots</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-200 p-2 text-left">Model</th>
                          <th className="border border-gray-200 p-2 text-left">Latency (ms)</th>
                          <th className="border border-gray-200 p-2 text-left">Users</th>
                          <th className="border border-gray-200 p-2 text-left">Error Rate</th>
                          <th className="border border-gray-200 p-2 text-left">Captured At</th>
                        </tr>
                      </thead>
                      <tbody>
                        {snapshots.slice(0, 10).map((snapshot) => (
                          <tr key={snapshot.id} className="hover:bg-gray-50">
                            <td className="border border-gray-200 p-2">
                              <Badge className="bg-gray-100 text-gray-700">
                                {snapshot.model_name}
                              </Badge>
                            </td>
                            <td className="border border-gray-200 p-2 text-sm">
                              {snapshot.avg_latency_ms || 'N/A'}
                            </td>
                            <td className="border border-gray-200 p-2 text-sm">
                              {snapshot.active_users || 0}
                            </td>
                            <td className="border border-gray-200 p-2 text-sm">
                              {snapshot.error_rate ? `${(Number(snapshot.error_rate) * 100).toFixed(2)}%` : 'N/A'}
                            </td>
                            <td className="border border-gray-200 p-2 text-sm">
                              {new Date(snapshot.captured_at).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
