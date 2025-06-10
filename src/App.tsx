
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProviderTreeWrapper } from './context/ProviderTreeWrapper';
import { Toaster } from '@/components/ui/toaster';
import { AppRoutes } from './AppRoutes';
import { HelmetProvider } from 'react-helmet-async';
import { ApiKeyWarning } from './components/common/ApiKeyWarning';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { DevStatusOverlay } from './components/common/DevStatusOverlay';
import { isGptKeyConfigured } from './lib/gptService';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: import.meta.env.DEV ? 0 : 1000 * 60 * 5,
      retry: import.meta.env.DEV ? 1 : 3,
      refetchOnWindowFocus: import.meta.env.DEV,
    },
  },
});

const useIframeSafeEffect = () => {
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const isIframe = window.self !== window.top;
    const isDev = import.meta.env.DEV;
    
    if (isDev) {
      console.log('🔧 App Context:', isIframe ? 'Iframe Mode' : 'Standalone');
      console.log('🔧 GPT Ready:', isGptKeyConfigured() ? '✅' : '❌');
    }
  }, []);
};

function App() {
  useIframeSafeEffect();
  
  if (typeof window === 'undefined') {
    return <div>Loading...</div>;
  }
  
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <ProviderTreeWrapper>
              <ApiKeyWarning />
              <AppRoutes />
              <Toaster />
              {import.meta.env.DEV && <DevStatusOverlay />}
            </ProviderTreeWrapper>
          </BrowserRouter>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
