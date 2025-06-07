
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ThrottleZone {
  id: string;
  user_id: string | null;
  throttle_reason: string;
  throttle_level: 'low' | 'medium' | 'high' | null;
  imposed_at: string;
  imposed_by: string | null;
}

export function useThrottleZones() {
  const [zones, setZones] = useState<ThrottleZone[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchThrottleZones = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_user_throttle_zones')
        .select('*')
        .order('imposed_at', { ascending: false });

      if (error) throw error;
      setZones(data || []);
    } catch (error) {
      console.error('Error fetching throttle zones:', error);
      toast({
        title: "Error",
        description: "Failed to fetch throttle zones",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const applyThrottleZone = async (user_id: string, throttle_reason: string, throttle_level: 'low' | 'medium' | 'high') => {
    try {
      const { error } = await supabase.functions.invoke('applyThrottleZone', {
        body: { user_id, throttle_reason, throttle_level }
      });

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Throttle zone applied successfully",
      });
      
      fetchThrottleZones();
    } catch (error) {
      console.error('Error applying throttle zone:', error);
      toast({
        title: "Error",
        description: "Failed to apply throttle zone",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchThrottleZones();
  }, []);

  return {
    zones,
    loading,
    fetchThrottleZones,
    applyThrottleZone
  };
}
