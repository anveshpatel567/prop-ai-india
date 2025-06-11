
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
  
  // Simplified app with error boundary approach
  try {
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
  } catch (error) {
    console.error('Error in App component:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center p-8">
          <h1 className="text-xl font-bold text-red-600 mb-4">App Error</h1>
          <p className="text-gray-700 mb-4">An error occurred while loading the application.</p>
          <pre className="bg-white p-4 rounded mb-4 text-left text-sm text-gray-800">{String(error)}</pre>
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
}
