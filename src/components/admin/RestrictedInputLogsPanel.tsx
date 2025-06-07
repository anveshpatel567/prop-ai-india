
import React, { useEffect } from 'react';
import { useRestrictedInputs } from '@/hooks/useRestrictedInputs';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';

export function RestrictedInputLogsPanel(): JSX.Element {
  const { user } = useAuth();
  const { logs, loading, fetchRestrictedInputs } = useRestrictedInputs();

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchRestrictedInputs();
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
          <p>Loading restricted input logs...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Restricted Input Logs ({logs.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {logs.length === 0 ? (
            <p className="text-gray-500">No restricted input logs found.</p>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {logs.map((log) => (
                <div key={log.id} className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className="bg-red-100 text-red-700">
                      Restricted
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {new Date(log.rejected_at).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Rejected Input:</h4>
                      <p className="text-sm text-gray-600 bg-white p-2 rounded border">
                        {log.input_text.length > 200 ? `${log.input_text.substring(0, 200)}...` : log.input_text}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Restriction Reason:</h4>
                      <p className="text-sm text-red-600 font-medium">
                        {log.restriction_reason}
                      </p>
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
