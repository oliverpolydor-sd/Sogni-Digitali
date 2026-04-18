import React from 'react';
import { motion } from 'motion/react';

const partners = [
  "Google",
  "Hostinger",
  "Stripe",
  "SumUp",
  "Revolut Business",
  "Semrush",
  "Meta",
  "Shopify"
];

export default function PartnerLogos() {
  return (
    <section className="py-12 border-y border-white/5 bg-[#0B1120]/50 backdrop-blur-sm overflow-hidden flex flex-col items-center justify-center">
      <p className="text-slate-500 text-sm tracking-widest uppercase mb-8 font-medium">
        Official Affiliate Partners
      </p>
      
      <div className="relative w-full max-w-7xl mx-auto flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        
        <motion.div
          className="flex whitespace-nowrap items-center gap-16 pr-16"
          animate={{ x: [0, -1035] }} // Approximate width of one set
          transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: 20 
          }}
          style={{ willChange: 'transform' }}
        >
          {/* First set of logos */}
          {partners.map((partner, index) => (
            <div 
              key={`set1-${index}`} 
              className="text-2xl md:text-3xl font-display font-bold text-slate-600 hover:text-slate-300 transition-colors cursor-default"
            >
              {partner}
            </div>
          ))}
          {/* Second set of logos for seamless loop */}
          {partners.map((partner, index) => (
            <div 
              key={`set2-${index}`} 
              className="text-2xl md:text-3xl font-display font-bold text-slate-600 hover:text-slate-300 transition-colors cursor-default"
            >
              {partner}
            </div>
          ))}
          {/* Third set of logos for seamless loop on ultra-wide screens */}
          {partners.map((partner, index) => (
            <div 
              key={`set3-${index}`} 
              className="text-2xl md:text-3xl font-display font-bold text-slate-600 hover:text-slate-300 transition-colors cursor-default"
            >
              {partner}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
