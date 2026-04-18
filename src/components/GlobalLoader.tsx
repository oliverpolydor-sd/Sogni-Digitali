import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import { useLocation } from 'react-router-dom';

export default function GlobalLoader() {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth cursor follow
  const springX = useSpring(mouseX, { damping: 25, stiffness: 250 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 250 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    setIsTransitioning(true);
    
    // Total animation takes about 1.2 seconds
    const fadeTimer = setTimeout(() => {
      setIsTransitioning(false);
    }, 1200);

    return () => clearTimeout(fadeTimer);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 z-[9999] pointer-events-none"
          style={{
            x: springX,
            y: springY,
            translateX: '16px', // Offset slightly to the right of the cursor
            translateY: '16px', // Offset slightly below the cursor
          }}
        >
          <motion.div
            animate={{ rotate: [0, 360, 0] }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="w-12 h-12 rounded-full overflow-hidden p-[2px] bg-gradient-to-tr from-[#E9C349] to-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.4)] relative"
          >
            <div className="absolute inset-0 rounded-full blur-[8px] bg-gradient-to-tr from-[#E9C349] to-[#00E5FF] -z-10" />
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center p-2">
              <img src="/my-logo.png" alt="Loading Sogni Digitali" className="w-full h-full object-contain" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
