
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useShadowbanLogs } from '@/hooks/useShadowbanLogs';
import { format } from 'date-fns';
import { UserX } from 'lucide-react';

export function ShadowbanManagerPanel() {
  const { logs, loading, shadowbanUser } = useShadowbanLogs();
  const [userId, setUserId] = useState('');
  const [reason, setReason] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleShadowban = async () => {
    if (!userId || !reason) return;
    
    await shadowbanUser(userId, reason, endDate || undefined);
    setUserId('');
    setReason('');
    setEndDate('');
  };

  const isActiveBan = (log: any) => {
    if (!log.shadowban_end) return true;
    return new Date(log.shadowban_end) > new Date();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserX className="h-5 w-5" />
          Shadowban Manager
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4 p-4 bg-muted/50 rounded-lg">
          <div>
            <Label htmlFor="userId">User ID</Label>
            <Input
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter user ID"
            />
          </div>
          <div>
            <Label htmlFor="reason">Reason</Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Reason for shadowban"
            />
          </div>
          <div>
            <Label htmlFor="endDate">End Date (Optional)</Label>
            <Input
              id="endDate"
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <Button onClick={handleShadowban} disabled={!userId || !reason}>
            Apply Shadowban
          </Button>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Shadowban History</h3>
          {loading ? (
            <p className="text-muted-foreground">Loading shadowban logs...</p>
          ) : (
            <div className="space-y-2">
              {logs.map((log) => (
                <div key={log.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">User: {log.user_id}</span>
                    <Badge variant={isActiveBan(log) ? "destructive" : "secondary"}>
                      {isActiveBan(log) ? "Active" : "Expired"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Reason: {log.reason}
                  </p>
                  <div className="text-xs text-muted-foreground">
                    Started: {format(new Date(log.shadowban_start), 'PPp')}
                    {log.shadowban_end && (
                      <span className="ml-2">
                        Ends: {format(new Date(log.shadowban_end), 'PPp')}
                      </span>
                    )}
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
