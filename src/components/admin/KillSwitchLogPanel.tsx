
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useKillSwitchLogs } from '@/hooks/useKillSwitchLogs';
import { format } from 'date-fns';
import { AlertTriangle } from 'lucide-react';

export function KillSwitchLogPanel() {
  const { logs, loading, triggerKillSwitch } = useKillSwitchLogs();
  const [module, setModule] = useState('');
  const [reason, setReason] = useState('');

  const handleTriggerKillSwitch = async () => {
    if (!module || !reason) return;
    
    await triggerKillSwitch(module, reason);
    setModule('');
    setReason('');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          Kill Switch Logs
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4 p-4 bg-red-50 rounded-lg border border-red-200">
          <div>
            <Label htmlFor="module">Module</Label>
            <Input
              id="module"
              value={module}
              onChange={(e) => setModule(e.target.value)}
              placeholder="AI module to disable"
            />
          </div>
          <div>
            <Label htmlFor="reason">Reason</Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Emergency reason for kill switch"
            />
          </div>
          <Button 
            onClick={handleTriggerKillSwitch} 
            disabled={!module || !reason}
            variant="destructive"
          >
            Trigger Kill Switch
          </Button>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Kill Switch History</h3>
          {loading ? (
            <p className="text-muted-foreground">Loading kill switch logs...</p>
          ) : (
            <div className="space-y-2">
              {logs.map((log) => (
                <div key={log.id} className="p-3 border rounded-lg border-red-200 bg-red-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Module: {log.module}</span>
                    <Badge variant="destructive">Emergency</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Reason: {log.reason}
                  </p>
                  <div className="text-xs text-muted-foreground">
                    Triggered: {format(new Date(log.triggered_at), 'PPp')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
