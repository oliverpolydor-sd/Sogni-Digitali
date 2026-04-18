import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Accessibility, Type, Contrast, ZapOff, CheckCircle2, MessageCircle, Space, X } from 'lucide-react';
import { translations } from '../lib/translations';
import { useAccessibility } from '../contexts/AccessibilityContext';
import { useTheme } from '../contexts/ThemeContext';

export default function AccessibilityMenu({ lang }: { lang: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const { largeText, setLargeText, lightMode, setLightMode, reduceMotion, setReduceMotion, dyslexiaFont, setDyslexiaFont } = useAccessibility();
  const { isLightMode } = useTheme();
  
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const itemsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const t = translations[lang as keyof typeof translations];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        itemsRef.current[0]?.focus();
      }, 50);
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % 4;
      itemsRef.current[nextIndex]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (index - 1 + 4) % 4;
      itemsRef.current[prevIndex]?.focus();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      toggleBtnRef.current?.focus();
    }
  };

  return (
    <div className="fixed left-6 bottom-6 z-[100]">
      <AnimatePresence>
        {/* Menu Panel */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom left' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 left-0 glass-panel accessibility-menu-panel p-6 w-72 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-3xl border border-white/10"
            role="dialog"
            aria-label={t.a11yTitle}
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <Accessibility className="w-5 h-5 text-blue-400" />
                <h3 className="font-display font-bold text-lg text-white tracking-wide">{t.a11yTitle}</h3>
              </div>
              <button 
                onClick={() => {
                  setIsOpen(false);
                  toggleBtnRef.current?.focus();
                }} 
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all"
                aria-label="Close accessibility menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-3" role="menu">
              <button 
                ref={(el) => { itemsRef.current[0] = el; }}
                role="menuitem"
                onKeyDown={(e) => handleKeyDown(e, 0)}
                onClick={() => setLargeText(!largeText)} 
                className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${largeText ? 'bg-blue-500/20 border-blue-500/50 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10 hover:border-white/10'}`}
              >
                <div className="flex items-center gap-3">
                  <Type className="w-5 h-5 shrink-0" />
                  <span className="text-sm font-medium">{t.a11yLargeText}</span>
                </div>
                {largeText && <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />}
              </button>

              <button 
                ref={(el) => { itemsRef.current[1] = el; }}
                role="menuitem"
                onKeyDown={(e) => handleKeyDown(e, 1)}
                onClick={() => setLightMode(!lightMode)} 
                className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E9C349]/50 ${lightMode ? 'bg-[#E9C349]/20 border-[#E9C349]/50 text-[#E9C349] shadow-[0_0_15px_rgba(233,195,73,0.2)]' : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10 hover:border-white/10'}`}
              >
                <div className="flex items-center gap-3">
                  <Contrast className="w-5 h-5 shrink-0" />
                  <span className="text-sm font-medium">{t.a11yContrast}</span>
                </div>
                {lightMode && <div className="w-2 h-2 rounded-full bg-[#E9C349] shadow-[0_0_8px_rgba(233,195,73,0.8)]" />}
              </button>

              <button 
                ref={(el) => { itemsRef.current[2] = el; }}
                role="menuitem"
                onKeyDown={(e) => handleKeyDown(e, 2)}
                onClick={() => setReduceMotion(!reduceMotion)} 
                className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 ${reduceMotion ? 'bg-purple-500/20 border-purple-500/50 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]' : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10 hover:border-white/10'}`}
              >
                <div className="flex items-center gap-3">
                  <ZapOff className="w-5 h-5 shrink-0" />
                  <span className="text-sm font-medium">{t.a11yReduceMotion}</span>
                </div>
                {reduceMotion && <div className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />}
              </button>

              <button 
                ref={(el) => { itemsRef.current[3] = el; }}
                role="menuitem"
                onKeyDown={(e) => handleKeyDown(e, 3)}
                onClick={() => setDyslexiaFont(!dyslexiaFont)} 
                className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#25D366]/50 ${dyslexiaFont ? 'bg-[#25D366]/20 border-[#25D366]/50 text-[#25D366] shadow-[0_0_15px_rgba(37,211,102,0.2)]' : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10 hover:border-white/10'}`}
              >
                <div className="flex items-center gap-3">
                  <Type className="w-5 h-5 shrink-0" />
                  <span className="text-sm font-medium">{t.a11yDyslexiaFont || 'Dyslexia Font'}</span>
                </div>
                {dyslexiaFont && <div className="w-2 h-2 rounded-full bg-[#25D366] shadow-[0_0_8px_rgba(37,211,102,0.8)]" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <button
        ref={toggleBtnRef}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="group relative w-16 h-16 flex items-center justify-center transition-all duration-500 focus:outline-none"
        aria-label={t.a11yTitle}
      >
        {/* Button Body with Neon Effect */}
        <div className={`absolute inset-2 rounded-full bg-[#0B1120] border-2 ${isLightMode ? 'border-[#ea580c] shadow-[0_0_20px_rgba(234,88,12,1),inset_0_0_15px_rgba(234,88,12,1)]' : 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,1),inset_0_0_15px_rgba(59,130,246,1)]'} flex items-center justify-center transition-all duration-500 overflow-hidden`}>
          {isOpen ? (
            <X className={`w-6 h-6 ${isLightMode ? 'text-[#ea580c] drop-shadow-[0_0_8px_rgba(234,88,12,1)]' : 'text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,1)]'} relative z-10`} />
          ) : (
            <div className="relative z-10">
              <Accessibility className={`w-7 h-7 ${isLightMode ? 'text-[#ea580c] drop-shadow-[0_0_8px_rgba(234,88,12,1)]' : 'text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,1)]'}`} />
            </div>
          )}
        </div>
      </button>
    </div>
  );
}
