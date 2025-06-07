
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UserRestoration {
  id: string;
  user_id: string | null;
  restored_by: string | null;
  restoration_type: string;
  restoration_reason: string | null;
  restored_at: string;
}

export function useUserRestorations() {
  const [restorations, setRestorations] = useState<UserRestoration[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchUserRestorations = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_user_restoration_logs')
        .select('*')
        .order('restored_at', { ascending: false });

      if (error) throw error;
      setRestorations(data || []);
    } catch (error) {
      console.error('Error fetching user restorations:', error);
      toast({
        title: "Error",
        description: "Failed to fetch user restorations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logUserRestoration = async (user_id: string, restoration_type: string, restoration_reason?: string) => {
    try {
      const { error } = await supabase.functions.invoke('logUserRestoration', {
        body: { user_id, restoration_type, restoration_reason }
      });

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "User restoration logged successfully",
      });
      
      fetchUserRestorations();
    } catch (error) {
      console.error('Error logging user restoration:', error);
      toast({
        title: "Error",
        description: "Failed to log user restoration",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchUserRestorations();
  }, []);

  return {
    restorations,
    loading,
    fetchUserRestorations,
    logUserRestoration
  };
}
