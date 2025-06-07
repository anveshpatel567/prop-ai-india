
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { useHallucinationRiskLogs } from '@/hooks/useHallucinationRiskLogs';
import { Loader2, AlertTriangle, Flag } from 'lucide-react';

export function HallucinationRiskPanel() {
  const { logs, loading, toggleFlag } = useHallucinationRiskLogs();
  const [sortBy, setSortBy] = useState<'risk' | 'date'>('date');

  const sortedLogs = [...logs].sort((a, b) => {
    if (sortBy === 'risk') {
      return b.risk_score - a.risk_score;
    }
    return new Date(b.detected_at).getTime() - new Date(a.detected_at).getTime();
  });

  const getRiskColor = (score: number) => {
    if (score >= 0.7) return 'bg-red-500';
    if (score >= 0.4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getRiskLabel = (score: number) => {
    if (score >= 0.7) return 'High Risk';
    if (score >= 0.4) return 'Medium Risk';
    return 'Low Risk';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          Hallucination Risk Logs
        </CardTitle>
        <div className="flex gap-2">
          <button
            onClick={() => setSortBy('date')}
            className={`px-3 py-1 rounded text-sm ${
              sortBy === 'date' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            Sort by Date
          </button>
          <button
            onClick={() => setSortBy('risk')}
            className={`px-3 py-1 rounded text-sm ${
              sortBy === 'risk' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            Sort by Risk
          </button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {sortedLogs.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No hallucination risks logged yet.
              </p>
            ) : (
              sortedLogs.map((log) => (
                <div key={log.id} className="p-4 border rounded-lg bg-gray-50">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">{log.feature}</Badge>
                        <div className="flex items-center gap-2">
                          <Progress 
                            value={log.risk_score * 100} 
                            className="w-20 h-2"
                          />
                          <span className="text-sm font-medium">
                            {(log.risk_score * 100).toFixed(0)}%
                          </span>
                          <Badge className={getRiskColor(log.risk_score)}>
                            {getRiskLabel(log.risk_score)}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Flag className={`h-4 w-4 ${log.flagged ? 'text-red-500' : 'text-gray-400'}`} />
                        <Switch
                          checked={log.flagged}
                          onCheckedChange={(checked) => toggleFlag(log.id, checked)}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-blue-50 p-3 rounded">
                        <h4 className="font-medium text-blue-900 mb-1">Input:</h4>
                        <p className="text-sm text-blue-800">
                          {log.input.length > 100 
                            ? `${log.input.substring(0, 100)}...`
                            : log.input
                          }
                        </p>
                      </div>
                      <div className="bg-orange-50 p-3 rounded">
                        <h4 className="font-medium text-orange-900 mb-1">Output:</h4>
                        <p className="text-sm text-orange-800">
                          {log.output.length > 100 
                            ? `${log.output.substring(0, 100)}...`
                            : log.output
                          }
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-600">
                      Detected: {new Date(log.detected_at).toLocaleString()}
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
