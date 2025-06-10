
import * as React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Iframe-safe initialization - defer all complex logic until after React mounts
const isIframe = typeof window !== 'undefined' && window.self !== window.top;
const isDev = import.meta.env.DEV;

// Basic logging only - no complex checks in main.tsx
if (isDev && typeof window !== 'undefined') {
  console.log('🚀 FreePropList starting...', isIframe ? '(iframe mode)' : '(standalone)');
}

// Simple error boundary for iframe compatibility
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    if (isDev) {
      console.error('🚨 Runtime Error:', event.error?.message || 'Unknown error');
    }
  });

  window.addEventListener('unhandledrejection', (event) => {
    if (isDev) {
      console.error('🚨 Promise Rejection:', event.reason);
    }
  });
}

// Force React strict mode with iframe-safe mounting
const root = document.getElementById('root');
if (root) {
  try {
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
    
    // Deferred health check - after React mounts
    if (isDev && typeof window !== 'undefined') {
      setTimeout(() => {
        console.log('✅ App mounted successfully');
        const hasApiKey = !!import.meta.env.VITE_OPENAI_API_KEY;
        console.log('🔑 GPT Key:', hasApiKey ? 'Found ✅' : 'Missing ❌');
        console.log('🔧 Auth Context: Initializing...');
      }, 100);
    }
  } catch (error) {
    if (isDev) {
      console.error('❌ React mounting failed:', error);
    }
  }
}
