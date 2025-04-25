/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { RemixBrowser } from '@remix-run/react';
import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';

function initializeDarkMode() {
  // Get the theme from system preference
  const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  // Function to update theme
  const updateTheme = (e: MediaQueryListEvent | MediaQueryList) => {
    document.documentElement.className = e.matches ? 'dark' : '';
  };

  // Set initial theme
  updateTheme(darkModeMediaQuery);

  // Listen for theme changes
  darkModeMediaQuery.addEventListener('change', updateTheme);
}

if (typeof window !== 'undefined') {
  initializeDarkMode();
}

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <RemixBrowser />
    </StrictMode>,
  );
});
