
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Ensure React is properly available in the global scope
if (typeof window !== 'undefined') {
  (window as any).React = React;
}

console.log('React version check:', React.version);
console.log('React object:', React);
console.log('React.useEffect:', React.useEffect);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
