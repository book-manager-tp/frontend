import { AppProvider } from '@/providers';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Router } from './router';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(
  <StrictMode>
    <AppProvider>
      <Router />
    </AppProvider>
  </StrictMode>,
);
