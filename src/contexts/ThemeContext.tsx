import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeContextType = {
  isLightMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsLightMode(true);
      document.documentElement.classList.add('light-mode');
    }
  }, []);

  const toggleTheme = () => {
    setIsLightMode(prev => {
      const newTheme = !prev;
      if (newTheme) {
        document.documentElement.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
      }
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ isLightMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
