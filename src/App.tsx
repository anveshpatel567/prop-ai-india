
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

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <WalletProvider>
          <AiToolProvider>
            <CreditGateProvider>
              <BrowserRouter>
                <div className="App">
                  <AppRoutes />
                  <Toaster />
                  <PwaInstallBanner />
                </div>
              </BrowserRouter>
            </CreditGateProvider>
          </AiToolProvider>
        </WalletProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
