
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface AiNegotiationLog {
  id: string;
  listing_id: string;
  seeker_id: string;
  agent_id: string;
  negotiation_step: string | null;
  ai_suggestion: string | null;
  user_response: string | null;
  step_outcome: string | null;
  created_at: string;
  updated_at: string;
}

export const useAiNegotiationLogs = () => {
  const [logs, setLogs] = useState<AiNegotiationLog[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNegotiationLogs = async (listingId?: string, seekerId?: string, agentId?: string) => {
    setLoading(true);
    try {
      let query = supabase
        .from('ai_negotiation_logs')
        .select('*')
        .order('created_at', { ascending: false });

      if (listingId) {
        query = query.eq('listing_id', listingId);
      }

      if (seekerId) {
        query = query.eq('seeker_id', seekerId);
      }

      if (agentId) {
        query = query.eq('agent_id', agentId);
      }

      const { data, error } = await query;

      if (error) throw error;
      setLogs(data || []);
    } catch (error) {
      console.error('Error fetching negotiation logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const createNegotiationLog = async (logData: Omit<AiNegotiationLog, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('ai_negotiation_logs')
        .insert([logData])
        .select()
        .single();

      if (error) throw error;
      
      await fetchNegotiationLogs(); // Refresh logs
      return data;
    } catch (error) {
      console.error('Error creating negotiation log:', error);
      throw error;
    }
  };

  const updateNegotiationStep = async (logId: string, outcome: string) => {
    try {
      const { data, error } = await supabase
        .from('ai_negotiation_logs')
        .update({ step_outcome: outcome })
        .eq('id', logId)
        .select()
        .single();

      if (error) throw error;
      
      await fetchNegotiationLogs(); // Refresh logs
      return data;
    } catch (error) {
      console.error('Error updating negotiation step:', error);
      throw error;
    }
  };

  const getNegotiationHistory = (listingId: string, seekerId: string, agentId: string) => {
    return logs.filter(log => 
      log.listing_id === listingId && 
      log.seeker_id === seekerId && 
      log.agent_id === agentId
    );
  };

  const getSuccessfulNegotiations = () => {
    return logs.filter(log => log.step_outcome === 'success');
  };

  return {
    logs,
    loading,
    fetchNegotiationLogs,
    createNegotiationLog,
    updateNegotiationStep,
    getNegotiationHistory,
    getSuccessfulNegotiations
  };
};
