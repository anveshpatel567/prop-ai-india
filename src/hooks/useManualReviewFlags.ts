
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ManualReviewFlag {
  id: string;
  source_table: string;
  source_id: string;
  reason: string;
  flagged_by: string | null;
  flagged_at: string;
}

export function useManualReviewFlags() {
  const [flags, setFlags] = useState<ManualReviewFlag[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchManualReviewFlags = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_manual_review_flags')
        .select('*')
        .order('flagged_at', { ascending: false });

      if (error) throw error;
      setFlags(data || []);
    } catch (error) {
      console.error('Error fetching manual review flags:', error);
      toast({
        title: "Error",
        description: "Failed to fetch manual review flags",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const flagForManualReview = async (source_table: string, source_id: string, reason: string) => {
    try {
      const { error } = await supabase.functions.invoke('flagForManualReview', {
        body: { source_table, source_id, reason }
      });

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Item flagged for manual review successfully",
      });
      
      fetchManualReviewFlags();
    } catch (error) {
      console.error('Error flagging for manual review:', error);
      toast({
        title: "Error",
        description: "Failed to flag for manual review",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchManualReviewFlags();
  }, []);

  return {
    flags,
    loading,
    fetchManualReviewFlags,
    flagForManualReview
  };
}
