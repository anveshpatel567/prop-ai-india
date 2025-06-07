
import React, { useEffect, useState } from 'react';
import { useAiFeatureHeatmap } from '@/hooks/useAiFeatureHeatmap';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Filter, Activity } from 'lucide-react';

export function AiFeatureHeatmapPanel(): JSX.Element {
  const { user } = useAuth();
  const { heatmapData, loading, fetchHeatmapData } = useAiFeatureHeatmap();
  const [roleFilter, setRoleFilter] = useState('all');

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchHeatmapData();
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
          <p>Loading feature usage heatmap...</p>
        </CardContent>
      </Card>
    );
  }

  const filteredData = heatmapData.filter(entry => {
    if (roleFilter === 'all') return true;
    return entry.user_role === roleFilter;
  });

  const features = Array.from(new Set(filteredData.map(entry => entry.feature)));
  const roles = Array.from(new Set(heatmapData.map(entry => entry.user_role)));
  const totalUsage = filteredData.reduce((sum, entry) => sum + entry.usage_count, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          AI Feature Usage Heatmap ({filteredData.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <option value="all">All Roles</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                Features: {features.length}
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                Total Usage: {totalUsage}
              </Badge>
            </div>
          </div>

          {filteredData.length === 0 ? (
            <p className="text-gray-500">No usage data found.</p>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {features.map((feature) => {
                const featureData = filteredData.filter(entry => entry.feature === feature);
                const featureTotal = featureData.reduce((sum, entry) => sum + entry.usage_count, 0);
                
                return (
                  <div key={feature} className="border border-gray-200 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">{feature}</h4>
                      <Badge className="bg-gray-100 text-gray-700">
                        Total: {featureTotal}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-6 gap-2">
                      {Array.from({ length: 24 }, (_, hour) => {
                        const hourData = featureData.find(entry => entry.hour_segment === hour);
                        const usage = hourData?.usage_count || 0;
                        const intensity = usage > 0 ? Math.min(usage / 10, 1) : 0;
                        
                        return (
                          <div
                            key={hour}
                            className="h-8 rounded border border-gray-200 flex items-center justify-center text-xs"
                            style={{
                              backgroundColor: `rgba(59, 130, 246, ${intensity})`,
                              color: intensity > 0.5 ? 'white' : 'black'
                            }}
                            title={`${hour}:00 - Usage: ${usage}`}
                          >
                            {hour}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
