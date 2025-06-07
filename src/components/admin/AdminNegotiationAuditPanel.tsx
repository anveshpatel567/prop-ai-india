
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Users, TrendingUp, AlertTriangle } from 'lucide-react';
import { useAiNegotiationLogs } from '@/hooks/useAiNegotiationLogs';

export const AdminNegotiationAuditPanel: React.FC = () => {
  const { logs, loading } = useAiNegotiationLogs();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'default';
      case 'rejected': return 'destructive';
      case 'countered': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Negotiation Threads
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            {loading ? (
              <div className="text-center text-muted-foreground">Loading...</div>
            ) : logs.length === 0 ? (
              <div className="text-center text-muted-foreground">No negotiations yet</div>
            ) : (
              <div className="space-y-3">
                {logs.slice(0, 10).map((log) => (
                  <div key={log.id} className="p-3 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">Thread #{log.id.slice(0, 8)}</span>
                      <Badge variant={getStatusColor(log.step_outcome || 'pending')}>
                        {log.step_outcome || 'pending'}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>Listing: {log.listing_id.slice(0, 8)}...</p>
                      <p>Participants: {log.seeker_id.slice(0, 8)}... ↔ {log.agent_id.slice(0, 8)}...</p>
                      <p>Created: {new Date(log.created_at).toLocaleDateString()}</p>
                    </div>
                    {log.ai_suggestion && (
                      <div className="text-xs bg-blue-50 p-2 rounded">
                        <span className="font-medium">AI Suggestion:</span>
                        <p className="mt-1">{log.ai_suggestion.slice(0, 100)}...</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Negotiation Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{logs.length}</div>
                <div className="text-sm text-muted-foreground">Total Threads</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {logs.filter(l => l.step_outcome === 'success').length}
                </div>
                <div className="text-sm text-muted-foreground">Successful</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              AI Usage Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>AI-Generated Messages</span>
                <Badge variant="secondary">
                  {logs.filter(l => l.ai_suggestion).length}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Manual Messages</span>
                <Badge variant="outline">
                  {logs.filter(l => !l.ai_suggestion).length}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
