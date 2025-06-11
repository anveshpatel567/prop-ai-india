
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

console.log('Main.tsx starting...');

// Ensure DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM Content Loaded');
});

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element not found');
}

console.log('Creating React root...');
const root = createRoot(container);

console.log('Rendering App...');
root.render(<App />);

console.log('Main.tsx completed.');
