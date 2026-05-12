import React, { createContext, useContext, useState, useEffect } from 'react';

interface AccessibilityContextType {
  oversizedBox: boolean; setOversizedBox: (v: boolean) => void;
  highContrast: boolean; setHighContrast: (v: boolean) => void;
  highlightLinks: boolean; setHighlightLinks: (v: boolean) => void;
  largeText: boolean; setLargeText: (v: boolean) => void;
  textSpacing: boolean; setTextSpacing: (v: boolean) => void;
  stopAnimations: boolean; setStopAnimations: (v: boolean) => void;
  hideImages: boolean; setHideImages: (v: boolean) => void;
  dyslexiaFont: boolean; setDyslexiaFont: (v: boolean) => void;
  bigCursor: boolean; setBigCursor: (v: boolean) => void;
  tooltips: boolean; setTooltips: (v: boolean) => void;
  lineHeight: boolean; setLineHeight: (v: boolean) => void;
  textAlign: boolean; setTextAlign: (v: boolean) => void;
  saturation: boolean; setSaturation: (v: boolean) => void;
  widgetPosition: 'left' | 'right' | 'hidden'; setWidgetPosition: (v: 'left' | 'right' | 'hidden') => void;
  resetAll: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [oversizedBox, setOversizedBox] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [highlightLinks, setHighlightLinks] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [textSpacing, setTextSpacing] = useState(false);
  const [stopAnimations, setStopAnimations] = useState(false);
  const [hideImages, setHideImages] = useState(false);
  const [dyslexiaFont, setDyslexiaFont] = useState(false);
  const [bigCursor, setBigCursor] = useState(false);
  const [tooltips, setTooltips] = useState(false);
  const [lineHeight, setLineHeight] = useState(false);
  const [textAlign, setTextAlign] = useState(false);
  const [saturation, setSaturation] = useState(false);
  const [widgetPosition, setWidgetPosition] = useState<'left' | 'right' | 'hidden'>('left');

  useEffect(() => {
    const html = document.documentElement;
    const toggleClass = (condition: boolean, className: string) => {
      if (condition) html.classList.add(className);
      else html.classList.remove(className);
    };

    toggleClass(highContrast, 'a11y-high-contrast');
    toggleClass(highlightLinks, 'a11y-highlight-links');
    toggleClass(largeText, 'a11y-large-text');
    toggleClass(textSpacing, 'a11y-text-spacing');
    toggleClass(stopAnimations, 'a11y-reduce-motion');
    toggleClass(hideImages, 'a11y-hide-images');
    toggleClass(dyslexiaFont, 'a11y-dyslexia-font');
    toggleClass(bigCursor, 'a11y-big-cursor');
    toggleClass(lineHeight, 'a11y-line-height');
    toggleClass(textAlign, 'a11y-text-align-left');
    toggleClass(saturation, 'a11y-saturation');
  }, [highContrast, highlightLinks, largeText, textSpacing, stopAnimations, hideImages, dyslexiaFont, bigCursor, lineHeight, textAlign, saturation]);

  const resetAll = () => {
    setOversizedBox(false);
    setHighContrast(false);
    setHighlightLinks(false);
    setLargeText(false);
    setTextSpacing(false);
    setStopAnimations(false);
    setHideImages(false);
    setDyslexiaFont(false);
    setBigCursor(false);
    setTooltips(false);
    setLineHeight(false);
    setTextAlign(false);
    setSaturation(false);
  };

  return (
    <AccessibilityContext.Provider value={{
      oversizedBox, setOversizedBox,
      highContrast, setHighContrast,
      highlightLinks, setHighlightLinks,
      largeText, setLargeText,
      textSpacing, setTextSpacing,
      stopAnimations, setStopAnimations,
      hideImages, setHideImages,
      dyslexiaFont, setDyslexiaFont,
      bigCursor, setBigCursor,
      tooltips, setTooltips,
      lineHeight, setLineHeight,
      textAlign, setTextAlign,
      saturation, setSaturation,
      widgetPosition, setWidgetPosition,
      resetAll
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) throw new Error('useAccessibility must be used within AccessibilityProvider');
  return context;
}
