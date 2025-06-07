
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToolAccessSummary } from '@/hooks/useToolAccessSummary';
import { useToolSnapshotSummary } from '@/hooks/useToolSnapshotSummary';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, Users, Zap, Activity } from 'lucide-react';

export const AdminToolAnalyticsPanel: React.FC = () => {
  const { summary, loading: summaryLoading } = useToolAccessSummary();
  const { chartData, loading: chartLoading } = useToolSnapshotSummary(7);

  const totalAttempts = summary.reduce((sum, tool) => sum + tool.total_attempts, 0);
  const totalUsers = Math.max(...summary.map(tool => tool.unique_users));
  const avgSuccessRate = summary.length > 0 
    ? Math.round(summary.reduce((sum, tool) => sum + tool.success_rate, 0) / summary.length)
    : 0;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center p-6">
            <Activity className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Attempts</p>
              <p className="text-2xl font-bold">{totalAttempts.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <Users className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold">{totalUsers.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <TrendingUp className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Success Rate</p>
              <p className="text-2xl font-bold">{avgSuccessRate}%</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <Zap className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Tools</p>
              <p className="text-2xl font-bold">{summary.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tool Summary Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Tool Usage Summary</CardTitle>
        </CardHeader>
        <CardContent>
          {summaryLoading ? (
            <div className="h-64 flex items-center justify-center">Loading...</div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={summary}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tool_name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total_attempts" fill="#8884d8" name="Total Attempts" />
                <Bar dataKey="blocked_attempts" fill="#ff7300" name="Blocked Attempts" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Usage Trends */}
      <Card>
        <CardHeader>
          <CardTitle>7-Day Usage Trends</CardTitle>
        </CardHeader>
        <CardContent>
          {chartLoading ? (
            <div className="h-64 flex items-center justify-center">Loading...</div>
          ) : chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                {Object.keys(chartData[0] || {})
                  .filter(key => key.endsWith('_attempts'))
                  .map((key, index) => (
                    <Line 
                      key={key}
                      type="monotone" 
                      dataKey={key} 
                      stroke={['#8884d8', '#82ca9d', '#ffc658', '#ff7300'][index % 4]}
                      name={key.replace('_attempts', '')}
                    />
                  ))}
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500">
              No trend data available
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tool Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Tool Performance Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Tool Name</th>
                  <th className="text-right p-2">Total Attempts</th>
                  <th className="text-right p-2">Success Rate</th>
                  <th className="text-right p-2">Unique Users</th>
                  <th className="text-right p-2">Blocked</th>
                </tr>
              </thead>
              <tbody>
                {summary.map((tool, index) => (
                  <tr key={tool.tool_name} className="border-b">
                    <td className="p-2 font-medium">{tool.tool_name}</td>
                    <td className="p-2 text-right">{tool.total_attempts}</td>
                    <td className="p-2 text-right">
                      <span className={`px-2 py-1 rounded text-xs ${
                        tool.success_rate >= 80 ? 'bg-green-100 text-green-800' :
                        tool.success_rate >= 60 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {tool.success_rate}%
                      </span>
                    </td>
                    <td className="p-2 text-right">{tool.unique_users}</td>
                    <td className="p-2 text-right">{tool.blocked_attempts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
