
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useAnomalies } from '@/hooks/useAnomalies';
import { Loader2, AlertCircle, ChevronDown, ChevronRight } from 'lucide-react';

export function AnomalyLogPanel() {
  const { anomalies, loading } = useAnomalies();
  const [filter, setFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const filteredAnomalies = anomalies.filter(anomaly => 
    filter === 'all' || anomaly.severity === filter
  );

  const getSeverityColor = (severity: string | null) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          Anomaly Detection Logs
        </CardTitle>
        <div className="flex gap-2">
          {['all', 'high', 'medium', 'low'].map((severity) => (
            <button
              key={severity}
              onClick={() => setFilter(severity as any)}
              className={`px-3 py-1 rounded text-sm ${
                filter === severity ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              {severity.charAt(0).toUpperCase() + severity.slice(1)}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredAnomalies.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No anomalies logged yet.
              </p>
            ) : (
              filteredAnomalies.map((anomaly) => (
                <Collapsible key={anomaly.id}>
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <CollapsibleTrigger 
                      className="w-full"
                      onClick={() => toggleExpanded(anomaly.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            {expandedItems.has(anomaly.id) ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                            <span className="font-medium">{anomaly.anomaly_type}</span>
                          </div>
                          <Badge className={getSeverityColor(anomaly.severity)}>
                            {anomaly.severity || 'Unknown'}
                          </Badge>
                        </div>
                        <span className="text-xs text-gray-600">
                          {new Date(anomaly.detected_at).toLocaleString()}
                        </span>
                      </div>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                      {anomaly.metadata && (
                        <div className="mt-3 p-3 bg-white rounded border">
                          <h4 className="font-medium mb-2">Metadata:</h4>
                          <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                            {anomaly.metadata}
                          </pre>
                        </div>
                      )}
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
