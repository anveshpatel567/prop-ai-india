
import { useCreditGate } from '@/context/CreditGateContext';

export interface ToolCreditRequirement {
  tool_name: string;
  credits_required: number;
  description: string;
}

export function useToolCreditRequirements() {
  const { getToolRequirement } = useCreditGate();

  const getRequiredCredits = (toolName: string): number => {
    return getToolRequirement(toolName)?.credits_required || 0;
  };

  const getAllRequirements = (): ToolCreditRequirement[] => {
    const toolNames = [
      'ai_search', 'smart_pricing', 'brochure_parser', 'video_generator',
      'lead_scorer', 'followup_generator', 'title_generator', 'quality_enhancer',
      'whatsapp_responder', 'bias_detector'
    ];
    
    return toolNames
      .map(name => getToolRequirement(name))
      .filter(req => req !== null) as ToolCreditRequirement[];
  };

  return {
    getToolRequirement,
    getRequiredCredits,
    getAllRequirements
  };
}
