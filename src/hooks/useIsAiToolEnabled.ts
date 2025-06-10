
import { useAi } from '@/context/AiContext';

export const useIsAiToolEnabled = (toolName: string): boolean => {
  const { isToolEnabled } = useAi();
  return isToolEnabled(toolName);
};
