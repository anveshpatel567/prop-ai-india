
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRetrainTriggers } from '@/hooks/useRetrainTriggers';
import { Loader2, RefreshCw, Plus } from 'lucide-react';

export function RetrainTriggerPanel() {
  const { triggers, loading, triggerRetrain, updateTriggerStatus } = useRetrainTriggers();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [triggerReason, setTriggerReason] = useState('');

  const handleTriggerRetrain = async () => {
    if (!triggerReason) {
      return;
    }

    await triggerRetrain(triggerReason);
    setTriggerReason('');
    setIsDialogOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'default';
      case 'approved':
        return 'default';
      case 'rejected':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Retrain Triggers
        </CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Request Retrain
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request Model Retrain</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="trigger_reason">Reason for Retrain</Label>
                <Textarea
                  id="trigger_reason"
                  value={triggerReason}
                  onChange={(e) => setTriggerReason(e.target.value)}
                  placeholder="Explain why the model needs to be retrained"
                />
              </div>
              <Button onClick={handleTriggerRetrain} className="w-full">
                Submit Retrain Request
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {triggers.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No retrain triggers submitted.
              </p>
            ) : (
              triggers.map((trigger) => (
                <div key={trigger.id} className="p-4 border rounded-lg">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant={getStatusColor(trigger.status)}>
                        {trigger.status.charAt(0).toUpperCase() + trigger.status.slice(1)}
                      </Badge>
                      {trigger.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateTriggerStatus(trigger.id, 'approved')}
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => updateTriggerStatus(trigger.id, 'rejected')}
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {trigger.trigger_reason}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Requested: {new Date(trigger.requested_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
