/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

const applyBaseMode = (mode) => {
  document.documentElement.classList.toggle(
    'dark',
    mode === 'dark'
  );
  localStorage.setItem('theme', mode);
};

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  });
  const [tenantColors, setTenantColors] = useState(null);

  useEffect(() => {
    applyBaseMode(mode);
  }, [mode]);

  // Update dynamic CSS variables for tenant branding
  const applyTenantColors = (colors) => {
    if (!colors) {
      // Clear overridden colors, returning to CSS defaults
      const root = document.documentElement;
      const keysToClear = [
        '--dap-brand-primary',
        '--dap-brand-secondary',
        '--dap-brand-accent',
        '--dap-brand-bg',
        '--dap-brand-card',
        '--dap-brand-text',
        '--dap-brand-border',
      ];
      keysToClear.forEach((key) => root.style.removeProperty(key));
      setTenantColors(null);
      return;
    }

    const root = document.documentElement;
    Object.entries(colors).forEach(([key, value]) => {
      const propertyName = key.startsWith('--') ? key : `--dap-brand-${key}`;
      root.style.setProperty(propertyName, value);
    });
    setTenantColors(colors);
  };

  const toggleMode = () => {
    const nextMode = mode === 'dark' ? 'light' : 'dark';
    setMode(nextMode);
    applyBaseMode(nextMode);
  };

  const value = {
    mode,
    toggleMode,
    tenantColors,
    applyTenantColors,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}