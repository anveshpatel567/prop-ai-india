
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ToolRequirement, ToolAccessResult } from '../types';

interface CreditGateContextType {
  isEnabled: boolean;
  setEnabled: (enabled: boolean) => void;
  checkToolAccess: (toolName: string) => ToolAccessResult;
  logToolAttempt: (toolName: string, success: boolean) => Promise<void>;
  getToolRequirement: (toolName: string) => ToolRequirement | null;
}

const CreditGateContext = createContext<CreditGateContextType | null>(null);

interface CreditGateProviderProps {
  children: ReactNode;
}

export const CreditGateProvider: React.FC<CreditGateProviderProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const [toolRequirements, setToolRequirements] = useState<ToolRequirement[]>([]);

  useEffect(() => {
    setHasMounted(true);
    
    // Initialize default tool requirements
    const defaultRequirements: ToolRequirement[] = [
      { tool_name: 'ai_search', credits_required: 10, is_enabled: true },
      { tool_name: 'smart_pricing', credits_required: 30, is_enabled: true },
      { tool_name: 'brochure_parser', credits_required: 50, is_enabled: true },
      { tool_name: 'video_generator', credits_required: 100, is_enabled: true },
      { tool_name: 'lead_scorer', credits_required: 25, is_enabled: true },
      { tool_name: 'whatsapp_responder', credits_required: 8, is_enabled: true },
      { tool_name: 'ai-pricing', credits_required: 25, is_enabled: true },
    ];
    
    setToolRequirements(defaultRequirements);
  }, []);

  const setEnabled = (enabled: boolean) => {
    if (!hasMounted) return;
    setIsEnabled(enabled);
  };

  const checkToolAccess = (toolName: string): ToolAccessResult => {
    if (!hasMounted) {
      return {
        canAccess: false,
        creditsRequired: 0,
        currentCredits: 0,
        reason: 'System not ready'
      };
    }

    const requirement = toolRequirements.find(req => req.tool_name === toolName);
    if (!requirement) {
      return {
        canAccess: false,
        creditsRequired: 0,
        currentCredits: 0,
        reason: 'Tool not found'
      };
    }

    if (!isEnabled || !requirement.is_enabled) {
      return {
        canAccess: false,
        creditsRequired: requirement.credits_required,
        currentCredits: 0,
        reason: 'Tool disabled'
      };
    }

    // Mock current credits - in real app this would come from wallet context
    const currentCredits = 250;
    
    return {
      canAccess: currentCredits >= requirement.credits_required,
      creditsRequired: requirement.credits_required,
      currentCredits,
      reason: currentCredits < requirement.credits_required ? 'Insufficient credits' : undefined
    };
  };

  const logToolAttempt = async (toolName: string, success: boolean): Promise<void> => {
    if (!hasMounted) return;
    
    console.log(`Tool attempt logged: ${toolName} - ${success ? 'success' : 'failed'}`);
    // In real app, this would log to Supabase
  };

  const getToolRequirement = (toolName: string): ToolRequirement | null => {
    if (!hasMounted) return null;
    return toolRequirements.find(req => req.tool_name === toolName) || null;
  };

  if (!hasMounted) {
    return null;
  }

  return (
    <CreditGateContext.Provider value={{
      isEnabled,
      setEnabled,
      checkToolAccess,
      logToolAttempt,
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
