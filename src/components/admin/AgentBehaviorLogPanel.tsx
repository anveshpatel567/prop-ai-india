
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useAgentBehaviorLogs } from '@/hooks/useAgentBehaviorLogs';
import { Loader2, Bot, ChevronDown, ChevronRight, Search } from 'lucide-react';

export function AgentBehaviorLogPanel() {
  const { logs, loading } = useAgentBehaviorLogs();
  const [agentFilter, setAgentFilter] = useState('');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const filteredLogs = logs.filter(log => 
    agentFilter === '' || log.agent_id.toLowerCase().includes(agentFilter.toLowerCase())
  );

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const formatBehaviorSnapshot = (snapshot: string) => {
    try {
      return JSON.stringify(JSON.parse(snapshot), null, 2);
    } catch {
      return snapshot;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-4 w-4" />
          Agent Behavior Logs
        </CardTitle>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Filter by Agent ID..."
            value={agentFilter}
            onChange={(e) => setAgentFilter(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredLogs.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No agent behavior logs found.
              </p>
            ) : (
              filteredLogs.map((log) => (
                <Collapsible key={log.id}>
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <CollapsibleTrigger 
                      className="w-full"
                      onClick={() => toggleExpanded(log.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            {expandedItems.has(log.id) ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                            <Badge variant="outline">{log.agent_id}</Badge>
                          </div>
                          <span className="text-sm text-gray-700">{log.context}</span>
                        </div>
                        <span className="text-xs text-gray-600">
                          {new Date(log.logged_at).toLocaleString()}
                        </span>
                      </div>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                      <div className="mt-3 p-3 bg-white rounded border">
                        <h4 className="font-medium mb-2">Behavior Snapshot:</h4>
                        <pre className="text-sm text-gray-700 whitespace-pre-wrap bg-gray-50 p-2 rounded overflow-x-auto">
                          {formatBehaviorSnapshot(log.behavior_snapshot)}
                        </pre>
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              ))
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
