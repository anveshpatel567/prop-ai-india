
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface CrmAiTrail {
  id: string;
  lead_id: string;
  user_id: string;
  ai_tool: string;
  suggestion: string | null;
  credits_used: number;
  created_at: string;
  updated_at: string;
}

export const useCrmAiTrails = () => {
  const [trails, setTrails] = useState<CrmAiTrail[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUserTrails = async (userId?: string) => {
    setLoading(true);
    try {
      let query = supabase
        .from('crm_ai_trails')
        .select('*')
        .order('created_at', { ascending: false });

      if (userId) {
        query = query.eq('user_id', userId);
      }

      const { data, error } = await query;

      if (error) throw error;
      setTrails(data || []);
    } catch (error) {
      console.error('Error fetching CRM AI trails:', error);
    } finally {
      setLoading(false);
    }
  };

  const logAiUsage = async (trailData: Omit<CrmAiTrail, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('crm_ai_trails')
        .insert([trailData])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error logging AI usage:', error);
      throw error;
    }
  };

  const getTrailsByTool = (toolName: string) => {
    return trails.filter(trail => trail.ai_tool === toolName);
  };

  const getTotalCreditsUsed = () => {
    return trails.reduce((total, trail) => total + trail.credits_used, 0);
  };

  return {
    trails,
    loading,
    fetchUserTrails,
    logAiUsage,
    getTrailsByTool,
    getTotalCreditsUsed
  };
};
