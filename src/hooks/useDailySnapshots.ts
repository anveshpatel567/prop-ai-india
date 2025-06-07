
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface DailySnapshot {
  id: string;
  snapshot_date: string;
  total_prompts: number | null;
  total_flags: number | null;
  avg_latency_ms: number | null;
  top_feature: string | null;
  created_at: string;
}

export function useDailySnapshots() {
  const [snapshots, setSnapshots] = useState<DailySnapshot[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchDailySnapshots = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_daily_snapshot_logs')
        .select('*')
        .order('snapshot_date', { ascending: false });

      if (error) throw error;
      setSnapshots(data || []);
    } catch (error) {
      console.error('Error fetching daily snapshots:', error);
      toast({
        title: "Error",
        description: "Failed to fetch daily snapshots",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logDailySnapshot = async (total_prompts: number, total_flags: number, avg_latency_ms: number, top_feature: string) => {
    try {
      const { error } = await supabase.functions.invoke('logDailySnapshot', {
        body: { total_prompts, total_flags, avg_latency_ms, top_feature }
      });

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Daily snapshot logged successfully",
      });
      
      fetchDailySnapshots();
    } catch (error) {
      console.error('Error logging daily snapshot:', error);
      toast({
        title: "Error",
        description: "Failed to log daily snapshot",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchDailySnapshots();
  }, []);

  return {
    snapshots,
    loading,
    fetchDailySnapshots,
    logDailySnapshot
  };
}
