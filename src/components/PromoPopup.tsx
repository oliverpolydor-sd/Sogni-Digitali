import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Gift } from 'lucide-react';
import { translations } from '../lib/translations';

export default function PromoPopup({ lang }: { lang: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const t = translations[lang as keyof typeof translations];

  useEffect(() => {
    // Check if user already saw the promo
    const hasSeenPromo = localStorage.getItem('hasSeenPromo');
    if (!hasSeenPromo) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 5000); // 5 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenPromo', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      localStorage.setItem('hasSeenPromo', 'true');
      
      // Close after showing success message
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#0B1120]/80 backdrop-blur-sm"
            onClick={handleClose}
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-[#111827] border border-[#E9C349]/30 rounded-3xl p-8 shadow-[0_0_50px_rgba(233,195,73,0.15)] overflow-hidden"
          >
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E9C349]/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#00E5FF]/10 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none" />

            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {isSuccess ? (
              <div className="flex flex-col items-center justify-center text-center py-8">
                <div className="w-16 h-16 rounded-full bg-[#E9C349]/20 flex items-center justify-center mb-4 border border-[#E9C349]/50">
                  <Check className="w-8 h-8 text-[#E9C349]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{t.promoSuccess}</h3>
              </div>
            ) : (
              <div className="text-center relative z-10">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-[#E9C349]/10 flex items-center justify-center mb-6 border border-[#E9C349]/20">
                  <Gift className="w-8 h-8 text-[#E9C349]" />
                </div>
                <h3 className="font-display text-3xl font-bold text-white mb-3">
                  {t.promoTitle}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                  {t.promoDesc}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.promoInput}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#E9C349] text-white rounded-xl p-4 outline-none transition-colors text-center"
                  />
                  <button 
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#E9C349] to-[#FBBF24] text-[#0B1120] font-bold text-sm tracking-widest uppercase hover:scale-105 transition-transform ambient-shadow-gold disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-[#0B1120]/30 border-t-[#0B1120] rounded-full animate-spin" />
                    ) : (
                      t.promoBtn
                    )}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
