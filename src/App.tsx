
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

// Create QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Simple error boundary component
class AppErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.error('App Error Boundary caught error:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App Error Boundary - Full error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fff7f0] to-[#ffe4d6]">
          <div className="text-center p-8">
            <div className="text-2xl font-bold bg-gradient-to-r from-[#ff6a00] via-[#ff3c00] to-[#ff0000] bg-clip-text text-transparent mb-4">
              FreePropList
            </div>
            <div className="text-[#8b4513] mb-4">Something went wrong. Please refresh the page.</div>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-gradient-to-r from-[#ff6a00] to-[#ff0000] text-white px-4 py-2 rounded"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  console.log('App component mounting...');
  
  return (
    <AppErrorBoundary>
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
    </AppErrorBoundary>
  );
}
