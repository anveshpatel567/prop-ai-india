
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from '@/context/AuthContext';
import { WalletProvider } from '@/context/WalletProvider';
import { NotificationProvider } from '@/context/NotificationProvider';
import { AiProvider } from '@/context/AiProvider';
import { CreditGateProvider } from '@/context/CreditGateProvider';
import AppRoutes from '@/AppRoutes';

// Create QueryClient instance with error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  console.log('App component mounting...');
  
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <WalletProvider>
            <NotificationProvider>
              <AiProvider>
                <CreditGateProvider>
                  <BrowserRouter>
                    <AppRoutes />
                  </BrowserRouter>
                </CreditGateProvider>
              </AiProvider>
            </NotificationProvider>
          </WalletProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
