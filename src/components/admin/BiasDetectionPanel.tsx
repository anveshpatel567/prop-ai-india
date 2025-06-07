
import React, { useEffect, useState } from 'react';
import { useBiasLogs } from '@/hooks/useBiasLogs';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Shield, Filter } from 'lucide-react';

export function BiasDetectionPanel(): JSX.Element {
  const { user } = useAuth();
  const { logs, loading, fetchBiasLogs } = useBiasLogs();
  const [biasFilter, setBiasFilter] = useState('all');

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchBiasLogs();
    }
  }, [user?.role]);

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
          <p>Loading bias detection logs...</p>
        </CardContent>
      </Card>
    );
  }

  const filteredLogs = logs.filter(log => {
    if (biasFilter === 'biased') return log.bias_detected;
    if (biasFilter === 'clean') return !log.bias_detected;
    return true;
  });

  const biasDetectedCount = logs.filter(log => log.bias_detected).length;
  const totalLogs = logs.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Bias Detection Logs ({filteredLogs.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  value={biasFilter}
                  onChange={(e) => setBiasFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <option value="all">All Logs</option>
                  <option value="biased">Bias Detected</option>
                  <option value="clean">Clean Results</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-red-50 text-red-700">
                Biased: {biasDetectedCount}
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                Total: {totalLogs}
              </Badge>
            </div>
          </div>

          {filteredLogs.length === 0 ? (
            <p className="text-gray-500">No bias detection logs found.</p>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredLogs.map((log) => (
                <div key={log.id} className="border border-gray-200 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {log.bias_detected ? (
                        <Badge className="bg-red-100 text-red-700 flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          Bias Detected
                        </Badge>
                      ) : (
                        <Badge className="bg-green-100 text-green-700">
                          Clean
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
                        {log.prompt}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Result:</h4>
                      <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                        {log.result}
                      </p>
                    </div>
                    
                    {log.notes && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Notes:</h4>
                        <p className="text-sm text-gray-600">{log.notes}</p>
                      </div>
                    )}
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
