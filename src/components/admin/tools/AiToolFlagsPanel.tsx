
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useAiToolFlags } from '@/hooks/useAiToolFlags';
import { Settings } from 'lucide-react';

export default function AiToolFlagsPanel() {
  const { flags, loading, fetchToolFlags, updateToolFlag } = useAiToolFlags();

  useEffect(() => {
    fetchToolFlags();
  }, []);

  const handleToggle = async (toolName: string, isEnabled: boolean) => {
    try {
      await updateToolFlag(toolName, isEnabled);
    } catch (error) {
      console.error('Error toggling tool:', error);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          AI Tool Controls
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {flags.map((flag) => (
            <div key={flag.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="font-medium">{flag.tool_name}</span>
                <Badge variant={flag.is_enabled ? 'default' : 'secondary'}>
                  {flag.is_enabled ? 'ON' : 'OFF'}
                </Badge>
              </div>
              <Switch
                checked={flag.is_enabled}
                onCheckedChange={(checked) => handleToggle(flag.tool_name, checked)}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
