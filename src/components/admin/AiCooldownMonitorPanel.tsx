
import React, { useEffect } from 'react';
import { useAiCooldownLogs } from '@/hooks/useAiCooldownLogs';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, CheckCircle } from 'lucide-react';

export function AiCooldownMonitorPanel(): JSX.Element {
  const { user } = useAuth();
  const { cooldowns, loading, fetchCooldownLogs, resolveCooldown } = useAiCooldownLogs();

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchCooldownLogs();
    }
  }, [user?.role]);

  if (!user || user.role !== 'admin') {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-gray-500">Access restricted to administrators only.</p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <p>Loading cooldown logs...</p>
        </CardContent>
      </Card>
    );
  }

  const getCooldownStatus = (triggeredAt: string, durationMinutes: number, resolved: boolean) => {
    if (resolved) return { status: 'Resolved', expired: true };
    
    const triggerTime = new Date(triggeredAt);
    const expiryTime = new Date(triggerTime.getTime() + durationMinutes * 60000);
    const now = new Date();
    
    if (now >= expiryTime) {
      return { status: 'Expired', expired: true };
    }
    
    const remainingMs = expiryTime.getTime() - now.getTime();
    const remainingMins = Math.ceil(remainingMs / (1000 * 60));
    return { status: `${remainingMins}m remaining`, expired: false };
  };

  const activeCooldowns = cooldowns.filter(cooldown => !cooldown.resolved);
  const resolvedCooldowns = cooldowns.filter(cooldown => cooldown.resolved);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          AI Feature Cooldowns ({cooldowns.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activeCooldowns.length > 0 && (
            <div>
              <h4 className="font-medium mb-3 text-gray-700">Active Cooldowns</h4>
              <div className="space-y-3">
                {activeCooldowns.map((cooldown) => {
                  const statusInfo = getCooldownStatus(
                    cooldown.cooldown_triggered_at,
                    cooldown.duration_minutes,
                    cooldown.resolved
                  );
                  
                  return (
                    <div
                      key={cooldown.id}
                      className="p-4 border rounded-lg bg-gradient-to-br from-white to-gray-50"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-700">{cooldown.feature}</span>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-600">
                            {cooldown.duration_minutes}m duration
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(cooldown.cooldown_triggered_at).toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-medium ${
                          statusInfo.expired ? 'text-green-600' : 'text-yellow-600'
                        }`}>
                          {statusInfo.status}
                        </span>
                        
                        {!cooldown.resolved && (
                          <button
                            onClick={() => resolveCooldown(cooldown.id)}
                            className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition"
                          >
                            <CheckCircle className="h-3 w-3" />
                            Resolve
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {resolvedCooldowns.length > 0 && (
            <div>
              <h4 className="font-medium mb-3 text-gray-700">Recently Resolved</h4>
              <div className="space-y-2">
                {resolvedCooldowns.slice(0, 5).map((cooldown) => (
                  <div
                    key={cooldown.id}
                    className="p-3 border rounded-lg bg-gray-50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">{cooldown.feature}</span>
                        <span className="text-xs text-green-600">Resolved</span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(cooldown.cooldown_triggered_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {cooldowns.length === 0 && (
            <p className="text-gray-500">No cooldown logs found.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
