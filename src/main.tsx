
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

console.log('Main.tsx starting...');

// Initialize app when DOM is ready
const initializeApp = () => {
  console.log('DOM Content Loaded');
  
  const container = document.getElementById('root');
  if (!container) {
    throw new Error('Root element not found');
  }

  console.log('Creating React root...');
  const root = createRoot(container);
  
  console.log('Rendering App...');
  root.render(<App />);
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

console.log('Main.tsx completed.');
