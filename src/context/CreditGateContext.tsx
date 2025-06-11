
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CreditGateContextType {
  isEnabled: boolean;
  setEnabled: (enabled: boolean) => void;
}

const CreditGateContext = createContext<CreditGateContextType | null>(null);

interface CreditGateProviderProps {
  children: ReactNode;
}

export const CreditGateProvider: React.FC<CreditGateProviderProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const setEnabled = (enabled: boolean) => {
    if (!hasMounted) return;
    setIsEnabled(enabled);
  };

  if (!hasMounted) {
    return null;
  }

  return (
    <CreditGateContext.Provider value={{
      isEnabled,
      setEnabled
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
