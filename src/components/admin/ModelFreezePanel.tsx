
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useModelFreezeLogs } from '@/hooks/useModelFreezeLogs';
import { Loader2, Snowflake, AlertTriangle } from 'lucide-react';

export function ModelFreezePanel() {
  const { logs, loading, freezeModel } = useModelFreezeLogs();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [freezeData, setFreezeData] = useState({
    model_version: '',
    reason: ''
  });

  const handleFreezeModel = async () => {
    if (!freezeData.model_version || !freezeData.reason) {
      return;
    }

    await freezeModel(freezeData.model_version, freezeData.reason);

    setFreezeData({
      model_version: '',
      reason: ''
    });
    setIsDialogOpen(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex items-center gap-2">
          <Snowflake className="h-4 w-4" />
          Model Freeze Control
        </CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="destructive">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Emergency Freeze
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Emergency Model Freeze</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="model_version">Model Version</Label>
                <Input
                  id="model_version"
                  value={freezeData.model_version}
                  onChange={(e) => setFreezeData({ ...freezeData, model_version: e.target.value })}
                  placeholder="Enter model version to freeze"
                />
              </div>
              <div>
                <Label htmlFor="reason">Reason for Freeze</Label>
                <Textarea
                  id="reason"
                  value={freezeData.reason}
                  onChange={(e) => setFreezeData({ ...freezeData, reason: e.target.value })}
                  placeholder="Explain why this model needs to be frozen"
                />
              </div>
              <Button onClick={handleFreezeModel} variant="destructive" className="w-full">
                Freeze Model
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
            {logs.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No model freezes recorded.
              </p>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="p-4 border rounded-lg bg-blue-50 border-blue-200">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-blue-900">{log.model_version}</h3>
                      <Badge variant="secondary">
                        Frozen
                      </Badge>
                    </div>
                    <p className="text-sm text-blue-700">
                      Reason: {log.reason}
                    </p>
                    <p className="text-xs text-blue-600">
                      Frozen: {new Date(log.frozen_at).toLocaleString()}
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
