
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useAiToolFlags } from '@/hooks/useAiToolFlags';
import { Settings } from 'lucide-react';

export function AiToolTogglePanel() {
  const { flags, loading, updateToolFlag } = useAiToolFlags();

  const handleToggle = async (toolName: string, isEnabled: boolean) => {
    try {
      await updateToolFlag(toolName, isEnabled);
    } catch (error) {
      console.error('Error toggling tool:', error);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          AI Tool Controls
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-muted-foreground">Loading tool settings...</p>
        ) : (
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
        )}
      </CardContent>
    </Card>
  );
}
