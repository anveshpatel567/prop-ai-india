
import { useAi } from '@/context/AiProvider';

export function useIsAiToolEnabled(toolName: string): boolean {
  const { isToolEnabled } = useAi();
  return isToolEnabled(toolName);
}
