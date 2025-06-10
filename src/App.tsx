
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
import { isGptKeyConfigured } from './lib/gptService';
import './App.css';

// Development mode React Query configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: import.meta.env.DEV ? 0 : 1000 * 60 * 5, // No cache in dev
      retry: import.meta.env.DEV ? 1 : 3, // Less retries in dev for faster debugging
      refetchOnWindowFocus: import.meta.env.DEV, // Refetch on focus in dev
    },
  },
});

// Development mode logging
if (import.meta.env.DEV) {
  console.log('🔧 System mode: DEV ✅');
  console.log('🔧 Query Client configured for development');
  console.log('🔧 Hot Module Reload: ENABLED');
  
  // GPT API Key check
  const gptReady = isGptKeyConfigured();
  console.log('🔑 GPT Ready:', gptReady ? '✅' : '❌');
  if (!gptReady) {
    console.warn('⚠️ GPT API key missing - Add VITE_OPENAI_API_KEY to .env');
  }
}

/**
 * Main App Component - DEVELOPMENT MODE
 * 
 * Context Provider Hierarchy (Development Mode):
 * - HelmetProvider: SEO and meta tag management
 * - QueryClientProvider: React Query with dev-friendly settings
 * - BrowserRouter: Client-side routing with dev logging
 * - AuthProvider: User authentication state
 * - WalletProvider: Credit balance and transactions
 * - CreditGateProvider: AI tool access control
 * - Toaster: Toast notifications (Radix UI)
 */
function App() {
  // Development mode error boundary
  React.useEffect(() => {
    if (import.meta.env.DEV) {
      console.log('🔧 App mounted successfully');
      console.log('🧪 System mode: DEV ✅ | Toast Fixed ✅ | GPT Ready', isGptKeyConfigured() ? '✅' : '❌');
    }
  }, []);

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
