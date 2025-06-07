
import { useState, useEffect } from 'react';
import { useDailySnapshots } from '@/hooks/useDailySnapshots';
import { useModuleHealth } from '@/hooks/useModuleHealth';
import { useShadowbanLogs } from '@/hooks/useShadowbanLogs';
import { useAnomalies } from '@/hooks/useAnomalies';

interface DashboardSummary {
  totalPromptsToday: number;
  avgLatency: number;
  activeBans: number;
  detectedAnomalies: number;
  systemHealth: 'healthy' | 'warning' | 'critical';
}

export function useAiOversightDashboardData() {
  const [summary, setSummary] = useState<DashboardSummary>({
    totalPromptsToday: 0,
    avgLatency: 0,
    activeBans: 0,
    detectedAnomalies: 0,
    systemHealth: 'healthy'
  });
  const [loading, setLoading] = useState(true);

  const { snapshots } = useDailySnapshots();
  const { metrics } = useModuleHealth();
  const { logs: shadowbanLogs } = useShadowbanLogs();
  const { anomalies } = useAnomalies();

  useEffect(() => {
    if (snapshots.length === 0 && metrics.length === 0 && shadowbanLogs.length === 0 && anomalies.length === 0) {
      setLoading(false);
      return;
    }

    // Get today's snapshot
    const today = new Date().toISOString().split('T')[0];
    const todaySnapshot = snapshots.find(s => s.snapshot_date === today);

    // Calculate average latency from health metrics
    const avgLatency = metrics.length > 0 
      ? Math.round(metrics.reduce((acc, m) => acc + (m.average_latency_ms || 0), 0) / metrics.length)
      : 0;

    // Count active shadowbans (those without end date)
    const activeBans = shadowbanLogs.filter(log => !log.shadowban_end).length;

    // Count today's anomalies
    const todayAnomalies = anomalies.filter(a => {
      const anomalyDate = new Date(a.detected_at).toISOString().split('T')[0];
      return anomalyDate === today;
    }).length;

    // Determine system health
    const avgUptime = metrics.length > 0 
      ? metrics.reduce((acc, m) => acc + m.uptime_percentage, 0) / metrics.length
      : 100;
    
    let systemHealth: 'healthy' | 'warning' | 'critical' = 'healthy';
    if (avgUptime < 80) systemHealth = 'critical';
    else if (avgUptime < 95) systemHealth = 'warning';

    setSummary({
      totalPromptsToday: todaySnapshot?.total_prompts || 0,
      avgLatency,
      activeBans,
      detectedAnomalies: todayAnomalies,
      systemHealth
    });

    setLoading(false);
  }, [snapshots, metrics, shadowbanLogs, anomalies]);

  return { summary, loading };
}
