
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ModuleHealth {
  id: string;
  module: string;
  uptime_percentage: number;
  average_latency_ms: number | null;
  last_updated: string;
}

export function useModuleHealth() {
  const [metrics, setMetrics] = useState<ModuleHealth[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchModuleHealth = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_module_health_metrics')
        .select('*')
        .order('last_updated', { ascending: false });

      if (error) throw error;
      setMetrics(data || []);
    } catch (error) {
      console.error('Error fetching module health:', error);
      toast({
        title: "Error",
        description: "Failed to fetch module health metrics",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateModuleHealth = async (module: string, uptime_percentage: number, average_latency_ms?: number) => {
    try {
      const { error } = await supabase.functions.invoke('updateModuleHealth', {
        body: { module, uptime_percentage, average_latency_ms }
      });

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Module health updated successfully",
      });
      
      fetchModuleHealth();
    } catch (error) {
      console.error('Error updating module health:', error);
      toast({
        title: "Error",
        description: "Failed to update module health",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchModuleHealth();
  }, []);

  return {
    metrics,
    loading,
    fetchModuleHealth,
    updateModuleHealth
  };
}
