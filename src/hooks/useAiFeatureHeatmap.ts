
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AiFeatureHeatmapData {
  id: string;
  feature: string;
  usage_count: number;
  user_role: string;
  hour_segment: number;
  logged_date: string;
}

export const useAiFeatureHeatmap = () => {
  const [heatmapData, setHeatmapData] = useState<AiFeatureHeatmapData[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchHeatmapData = async (dateFilter?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('ai_feature_usage_heatmap')
        .select('*')
        .order('logged_date', { ascending: false })
        .order('hour_segment', { ascending: true });

      if (dateFilter) {
        query = query.eq('logged_date', dateFilter);
      }

      const { data, error } = await query;

      if (error) throw error;

      const typedData = (data || []) as AiFeatureHeatmapData[];
      setHeatmapData(typedData);
    } catch (error) {
      console.error('Error fetching heatmap data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch AI feature usage heatmap",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addHeatmapEntry = async (entry: Omit<AiFeatureHeatmapData, 'id'>) => {
    try {
      const { error } = await supabase
        .from('ai_feature_usage_heatmap')
        .insert(entry);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Heatmap entry added successfully",
      });
      
      fetchHeatmapData();
    } catch (error) {
      console.error('Error adding heatmap entry:', error);
      toast({
        title: "Error",
        description: "Failed to add heatmap entry",
        variant: "destructive",
      });
    }
  };

  return {
    heatmapData,
    loading,
    fetchHeatmapData,
    addHeatmapEntry,
  };
};
