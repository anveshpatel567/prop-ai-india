import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useWallet } from './WalletContext';
import { ToolUsageLogger } from '@/utils/toolUsageLog';
import { useAuth } from './AuthContext';

interface ToolCreditRequirement {
  tool_name: string;
  credits_required: number;
  description: string;
}

interface CreditGateContextType {
  checkToolAccess: (toolName: string) => {
    canAccess: boolean;
    creditsRequired: number;
    currentCredits: number;
    reason?: string;
  };
  logToolAttempt: (toolName: string, hasCredits: boolean) => void;
  isLoading: boolean;
  getToolRequirement: (toolName: string) => ToolCreditRequirement | null;
}

const CreditGateContext = createContext<CreditGateContextType | null>(null);

export const CreditGateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  if (typeof window === 'undefined') return null;
  return <CreditGateProviderInner>{children}</CreditGateProviderInner>;
};

const CreditGateProviderInner: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const TOOL_CREDIT_REQUIREMENTS: Record<string, ToolCreditRequirement> = {
    ai_search: {
      tool_name: 'ai_search',
      credits_required: 10,
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
    quality_enhancer: {
      tool_name: 'quality_enhancer',
      credits_required: 100,
      description: 'AI listing quality enhancement suggestions'
    },
    whatsapp_responder: {
      tool_name: 'whatsapp_responder',
      credits_required: 8,
      description: 'AI WhatsApp auto-response generation'
    },
    bias_detector: {
      tool_name: 'bias_detector',
      credits_required: 5,
      description: 'AI bias and ethics detection'
    }
  };

  if (!mounted) {
    return <div>Loading...</div>;
  }

  const { user } = useAuth();
  const { balance } = useWallet();

  const getToolRequirement = (toolName: string): ToolCreditRequirement | null => {
    return TOOL_CREDIT_REQUIREMENTS[toolName] || null;
  };

  const getRequiredCredits = (toolName: string): number => {
    return TOOL_CREDIT_REQUIREMENTS[toolName]?.credits_required || 0;
  };

  const checkToolAccess = (toolName: string) => {
    const creditsRequired = getRequiredCredits(toolName);
    const currentCredits = balance?.balance || 0;
    
    if (currentCredits >= creditsRequired) {
      return {
        canAccess: true,
        creditsRequired,
        currentCredits
      };
    }
    
    return {
      canAccess: false,
      creditsRequired,
      currentCredits,
      reason: `Insufficient credits. Need ${creditsRequired - currentCredits} more credits.`
    };
  };

  const logToolAttempt = async (toolName: string, hasCredits: boolean) => {
    try {
      const creditsRequired = getRequiredCredits(toolName);
      const currentCredits = balance?.balance || 0;
      
      await ToolUsageLogger.logAttempt({
        tool_name: toolName,
        user_id: user?.id || null,
        has_credits: hasCredits,
        credits_required: creditsRequired,
        current_credits: currentCredits,
        access_granted: hasCredits && currentCredits >= creditsRequired
      });
      
      console.log(`Tool attempt logged: ${toolName}, hasCredits: ${hasCredits}`);
    } catch (error) {
      console.error('Failed to log tool attempt:', error);
    }
  };

  return (
    <CreditGateContext.Provider value={{
      checkToolAccess,
      logToolAttempt,
      isLoading,
      getToolRequirement
    }}>
      {children}
    </CreditGateContext.Provider>
  );
};

export const useCreditGate = () => {
  const context = useContext(CreditGateContext);
  if (!context) {
    throw new Error('useCreditGate must be used within CreditGateProvider');
  }
  return context;
};
