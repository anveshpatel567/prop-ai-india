
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface FollowupVariant {
  variant: string;
  message: string;
  id?: string;
  created_at?: string;
  is_scheduled?: boolean;
  sent_at?: string;
}

export const useFollowupVariants = () => {
  const [loading, setLoading] = useState(false);
  const [variants, setVariants] = useState<FollowupVariant[]>([]);

  const generateVariants = async (leadId: string, context: string, numVariants = 3) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generateFollowupVariants', {
        body: { leadId, context, numVariants }
      });

      if (error) throw error;
      
      setVariants(data.variants);
      return data.variants;
    } catch (error) {
      console.error('Error generating variants:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getVariantsForLead = async (leadId: string) => {
    try {
      const { data, error } = await supabase
        .from('ai_followups')
        .select('*')
        .eq('lead_id', leadId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setVariants(data || []);
      return data;
    } catch (error) {
      console.error('Error fetching variants:', error);
      throw error;
    }
  };

  const scheduleVariant = async (followupId: string, scheduledTime: string) => {
    try {
      const { error } = await supabase
        .from('ai_followups')
        .update({
          is_scheduled: true,
          scheduled_date: scheduledTime
        })
        .eq('id', followupId);

      if (error) throw error;
      
      // Refresh variants
      const leadId = variants.find(v => v.id === followupId)?.id;
      if (leadId) {
        await getVariantsForLead(leadId);
      }
    } catch (error) {
      console.error('Error scheduling variant:', error);
      throw error;
    }
  };

  const markAsSent = async (followupId: string) => {
    try {
      const { error } = await supabase
        .from('ai_followups')
        .update({
          sent_at: new Date().toISOString()
        })
        .eq('id', followupId);

      if (error) throw error;
    } catch (error) {
      console.error('Error marking as sent:', error);
      throw error;
    }
  };

  return {
    loading,
    variants,
    generateVariants,
    getVariantsForLead,
    scheduleVariant,
    markAsSent
  };
};
