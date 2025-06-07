
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useWallet } from './WalletContext';
import { useToolCreditRequirements } from '@/hooks/useToolCreditRequirements';

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
      // Log the attempt for admin visibility
      console.log(`Tool attempt logged: ${toolName}, hasCredits: ${hasCredits}`);
      
      // In a real implementation, this would send to an analytics service
      // or create a database entry for admin dashboard visibility
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
