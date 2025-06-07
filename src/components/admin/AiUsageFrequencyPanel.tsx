
import React, { useEffect } from 'react';
import { useAiUsageFrequency } from '@/hooks/useAiUsageFrequency';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Activity } from 'lucide-react';

export function AiUsageFrequencyPanel(): JSX.Element {
  const { user } = useAuth();
  const { topFeatures, loading, fetchUsageFrequency } = useAiUsageFrequency();

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchUsageFrequency();
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
          <p>Loading usage frequency data...</p>
        </CardContent>
      </Card>
    );
  }

  const maxUsage = topFeatures.length > 0 ? topFeatures[0].total_usage : 1;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart className="h-5 w-5" />
          AI Feature Usage Frequency
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-3">
            <h4 className="font-medium text-gray-700 flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Top 10 Most Used Features
            </h4>
            
            {topFeatures.length === 0 ? (
              <p className="text-gray-500">No usage data found.</p>
            ) : (
              <div className="space-y-3">
                {topFeatures.map((feature, index) => {
                  const percentage = (feature.total_usage / maxUsage) * 100;
                  
                  return (
                    <div key={feature.feature} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-gray-100 text-gray-700">
                            #{index + 1}
                          </Badge>
                          <span className="font-medium text-gray-700">{feature.feature}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-gray-700">{feature.total_usage} uses</div>
                          <div className="text-xs text-gray-500">
                            Last: {new Date(feature.last_used).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gray-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="border-t pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Total Features Tracked</div>
                <div className="text-2xl font-bold text-gray-700">{topFeatures.length}</div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Total Usage Count</div>
                <div className="text-2xl font-bold text-gray-700">
                  {topFeatures.reduce((sum, feature) => sum + feature.total_usage, 0)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
