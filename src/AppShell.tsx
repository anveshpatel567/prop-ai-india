
import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ProviderTreeWrapper } from '@/context/ProviderTreeWrapper';
import AppRoutes from './AppRoutes';

interface AppShellProps {
  children?: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <ProviderTreeWrapper>
          {children ?? <AppRoutes />}
        </ProviderTreeWrapper>
      </HelmetProvider>
    </BrowserRouter>
  );
}
