
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Ensure React is properly available globally and verify all hooks
console.log('=== React Initialization Debug ===');
console.log('React object:', React);
console.log('React version:', React?.version);
console.log('React.useState:', React?.useState);
console.log('React.useEffect:', React?.useEffect);
console.log('React.createContext:', React?.createContext);

// Set React globally for debugging
if (typeof window !== 'undefined') {
  (window as any).React = React;
  console.log('React set on window object');
}

// Critical check - ensure React and all hooks are available
const criticalChecks = {
  reactExists: !!React,
  useStateExists: !!(React && React.useState),
  useEffectExists: !!(React && React.useEffect),
  createContextExists: !!(React && React.createContext)
};

console.log('Critical checks:', criticalChecks);

// If any critical check fails, show error immediately
const allChecksPass = Object.values(criticalChecks).every(Boolean);

if (!allChecksPass) {
  console.error('CRITICAL: React hooks verification failed!', criticalChecks);
  document.body.innerHTML = `
    <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background: #fee; color: #c00; font-family: Arial; flex-direction: column;">
      <div style="text-align: center; padding: 20px; max-width: 500px;">
        <h1 style="margin-bottom: 16px;">React Initialization Error</h1>
        <p style="margin-bottom: 16px;">React hooks are not properly loaded. This is a critical error.</p>
        <div style="background: #fff; padding: 12px; border-radius: 4px; margin: 16px 0; color: #333; font-family: monospace; font-size: 12px;">
          ${Object.entries(criticalChecks).map(([key, value]) => `${key}: ${value}`).join('<br>')}
        </div>
        <button onclick="window.location.reload()" style="padding: 12px 24px; background: #c00; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 16px;">
          Reload Page
        </button>
      </div>
    </div>
  `;
} else {
  console.log('✅ All React checks passed - starting app render');
  
  try {
    ReactDOM.createRoot(document.getElementById("root")!).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
    console.log('✅ App render initiated successfully');
  } catch (error) {
    console.error('❌ Error during app render:', error);
    document.body.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background: #fee; color: #c00; font-family: Arial;">
        <div style="text-align: center; padding: 20px;">
          <h1>App Render Error</h1>
          <p>Failed to render the application. Check console for details.</p>
          <button onclick="window.location.reload()" style="padding: 10px 20px; background: #c00; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Reload Page
          </button>
        </div>
      </div>
    `;
  }
}
