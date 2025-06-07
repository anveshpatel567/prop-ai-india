
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/types/supabase-db';

type Lead = Database['public']['Tables']['leads']['Row'];
type LeadInsert = Database['public']['Tables']['leads']['Insert'];

export const useLeads = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createLead = async (leadData: LeadInsert) => {
    try {
      setLoading(true);
      const { data, error: createError } = await supabase
        .from('leads')
        .insert(leadData)
        .select()
        .single();

      if (createError) {
        setError(createError.message);
        return null;
      }

      return data;
    } catch (err) {
      console.error('Error creating lead:', err);
      setError('Failed to create lead');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getAgentLeads = async (agentId: string) => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('leads')
        .select(`
          *,
          listings:property_id(title, city, price),
          users:seeker_id(full_name, email, phone)
        `)
        .eq('agent_id', agentId)
        .order('created_at', { ascending: false });

      if (fetchError) {
        setError(fetchError.message);
        return [];
      }

      return data || [];
    } catch (err) {
      console.error('Error fetching agent leads:', err);
      setError('Failed to fetch leads');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getSeekerLeads = async (seekerId: string) => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('leads')
        .select(`
          *,
          listings:property_id(title, city, price),
          users:agent_id(full_name, email, phone)
        `)
        .eq('seeker_id', seekerId)
        .order('created_at', { ascending: false });

      if (fetchError) {
        setError(fetchError.message);
        return [];
      }

      return data || [];
    } catch (err) {
      console.error('Error fetching seeker leads:', err);
      setError('Failed to fetch leads');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const updateLead = async (id: string, updates: Partial<LeadInsert>) => {
    try {
      setLoading(true);
      const { data, error: updateError } = await supabase
        .from('leads')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (updateError) {
        setError(updateError.message);
        return null;
      }

      return data;
    } catch (err) {
      console.error('Error updating lead:', err);
      setError('Failed to update lead');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createLead,
    getAgentLeads,
    getSeekerLeads,
    updateLead
  };
};
