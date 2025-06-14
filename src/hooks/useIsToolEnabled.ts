
import { useAiToolFlags } from '@/hooks/useAiToolFlags';

export function useIsToolEnabled(toolName: string): boolean {
  const { flags } = useAiToolFlags();
  const match = flags.find((f) => f.tool_name === toolName);
  return match?.is_enabled ?? true; // Default to enabled if not found
}
