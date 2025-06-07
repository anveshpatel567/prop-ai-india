
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AiUiAttentionHeatmap {
  id: string;
  session_id: string;
  user_id: string | null;
  page_path: string;
  attention_map: Record<string, number>;
  device_type: string;
  created_at: string;
}

export const useAiUiAttentionHeatmaps = () => {
  const [heatmaps, setHeatmaps] = useState<AiUiAttentionHeatmap[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchUserHeatmaps = async (userId?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('ai_ui_attention_heatmaps')
        .select('*')
        .order('created_at', { ascending: false });

      if (userId) {
        query = query.eq('user_id', userId);
      }

      const { data, error } = await query;

      if (error) throw error;

      setHeatmaps(data || []);
    } catch (error) {
      console.error('Error fetching UI attention heatmaps:', error);
      toast({
        title: "Error",
        description: "Failed to fetch attention heatmaps",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logAttentionHeatmap = async (
    sessionId: string,
    pagePath: string,
    attentionMap: Record<string, number>,
    deviceType: string,
    userId?: string
  ) => {
    try {
      const { error } = await supabase
        .from('ai_ui_attention_heatmaps')
        .insert({
          session_id: sessionId,
          user_id: userId || null,
          page_path: pagePath,
          attention_map: attentionMap,
          device_type: deviceType
        });

      if (error) throw error;

      console.log('UI attention heatmap logged successfully');

      // Refresh heatmaps if user is logged in
      if (userId) {
        fetchUserHeatmaps(userId);
      }
    } catch (error) {
      console.error('Error logging UI attention heatmap:', error);
      toast({
        title: "Error",
        description: "Failed to log attention heatmap",
        variant: "destructive",
      });
    }
  };

  const getHeatmapsByPage = (pagePath: string): AiUiAttentionHeatmap[] => {
    return heatmaps.filter(heatmap => heatmap.page_path === pagePath);
  };

  const getAverageAttentionByElement = (element: string): number => {
    const validHeatmaps = heatmaps.filter(heatmap => 
      heatmap.attention_map && heatmap.attention_map[element] !== undefined
    );
    if (validHeatmaps.length === 0) return 0;
    
    const total = validHeatmaps.reduce((sum, heatmap) => 
      sum + (heatmap.attention_map[element] || 0), 0
    );
    return Number((total / validHeatmaps.length).toFixed(2));
  };

  return {
    heatmaps,
    loading,
    fetchUserHeatmaps,
    logAttentionHeatmap,
    getHeatmapsByPage,
    getAverageAttentionByElement,
  };
};
