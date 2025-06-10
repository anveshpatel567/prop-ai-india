
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Add development error boundary
if (import.meta.env.DEV) {
  window.addEventListener("error", (e) => {
    console.error("💥 Runtime Error Captured:", e.message);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  if (!root) return;

  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
