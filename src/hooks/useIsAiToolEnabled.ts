
import { useAiToolFlags } from './useAiToolFlags';

export function useIsAiToolEnabled(toolName: string) {
  const { isToolEnabled } = useAiToolFlags();
  return isToolEnabled(toolName);
}
