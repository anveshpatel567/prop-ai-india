
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from '@/context/AuthContext';
import { WalletProvider } from '@/context/WalletContext';
import { NotificationProvider } from '@/context/NotificationProvider';
import { AiProvider } from '@/context/AiProvider';
import { CreditGateProvider } from '@/context/CreditGateProvider';
import AppRoutes from './AppRoutes';
import './index.css';

console.log('Starting React application...');

// Create QueryClient instance with error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  console.log('App component mounting...');
  
  return (
    <React.StrictMode>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <WalletProvider>
              <NotificationProvider>
                <AiProvider>
                  <CreditGateProvider>
                    <BrowserRouter>
                      <AppRoutes />
                    </BrowserRouter>
                  </CreditGateProvider>
                </AiProvider>
              </NotificationProvider>
            </WalletProvider>
          </AuthProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </React.StrictMode>
  );
};

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error('Root element not found');
}

console.log('Creating React root...');
const root = ReactDOM.createRoot(rootElement);

console.log('Rendering App...');
root.render(<App />);

console.log('React app rendered successfully');
