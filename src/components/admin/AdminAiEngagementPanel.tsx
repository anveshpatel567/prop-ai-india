
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { BarChart3, TrendingUp, Clock, Users } from 'lucide-react';

type ToolEngagement = {
  tool_name: string;
  usage_count: number;
  avg_response_time: number;
};

export const AdminAiEngagementPanel: React.FC = () => {
  const [engagement, setEngagement] = useState<ToolEngagement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEngagementMetrics();
  }, []);

  const fetchEngagementMetrics = async () => {
    try {
      // For now, we'll query the ai_tool_transactions table directly
      // until the SQL function is created
      const { data, error } = await supabase
        .from('ai_tool_transactions')
        .select('tool_name, processing_time_ms')
        .eq('status', 'success');

      if (error) throw error;

      // Process the data to calculate metrics
      const toolMetrics = (data || []).reduce((acc: Record<string, any>, transaction) => {
        const toolName = transaction.tool_name;
        if (!acc[toolName]) {
          acc[toolName] = {
            tool_name: toolName,
            usage_count: 0,
            total_time: 0
          };
        }
        acc[toolName].usage_count += 1;
        acc[toolName].total_time += transaction.processing_time_ms || 0;
        return acc;
      }, {});

      const metrics: ToolEngagement[] = Object.values(toolMetrics).map((tool: any) => ({
        tool_name: tool.tool_name,
        usage_count: tool.usage_count,
        avg_response_time: tool.total_time / tool.usage_count / 1000 // Convert to seconds
      }));

      setEngagement(metrics.sort((a, b) => b.usage_count - a.usage_count));
    } catch (error) {
      console.error('Error fetching engagement metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading engagement metrics...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center text-orange-600">
            <BarChart3 className="mr-2 h-5 w-5" />
            AI Tool Engagement Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {engagement.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No engagement data available yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left border-b border-orange-200">
                      <th className="py-3 px-2 font-medium text-gray-700">Tool Name</th>
                      <th className="py-3 px-2 font-medium text-gray-700">
                        <div className="flex items-center">
                          <Users className="mr-1 h-4 w-4" />
                          Uses
                        </div>
                      </th>
                      <th className="py-3 px-2 font-medium text-gray-700">
                        <div className="flex items-center">
                          <Clock className="mr-1 h-4 w-4" />
                          Avg Response
                        </div>
                      </th>
                      <th className="py-3 px-2 font-medium text-gray-700">
                        <div className="flex items-center">
                          <TrendingUp className="mr-1 h-4 w-4" />
                          Performance
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {engagement.map((tool, index) => (
                      <tr key={tool.tool_name} className="border-b border-gray-100 hover:bg-orange-50 transition-colors">
                        <td className="py-3 px-2">
                          <div className="flex items-center">
                            <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 text-xs font-bold flex items-center justify-center mr-3">
                              {index + 1}
                            </span>
                            <span className="font-medium text-gray-800">{tool.tool_name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-2">
                          <span className="text-lg font-bold text-orange-600">{tool.usage_count}</span>
                        </td>
                        <td className="py-3 px-2">
                          <span className={`font-medium ${
                            tool.avg_response_time < 2 ? 'text-green-600' : 
                            tool.avg_response_time < 5 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {tool.avg_response_time.toFixed(2)}s
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className="bg-gradient-to-r from-orange-500 to-red-600 h-2 rounded-full transition-all duration-300"
                                style={{ 
                                  width: `${Math.min(100, (tool.usage_count / Math.max(...engagement.map(e => e.usage_count))) * 100)}%` 
                                }}
                              />
                            </div>
                            <span className="text-xs text-gray-500">
                              {((tool.usage_count / Math.max(...engagement.map(e => e.usage_count))) * 100).toFixed(0)}%
                            </span>
                          </div>
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

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Tools</p>
                <p className="text-2xl font-bold text-green-600">{engagement.length}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Usage</p>
                <p className="text-2xl font-bold text-blue-600">
                  {engagement.reduce((sum, tool) => sum + tool.usage_count, 0)}
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Response</p>
                <p className="text-2xl font-bold text-purple-600">
                  {engagement.length > 0 ? 
                    (engagement.reduce((sum, tool) => sum + tool.avg_response_time, 0) / engagement.length).toFixed(2) + 's' 
                    : '0s'
                  }
                </p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
