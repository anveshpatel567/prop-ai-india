
import React, { useEffect } from 'react';
import { useAiMarketPressureLogs } from '@/hooks/useAiMarketPressureLogs';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, AlertTriangle, Activity } from 'lucide-react';

export default function AiMarketPressurePanel() {
  const { user } = useAuth();
  const { pressureLogs, loading, fetchMarketPressureLogs, getAverageImbalanceRatio } = useAiMarketPressureLogs();

  useEffect(() => {
    fetchMarketPressureLogs();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <p>Loading market pressure data...</p>
        </CardContent>
      </Card>
    );
  }

  const averageImbalance = getAverageImbalanceRatio();

  const getPressureIcon = (level: string) => {
    switch (level) {
      case 'high_demand': return <TrendingUp className="h-4 w-4" />;
      case 'oversupply': return <AlertTriangle className="h-4 w-4" />;
      case 'balanced': return <Activity className="h-4 w-4" />;
      default: return <BarChart3 className="h-4 w-4" />;
    }
  };

  const getPressureColor = (level: string) => {
    switch (level) {
      case 'high_demand': return 'bg-red-100 text-red-700';
      case 'oversupply': return 'bg-yellow-100 text-yellow-700';
      case 'balanced': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          AI Market Pressure Analysis ({pressureLogs.length})
        </CardTitle>
        {pressureLogs.length > 0 && (
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span className="text-sm text-gray-600">
              Avg Imbalance Ratio: {averageImbalance}
            </span>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {pressureLogs.length === 0 ? (
          <p className="text-gray-500">No market pressure data available yet.</p>
        ) : (
          <div className="space-y-4">
            {pressureLogs.map((log) => (
              <div
                key={log.id}
                className="p-4 border rounded-lg bg-gradient-to-br from-white to-gray-50"
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge className={`text-xs flex items-center gap-1 ${getPressureColor(log.pressure_level)}`}>
                    {getPressureIcon(log.pressure_level)}
                    {log.pressure_level.replace('_', ' ')}
                  </Badge>
                  <div className="text-xs text-gray-500">
                    {new Date(log.created_at).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="text-sm mb-2">
                  <strong>Area:</strong> {log.area_code}
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-xs">
                  <div className="bg-blue-50 p-2 rounded">
                    <strong>Demand:</strong> {log.demand_index}
                  </div>
                  <div className="bg-green-50 p-2 rounded">
                    <strong>Supply:</strong> {log.supply_index}
                  </div>
                  <div className="bg-purple-50 p-2 rounded">
                    <strong>Ratio:</strong> {log.imbalance_ratio}
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
