
import { useCreditGate } from '@/context/CreditGateContext';

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
