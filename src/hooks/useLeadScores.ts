
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface LeadScore {
  id: string;
  lead_id: string;
  score: number;
  score_factors: string | null;
  calculated_at: string | null;
  created_at: string;
  updated_at: string;
}

export const useLeadScores = () => {
  const [scores, setScores] = useState<LeadScore[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLeadScores = async (leadIds?: string[]) => {
    setLoading(true);
    try {
      let query = supabase
        .from('lead_scores')
        .select('*')
        .order('score', { ascending: false });

      if (leadIds) {
        query = query.in('lead_id', leadIds);
      }

      const { data, error } = await query;

      if (error) throw error;
      setScores(data || []);
    } catch (error) {
      console.error('Error fetching lead scores:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateLeadScore = async (leadId: string, score: number, factors?: string) => {
    try {
      const { data, error } = await supabase
        .from('lead_scores')
        .upsert([{
          lead_id: leadId,
          score,
          score_factors: factors,
          calculated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;
      
      await fetchLeadScores(); // Refresh scores
      return data;
    } catch (error) {
      console.error('Error updating lead score:', error);
      throw error;
    }
  };

  const getScoreByLeadId = (leadId: string) => {
    return scores.find(score => score.lead_id === leadId);
  };

  const getHighQualityLeads = (threshold: number = 70) => {
    return scores.filter(score => score.score >= threshold);
  };

  return {
    scores,
    loading,
    fetchLeadScores,
    updateLeadScore,
    getScoreByLeadId,
    getHighQualityLeads
  };
};
