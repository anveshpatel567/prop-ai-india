
import React from 'react';
import { createRoot } from 'react-dom/client';
import AppShell from './AppShell';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppShell />
  </React.StrictMode>
);
