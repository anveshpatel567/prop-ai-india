
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AiMarketPressureLog {
  id: string;
  area_code: string;
  demand_index: number;
  supply_index: number;
  imbalance_ratio: number;
  pressure_level: string;
  generated_by: string | null;
  created_at: string;
}

export const useAiMarketPressureLogs = () => {
  const [pressureLogs, setPressureLogs] = useState<AiMarketPressureLog[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchMarketPressureLogs = async (areaCode?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('ai_market_pressure_logs')
        .select('*')
        .order('created_at', { ascending: false });

      if (areaCode) {
        query = query.eq('area_code', areaCode);
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
    areaCode: string,
    demandIndex: number,
    supplyIndex: number,
    imbalanceRatio: number,
    pressureLevel: string,
    generatedBy?: string
  ) => {
    try {
      const { error } = await supabase
        .from('ai_market_pressure_logs')
        .insert({
          area_code: areaCode,
          demand_index: demandIndex,
          supply_index: supplyIndex,
          imbalance_ratio: imbalanceRatio,
          pressure_level: pressureLevel,
          generated_by: generatedBy || null
        });

      if (error) throw error;

      console.log('Market pressure logged successfully');
      
      // Refresh logs
      fetchMarketPressureLogs();
    } catch (error) {
      console.error('Error logging market pressure:', error);
      toast({
        title: "Error",
        description: "Failed to log market pressure data",
        variant: "destructive",
      });
    }
  };

  const getLogsByPressureLevel = (pressureLevel: string): AiMarketPressureLog[] => {
    return pressureLogs.filter(log => log.pressure_level === pressureLevel);
  };

  const getLatestByArea = (areaCode: string): AiMarketPressureLog | null => {
    const areaLogs = pressureLogs.filter(log => log.area_code === areaCode);
    return areaLogs.length > 0 ? areaLogs[0] : null;
  };

  const getAverageImbalanceRatio = (): number => {
    if (pressureLogs.length === 0) return 0;
    const total = pressureLogs.reduce((sum, log) => sum + log.imbalance_ratio, 0);
    return Number((total / pressureLogs.length).toFixed(2));
  };

  return {
    pressureLogs,
    loading,
    fetchMarketPressureLogs,
    logMarketPressure,
    getLogsByPressureLevel,
    getLatestByArea,
    getAverageImbalanceRatio,
  };
};
