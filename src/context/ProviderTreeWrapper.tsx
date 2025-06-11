
import React from 'react';
import { AuthProvider } from './AuthContext';
import { WalletProvider } from './WalletContext';
import { NotificationProvider } from './NotificationContext';
import { AiProvider } from './AiContext';
import { CreditGateProvider } from './CreditGateContext';

interface ProviderTreeWrapperProps {
  children: React.ReactNode;
}

export const ProviderTreeWrapper: React.FC<ProviderTreeWrapperProps> = ({ children }) => {
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
