
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface AdminAlert {
  id: string;
  type: string;
  message: string;
  severity: 'info' | 'warning' | 'critical';
  related_tool: string | null;
  acknowledged: boolean;
  acknowledged_by: string | null;
  acknowledged_at: string | null;
  created_at: string;
}

export function useAdminAlerts() {
  const [alerts, setAlerts] = useState<AdminAlert[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('ai_admin_alerts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setAlerts(data || []);
    } catch (error) {
      console.error('Error fetching admin alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchAlerts, 30000);
    return () => clearInterval(interval);
  }, []);

  const acknowledgeAlert = async (alertId: string) => {
    try {
      const { error } = await supabase
        .from('ai_admin_alerts')
        .update({
          acknowledged: true,
          acknowledged_at: new Date().toISOString()
        })
        .eq('id', alertId);

      if (error) throw error;
      await fetchAlerts();
    } catch (error) {
      console.error('Error acknowledging alert:', error);
      throw error;
    }
  };

  return {
    alerts,
    loading,
    acknowledgeAlert,
    unacknowledgedCount: alerts.filter(alert => !alert.acknowledged).length
  };
}
