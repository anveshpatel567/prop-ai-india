
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { WalletProvider } from './context/WalletContext';
import { Toaster } from '@/components/ui/toaster';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AiToolProvider } from './context/AiToolContext';
import { CreditGateProvider } from './context/CreditGateContext';
import { PwaInstallBanner } from '@/components/pwa/PwaInstallBanner';
import { useVisitLogger } from '@/hooks/useVisitLogger';
import { useAnalyticsLogger } from '@/hooks/useAnalyticsLogger';

const queryClient = new QueryClient();

function AppContent() {
  useVisitLogger();
  const { logEvent } = useAnalyticsLogger();

  // Log page visits
  React.useEffect(() => {
    logEvent('page_visited', { path: window.location.pathname });
  }, [logEvent]);

  return (
    <div className="App">
      <AppRoutes />
      <Toaster />
      <PwaInstallBanner />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <WalletProvider>
          <AiToolProvider>
            <CreditGateProvider>
              <BrowserRouter>
                <AppContent />
              </BrowserRouter>
            </CreditGateProvider>
          </AiToolProvider>
        </WalletProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
