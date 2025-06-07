
import React, { useEffect } from 'react';
import { useToxicityLogs } from '@/hooks/useToxicityLogs';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Flag } from 'lucide-react';

export function ToxicityDetectionPanel(): JSX.Element {
  const { user } = useAuth();
  const { logs, loading, fetchToxicityLogs } = useToxicityLogs();

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchToxicityLogs();
    }
  }, [user?.role]);

  const getToxicityColor = (score: number) => {
    if (score < 0.3) return 'bg-green-500';
    if (score < 0.6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getToxicityLabel = (score: number) => {
    if (score < 0.3) return 'Low';
    if (score < 0.6) return 'Medium';
    return 'High';
  };

  if (!user || user.role !== 'admin') {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-gray-500">Access restricted to administrators only.</p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <p>Loading toxicity detection logs...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Toxicity Detection Logs ({logs.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {logs.length === 0 ? (
            <p className="text-gray-500">No toxicity logs found.</p>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {logs.map((log) => (
                <div key={log.id} className="border border-gray-200 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Badge className={`${getToxicityColor(log.toxicity_score)} text-white`}>
                        {getToxicityLabel(log.toxicity_score)} ({(log.toxicity_score * 100).toFixed(1)}%)
                      </Badge>
                      {log.flagged && (
                        <Badge className="bg-red-100 text-red-700 flex items-center gap-1">
                          <Flag className="h-3 w-3" />
                          Flagged
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(log.detected_at).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Prompt:</h4>
                      <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                        {log.prompt.length > 200 ? `${log.prompt.substring(0, 200)}...` : log.prompt}
                      </p>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getToxicityColor(log.toxicity_score)}`}
                        style={{ width: `${log.toxicity_score * 100}%` }}
                      />
                    </div>
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
