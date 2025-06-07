
import React, { useEffect } from 'react';
import { useMarketPressures } from '@/hooks/useMarketPressures';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, TrendingDown, Activity } from 'lucide-react';

export default function MarketPressurePanel() {
  const { user } = useAuth();
  const { pressureLogs, loading, fetchMarketPressures, getLogsByPressureType } = useMarketPressures();

  useEffect(() => {
    fetchMarketPressures();
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

  const getPressureIcon = (pressureType: string) => {
    switch (pressureType) {
      case 'high': return <TrendingUp className="h-4 w-4" />;
      case 'low': return <TrendingDown className="h-4 w-4" />;
      case 'neutral': return <Activity className="h-4 w-4" />;
      default: return <BarChart3 className="h-4 w-4" />;
    }
  };

  const getPressureColor = (pressureType: string) => {
    switch (pressureType) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'low': return 'bg-blue-100 text-blue-700';
      case 'neutral': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getScopeIcon = (dataScope: string) => {
    switch (dataScope) {
      case 'price': return '₹';
      case 'inventory': return '📦';
      case 'lead_volume': return '👥';
      default: return '📊';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          AI Market Pressure Analysis ({pressureLogs.length})
        </CardTitle>
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
                  <div className="flex items-center gap-2">
                    <Badge className={`text-xs flex items-center gap-1 ${getPressureColor(log.pressure_type)}`}>
                      {getPressureIcon(log.pressure_type)}
                      {log.pressure_type} pressure
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {getScopeIcon(log.data_scope)} {log.data_scope}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(log.generated_at).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="text-sm">
                  <div className="bg-gray-50 p-2 rounded">
                    <strong>Analysis:</strong> {log.reasoning}
                  </div>
                  {log.locality_id && (
                    <div className="mt-2 text-xs text-gray-600">
                      Locality ID: {log.locality_id}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
