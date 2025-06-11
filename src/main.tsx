
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

console.log('Main.tsx starting...');

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element not found');
}

console.log('Creating React root...');
const root = createRoot(container);

console.log('Rendering App...');
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

console.log('Main.tsx completed.');
