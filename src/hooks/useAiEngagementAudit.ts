
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface AiEngagementAudit {
  id: string;
  user_id: string;
  listing_id: string;
  action_type: string;
  interaction_data: string | null;
  session_id: string | null;
  duration_seconds: number | null;
  created_at: string;
  updated_at: string;
}

export const useAiEngagementAudit = () => {
  const [audits, setAudits] = useState<AiEngagementAudit[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchEngagementAudits = async (userId?: string, listingId?: string) => {
    setLoading(true);
    try {
      let query = supabase
        .from('ai_engagement_audit')
        .select('*')
        .order('created_at', { ascending: false });

      if (userId) {
        query = query.eq('user_id', userId);
      }

      if (listingId) {
        query = query.eq('listing_id', listingId);
      }

      const { data, error } = await query;

      if (error) throw error;
      setAudits(data || []);
    } catch (error) {
      console.error('Error fetching engagement audits:', error);
    } finally {
      setLoading(false);
    }
  };

  const logEngagement = async (auditData: Omit<AiEngagementAudit, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('ai_engagement_audit')
        .insert([auditData])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error logging engagement:', error);
      throw error;
    }
  };

  const getEngagementsByAction = (actionType: string) => {
    return audits.filter(audit => audit.action_type === actionType);
  };

  const getAverageEngagementTime = () => {
    const validDurations = audits
      .filter(audit => audit.duration_seconds !== null)
      .map(audit => audit.duration_seconds!);
    
    if (validDurations.length === 0) return 0;
    
    return validDurations.reduce((sum, duration) => sum + duration, 0) / validDurations.length;
  };

  return {
    audits,
    loading,
    fetchEngagementAudits,
    logEngagement,
    getEngagementsByAction,
    getAverageEngagementTime
  };
};
