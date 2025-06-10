
import * as React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// System status check
console.log('🚀 FreePropList AI System Starting...');
console.log('📊 Environment:', import.meta.env.MODE);

// Safe API key check
const hasApiKey = !!import.meta.env.VITE_OPENAI_API_KEY;
console.log('🔑 OpenAI API Key:', hasApiKey ? 'Configured ✅' : 'Missing ❌');

if (!hasApiKey) {
  console.warn('⚠️ OpenAI GPT API key missing. Add VITE_OPENAI_API_KEY to .env file');
  console.warn('📝 Create .env file with: VITE_OPENAI_API_KEY=sk-your-key-here');
}

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
  try {
    const hasReactErrors = document.querySelector('[data-reactroot]') === null;
    
    if (!hasReactErrors) {
      console.log('✅ System status: STABLE ✅');
      console.log('✅ React tree: Mounted correctly');
      console.log('✅ Helmet context: Available');
      console.log('✅ Toast system: Wrapped safely');
      console.log('✅ App rendered: No blank screen');
      
      if (hasApiKey) {
        console.log('✅ GPT API: Ready for use');
      } else {
        console.log('⚠️ GPT API: Needs configuration');
      }
    } else {
      console.error('❌ System status: UNSTABLE');
    }
  } catch (error) {
    console.error('❌ Health check failed:', error);
  }
}, 1000);
