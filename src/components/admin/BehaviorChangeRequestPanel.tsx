
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useBehaviorChangeRequests } from '@/hooks/useBehaviorChangeRequests';
import { Loader2, FileEdit, Plus, Check, X, Clock } from 'lucide-react';

export function BehaviorChangeRequestPanel() {
  const { requests, loading, submitBehaviorChangeRequest, updateRequestStatus } = useBehaviorChangeRequests();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    agent_id: '',
    proposed_change: '',
    reason: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitBehaviorChangeRequest(
      formData.agent_id,
      formData.proposed_change,
      formData.reason || undefined
    );
    setFormData({ agent_id: '', proposed_change: '', reason: '' });
    setIsDialogOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <Check className="h-4 w-4" />;
      case 'rejected': return <X className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileEdit className="h-4 w-4" />
            Behavior Change Requests
          </CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Request
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Submit Behavior Change Request</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Agent ID"
                  value={formData.agent_id}
                  onChange={(e) => setFormData({ ...formData, agent_id: e.target.value })}
                  required
                />
                <Textarea
                  placeholder="Proposed Change"
                  value={formData.proposed_change}
                  onChange={(e) => setFormData({ ...formData, proposed_change: e.target.value })}
                  required
                />
                <Textarea
                  placeholder="Reason (optional)"
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                />
                <Button type="submit" className="w-full">
                  Submit Request
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {requests.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No behavior change requests submitted yet.
              </p>
            ) : (
              requests.map((request) => (
                <div key={request.id} className="p-4 border rounded-lg bg-gray-50">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{request.agent_id}</Badge>
                        <Badge className={getStatusColor(request.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(request.status)}
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </div>
                        </Badge>
                      </div>
                      <span className="text-xs text-gray-600">
                        {new Date(request.requested_at).toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="bg-white p-3 rounded">
                      <h4 className="font-medium mb-2">Proposed Change:</h4>
                      <p className="text-sm text-gray-700">{request.proposed_change}</p>
                    </div>
                    
                    {request.reason && (
                      <div className="bg-blue-50 p-3 rounded">
                        <h4 className="font-medium text-blue-900 mb-2">Reason:</h4>
                        <p className="text-sm text-blue-800">{request.reason}</p>
                      </div>
                    )}
                    
                    {request.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => updateRequestStatus(request.id, 'approved')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => updateRequestStatus(request.id, 'rejected')}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    )}
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
