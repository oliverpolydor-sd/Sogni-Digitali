import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Accessibility, Type, Contrast, ZapOff, X, 
  Link as LinkIcon, ImageOff, MousePointer2, 
  MessageSquare, Baseline, AlignLeft, Droplet, 
  RefreshCw, Settings, ChevronDown, ChevronUp
} from 'lucide-react';
import { translations } from '../lib/translations';
import { useAccessibility } from '../contexts/AccessibilityContext';

export default function AccessibilityMenu({ lang }: { lang: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMoveMenuOpen, setIsMoveMenuOpen] = useState(false);
  
  const { 
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
  } = useAccessibility();
  
  const t = translations[lang as keyof typeof translations] as any;
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  const renderButton = (
    label: string, 
    isActive: boolean, 
    onClick: () => void, 
    Icon: any
  ) => (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${isActive ? 'bg-[#2B3A67]/10 border-[#2B3A67]/30 dark:bg-white/10 dark:border-white/20 shadow-inner' : 'bg-white border-transparent hover:bg-slate-50 dark:bg-black/40 dark:hover:bg-black/60 shadow-sm'}`}
    >
      <Icon className={`w-8 h-8 mb-3 transition-colors ${isActive ? 'text-[#2B3A67] dark:text-blue-400' : 'text-slate-800 dark:text-slate-200'}`} strokeWidth={isActive ? 2.5 : 1.5} />
      <span className={`text-[11px] font-bold text-center leading-tight transition-colors px-1 ${isActive ? 'text-[#2B3A67] dark:text-blue-400' : 'text-slate-700 dark:text-slate-200'}`}>
        {label}
      </span>
    </button>
  );

  const containerClasses = widgetPosition === 'right' ? 'right-6 bottom-6' : 'left-6 bottom-6';
  const panelOrigin = widgetPosition === 'right' ? 'bottom right' : 'bottom left';

  if (widgetPosition === 'hidden') {
    return null; // The user will need to clear localStorage if we eventually persist this
  }

  return (
    <div className={`fixed z-[100] transition-all duration-500 ease-in-out ${containerClasses}`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: panelOrigin }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`absolute bottom-20 ${widgetPosition === 'right' ? 'right-0' : 'left-0'} w-[340px] bg-[#EEF2F6] dark:bg-slate-900 rounded-[32px] border border-black/5 dark:border-white/10 p-5 shadow-2xl overflow-y-auto max-h-[85vh] [&::-webkit-scrollbar]:hidden`}
            style={{ scrollbarWidth: 'none' }}
          >
            {/* Top Bar */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                {t.a11yOversizedWidget || "Widget sovradimensionato"}
              </span>
              <div className="flex items-center gap-2">
                {/* Custom simple toggle switch */}
                <button 
                  onClick={() => setOversizedBox(!oversizedBox)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors ${oversizedBox ? 'bg-[#2B3A67]' : 'bg-slate-300 dark:bg-slate-700'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-300 ${oversizedBox ? 'translate-x-6' : 'translate-x-0'} flex items-center justify-center`}>
                    {oversizedBox && <X className="w-3 h-3 text-[#2B3A67]" strokeWidth={3} />}
                  </div>
                </button>
                <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors ml-2 dark:bg-white/10 dark:text-white">
                  <X className="w-4 h-4 text-slate-600 dark:text-slate-300" strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {renderButton(t.a11yHighContrast || "Contrasto +", highContrast, () => setHighContrast(!highContrast), Contrast)}
              {renderButton(t.a11yHighlightLinks || "Evidenzia i link", highlightLinks, () => setHighlightLinks(!highlightLinks), LinkIcon)}
              {renderButton(t.a11yLargeText || "Testo Grande", largeText, () => setLargeText(!largeText), Type)}
              {renderButton(t.a11yTextSpacing || "Spaziatura del testo", textSpacing, () => setTextSpacing(!textSpacing), Baseline)}
              {renderButton(t.a11yStopAnimations || "Ferma animazioni", stopAnimations, () => setStopAnimations(!stopAnimations), ZapOff)}
              {renderButton(t.a11yHideImages || "Nascondi immagini", hideImages, () => setHideImages(!hideImages), ImageOff)}
              {renderButton(t.a11yDyslexiaFriendly || "Font dislessia", dyslexiaFont, () => setDyslexiaFont(!dyslexiaFont), Type)}
              {renderButton(t.a11yBigCursor || "Cursore grande", bigCursor, () => setBigCursor(!bigCursor), MousePointer2)}
              {renderButton(t.a11yTooltips || "Tooltip", tooltips, () => setTooltips(!tooltips), MessageSquare)}
              {renderButton(t.a11yLineHeight || "Altezza riga", lineHeight, () => setLineHeight(!lineHeight), Baseline)}
              {renderButton(t.a11yTextAlign || "Allinea testo", textAlign, () => setTextAlign(!textAlign), AlignLeft)}
              {renderButton(t.a11ySaturation || "Saturazione", saturation, () => setSaturation(!saturation), Droplet)}
            </div>

            {/* Reset Button */}
            <button 
              onClick={resetAll}
              className="w-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-sm py-4 rounded-xl flex items-center justify-center gap-3 mb-6 shadow-md hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
            >
              <RefreshCw className="w-5 h-5" strokeWidth={2.5} />
              {t.a11yResetAll || "Ripristina tutte le impostazioni"}
            </button>

            {/* Move/Hide Accordion */}
            <div className="bg-white dark:bg-black/40 rounded-xl overflow-hidden shadow-sm">
              <button 
                onClick={() => setIsMoveMenuOpen(!isMoveMenuOpen)}
                className="w-full px-4 py-4 flex items-center justify-between text-slate-800 dark:text-slate-200 font-semibold text-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#3D3D3D] dark:bg-white/20 flex items-center justify-center text-white shrink-0">
                    <Settings className="w-4 h-4" />
                  </div>
                  {t.a11yMoveHide || "Sposta/nascondi widget"}
                </div>
                {isMoveMenuOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              
              <AnimatePresence>
                {isMoveMenuOpen && (
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden border-t border-black/5 dark:border-white/10"
                  >
                    <div className="p-4 space-y-4">
                      <label className="flex items-center justify-between cursor-pointer group">
                        <span className="text-slate-600 dark:text-slate-300 text-sm">{t.a11yPositionLeft || "Sinistra"}</span>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${widgetPosition === 'left' ? 'border-black dark:border-white' : 'border-slate-300 dark:border-slate-600'}`}>
                          {widgetPosition === 'left' && <div className="w-2.5 h-2.5 rounded-full bg-black dark:bg-white" />}
                        </div>
                        <input type="radio" className="hidden" checked={widgetPosition === 'left'} onChange={() => setWidgetPosition('left')} />
                      </label>
                      <label className="flex items-center justify-between cursor-pointer group">
                        <span className="text-slate-600 dark:text-slate-300 text-sm">{t.a11yPositionRight || "Destra"}</span>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${widgetPosition === 'right' ? 'border-black dark:border-white' : 'border-slate-300 dark:border-slate-600'}`}>
                          {widgetPosition === 'right' && <div className="w-2.5 h-2.5 rounded-full bg-black dark:bg-white" />}
                        </div>
                        <input type="radio" className="hidden" checked={widgetPosition === 'right'} onChange={() => setWidgetPosition('right')} />
                      </label>
                      <label className="flex items-center justify-between cursor-pointer group">
                        <span className="text-slate-600 dark:text-slate-300 text-sm">{t.a11yPositionHide || "Nascondi"}</span>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${(widgetPosition as string) === 'hidden' ? 'border-black dark:border-white' : 'border-slate-300 dark:border-slate-600'}`}>
                          {(widgetPosition as string) === 'hidden' && <div className="w-2.5 h-2.5 rounded-full bg-black dark:bg-white" />}
                        </div>
                        <input type="radio" className="hidden" checked={(widgetPosition as string) === 'hidden'} onChange={() => setWidgetPosition('hidden')} />
                      </label>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <button
        ref={toggleBtnRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`accessibility-toggle-btn group relative flex items-center justify-center transition-all duration-500 ${oversizedBox ? 'w-24 h-24' : 'w-16 h-16'}`}
        aria-label={t.a11yTitle || "Accessibility"}
      >
        <div className={`absolute inset-2 rounded-full border-2 flex items-center justify-center transition-all duration-500 overflow-hidden ${
          isOpen 
            ? 'bg-[#2B3A67] border-transparent' 
            : 'bg-[#0B1120] border-[#00E5FF] shadow-[0_0_20px_#00E5FF,inset_0_0_15px_#00E5FF]'
        }`}>
          {isOpen ? (
             <X className={`${oversizedBox ? 'w-10 h-10' : 'w-6 h-6'} text-[#00E5FF] relative z-10 drop-shadow-[0_0_8px_#00E5FF]`} strokeWidth={2} />
          ) : (
            <div className="relative z-10 flex items-center justify-center">
              <Accessibility className={`${oversizedBox ? 'w-10 h-10' : 'w-7 h-7'} text-[#00E5FF] drop-shadow-[0_0_8px_#00E5FF]`} strokeWidth={2} />
            </div>
          )}
        </div>
      </button>
    </div>
  );
}
