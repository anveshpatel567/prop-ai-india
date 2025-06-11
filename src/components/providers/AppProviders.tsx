
import React from 'react';

// Lazy load the context providers to avoid circular dependencies
const AuthProvider = React.lazy(() => import('@/context/AuthContext').then(module => ({ default: module.AuthProvider })));
const WalletProvider = React.lazy(() => import('@/context/WalletProvider').then(module => ({ default: module.WalletProvider })));
const NotificationProvider = React.lazy(() => import('@/context/NotificationProvider').then(module => ({ default: module.NotificationProvider })));
const AiProvider = React.lazy(() => import('@/context/AiProvider').then(module => ({ default: module.AiProvider })));
const CreditGateProvider = React.lazy(() => import('@/context/CreditGateProvider').then(module => ({ default: module.CreditGateProvider })));

interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  console.log('AppProviders mounting...');
  
  return (
    <React.Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-[#fff7f0] to-[#ffe4d6] flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-[#ff6a00] via-[#ff3c00] to-[#ff0000] bg-clip-text text-transparent mb-4">
            FreePropList
          </div>
          <div className="text-[#8b4513]">Loading...</div>
        </div>
      </div>
    }>
      <AuthProvider>
        <WalletProvider>
          <NotificationProvider>
            <AiProvider>
              <CreditGateProvider>
                {children}
              </CreditGateProvider>
            </AiProvider>
          </NotificationProvider>
        </WalletProvider>
      </AuthProvider>
    </React.Suspense>
  );
};
