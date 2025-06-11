
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import AppRoutes from '@/AppRoutes';
import { AuthProvider } from '@/context/AuthContext';
import { WalletProvider } from '@/context/WalletContext';
import { NotificationProvider } from '@/context/NotificationContext';
import { AiProvider } from '@/context/AiContext';
import { CreditGateProvider } from '@/context/CreditGateContext';

export default function App() {
  console.log('App component mounting...');
  
  return (
    <HelmetProvider>
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
    </HelmetProvider>
  );
}
