
import { useState, useEffect } from 'react';

export interface ToolCreditRequirement {
  tool_name: string;
  credits_required: number;
  description: string;
}

const TOOL_CREDIT_REQUIREMENTS: Record<string, ToolCreditRequirement> = {
  ai_search: {
    tool_name: 'ai_search',
    credits_required: 20,
    description: 'AI-powered property search with smart matching'
  },
  smart_pricing: {
    tool_name: 'smart_pricing',
    credits_required: 30,
    description: 'AI pricing analysis and recommendations'
  },
  brochure_parser: {
    tool_name: 'brochure_parser',
    credits_required: 50,
    description: 'AI property brochure parsing and data extraction'
  },
  video_generator: {
    tool_name: 'video_generator',
    credits_required: 100,
    description: 'AI property video generation'
  },
  lead_scorer: {
    tool_name: 'lead_scorer',
    credits_required: 25,
    description: 'AI lead scoring and qualification'
  },
  followup_generator: {
    tool_name: 'followup_generator',
    credits_required: 15,
    description: 'AI follow-up message generation'
  },
  title_generator: {
    tool_name: 'title_generator',
    credits_required: 10,
    description: 'AI property title generation'
  },
  nearby_finder: {
    tool_name: 'nearby_finder',
    credits_required: 12,
    description: 'AI nearby amenities finder'
  },
  agent_matcher: {
    tool_name: 'agent_matcher',
    credits_required: 18,
    description: 'AI agent matching service'
  },
  resume_builder: {
    tool_name: 'resume_builder',
    credits_required: 35,
    description: 'AI agent resume builder'
  }
};

export function useToolCreditRequirements() {
  const [requirements, setRequirements] = useState<Record<string, ToolCreditRequirement>>(TOOL_CREDIT_REQUIREMENTS);

  const getToolRequirement = (toolName: string): ToolCreditRequirement | null => {
    return requirements[toolName] || null;
  };

  const getRequiredCredits = (toolName: string): number => {
    return requirements[toolName]?.credits_required || 0;
  };

  const getAllRequirements = (): ToolCreditRequirement[] => {
    return Object.values(requirements);
  };

  return {
    requirements,
    getToolRequirement,
    getRequiredCredits,
    getAllRequirements
  };
}
