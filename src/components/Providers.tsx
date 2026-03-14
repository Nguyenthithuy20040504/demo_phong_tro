'use client';

import { SessionProvider } from 'next-auth/react';
import type { ReactNode } from 'react';
import { useEffect } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    try {
      const savedUiSettings = localStorage.getItem('uiSettings');
      if (savedUiSettings) {
        const { theme, density } = JSON.parse(savedUiSettings);
        const root = document.documentElement;
        if (theme === 'dark') {
          root.classList.add('dark');
          root.style.colorScheme = 'dark';
        } else if (theme === 'light') {
          root.classList.remove('dark');
          root.style.colorScheme = 'light';
        } else if (theme === 'auto') {
          if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            root.classList.add('dark');
            root.style.colorScheme = 'dark';
          } else {
            root.classList.remove('dark');
            root.style.colorScheme = 'light';
          }
        }
        if (density) {
          document.body.classList.remove('density-compact', 'density-comfortable', 'density-spacious');
          document.body.classList.add(`density-${density}`);
        }
      } else {
        // Default to Light Mode
        document.documentElement.classList.remove('dark');
        document.documentElement.style.colorScheme = 'light';
      }
      
      const savedFontSettings = localStorage.getItem('fontSettings');
      if (savedFontSettings) {
        const { fontFamily } = JSON.parse(savedFontSettings);
        if (fontFamily) {
          document.documentElement.style.setProperty('--font-family', fontFamily);
          document.body.style.fontFamily = fontFamily;
        }
      }
    } catch(e) { console.error("Error applying settings", e) }
  }, []);

  return <SessionProvider>{children}</SessionProvider>;
}