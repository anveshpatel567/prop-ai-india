
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ProviderTreeWrapper } from '@/context/ProviderTreeWrapper';
import AppRoutes from '@/AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <ProviderTreeWrapper>
          <AppRoutes />
        </ProviderTreeWrapper>
      </HelmetProvider>
    </BrowserRouter>
  );
}
