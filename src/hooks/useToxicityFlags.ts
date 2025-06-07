
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ToxicityFlag {
  id: string;
  user_id: string | null;
  content_snippet: string;
  flagged_at: string;
  reviewed: boolean;
  severity: 'low' | 'medium' | 'high' | null;
  reviewer_notes: string | null;
}

export const useToxicityFlags = () => {
  const [flags, setFlags] = useState<ToxicityFlag[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchToxicityFlags = async (reviewedFilter?: boolean) => {
    try {
      setLoading(true);
      let query = supabase
        .from('ai_toxicity_flags')
        .select('*')
        .order('flagged_at', { ascending: false });

      if (reviewedFilter !== undefined) {
        query = query.eq('reviewed', reviewedFilter);
      }

      const { data, error } = await query;

      if (error) throw error;

      const flagsData = (data || []) as ToxicityFlag[];
      setFlags(flagsData);
    } catch (error) {
      console.error('Error fetching toxicity flags:', error);
      toast({
        title: "Error",
        description: "Failed to fetch toxicity flags",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateFlag = async (id: string, updates: Partial<ToxicityFlag>) => {
    try {
      const { error } = await supabase
        .from('ai_toxicity_flags')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Flag updated successfully",
      });
      
      fetchToxicityFlags();
    } catch (error) {
      console.error('Error updating flag:', error);
      toast({
        title: "Error",
        description: "Failed to update flag",
        variant: "destructive",
      });
    }
  };

  return {
    flags,
    loading,
    fetchToxicityFlags,
    updateFlag,
  };
};
