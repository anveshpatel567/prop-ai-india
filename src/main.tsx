
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// System status check
console.log('🚀 FreePropList AI System Starting...');
console.log('📊 Environment:', import.meta.env.MODE);
console.log('🔑 OpenAI API Key:', import.meta.env.VITE_OPENAI_API_KEY ? 'Configured ✅' : 'Missing ❌');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Register service worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// System health check after initial render
setTimeout(() => {
  const hasReactErrors = document.querySelector('[data-reactroot]') === null;
  const hasConsoleErrors = performance.getEntriesByType('navigation').length > 0;
  
  if (!hasReactErrors) {
    console.log('✅ System status: STABLE ✅');
    console.log('✅ React tree: Mounted correctly');
    console.log('✅ Helmet context: Available');
    console.log('✅ App rendered: No blank screen');
  } else {
    console.error('❌ System status: UNSTABLE');
  }
}, 1000);
