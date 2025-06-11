
import React, { Suspense } from 'react';

// Create a simple loading component
const AppLoading = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fff7f0] to-[#ffe4d6]">
    <div className="text-center">
      <div className="text-2xl font-bold bg-gradient-to-r from-[#ff6a00] via-[#ff3c00] to-[#ff0000] bg-clip-text text-transparent mb-4">
        FreePropList
      </div>
      <div className="text-[#8b4513]">Loading...</div>
    </div>
  </div>
);

// Lazy load the main app to ensure React is fully initialized
const AppWithProviders = React.lazy(() => import('./AppWithProviders'));

export default function App() {
  console.log('App component mounting...');
  
  return (
    <Suspense fallback={<AppLoading />}>
      <AppWithProviders />
    </Suspense>
  );
}
