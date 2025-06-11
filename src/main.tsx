
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Enhanced React initialization with retry mechanism
console.log('=== React Initialization Debug ===');

const initializeReact = () => {
  console.log('Checking React availability...');
  console.log('React object:', React);
  console.log('React version:', React?.version);
  console.log('React.useState:', typeof React?.useState);
  console.log('React.useEffect:', typeof React?.useEffect);
  console.log('React.createContext:', typeof React?.createContext);

  // Set React globally for debugging
  if (typeof window !== 'undefined') {
    (window as any).React = React;
    console.log('React set on window object');
  }

  // Critical check - ensure React and all hooks are available
  const criticalChecks = {
    reactExists: !!React,
    useStateExists: !!(React && typeof React.useState === 'function'),
    useEffectExists: !!(React && typeof React.useEffect === 'function'),
    createContextExists: !!(React && typeof React.createContext === 'function')
  };

  console.log('Critical checks:', criticalChecks);
  return criticalChecks;
};

const renderApp = () => {
  const checks = initializeReact();
  const allChecksPass = Object.values(checks).every(Boolean);

  if (!allChecksPass) {
    console.error('CRITICAL: React hooks verification failed!', checks);
    document.body.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background: #fee; color: #c00; font-family: Arial; flex-direction: column;">
        <div style="text-align: center; padding: 20px; max-width: 500px;">
          <h1 style="margin-bottom: 16px;">React Initialization Error</h1>
          <p style="margin-bottom: 16px;">React hooks are not properly loaded. This is a critical error.</p>
          <div style="background: #fff; padding: 12px; border-radius: 4px; margin: 16px 0; color: #333; font-family: monospace; font-size: 12px;">
            ${Object.entries(checks).map(([key, value]) => `${key}: ${value}`).join('<br>')}
          </div>
          <button onclick="window.location.reload()" style="padding: 12px 24px; background: #c00; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 16px;">
            Reload Page
          </button>
        </div>
      </div>
    `;
    return;
  }

  console.log('✅ All React checks passed - starting app render');
  
  try {
    const root = ReactDOM.createRoot(document.getElementById("root")!);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log('✅ App render initiated successfully');
  } catch (error) {
    console.error('❌ Error during app render:', error);
    document.body.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background: #fee; color: #c00; font-family: Arial;">
        <div style="text-align: center; padding: 20px;">
          <h1>App Render Error</h1>
          <p>Failed to render the application. Check console for details.</p>
          <pre style="background: #fff; padding: 10px; border-radius: 4px; margin: 10px 0; color: #333; font-size: 12px; text-align: left;">${error}</pre>
          <button onclick="window.location.reload()" style="padding: 10px 20px; background: #c00; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Reload Page
          </button>
        </div>
      </div>
    `;
  }
};

// Add retry mechanism for React loading
let retryCount = 0;
const maxRetries = 3;

const tryRender = () => {
  if (React && React.useState && React.useEffect) {
    renderApp();
  } else if (retryCount < maxRetries) {
    retryCount++;
    console.log(`React not ready, retry attempt ${retryCount}/${maxRetries}`);
    setTimeout(tryRender, 100);
  } else {
    console.error('Failed to load React after maximum retries');
    renderApp(); // This will show the error UI
  }
};

// Start the render process
tryRender();
