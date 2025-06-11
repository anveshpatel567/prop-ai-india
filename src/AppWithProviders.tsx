
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '@/AppRoutes';
import { AuthProvider } from '@/context/AuthContext';
import { WalletProvider } from '@/context/WalletContext';
import { NotificationProvider } from '@/context/NotificationProvider';
import { AiProvider } from '@/context/AiProvider';
import { CreditGateProvider } from '@/context/CreditGateProvider';

export default function AppWithProviders() {
  console.log('AppWithProviders mounting...');
  
  return (
    <BrowserRouter>
      <AuthProvider>
        <WalletProvider>
          <NotificationProvider>
            <AiProvider>
              <CreditGateProvider>
                <AppRoutes />
              </CreditGateProvider>
            </AiProvider>
          </NotificationProvider>
        </WalletProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
