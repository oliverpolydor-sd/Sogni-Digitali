import React, { createContext, useContext, useState, useEffect } from 'react';

interface AccessibilityContextType {
  largeText: boolean;
  setLargeText: (v: boolean) => void;
  lightMode: boolean;
  setLightMode: (v: boolean) => void;
  reduceMotion: boolean;
  setReduceMotion: (v: boolean) => void;
  dyslexiaFont: boolean;
  setDyslexiaFont: (v: boolean) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [largeText, setLargeText] = useState(false);
  const [lightMode, setLightMode] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [dyslexiaFont, setDyslexiaFont] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (largeText) html.classList.add('a11y-large-text');
    else html.classList.remove('a11y-large-text');

    if (lightMode) html.classList.add('a11y-light-mode');
    else html.classList.remove('a11y-light-mode');

    if (reduceMotion) html.classList.add('a11y-reduce-motion');
    else html.classList.remove('a11y-reduce-motion');

    if (dyslexiaFont) html.classList.add('a11y-dyslexia-font');
    else html.classList.remove('a11y-dyslexia-font');
  }, [largeText, lightMode, reduceMotion, dyslexiaFont]);

  return (
    <AccessibilityContext.Provider value={{ largeText, setLargeText, lightMode, setLightMode, reduceMotion, setReduceMotion, dyslexiaFont, setDyslexiaFont }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) throw new Error('useAccessibility must be used within AccessibilityProvider');
  return context;
}
