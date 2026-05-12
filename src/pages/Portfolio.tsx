import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MonitorPlay, Bot, Code2, Sparkles, Smartphone, ArrowRight } from 'lucide-react';
import { translations } from '../lib/translations';
import SEO from '../components/SEO';

export default function PortfolioPage({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations['EN'];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const projects: any[] = [
    {
      id: "lumina-guest-hub",
      title: "Lumina",
      category: lang === 'IT' ? "Hotel AI Experience" : lang === 'FR' ? "Expérience IA Hôtelière" : "Hotel AI Experience",
      desc: lang === 'IT' 
        ? "Esperienza Smart TV premium basata su IA per hotel esclusivi. Concierge digitale con UI cinematografica da 10 piedi."
        : lang === 'FR' 
          ? "Expérience Smart TV premium basée sur l'IA pour hôtels exclusifs. Concierge numérique avec interface cinéma."
          : "Premium AI-driven Smart TV experience for exclusive hotels. Digital concierge with cinematic 10-foot UI.",
      icon: <Bot className="w-6 h-6 text-[#E9C349]" />,
      image: "bg-gradient-to-br from-slate-800 to-slate-900", // placeholder
      tags: ["AI Concierge", "Smart TV UI", "Hospitality"],
      link: "/portfolio/lumina"
    },
    {
      id: "nexus-os",
      title: "Nexus OS",
      category: lang === 'IT' ? "Agency OS & CRM" : lang === 'FR' ? "OS Agence & CRM" : "Agency OS & CRM",
      desc: lang === 'IT'
        ? "Sistema operativo aziendale unificato per agenzie digitali. CRM, automazione IA e gestione infrastruttura sovrana."
        : lang === 'FR'
          ? "Système d'exploitation unifié pour agences digitales. CRM, automatisation IA et infrastructure souveraine."
          : "Unified agency operating system for digital agencies. CRM, AI automation, and sovereign architecture.",
      icon: <MonitorPlay className="w-6 h-6 text-[#00E5FF]" />,
      image: "bg-gradient-to-br from-[#0B1120] to-slate-900", // placeholder
      tags: ["ERP/CRM", "SaaS", "Automation"],
      link: "/portfolio/nexus"
    },
    {
      id: "montessori-app",
      title: "AccademiaMontessori",
      category: lang === 'IT' ? "Digitalizzazione & App" : lang === 'FR' ? "Digitalisation & App" : "Digitalization & App",
      desc: lang === 'IT'
        ? "App personalizzata per la gestione scolastica: registro presenze, comunicazione genitori-insegnanti e portale pagamenti ultra-sicuro."
        : lang === 'FR'
          ? "Application personnalisée pour la gestion scolaire : registre des présences, communication parents-enseignants et portail de paiement sécurisé."
          : "Custom school management app: attendance registry, parent-teacher communication, and ultra-secure payment portal.",
      icon: <Smartphone className="w-6 h-6 text-[#00f2fe]" />,
      image: "bg-gradient-to-br from-blue-950/40 to-slate-900", // placeholder
      tags: ["EdTech", "Mobile App", "Gestione Scolastica"]
    },
    {
      id: "shopall",
      title: "ShopAll (E-commerce)",
      category: "Premium E-commerce",
      desc: lang === 'IT'
        ? "Piattaforma E-commerce di alto livello scalabile con ottimizzazione conversioni."
        : lang === 'FR'
          ? "Plateforme E-commerce de haut niveau évolutive avec optimisation des conversions."
          : "High-level scalable E-commerce platform with conversion optimization.",
      icon: <Code2 className="w-6 h-6 text-emerald-400" />,
      image: "bg-gradient-to-br from-emerald-950/40 to-slate-900", // placeholder
      tags: ["E-commerce", "Conversions", "Scalability"]
    },
    {
      id: "luca-barber",
      title: "Luca Barber Shop",
      category: "Booking System",
      desc: lang === 'IT'
        ? "Sistema di prenotazione dinamico per parrucchieri con calendari automatizzati."
        : lang === 'FR'
          ? "Système de réservation dynamique pour coiffeurs avec calendriers automatisés."
          : "Dynamic booking system for barbershops with automated calendars.",
      icon: <Sparkles className="w-6 h-6 text-orange-400" />,
      image: "bg-gradient-to-br from-orange-950/40 to-slate-900", // placeholder
      tags: ["Booking", "Local SEO", "Automation"]
    },
    {
      id: "5-mondo",
      title: "5 Mondo Spa & Centro estetica",
      category: "Luxury Services",
      desc: lang === 'IT'
        ? "Web identity raffinata e CRM clienti locale per saloni di bellezza premium."
        : lang === 'FR'
          ? "Identité web raffinée et CRM client local pour salons de beauté premium."
          : "Refined web identity and local client CRM for premium beauty salons.",
      icon: <Sparkles className="w-6 h-6 text-[#E9C349]" />,
      image: "bg-gradient-to-br from-purple-950/40 to-slate-900", // placeholder
      tags: ["Web Identity", "CRM", "Luxury"]
    }
  ];

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto space-y-24">
      <SEO 
        title={`Portfolio & Progetti | Sogni Digitali`} 
        description="Scopri i migliori progetti e case study realizzati dall'agenzia Sogni Digitali tra web design, e-commerce e intelligenza artificiale." 
      />
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 text-sm mb-6"
        >
          <Sparkles className="w-4 h-4 text-[#00E5FF]" />
          Lavori e Dimostrazioni
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-display font-bold mb-6"
        >
          Esplora il nostro <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#00B4D8]">Portfolio</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-slate-400"
        >
          {t.footerPortfolio ? `Benvenuti nel nostro ${t.footerPortfolio.toLowerCase()}.` : "Benvenuti nel nostro portfolio."} Dai siti vetrina mozzafiato fino ai sistemi di intelligenza artificiale più avanzati del momento.
        </motion.p>
      </section>

      {/* Grid of Projects */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, i) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
          >
            <Link 
              to={project.link || "#"}
              className="group h-full relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 flex flex-col hover:border-[#00E5FF]/30 transition-colors"
            >
            {/* Minimalist Image Placeholder Area */}
            <div className={`h-64 ${project.image} relative overflow-hidden flex items-center justify-center p-8`}>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              <div className="relative z-10 p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 scale-95 group-hover:scale-105 transition-transform duration-500 shadow-2xl">
                {project.icon}
              </div>
            </div>

            {/* Content Area */}
            <div className="p-8 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-[#00E5FF] text-sm font-bold tracking-widest uppercase mb-2">
                    {project.category}
                  </p>
                  <h3 className="text-2xl font-bold text-white group-hover:text-[#E9C349] transition-colors">
                    {project.title}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#00E5FF]/20 transition-colors shrink-0">
                  <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-[#00E5FF] transition-colors" />
                </div>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-1">
                {project.desc}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map((tag: any) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs text-slate-200">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        </motion.div>
        ))}
      </section>

      {/* CTA Bottom */}
      <section className="text-center pt-12 border-t border-white/10">
        <h3 className="text-2xl font-bold text-white mb-4">Vuoi vedere il tuo brand qui?</h3>
        <p className="text-slate-400 mb-8 max-w-xl mx-auto">
          Trasformiamo visioni in ecosistemi digitali sovrani di altissimo livello.
        </p>
        <Link to="/pricing" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors border border-white/10">
          Scegli un Pacchetto <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

    </div>
  );
}
