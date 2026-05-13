import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Elegant, slightly longer loader for dramatic luxury feel
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3800);

    return () => clearTimeout(timer);
  }, []);

  if (!isClient) {
    return (
      <div className="fixed inset-0 z-[9999] bg-[#030508] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />
        <div className="relative flex flex-col items-center">
          <div className="relative w-32 h-32 md:w-40 md:h-40 mb-6 flex justify-center items-center" style={{ filter: 'blur(10px)', opacity: 0, transform: 'scale(0.95)' }}>
            <img src="/my-logo.png" alt="Sogni Digitali Logo" className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]" />
          </div>
          <div className="overflow-hidden">
            <div className="flex flex-col items-center" style={{ transform: 'translateY(100%)', opacity: 0 }}>
              <div className="text-white font-display text-2xl md:text-3xl font-light tracking-[0.4em] uppercase">Sogni</div>
              <div className="text-white font-display text-2xl md:text-3xl font-light tracking-[0.4em] uppercase mt-2">Digitali</div>
            </div>
          </div>
          <div className="h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent mt-8" style={{ maxWidth: '120px', width: 0, opacity: 0 }} />
          <div className="mt-6 text-[10px] uppercase font-mono tracking-[0.3em] text-white/40" style={{ opacity: 0 }}>Loading Reality</div>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[9999] bg-[#030508] flex items-center justify-center overflow-hidden"
        >
          {/* Subtle noise texture base */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />
          
          <div className="relative flex flex-col items-center">
            {/* The Logo Container */}
            <motion.div
              initial={{ filter: 'blur(10px)', opacity: 0, scale: 0.95 }}
              animate={{ filter: 'blur(0px)', opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-32 h-32 md:w-40 md:h-40 mb-6 flex justify-center items-center"
            >
              <img 
                src="/my-logo.png" 
                alt="Sogni Digitali Logo" 
                className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                referrerPolicy="no-referrer"
              />
              
              {/* Luxury Light Sweep over Logo */}
              <motion.div 
                initial={{ left: '-100%' }}
                animate={{ left: '200%' }}
                transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
                className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 z-20 pointer-events-none"
              />
            </motion.div>

            {/* Typography */}
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="flex flex-col items-center"
              >
                <div className="text-white font-display text-2xl md:text-3xl font-light tracking-[0.4em] uppercase">
                  Sogni
                </div>
                <div className="text-white font-display text-2xl md:text-3xl font-light tracking-[0.4em] uppercase mt-2">
                  Digitali
                </div>
              </motion.div>
            </div>

            {/* Minimalist Progress Line */}
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              transition={{ duration: 2, delay: 1.2, ease: [0.76, 0, 0.24, 1] }}
              className="h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent mt-8"
              style={{ maxWidth: '120px' }}
            />
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.2 }}
              className="mt-6 text-[10px] uppercase font-mono tracking-[0.3em] text-white/40"
            >
              Loading Reality
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
