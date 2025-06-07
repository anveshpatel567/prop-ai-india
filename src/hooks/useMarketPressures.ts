
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface MarketPressureLog {
  id: string;
  locality_id: string | null;
  data_scope: string;
  pressure_type: string;
  reasoning: string;
  generated_at: string;
}

export const useMarketPressures = () => {
  const [pressureLogs, setPressureLogs] = useState<MarketPressureLog[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchMarketPressures = async (localityId?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('ai_market_pressure_logs')
        .select('*')
        .order('generated_at', { ascending: false });

      if (localityId) {
        query = query.eq('locality_id', localityId);
      }

      const { data, error } = await query;

      if (error) throw error;

      setPressureLogs(data || []);
    } catch (error) {
      console.error('Error fetching market pressure logs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch market pressure data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logMarketPressure = async (
    localityId: string | null,
    dataScope: string,
    pressureType: string,
    reasoning: string
  ) => {
    try {
      const { error } = await supabase
        .from('ai_market_pressure_logs')
        .insert({
          locality_id: localityId,
          data_scope: dataScope,
          pressure_type: pressureType,
          reasoning: reasoning
        });

      if (error) throw error;

      console.log('Market pressure logged successfully');
      
      // Refresh pressure logs
      fetchMarketPressures();
    } catch (error) {
      console.error('Error logging market pressure:', error);
      toast({
        title: "Error",
        description: "Failed to log market pressure data",
        variant: "destructive",
      });
    }
  };

  const getLogsByPressureType = (pressureType: string): MarketPressureLog[] => {
    return pressureLogs.filter(log => log.pressure_type === pressureType);
  };

  const getLogsByDataScope = (dataScope: string): MarketPressureLog[] => {
    return pressureLogs.filter(log => log.data_scope === dataScope);
  };

  return {
    pressureLogs,
    loading,
    fetchMarketPressures,
    logMarketPressure,
    getLogsByPressureType,
    getLogsByDataScope,
  };
};
