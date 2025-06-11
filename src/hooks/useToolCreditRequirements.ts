
import { useCreditGate } from '@/context/CreditGateContext';
import { ToolRequirement } from '@/types';

export const useToolCreditRequirements = () => {
  const { getToolRequirement } = useCreditGate();

  const getRequiredCredits = (toolName: string): number => {
    const requirement = getToolRequirement(toolName);
    return requirement?.credits_required || 0;
  };

  return {
    getRequiredCredits,
    getToolRequirement
  };
};
