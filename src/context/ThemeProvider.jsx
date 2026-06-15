import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

const applyTheme = (theme) => {
  document.documentElement.classList.toggle(
    'dark',
    theme === 'dark'
  );

  localStorage.setItem('theme', theme);
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
      return;
    }

    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    const initialTheme = prefersDark ? 'dark' : 'light';

    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme =
      theme === 'dark'
        ? 'light'
        : 'dark';

    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  const value = {
    theme,
    toggleTheme,
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
    throw new Error(
      'useTheme must be used within ThemeProvider'
    );
  }

  return context;
}