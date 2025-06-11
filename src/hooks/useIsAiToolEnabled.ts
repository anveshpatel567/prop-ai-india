
import { useAi } from '@/context/AiContext';

export function useIsAiToolEnabled(toolName: string): boolean {
  const { isToolEnabled } = useAi();
  return isToolEnabled(toolName);
}
