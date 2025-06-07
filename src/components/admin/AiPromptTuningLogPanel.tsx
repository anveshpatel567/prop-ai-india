
import React, { useEffect } from 'react';
import { useAiPromptTuning } from '@/hooks/useAiPromptTuning';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Settings, Edit, User } from 'lucide-react';

export default function AiPromptTuningLogPanel() {
  const { user } = useAuth();
  const { tuningLogs, loading, fetchPromptTuningLogs } = useAiPromptTuning();

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchPromptTuningLogs();
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
          <p>Loading prompt tuning logs...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          AI Prompt Tuning Logs ({tuningLogs.length} entries)
        </CardTitle>
      </CardHeader>
      <CardContent>
        {tuningLogs.length === 0 ? (
          <p className="text-gray-500">No prompt tuning logs available yet.</p>
        ) : (
          <div className="space-y-4">
            {tuningLogs.map((log) => (
              <div
                key={log.id}
                className="p-4 border rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {log.ai_module}
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-700 text-xs">
                      <Edit className="h-3 w-3 mr-1" />
                      Tuned
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(log.tuned_at).toLocaleDateString()}
                  </div>
                </div>
                
                {log.reason_for_change && (
                  <div className="mb-2 text-sm bg-yellow-50 p-3 rounded">
                    <strong>Reason:</strong> {log.reason_for_change}
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-red-50 p-3 rounded">
                    <strong>Old Prompt:</strong>
                    <div className="mt-1 text-gray-700 max-h-20 overflow-y-auto">
                      {log.old_prompt}
                    </div>
                  </div>
                  <div className="bg-green-50 p-3 rounded">
                    <strong>New Prompt:</strong>
                    <div className="mt-1 text-gray-700 max-h-20 overflow-y-auto">
                      {log.new_prompt}
                    </div>
                  </div>
                </div>
                
                <div className="mt-2 text-xs text-gray-600 flex items-center gap-1">
                  <User className="h-3 w-3" />
                  Admin: {log.admin_id?.slice(0, 8)}...
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
