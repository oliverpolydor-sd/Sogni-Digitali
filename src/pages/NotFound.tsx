import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Home, Rocket } from 'lucide-react';
import { translations } from '../lib/translations';

export default function NotFound({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations['IT'];

  return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center relative overflow-hidden px-6 pt-24">
      <div className="absolute inset-0 top-circuit-glow pointer-events-none opacity-50" />
      
      <div className="text-center relative z-10 max-w-2xl mx-auto">
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mx-auto w-32 h-32 mb-8 relative"
        >
          <div className="absolute inset-0 bg-[#00E5FF] rounded-full blur-[40px] opacity-20"></div>
          <Rocket className="w-full h-full text-[#00E5FF] drop-shadow-[0_0_15px_rgba(0,229,255,0.5)]" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-8xl font-black font-space text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#00B4D8] mb-4"
        >
          404
        </motion.h1>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold text-white mb-6"
        >
          Sei Uscito dall'Orbita
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-slate-400 mb-10"
        >
          La pagina che stai cercando non esiste o è stata spostata in un'altra dimensione digitale.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link 
            to="/" 
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold tracking-widest uppercase hover:bg-white/10 hover:border-[#00E5FF] hover:text-[#00E5FF] transition-all"
          >
            <Home className="w-5 h-5" />
            Torna alla Base
          </Link>
        </motion.div>
      </div>

      {/* Floating stars */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, Math.random() * 2 + 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
}
