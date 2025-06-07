
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AiCorrectionLog {
  id: string;
  user_id: string;
  feature: string;
  suggested_text: string;
  created_at: string;
  reviewed: boolean;
  approved: boolean | null;
}

export const useAiCorrections = () => {
  const [corrections, setCorrections] = useState<AiCorrectionLog[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchCorrections = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_user_correction_logs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setCorrections(data || []);
    } catch (error) {
      console.error('Error fetching corrections:', error);
      toast({
        title: "Error",
        description: "Failed to fetch corrections",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const moderateCorrection = async (id: string, approved: boolean) => {
    try {
      const { error } = await supabase
        .from('ai_user_correction_logs')
        .update({
          reviewed: true,
          approved
        })
        .eq('id', id);

      if (error) throw error;

      console.log('Correction moderated successfully');
      fetchCorrections();
      
      toast({
        title: "Success",
        description: `Correction ${approved ? 'approved' : 'rejected'}`,
      });
    } catch (error) {
      console.error('Error moderating correction:', error);
      toast({
        title: "Error",
        description: "Failed to moderate correction",
        variant: "destructive",
      });
    }
  };

  const submitCorrection = async (
    userId: string,
    feature: string,
    suggestedText: string
  ) => {
    try {
      const { error } = await supabase
        .from('ai_user_correction_logs')
        .insert({
          user_id: userId,
          feature,
          suggested_text: suggestedText
        });

      if (error) throw error;

      console.log('Correction submitted successfully');
      fetchCorrections();
    } catch (error) {
      console.error('Error submitting correction:', error);
      toast({
        title: "Error",
        description: "Failed to submit correction",
        variant: "destructive",
      });
    }
  };

  return {
    corrections,
    loading,
    fetchCorrections,
    moderateCorrection,
    submitCorrection,
  };
};
