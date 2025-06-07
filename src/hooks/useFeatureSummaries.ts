
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface FeatureSummary {
  id: string;
  feature: string;
  usage_count: number;
  flagged_count: number;
  shadowban_count: number;
  last_synced: string;
}

export function useFeatureSummaries() {
  const [summaries, setSummaries] = useState<FeatureSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchFeatureSummaries = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_feature_summary_metrics')
        .select('*')
        .order('usage_count', { ascending: false });

      if (error) throw error;
      setSummaries(data || []);
    } catch (error) {
      console.error('Error fetching feature summaries:', error);
      toast({
        title: "Error",
        description: "Failed to fetch feature summaries",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const syncFeatureSummary = async (feature: string, usage_count: number, flagged_count: number, shadowban_count: number) => {
    try {
      const { error } = await supabase.functions.invoke('syncFeatureSummary', {
        body: { feature, usage_count, flagged_count, shadowban_count }
      });

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Feature summary synced successfully",
      });
      
      fetchFeatureSummaries();
    } catch (error) {
      console.error('Error syncing feature summary:', error);
      toast({
        title: "Error",
        description: "Failed to sync feature summary",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchFeatureSummaries();
  }, []);

  return {
    summaries,
    loading,
    fetchFeatureSummaries,
    syncFeatureSummary
  };
}
