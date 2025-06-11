
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Ensure React is properly available globally
if (typeof window !== 'undefined') {
  (window as any).React = React;
}

// Add more detailed React verification
console.log('=== React Debug Info ===');
console.log('React version:', React.version);
console.log('React object:', React);
console.log('React.useState:', React.useState);
console.log('React.useEffect:', React.useEffect);
console.log('React.createContext:', React.createContext);
console.log('========================');

// Verify React hooks are available before rendering
if (!React || !React.useState || !React.useEffect) {
  console.error('CRITICAL: React hooks not available!');
  document.body.innerHTML = `
    <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background: #fee; color: #c00; font-family: Arial;">
      <div style="text-align: center; padding: 20px;">
        <h1>React Loading Error</h1>
        <p>React hooks are not properly loaded. Please refresh the page.</p>
        <button onclick="window.location.reload()" style="padding: 10px 20px; background: #c00; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Reload Page
        </button>
      </div>
    </div>
  `;
} else {
  console.log('✅ React hooks verified - proceeding with app rendering');
  
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}
