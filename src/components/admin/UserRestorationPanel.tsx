
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUserRestorations } from '@/hooks/useUserRestorations';
import { format } from 'date-fns';
import { RotateCcw } from 'lucide-react';

export function UserRestorationPanel() {
  const { restorations, loading, logUserRestoration } = useUserRestorations();
  const [userId, setUserId] = useState('');
  const [restorationType, setRestorationType] = useState('');
  const [restorationReason, setRestorationReason] = useState('');

  const handleLogRestoration = async () => {
    if (!userId || !restorationType) return;
    
    await logUserRestoration(userId, restorationType, restorationReason);
    setUserId('');
    setRestorationType('');
    setRestorationReason('');
  };

  const restorationTypes = ['unban', 'unthrottle', 'unflag', 'reinstate', 'pardon'];

  const getRestorationType = (type: string) => {
    switch (type) {
      case 'unban': return { label: 'Unban', variant: 'default' as const };
      case 'unthrottle': return { label: 'Unthrottle', variant: 'secondary' as const };
      case 'unflag': return { label: 'Unflag', variant: 'outline' as const };
      case 'reinstate': return { label: 'Reinstate', variant: 'default' as const };
      case 'pardon': return { label: 'Pardon', variant: 'secondary' as const };
      default: return { label: type, variant: 'outline' as const };
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RotateCcw className="h-5 w-5" />
          User Restoration Logs
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
            <Label htmlFor="restorationType">Restoration Type</Label>
            <Select value={restorationType} onValueChange={setRestorationType}>
              <SelectTrigger>
                <SelectValue placeholder="Select restoration type" />
              </SelectTrigger>
              <SelectContent>
                {restorationTypes.map(type => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="restorationReason">Restoration Reason</Label>
            <Textarea
              id="restorationReason"
              value={restorationReason}
              onChange={(e) => setRestorationReason(e.target.value)}
              placeholder="Reason for restoration (optional)"
            />
          </div>
          <Button onClick={handleLogRestoration} disabled={!userId || !restorationType}>
            Log Restoration
          </Button>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Restoration History</h3>
          {loading ? (
            <p className="text-muted-foreground">Loading restoration logs...</p>
          ) : (
            <div className="space-y-2">
              {restorations.map((restoration) => {
                const typeInfo = getRestorationType(restoration.restoration_type);
                return (
                  <div key={restoration.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">User: {restoration.user_id}</span>
                      <Badge variant={typeInfo.variant}>
                        {typeInfo.label}
                      </Badge>
                    </div>
                    {restoration.restoration_reason && (
                      <p className="text-sm text-muted-foreground mb-1">
                        Reason: {restoration.restoration_reason}
                      </p>
                    )}
                    <div className="text-xs text-muted-foreground">
                      Restored: {format(new Date(restoration.restored_at), 'PPp')}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
