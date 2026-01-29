// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';

// Validate environment configuration at startup
import('./config/env.config').catch((error) => {
  console.error('Failed to load environment configuration:', error);
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>⚠️ Configuration Error</h1>
      <p>{error.message}</p>
    </div>
  );
});

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
