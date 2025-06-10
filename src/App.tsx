
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { WalletProvider } from './context/WalletContext';
import { CreditGateProvider } from './context/CreditGateContext';
import { Toaster } from '@/components/ui/toaster';
import { AppRoutes } from './AppRoutes';
import { HelmetProvider } from 'react-helmet-async';
import { ApiKeyWarning } from './components/common/ApiKeyWarning';
import './App.css';

// React Query client configuration for optimal performance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

/**
 * Main App Component
 * 
 * Context Provider Hierarchy:
 * - HelmetProvider: SEO and meta tag management (MUST BE OUTERMOST)
 * - QueryClientProvider: React Query for server state
 * - BrowserRouter: Client-side routing
 * - AuthProvider: User authentication state
 * - WalletProvider: Credit balance and transactions
 * - CreditGateProvider: AI tool access control
 */
function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <WalletProvider>
              <CreditGateProvider>
                <ApiKeyWarning />
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
