import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Instant tracking for the primary pointer
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Snappy, fast physics for the trailing ring (makes website feel faster/more responsive)
  const springConfig = { damping: 20, stiffness: 400, mass: 0.3 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    let rafId: number;
    
    // Hide default cursor across the body
    document.body.style.cursor = 'none';

    const updateMousePosition = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      
      // Use requestAnimationFrame to sync with screen refresh directly
      rafId = requestAnimationFrame(() => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.style.cursor === 'pointer' ||
        window.getComputedStyle(target).cursor === 'pointer';

      setIsHovering(!!isClickable);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(rafId);
      document.body.style.cursor = '';
    };
  }, [isVisible, cursorX, cursorY]);

  // Hide entirely on devices that don't support fine pointers
  if (!isVisible && typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: fine)').matches) {
    return null;
  }

  if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Follower (Fast Spring Ring) */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 pointer-events-none z-[9998] flex items-center justify-center mix-blend-screen"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 0.4,
        }}
        transition={{ scale: { type: 'spring', stiffness: 400, damping: 20 } }}
      >
        <div className="w-full h-full rounded-full border border-dashed border-[#00E5FF] animate-[spin_4s_linear_infinite] cursor-ring" />
        <div className="absolute w-1 h-1 bg-[#E9C349] rounded-full cursor-dot" />
      </motion.div>

      {/* Main Cursor (Instant Pointer) */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-20%',
          translateY: '-20%',
        }}
        animate={{
          // Shrink on click, normal on hover to let the ring expand around it
          scale: isClicking ? 0.7 : isHovering ? 0.9 : 1,
          // Add a tiny tilt on click for visceral feedback
          rotate: isClicking ? -5 : 0
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_5px_rgba(0,229,255,0.8)] cursor-svg">
          <path d="M2 2L9.5 22L12.5 12.5L22 9.5L2 2Z" fill="#00E5FF" stroke="#FFFFFF" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
      </motion.div>
    </>
  );
}
