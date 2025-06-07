
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface BehaviorException {
  id: string;
  context: string;
  override_behavior: string;
  approved_by: string | null;
  notes: string | null;
  created_at: string;
}

export const useBehaviorExceptions = () => {
  const [exceptions, setExceptions] = useState<BehaviorException[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchExceptions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_behavior_exceptions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const typedData = (data || []) as BehaviorException[];
      setExceptions(typedData);
    } catch (error) {
      console.error('Error fetching behavior exceptions:', error);
      toast({
        title: "Error",
        description: "Failed to fetch behavior exceptions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createException = async (exception: Omit<BehaviorException, 'id' | 'created_at' | 'approved_by'>) => {
    try {
      const { data, error } = await supabase.functions.invoke('createBehaviorException', {
        body: exception
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Behavior exception created successfully",
      });
      
      fetchExceptions();
    } catch (error) {
      console.error('Error creating behavior exception:', error);
      toast({
        title: "Error",
        description: "Failed to create behavior exception",
        variant: "destructive",
      });
    }
  };

  return {
    exceptions,
    loading,
    fetchExceptions,
    createException,
  };
};
