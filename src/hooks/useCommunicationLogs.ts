
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface CommunicationLog {
  id: string;
  user_id: string;
  type: string;
  payload: string | null;
  created_at: string;
  updated_at: string;
}

export const useCommunicationLogs = () => {
  const [logs, setLogs] = useState<CommunicationLog[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUserLogs = async (userId?: string) => {
    setLoading(true);
    try {
      let query = supabase
        .from('communication_logs')
        .select('*')
        .order('created_at', { ascending: false });

      if (userId) {
        query = query.eq('user_id', userId);
      }

      const { data, error } = await query;

      if (error) throw error;
      setLogs(data || []);
    } catch (error) {
      console.error('Error fetching communication logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const logCommunication = async (logData: Omit<CommunicationLog, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('communication_logs')
        .insert([logData])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error logging communication:', error);
      throw error;
    }
  };

  return {
    logs,
    loading,
    fetchUserLogs,
    logCommunication
  };
};
