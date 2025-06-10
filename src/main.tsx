
import * as React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Development mode - comprehensive logging
if (import.meta.env.DEV) {
  console.log('🚀 FreePropList AI System Starting in DEVELOPMENT MODE...');
  console.log('📊 Environment:', import.meta.env.MODE);
  console.log('🔧 Development Mode Features: ALL ENABLED');

  // Safe API key check with full logging
  const hasApiKey = !!import.meta.env.VITE_OPENAI_API_KEY;
  console.log('🔑 OpenAI API Key:', hasApiKey ? 'Configured ✅' : 'Missing ❌');

  if (!hasApiKey) {
    console.warn('⚠️ DEVELOPMENT MODE: OpenAI GPT API key missing');
    console.warn('📝 Create .env file with: VITE_OPENAI_API_KEY=sk-your-key-here');
    console.warn('🔄 Hot reload will detect .env changes immediately');
  }
}

// Development mode error boundaries - catch everything
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    if (import.meta.env.DEV) {
      console.error('🚨 DEVELOPMENT MODE - Runtime Error Caught:', event.error);
      console.error('📍 Error Location:', event.filename, 'Line:', event.lineno, 'Col:', event.colno);
    }
  });

  window.addEventListener('unhandledrejection', (event) => {
    if (import.meta.env.DEV) {
      console.error('🚨 DEVELOPMENT MODE - Unhandled Promise Rejection:', event.reason);
    }
  });
}

// Force React strict mode for development
const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}

// Development health check with full diagnostics
if (typeof window !== 'undefined') {
  setTimeout(() => {
    try {
      if (import.meta.env.DEV) {
        console.log('🔍 DEVELOPMENT MODE - System Health Check:');
        
        // Check React tree mounting
        const reactRoot = document.querySelector('[data-reactroot]') || document.getElementById('root')?.firstChild;
        const hasReactErrors = !reactRoot;
        
        if (!hasReactErrors) {
          console.log('✅ React tree: Mounted correctly');
          console.log('✅ App container: Found and active');
          console.log('✅ Development mode: ALL DIAGNOSTICS ENABLED');
          
          const hasApiKey = !!import.meta.env.VITE_OPENAI_API_KEY;
          if (hasApiKey) {
            console.log('✅ GPT API: Ready for development testing');
          } else {
            console.log('⚠️ GPT API: Add key to .env for immediate hot reload');
          }
        } else {
          console.error('❌ DEVELOPMENT MODE - React mounting failed');
          console.error('🔧 Check for component syntax errors or hook violations');
        }
        
        // Development mode - log all environment variables (safe ones)
        console.log('🔧 Development Environment Variables:');
        console.log('- MODE:', import.meta.env.MODE);
        console.log('- DEV:', import.meta.env.DEV);
        console.log('- PROD:', import.meta.env.PROD);
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('❌ DEVELOPMENT MODE - Health check failed:', error);
      }
    }
  }, 100);
}
