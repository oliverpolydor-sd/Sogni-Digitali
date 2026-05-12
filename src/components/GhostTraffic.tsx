import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MousePointer2 } from 'lucide-react';

interface Ghost {
  id: number;
  x: number;
  y: number;
  rotation: number;
}

export default function GhostTraffic() {
  const [ghosts, setGhosts] = useState<Ghost[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const ghostIdRef = useRef(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    // Only spawn ghosts randomly to not overwhelm the DOM
    if (Math.random() > 0.15) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newGhost = {
      id: ghostIdRef.current++,
      x,
      y,
      rotation: Math.random() * 60 - 30, // Random tilt
    };

    setGhosts(prev => [...prev.slice(-20), newGhost]); // keep max 20
  };

  useEffect(() => {
    // Ghosts expire over time, handled by framer-motion exit in theory,
    // but better to clean up state
    const interval = setInterval(() => {
      setGhosts(prev => {
        if (prev.length === 0) return prev;
        return prev.slice(1);
      });
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full py-32 overflow-hidden border-y border-white/10 my-20 cursor-crosshair group bg-black/50"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#00B4D8]/5 to-black pointer-events-none" />
      
      {/* Target area visual */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-dashed border-[#00E5FF]/30 group-hover:border-[#00E5FF]/60 transition-colors pointer-events-none flex items-center justify-center">
        <div className="w-32 h-32 rounded-full border border-[#00E5FF]/20 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-[#00E5FF]/50 blur-[2px]" />
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pointer-events-none">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
          Il Traffico <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Orfano</span>
        </h2>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto bg-black/40 backdrop-blur-sm p-4 rounded-xl border border-white/5">
          Muovi il mouse. <br/>
          Questi sono i visitatori che lasciano il tuo sito perché non usi il <strong>Retargeting Sovrano</strong>. Non lasciare che scappino.
        </p>
      </div>

      <AnimatePresence>
        {ghosts.map(ghost => (
          <motion.div
            key={ghost.id}
            initial={{ opacity: 0.8, x: ghost.x, y: ghost.y, scale: 1 }}
            animate={{ 
              opacity: 0, 
              x: ghost.x + (Math.random() * 200 - 100), 
              y: ghost.y - 150 - Math.random() * 100, // float upwards and outwards
              scale: 0.5
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute pointer-events-none text-red-500/50 mix-blend-screen"
            style={{ rotate: ghost.rotation }}
          >
            <MousePointer2 className="w-8 h-8 fill-red-500/20" />
            <span className="text-xs font-mono absolute -top-4 left-4 text-red-400/50">Lost</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </section>
  );
}
