
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useWallet } from './WalletContext';
import { useToolCreditRequirements } from '@/hooks/useToolCreditRequirements';
import { ToolUsageLogger } from '@/utils/toolUsageLog';
import { useAuth } from './AuthContext';

interface CreditGateContextType {
  checkToolAccess: (toolName: string) => {
    canAccess: boolean;
    creditsRequired: number;
    currentCredits: number;
    reason?: string;
  };
  logToolAttempt: (toolName: string, hasCredits: boolean) => void;
  isLoading: boolean;
}

const CreditGateContext = createContext<CreditGateContextType | null>(null);

export const CreditGateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { balance } = useWallet();
  const { getRequiredCredits } = useToolCreditRequirements();
  const [isLoading, setIsLoading] = useState(false);

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
      
      // Log using the ToolUsageLogger which will handle both local and backend logging
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
      isLoading
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
