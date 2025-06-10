
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
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { DevStatusOverlay } from './components/common/DevStatusOverlay';
import { isGptKeyConfigured } from './lib/gptService';
import './App.css';

// Iframe-safe query client configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: import.meta.env.DEV ? 0 : 1000 * 60 * 5,
      retry: import.meta.env.DEV ? 1 : 3,
      refetchOnWindowFocus: import.meta.env.DEV,
    },
  },
});

// Iframe detection and safe logging
const useIframeSafeEffect = () => {
  React.useEffect(() => {
    // Only run after component mounts and in browser
    if (typeof window === 'undefined') return;
    
    const isIframe = window.self !== window.top;
    const isDev = import.meta.env.DEV;
    
    if (isDev) {
      console.log('🔧 App Context:', isIframe ? 'Iframe Mode' : 'Standalone');
      console.log('🔧 GPT Ready:', isGptKeyConfigured() ? '✅' : '❌');
    }
  }, []);
};

/**
 * Main App Component - Iframe Compatible
 */
function App() {
  useIframeSafeEffect();
  
  // Early return for SSR/iframe safety
  if (typeof window === 'undefined') {
    return <div>Loading...</div>;
  }
  
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <AuthProvider>
              <WalletProvider>
                <CreditGateProvider>
                  <ApiKeyWarning />
                  <AppRoutes />
                  <Toaster />
                  {import.meta.env.DEV && <DevStatusOverlay />}
                </CreditGateProvider>
              </WalletProvider>
            </AuthProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
