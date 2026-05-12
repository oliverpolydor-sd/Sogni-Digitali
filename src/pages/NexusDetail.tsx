import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Bot, Code2, Shield, PlayCircle, ArrowRight, Share2, Users, Database, LayoutPanelLeft } from 'lucide-react';

export default function NexusDetail({ lang }: { lang: string }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const coreModules = [
    {
      title: lang === 'IT' ? "CRM Avanzato & Lead Management" : lang === 'FR' ? "CRM Avancé & Gestion des Leads" : "Advanced CRM & Lead",
      desc: lang === 'IT' 
        ? "Kanban board interattive drag-and-drop con snippet di acquisizione lead esterna (capture.js)."
        : lang === 'FR'
          ? "Tableaux Kanban interactifs avec snippet de capture de leads externe (capture.js)."
          : "Interactive Drag-and-Drop Kanban boards with external lead capture (capture.js) implementation.",
      icon: <Users className="w-6 h-6 text-[#00E5FF]" />
    },
    {
      title: "Native AI Assistant",
      desc: lang === 'IT'
        ? "IA contestuale integrata direttamente nel workspace per bozze di comunicazioni e analisi dati (Gemini AI)."
        : lang === 'FR'
          ? "IA contextuelle intégrée au workspace pour la rédaction et l'analyse de données (Gemini AI)."
          : "Context-aware AI integrated directly into the workspace for drafting and data analysis (Gemini AI).",
      icon: <Bot className="w-6 h-6 text-[#E9C349]" />
    },
    {
      title: lang === 'IT' ? "Architettura Sovrana" : lang === 'FR' ? "Architecture Souveraine" : "Sovereign Architecture",
      desc: lang === 'IT'
        ? "Infrastruttura personalizzabile e scalabile con gestione ruoli RBAC e crittografia dei dati end-to-end."
        : lang === 'FR'
          ? "Infrastructure évolutive avec gestion des rôles RBAC et chiffrement de données de bout en bout."
          : "Scalable infrastructure with RBAC role management and end-to-end data encryption.",
      icon: <Shield className="w-6 h-6 text-emerald-400" />
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
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/20 text-[#00E5FF] text-xs font-bold tracking-widest uppercase"
            >
              Nexus OS (Agency Operating System)
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight">
              {lang === 'IT' ? 'Il Sistema Operativo per ' : 'The Operating System for '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-emerald-400">
                {lang === 'IT' ? 'Agenzie Digitali' : 'Digital Agencies'}
              </span>
            </h1>
            <p className="text-xl text-slate-400 font-light leading-relaxed">
              Nexus OS è un'applicazione web scalabile progettata specificamente per agenzie digitali, consulenze e studi creativi.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <a 
              href="https://sogni-os.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary px-8 py-4 rounded-full font-bold flex items-center gap-2"
            >
              View Live Demo <PlayCircle className="w-5 h-5" />
            </a>
            <button className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-colors flex items-center gap-2">
              <Share2 className="w-5 h-5" /> Share
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,229,255,0.1)] bg-slate-950 p-1"
        >
          <div className="bg-slate-900 rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
             <div className="h-8 bg-slate-800 border-b border-white/5 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
             </div>
             <div className="aspect-video relative">
               <img 
                 src="/nexus os.png" 
                 alt="Nexus OS Preview" 
                 className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120]/40 to-transparent" />
             </div>
          </div>
        </motion.div>
      </section>

      {/* Stats/Badge Banner */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
         {[
           { label: "Architecture", val: "React 19 / Vite" },
           { label: "Styling", val: "Tailwind / Framer" },
           { label: "Localization", val: "i18next (EN/IT/FR)" },
           { label: "Integrations", val: "Zapier / n8n / WA" }
         ].map((stat, i) => (
           <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-2">{stat.label}</p>
              <p className="text-white font-bold text-sm">{stat.val}</p>
           </div>
         ))}
      </section>

      {/* Modules Grid */}
      <section className="grid md:grid-cols-3 gap-8 mb-24">
        {coreModules.map((m, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#00E5FF]/30 transition-all hover:bg-white/10"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              {m.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{m.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{m.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Deep Dive Section */}
      <section className="py-20 border-t border-white/10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl font-display font-bold text-white">Specifiche UI/UX</h2>
            <div className="space-y-6">
               <div>
                  <h4 className="text-emerald-400 font-bold mb-2">Adaptive Glassmorphism</h4>
                  <p className="text-slate-400 text-sm">Rendering profondo con traslucenza dinamica e transizioni liquide gestite da Framer Motion.</p>
               </div>
               <div>
                  <h4 className="text-[#00E5FF] font-bold mb-2">Theming Engine</h4>
                  <p className="text-slate-400 text-sm">Cambio istantaneo di modalità base (Light/Dark), colori d'accento e profili tipografici.</p>
               </div>
               <div>
                  <h4 className="text-[#E9C349] font-bold mb-2">Dashboard Interattive</h4>
                  <p className="text-slate-400 text-sm">Visualizzazione dati enterprise alimentata da Recharts e D3.js per metriche KPI in tempo reale.</p>
               </div>
            </div>
          </div>
          <div className="p-8 rounded-3xl bg-slate-900 border border-white/10 relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="relative z-10 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                      <Database className="w-5 h-5 text-emerald-400" />
                   </div>
                   <h3 className="text-white font-bold">API Gateway & Webhooks</h3>
                </div>
                <div className="space-y-3">
                   <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: '80%' }} transition={{ duration: 2 }} className="h-full bg-emerald-400" />
                   </div>
                   <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: '60%' }} transition={{ duration: 2, delay: 0.5 }} className="h-full bg-[#00E5FF]" />
                   </div>
                   <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: '90%' }} transition={{ duration: 2, delay: 1 }} className="h-full bg-[#E9C349]" />
                   </div>
                </div>
                <p className="text-xs text-slate-500">Infrastructure designed for real-time sync via Firestore/Supabase.</p>
             </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mt-24 text-center bg-gradient-to-br from-[#00E5FF]/5 to-black border border-white/10 p-16 rounded-3xl">
        <Code2 className="w-16 h-16 text-[#00E5FF] mx-auto mb-6" />
        <h2 className="text-3xl font-display font-bold text-white mb-6">Nexus OS: Your Agency, Unified</h2>
        <p className="text-slate-400 mb-10 max-w-xl mx-auto">
          Passa da tool sparsi a un unico ecosistema sovrano. Nexus OS è la spina dorsale digitale della tua agenzia.
        </p>
        <button className="btn-primary px-10 py-5 rounded-full font-bold text-lg inline-flex items-center gap-3">
          Richiedi Accesso Anticipato <ArrowRight className="w-6 h-6" />
        </button>
      </section>
    </div>
  );
}
