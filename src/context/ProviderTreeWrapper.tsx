
import React, { useEffect, useState } from 'react';
import { AuthProvider } from './AuthContext';
import { WalletProvider } from './WalletContext';
import { NotificationProvider } from './NotificationContext';
import { AiProvider } from './AiContext';
import { CreditGateProvider } from './CreditGateContext';

interface ProviderTreeWrapperProps {
  children: React.ReactNode;
}

export const ProviderTreeWrapper: React.FC<ProviderTreeWrapperProps> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <AuthProvider>
      <WalletProvider>
        <NotificationProvider>
          <AiProvider>
            <CreditGateProvider>
              {children}
            </CreditGateProvider>
          </AiProvider>
        </NotificationProvider>
      </WalletProvider>
    </AuthProvider>
  );
};
