
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Users, DollarSign, Activity } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface UsageMetrics {
  totalUsers: number;
  totalCreditsUsed: number;
  topAiTools: Array<{ tool: string; usage: number }>;
  recentVisits: number;
}

export const AdminUsageMetricsPanel: React.FC = () => {
  const [metrics, setMetrics] = useState<UsageMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      
      // Fetch user count
      const { count: userCount } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true });

      // Fetch credit usage
      const { data: transactions } = await supabase
        .from('wallet_transactions')
        .select('amount')
        .eq('transaction_type', 'debit');

      const totalCreditsUsed = transactions?.reduce((sum, tx) => sum + Math.abs(tx.amount), 0) || 0;

      // Fetch recent visits
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const { count: recentVisits } = await supabase
        .from('visit_logs')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', weekAgo);

      setMetrics({
        totalUsers: userCount || 0,
        totalCreditsUsed,
        topAiTools: [
          { tool: 'Video Generation', usage: 145 },
          { tool: 'Pricing Suggestions', usage: 98 },
          { tool: 'Locality Reports', usage: 67 }
        ],
        recentVisits: recentVisits || 0
      });
    } catch (error) {
      console.error('Failed to fetch metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-gray-500">Loading usage metrics...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-600">{metrics?.totalUsers}</div>
                <div className="text-sm text-gray-600">Total Users</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-600">{metrics?.totalCreditsUsed}</div>
                <div className="text-sm text-gray-600">Credits Used</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Activity className="h-8 w-8 text-orange-600" />
              <div>
                <div className="text-2xl font-bold text-orange-600">{metrics?.recentVisits}</div>
                <div className="text-sm text-gray-600">Weekly Visits</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-gray-700">
            <BarChart className="mr-2 h-5 w-5" />
            Top AI Tools Usage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {metrics?.topAiTools.map((tool, index) => (
              <div key={tool.tool} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Badge variant="outline">#{index + 1}</Badge>
                  <span className="font-medium">{tool.tool}</span>
                </div>
                <div className="text-lg font-bold text-orange-600">{tool.usage}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
