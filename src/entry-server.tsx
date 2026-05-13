import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';

export function render(url: string, helmetContext: any) {
  const html = renderToString(
    <React.StrictMode>
      <HelmetProvider context={helmetContext}>
        <ThemeProvider>
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </ThemeProvider>
      </HelmetProvider>
    </React.StrictMode>
  );
  return html;
}
