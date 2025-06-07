
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface RetrainTrigger {
  id: string;
  requested_by: string | null;
  trigger_reason: string;
  status: 'pending' | 'approved' | 'rejected';
  requested_at: string;
}

export function useRetrainTriggers() {
  const [triggers, setTriggers] = useState<RetrainTrigger[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchRetrainTriggers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_retrain_triggers')
        .select('*')
        .order('requested_at', { ascending: false });

      if (error) throw error;
      setTriggers(data || []);
    } catch (error) {
      console.error('Error fetching retrain triggers:', error);
      toast({
        title: "Error",
        description: "Failed to fetch retrain triggers",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const triggerRetrain = async (trigger_reason: string, status = 'pending') => {
    try {
      const { error } = await supabase.functions.invoke('triggerRetrain', {
        body: { trigger_reason, status }
      });

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Retrain trigger submitted successfully",
      });
      
      fetchRetrainTriggers();
    } catch (error) {
      console.error('Error triggering retrain:', error);
      toast({
        title: "Error",
        description: "Failed to trigger retrain",
        variant: "destructive",
      });
    }
  };

  const updateTriggerStatus = async (id: string, status: 'pending' | 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('ai_retrain_triggers')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Trigger status updated successfully",
      });
      
      fetchRetrainTriggers();
    } catch (error) {
      console.error('Error updating trigger status:', error);
      toast({
        title: "Error",
        description: "Failed to update trigger status",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchRetrainTriggers();
  }, []);

  return {
    triggers,
    loading,
    fetchRetrainTriggers,
    triggerRetrain,
    updateTriggerStatus
  };
}
