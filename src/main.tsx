
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('Starting React application...');

// Ensure React is properly loaded
if (!React || !ReactDOM) {
  throw new Error('React modules not loaded properly');
}

console.log('React:', React);
console.log('ReactDOM:', ReactDOM);
console.log('React version:', React.version);

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error('Root element not found');
}

console.log('Creating React root...');
const root = ReactDOM.createRoot(rootElement);

console.log('Rendering App...');
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

console.log('React app rendered successfully');
