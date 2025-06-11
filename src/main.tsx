
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

console.log('Main.tsx starting...');

// Simple loading component
const LoadingApp = () => (
  <div className="min-h-screen bg-gradient-to-br from-[#fff7f0] to-[#ffe4d6] flex items-center justify-center">
    <div className="text-center">
      <div className="text-2xl font-bold bg-gradient-to-r from-[#ff6a00] via-[#ff3c00] to-[#ff0000] bg-clip-text text-transparent mb-4">
        FreePropList
      </div>
      <div className="text-[#8b4513]">Loading...</div>
    </div>
  </div>
);

// Ensure DOM is ready
const initializeApp = () => {
  console.log('DOM Content Loaded');
  
  const container = document.getElementById('root');
  if (!container) {
    throw new Error('Root element not found');
  }

  console.log('Creating React root...');
  const root = createRoot(container);

  console.log('Rendering loading app...');
  root.render(<LoadingApp />);

  // Dynamically import the main App to avoid circular dependencies
  import('./App').then((AppModule) => {
    console.log('App module loaded, rendering main app...');
    const App = AppModule.default;
    root.render(<App />);
  }).catch((error) => {
    console.error('Failed to load App:', error);
    root.render(
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center">
          <div className="text-red-600 mb-4">Failed to load application</div>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Reload
          </button>
        </div>
      </div>
    );
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

console.log('Main.tsx completed.');
