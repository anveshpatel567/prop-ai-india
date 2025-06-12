
import { useCreditGate } from '@/context/CreditGateContext';

export const useIsAiToolEnabled = (toolName: string): boolean => {
  const { getToolRequirement } = useCreditGate();
  
  const requirement = getToolRequirement(toolName);
  return requirement?.is_enabled ?? false;
};
