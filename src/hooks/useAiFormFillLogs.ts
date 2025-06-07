
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AiFormFillLog {
  id: string;
  user_id: string;
  form_context: string;
  fields_auto_filled: Record<string, any>;
  confidence_score: number | null;
  created_at: string;
}

export const useAiFormFillLogs = () => {
  const [formFillLogs, setFormFillLogs] = useState<AiFormFillLog[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchUserFormFillLogs = async (userId?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('ai_form_fill_logs')
        .select('*')
        .order('created_at', { ascending: false });

      if (userId) {
        query = query.eq('user_id', userId);
      }

      const { data, error } = await query;

      if (error) throw error;

      setFormFillLogs(data || []);
    } catch (error) {
      console.error('Error fetching form fill logs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch form fill logs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logFormFill = async (
    userId: string,
    formContext: string,
    fieldsAutoFilled: Record<string, any>,
    confidenceScore?: number
  ) => {
    try {
      const { error } = await supabase
        .from('ai_form_fill_logs')
        .insert({
          user_id: userId,
          form_context: formContext,
          fields_auto_filled: fieldsAutoFilled,
          confidence_score: confidenceScore || null
        });

      if (error) throw error;

      console.log('Form fill logged successfully');

      // Refresh logs
      fetchUserFormFillLogs(userId);
    } catch (error) {
      console.error('Error logging form fill:', error);
      toast({
        title: "Error",
        description: "Failed to log form fill",
        variant: "destructive",
      });
    }
  };

  const getAverageConfidenceScore = (): number => {
    const validScores = formFillLogs.filter(log => log.confidence_score !== null);
    if (validScores.length === 0) return 0;
    const total = validScores.reduce((sum, log) => sum + (log.confidence_score || 0), 0);
    return Number((total / validScores.length).toFixed(2));
  };

  return {
    formFillLogs,
    loading,
    fetchUserFormFillLogs,
    logFormFill,
    getAverageConfidenceScore,
  };
};
