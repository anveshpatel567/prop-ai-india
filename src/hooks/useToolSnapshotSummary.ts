
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ToolSnapshot {
  snapshot_date: string;
  tool_name: string;
  total_attempts: number;
  blocked_attempts: number;
  unique_users: number;
  total_credits_used: number;
}

export interface ToolSnapshotChart {
  date: string;
  [toolName: string]: number | string;
}

export function useToolSnapshotSummary(days = 7) {
  const [snapshots, setSnapshots] = useState<ToolSnapshot[]>([]);
  const [chartData, setChartData] = useState<ToolSnapshotChart[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSnapshots();
  }, [days]);

  const fetchSnapshots = async () => {
    try {
      setLoading(true);
      
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
      
      const { data, error } = await supabase
        .from('ai_tool_insight_snapshots')
        .select('*')
        .gte('snapshot_date', startDate.toISOString().split('T')[0])
        .order('snapshot_date', { ascending: true });

      if (error) throw error;

      setSnapshots(data || []);

      // Transform data for charts
      const chartMap = new Map<string, any>();
      
      data?.forEach(snapshot => {
        const date = snapshot.snapshot_date;
        if (!chartMap.has(date)) {
          chartMap.set(date, { date });
        }
        
        const entry = chartMap.get(date);
        entry[`${snapshot.tool_name}_attempts`] = snapshot.total_attempts;
        entry[`${snapshot.tool_name}_blocked`] = snapshot.blocked_attempts;
        entry[`${snapshot.tool_name}_users`] = snapshot.unique_users;
      });

      setChartData(Array.from(chartMap.values()));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch snapshots');
    } finally {
      setLoading(false);
    }
  };

  return {
    snapshots,
    chartData,
    loading,
    error,
    refetch: fetchSnapshots
  };
}
