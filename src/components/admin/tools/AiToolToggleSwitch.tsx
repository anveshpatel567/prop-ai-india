
import React, { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';

export function AiToolToggleSwitch({
  id,
  tool_name,
  is_enabled,
  onToggle,
}: {
  id: string;
  tool_name: string;
  is_enabled: boolean;
  onToggle?: (enabled: boolean) => void;
}) {
  const [enabled, setEnabled] = useState(is_enabled);
  const [loading, setLoading] = useState(false);

  async function toggle() {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('ai_tool_flags')
        .update({ is_enabled: !enabled })
        .eq('id', id);

      if (!error) {
        setEnabled(!enabled);
        onToggle?.(!enabled);
      }
    } catch (error) {
      console.error('Error toggling tool:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div className="flex items-center space-x-3">
        <span className="font-medium">{tool_name}</span>
        <Badge variant={enabled ? 'default' : 'secondary'}>
          {enabled ? 'ON' : 'OFF'}
        </Badge>
      </div>
      <Switch
        checked={enabled}
        onCheckedChange={toggle}
        disabled={loading}
      />
    </div>
  );
}
