
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
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

  const getRestorationTypeColor = (type: string) => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes('unban')) return 'bg-green-100 text-green-800';
    if (lowerType.includes('unthrottle')) return 'bg-blue-100 text-blue-800';
    if (lowerType.includes('unflag')) return 'bg-purple-100 text-purple-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RotateCcw className="h-5 w-5" />
          User Restorations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
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
            <Input
              id="restorationType"
              value={restorationType}
              onChange={(e) => setRestorationType(e.target.value)}
              placeholder="e.g., unban, unthrottle, unflag"
            />
          </div>
          <div>
            <Label htmlFor="restorationReason">Restoration Reason (Optional)</Label>
            <Textarea
              id="restorationReason"
              value={restorationReason}
              onChange={(e) => setRestorationReason(e.target.value)}
              placeholder="Reason for restoration"
            />
          </div>
          <Button onClick={handleLogRestoration} disabled={!userId || !restorationType}>
            Log Restoration
          </Button>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Restoration History</h3>
          {loading ? (
            <p className="text-muted-foreground">Loading user restorations...</p>
          ) : (
            <div className="space-y-2">
              {restorations.map((restoration) => (
                <div key={restoration.id} className="p-3 border rounded-lg border-green-200 bg-green-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">User: {restoration.user_id}</span>
                    <Badge className={getRestorationTypeColor(restoration.restoration_type)}>
                      {restoration.restoration_type}
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
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
