import {StrictMode} from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from './contexts/ThemeContext';

window.addEventListener('unhandledrejection', function(event) {
  if (event.reason && event.reason.message && event.reason.message.includes('WebSocket closed')) {
    event.preventDefault();
  }
});

const appNode = (
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>
);

const rootElement = document.getElementById('root')!;
if (rootElement.innerHTML.trim() !== '<!--ssr-outlet-->' && rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, appNode);
} else {
  // Clear any leftover comments before rendering
  rootElement.innerHTML = '';
  createRoot(rootElement).render(appNode);
}
