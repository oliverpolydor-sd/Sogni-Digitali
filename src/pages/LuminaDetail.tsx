import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Bot, Zap, Shield, PlayCircle, ArrowRight, Share2, Star, MonitorPlay } from 'lucide-react';

export default function LuminaDetail({ lang }: { lang: string }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      title: lang === 'IT' ? "UI Cinematografica da 10 Piedi" : lang === 'FR' ? "Interface Cinéma (10-Foot UI)" : "Cinematic 10-Foot UI",
      desc: lang === 'IT' 
        ? "Progettata specificamente per schermi di grandi dimensioni, Lumina dà priorità alla leggibilità, all'eleganza e alla fluidità dei movimenti."
        : lang === 'FR'
          ? "Conçue spécifiquement pour les grands écrans, Lumina privilégie la lisibilité, l'élégance et la fluidité des mouvements."
          : "Designed specifically for large-screen interaction, Lumina prioritizes readability, elegance, and fluid motion.",
      icon: <MonitorPlay className="w-6 h-6 text-[#00E5FF]" />
    },
    {
      title: "Lumina AI Concierge",
      desc: lang === 'IT'
        ? "Un assistente proattivo che comprende le esigenze degli ospiti prima ancora che vengano espresse. Prenota spa, ordina room service e altro."
        : lang === 'FR'
          ? "Un assistant proactif qui comprend les besoins des clients avant même qu'ils ne soient exprimés. Réservation de spa, room service et plus."
          : "A proactive assistant that understands guest needs before they are even voiced. Book spa, order room service, and more.",
      icon: <Bot className="w-6 h-6 text-[#E9C349]" />
    },
    {
      title: lang === 'IT' ? "Orchestrazione dei Servizi" : lang === 'FR' ? "Orchestration des Services" : "Service Orchestration",
      desc: lang === 'IT'
        ? "Si integra profondamente con le operazioni dell'hotel per fornire un soggiorno senza attriti: checkout digitale e split-billing."
        : lang === 'FR'
          ? "S'intègre aux opérations de l'hôtel pour un séjour fluide : checkout numérique et facturation fractionnée."
          : "Integrates deeply with hotel operations to provide a friction-free stay: digital checkout and split-billing from the sofa.",
      icon: <Zap className="w-6 h-6 text-emerald-400" />
    }
  ];

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      {/* Hero */}
      <section className="grid lg:grid-cols-2 gap-16 items-center mb-24">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E9C349]/10 border border-[#E9C349]/20 text-[#E9C349] text-xs font-bold tracking-widest uppercase"
            >
              Lumina Guest Hub
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight">
              {lang === 'IT' ? 'Il Futuro dell\'Ospitalità ' : 'The Future of '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E9C349] to-[#00E5FF]">
                {lang === 'IT' ? 'in Camera' : 'In-Room Hospitality'}
              </span>
            </h1>
            <p className="text-xl text-slate-400 font-light leading-relaxed">
              Lumina Guest Hub è un'esperienza Smart TV premium basata su IA progettata per gli hotel più esclusivi del mondo.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <a 
              href="https://lumina-guest-hub.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary px-8 py-4 rounded-full font-bold flex items-center gap-2 shadow-[0_0_30px_rgba(0,229,255,0.3)]"
            >
              View Live Demo <PlayCircle className="w-5 h-5" />
            </a>
            <button className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-colors flex items-center gap-2">
              <Share2 className="w-5 h-5" /> Share
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl group"
        >
          <img 
            src="/regenerated_image_1777565597392.png" 
            alt="Lumina UI Preview" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 p-6 glass-panel rounded-2xl border border-white/10 backdrop-blur-xl">
             <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-full bg-[#E9C349]/20 flex items-center justify-center border border-[#E9C349]/50">
                  <Star className="w-6 h-6 text-[#E9C349]" />
               </div>
               <div>
                  <p className="text-white font-bold">5-Star Experience</p>
                  <p className="text-xs text-slate-400">Cinematic Motion & Elegant Typography</p>
               </div>
             </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-3 gap-8 mb-24">
        {features.map((f, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#00E5FF]/30 transition-all hover:-translate-y-2 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-[#00E5FF]/10 transition-colors">
              {f.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Deep Dive */}
      <section className="py-20 border-t border-white/10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-white">Ambiente Infinito</h2>
            <p className="text-slate-400 leading-relaxed">
              Con il Dynamic Theme Engine, Lumina si adatta al brand dell'hotel o all'umore dell'ospite. Che si tratti del regale Deep Purple, del rilassante Azure Blue o del sofisticato White Light Mode, l'intera interfaccia si ricolora per creare l'atmosfera perfetta.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <Shield className="w-5 h-5 text-emerald-400" />
                 <span className="text-slate-300">Connettività Moderna: QR-Pairing istantaneo</span>
              </div>
              <div className="flex items-center gap-3">
                 <Shield className="w-5 h-5 text-emerald-400" />
                 <span className="text-slate-300">Privacy First: Dati degli ospiti crittografati</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square bg-[#3B285E] rounded-3xl border border-white/10 flex items-center justify-center text-white/20 font-bold text-xs uppercase tracking-widest">Deep Purple</div>
            <div className="aspect-square bg-[#1E3A5F] rounded-3xl border border-white/10 flex items-center justify-center text-white/20 font-bold text-xs uppercase tracking-widest">Azure Blue</div>
            <div className="aspect-square bg-[#064E3B] rounded-3xl border border-white/10 flex items-center justify-center text-white/20 font-bold text-xs uppercase tracking-widest">Emerald Green</div>
            <div className="aspect-square bg-[#F8F9FA] rounded-3xl border border-white/10 flex items-center justify-center text-black/20 font-bold text-xs uppercase tracking-widest">Light Mode</div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mt-24 text-center glass-panel p-16 rounded-[40px] border border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#E9C349]/5 via-transparent to-[#00E5FF]/5" />
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 relative z-10">Rivoluziona l'esperienza ospite</h2>
        <p className="text-slate-400 mb-10 max-w-2xl mx-auto relative z-10 text-lg">
          Trasforma le camere del tuo hotel in santuari digitali. Lumina non è solo un'app TV; è una dichiarazione di eccellenza nell'ospitalità.
        </p>
        <button className="btn-primary px-10 py-5 rounded-full font-bold text-lg inline-flex items-center gap-3 relative z-10 hover:scale-105 transition-transform">
          Inizia Ora <ArrowRight className="w-6 h-6" />
        </button>
      </section>
    </div>
  );
}
