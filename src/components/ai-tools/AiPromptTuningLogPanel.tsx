
import React, { useEffect } from 'react';
import { useAiPromptTuning } from '@/hooks/useAiPromptTuning';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Settings, Code, Zap } from 'lucide-react';

export default function AiPromptTuningLogPanel() {
  const { user } = useAuth();
  const { tuningLogs, loading, fetchPromptTuningLogs, getLogsByModule } = useAiPromptTuning();

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

  const getModuleIcon = (aiModule: string) => {
    switch (aiModule) {
      case 'pricing': return <Zap className="h-4 w-4" />;
      case 'crm': return <Settings className="h-4 w-4" />;
      case 'faq': return <Code className="h-4 w-4" />;
      default: return <Settings className="h-4 w-4" />;
    }
  };

  const getModuleColor = (aiModule: string) => {
    switch (aiModule) {
      case 'pricing': return 'bg-yellow-100 text-yellow-700';
      case 'crm': return 'bg-blue-100 text-blue-700';
      case 'faq': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          AI Prompt Tuning Logs ({tuningLogs.length})
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
                className="p-4 border rounded-lg bg-gradient-to-br from-white to-gray-50"
              >
                <div className="flex items-center justify-between mb-3">
                  <Badge className={`text-xs flex items-center gap-1 ${getModuleColor(log.ai_module)}`}>
                    {getModuleIcon(log.ai_module)}
                    {log.ai_module}
                  </Badge>
                  <div className="text-xs text-gray-500">
                    {new Date(log.tuned_at).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="bg-red-50 p-3 rounded">
                    <strong>Old Prompt:</strong>
                    <div className="mt-1 text-gray-700">{log.old_prompt}</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded">
                    <strong>New Prompt:</strong>
                    <div className="mt-1 text-gray-700">{log.new_prompt}</div>
                  </div>
                  {log.reason_for_change && (
                    <div className="bg-blue-50 p-3 rounded">
                      <strong>Reason for Change:</strong>
                      <div className="mt-1 text-gray-700">{log.reason_for_change}</div>
                    </div>
                  )}
                  {log.admin_id && (
                    <div className="text-xs text-gray-600">
                      Admin ID: {log.admin_id}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
