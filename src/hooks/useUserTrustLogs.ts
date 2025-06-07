
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AiUserTrustLog {
  id: string;
  user_id: string;
  ai_module: string;
  trust_score: number;
  reason: string | null;
  computed_at: string;
}

export const useUserTrustLogs = () => {
  const [trustLogs, setTrustLogs] = useState<AiUserTrustLog[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchTrustLogs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_user_trust_logs')
        .select('*')
        .order('computed_at', { ascending: false });

      if (error) throw error;

      setTrustLogs(data || []);
    } catch (error) {
      console.error('Error fetching trust logs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch user trust logs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logTrustScore = async (
    userId: string,
    aiModule: string,
    trustScore: number,
    reason?: string
  ) => {
    try {
      const { error } = await supabase
        .from('ai_user_trust_logs')
        .insert({
          user_id: userId,
          ai_module: aiModule,
          trust_score: trustScore,
          reason: reason || null
        });

      if (error) throw error;

      console.log('Trust score logged successfully');
      
      // Refresh logs
      fetchTrustLogs();
    } catch (error) {
      console.error('Error logging trust score:', error);
      toast({
        title: "Error",
        description: "Failed to log trust score",
        variant: "destructive",
      });
    }
  };

  const getAverageTrustScore = (aiModule?: string): number => {
    const logs = aiModule 
      ? trustLogs.filter(log => log.ai_module === aiModule)
      : trustLogs;
    
    if (logs.length === 0) return 0;
    
    const total = logs.reduce((sum, log) => sum + log.trust_score, 0);
    return Number((total / logs.length).toFixed(2));
  };

  return {
    trustLogs,
    loading,
    fetchTrustLogs,
    logTrustScore,
    getAverageTrustScore,
  };
};
