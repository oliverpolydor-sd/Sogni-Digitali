import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface TooltipProps {
  children: React.ReactNode;
  content: string;
}

export default function Tooltip({ children, content }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div 
      className="relative inline-flex items-center justify-center" 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave} 
      onFocus={handleMouseEnter} 
      onBlur={handleMouseLeave}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-3 px-4 py-2.5 text-xs font-semibold tracking-wide text-white bg-slate-900/40 backdrop-blur-xl border border-white/20 rounded-xl whitespace-nowrap shadow-[0_8px_32px_rgba(0,0,0,0.4)] pointer-events-none"
          >
            {content}
            {/* Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-3 h-3 bg-slate-900/40 border border-white/20 border-t-0 border-l-0 rotate-45 backdrop-blur-xl shadow-lg -translate-y-[6px]" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
