import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

export default function DodoHeroImage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from center (-1 to 1)
      // Limit the range to avoid extreme rotations
      const x = Math.max(-1, Math.min(1, (e.clientX - centerX) / (window.innerWidth / 2)));
      const y = Math.max(-1, Math.min(1, (e.clientY - centerY) / (window.innerHeight / 2)));
      
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Max rotation angles in degrees
  const maxRotateX = 15;
  const maxRotateY = 20;

  // Calculate rotations based on mouse position
  // Invert Y for natural looking up/down
  const rotateX = mousePosition.y * -maxRotateX;
  const rotateY = mousePosition.x * maxRotateY;

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full flex items-center justify-center"
      style={{ perspective: '1000px' }}
    >
      <motion.img
        src="/my-dodo.png"
        alt="Sogni Digitali Dodo Robot"
        className="w-full max-w-[80%] object-contain drop-shadow-[0_0_40px_rgba(0,229,255,0.4)] z-10"
        animate={{
          rotateX: rotateX,
          rotateY: rotateY,
          y: [0, -15, 0], // Floating effect
        }}
        transition={{
          rotateX: { type: "spring", stiffness: 150, damping: 20, mass: 0.5 },
          rotateY: { type: "spring", stiffness: 150, damping: 20, mass: 0.5 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
      />
    </div>
  );
}
