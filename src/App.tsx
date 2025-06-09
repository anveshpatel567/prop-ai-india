
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { WalletProvider } from './context/WalletContext';
import { CreditGateProvider } from './context/CreditGateContext';
import { Toaster } from '@/components/ui/toaster';
import { AppRoutes } from './AppRoutes';
import { HelmetProvider } from 'react-helmet-async';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <WalletProvider>
              <CreditGateProvider>
                <AppRoutes />
                <Toaster />
              </CreditGateProvider>
            </WalletProvider>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
