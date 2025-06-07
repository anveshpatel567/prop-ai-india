
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface AgentHeatmap {
  id: string;
  agent_id: string;
  city: string;
  activity_score: number;
  created_at: string;
  updated_at: string;
}

export const useAgentHeatmaps = () => {
  const [heatmaps, setHeatmaps] = useState<AgentHeatmap[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAgentHeatmap = async (agentId?: string) => {
    setLoading(true);
    try {
      let query = supabase
        .from('agent_heatmaps')
        .select('*')
        .order('activity_score', { ascending: false });

      if (agentId) {
        query = query.eq('agent_id', agentId);
      }

      const { data, error } = await query;

      if (error) throw error;
      setHeatmaps(data || []);
    } catch (error) {
      console.error('Error fetching agent heatmaps:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateActivityScore = async (agentId: string, city: string, activityScore: number) => {
    try {
      const { data, error } = await supabase
        .from('agent_heatmaps')
        .upsert([{
          agent_id: agentId,
          city,
          activity_score: activityScore
        }])
        .select()
        .single();

      if (error) throw error;
      
      await fetchAgentHeatmap(); // Refresh data
      return data;
    } catch (error) {
      console.error('Error updating activity score:', error);
      throw error;
    }
  };

  const getCityStats = () => {
    const cityStats = heatmaps.reduce((acc, heatmap) => {
      if (!acc[heatmap.city]) {
        acc[heatmap.city] = { totalAgents: 0, totalActivity: 0 };
      }
      acc[heatmap.city].totalAgents += 1;
      acc[heatmap.city].totalActivity += heatmap.activity_score;
      return acc;
    }, {} as Record<string, { totalAgents: number; totalActivity: number }>);

    return Object.entries(cityStats).map(([city, stats]) => ({
      city,
      totalAgents: stats.totalAgents,
      averageActivity: stats.totalActivity / stats.totalAgents
    }));
  };

  return {
    heatmaps,
    loading,
    fetchAgentHeatmap,
    updateActivityScore,
    getCityStats
  };
};
