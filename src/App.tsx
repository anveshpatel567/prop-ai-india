
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import AppRoutes from '@/AppRoutes';
import { AuthProvider } from '@/context/AuthContext';
import { WalletProvider } from '@/context/WalletProvider';
import { NotificationProvider } from '@/context/NotificationProvider';
import { AiProvider } from '@/context/AiProvider';
import { CreditGateProvider } from '@/context/CreditGateProvider';

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
  console.log('React in App:', React);
  console.log('React.useEffect in App:', React.useEffect);
  
  // Add defensive check for React
  if (!React || typeof React.useEffect !== 'function') {
    console.error('React hooks not available!');
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center p-8">
          <h1 className="text-xl font-bold text-red-600 mb-4">React Loading Error</h1>
          <p className="text-gray-700 mb-4">React hooks are not properly initialized.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <React.Fragment>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
      </HelmetProvider>
    </React.Fragment>
  );
}
