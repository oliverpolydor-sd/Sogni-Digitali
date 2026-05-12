import React, { useEffect, useState } from 'react';
import { Check, Sparkles, Zap, Crown, ArrowLeft, X, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { translations } from '../lib/translations';
import { getPricingData } from '../lib/pricingData';
import Tooltip from '../components/Tooltip';
import ScrambleNumber from '../components/ScrambleNumber';
import SEO from '../components/SEO';

import { submitFormToBridge } from '../lib/submitHelper';

const renderCell = (value: string) => {
  if (value === "✅") return <Check className="w-5 h-5 text-[#00E5FF] mx-auto" />;
  if (value === "❌") return <X className="w-5 h-5 text-slate-600 mx-auto" />;
  if (value.startsWith("✅ ")) return (
    <div className="flex items-center justify-center gap-2 text-[#00E5FF]">
      <Check className="w-4 h-4 shrink-0" />
      <span>{value.replace("✅ ", "")}</span>
    </div>
  );
  return <span className="text-slate-300">{value}</span>;
};

export default function PricingPage({ lang }: { lang: string }) {
  const [isMainTableOpen, setIsMainTableOpen] = useState(false);
  const [isOneShotTableOpen, setIsOneShotTableOpen] = useState(false);
  const [isCareTableOpen, setIsCareTableOpen] = useState(false);

  // Affiliate Form State
  const [affiliateData, setAffiliateData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [honeypot, setHoneypot] = useState("");

  const handleAffiliateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const affiliateId = urlParams.get('ref') || urlParams.get('aff') || urlParams.get('affiliate') || localStorage.getItem('sogni_affiliate_id') || "";

      await submitFormToBridge({
          ...affiliateData,
          pageSubject: 'Affiliate Application',
          source: 'Sogni Digitali Website',
          is_affiliate: true,
      }, honeypot, affiliateId);

      setIsSubmitting(false);
      setIsSuccess(true);
      setAffiliateData({ name: '', email: '', phone: '', address: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      alert(lang === 'IT' ? "Errore durante l'invio. Riprova." : 'Submission error. Please try again.');
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const t = translations[lang as keyof typeof translations];
  const pricingData = getPricingData(lang);
  const packsWithIcons = pricingData.packs.map((p, i) => ({
    ...p,
    icon: i === 0 ? Zap : i === 1 ? Sparkles : Crown
  }));

  const whatsappLink = "https://wa.me/393755880609?text=Ciao%20Sogni%20Digitali,%20vorrei%20maggiori%20informazioni%20sui%20vostri%20servizi.";

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden z-10" style={{ perspective: '1200px' }}>
      <SEO 
        title={`Prezzi e Investimento | Sogni Digitali`} 
        description="Scopri i piani di investimento per lo sviluppo della tua presenza online e per l'automazione del tuo business. Prezzi chiari, qualità premium senza compromessi." 
      />
      <motion.div 
        initial="initial"
        animate="animate"
        variants={{
          animate: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        className="max-w-7xl mx-auto relative z-10"
      >
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-medium tracking-widest uppercase text-sm">
            <ArrowLeft className="w-4 h-4" />
            {t.backButton || "Go Back"}
          </Link>
        </div>

        {/* Hero */}
        <section className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
            <span className="text-xs font-medium tracking-widest uppercase text-slate-300">{t.pricingHeroBadge}</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1] mb-6 relative group"
          >
            <span className="relative z-10">{t.pricingHeroTitle1}</span><br className="hidden md:block" />
            <span className="text-gradient-cyan relative z-10 inline-block hover:animate-glitch">{t.pricingHeroTitle2}</span>
            
            {/* Decorative Glitch Layers */}
            <span className="absolute inset-0 text-[#00E5FF] opacity-0 group-hover:opacity-20 group-hover:translate-x-1 -z-10 transition-opacity">{t.pricingHeroTitle1}<br className="hidden md:block" />{t.pricingHeroTitle2}</span>
            <span className="absolute inset-0 text-[#E9C349] opacity-0 group-hover:opacity-20 group-hover:-translate-x-1 -z-10 transition-opacity">{t.pricingHeroTitle1}<br className="hidden md:block" />{t.pricingHeroTitle2}</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 font-light leading-relaxed max-w-2xl mx-auto"
          >
            {t.pricingHeroDesc}
          </motion.p>
        </section>

        {/* Pricing Cards */}
        <section className="mb-32">
          <div className="grid md:grid-cols-3 gap-8">
            {packsWithIcons.map((pack, idx) => (
              <motion.div 
                key={pack.name}
                variants={{
                  initial: { opacity: 0, y: 30, rotateY: -10 },
                  animate: { opacity: 1, y: 0, rotateY: 0 }
                }}
                transition={{ duration: 0.8, delay: 0.2 + idx * 0.1 }}
                whileHover={{ 
                  y: -15, 
                  rotateY: 5,
                  scale: 1.02,
                  transition: { duration: 0.4 }
                }}
                className={`relative p-8 rounded-3xl flex flex-col glass-panel transition-all duration-500 ${
                  pack.popular 
                    ? "border-[#00E5FF]/30 shadow-[0_0_30px_rgba(0,229,255,0.1)]" 
                    : pack.name === "Custom"
                    ? "border-2 border-dashed border-[#E9C349]/50 hover:border-[#E9C349]"
                    : "border-white/10"
                }`}
              >
                {pack.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#00E5FF] text-black text-xs font-bold tracking-widest uppercase rounded-full shadow-[0_0_15px_rgba(0,229,255,0.5)]">
                    POPOLARE
                  </div>
                )}
                <div className="text-center mb-8">
                  <pack.icon className={`w-12 h-12 mx-auto mb-6 ${
                    pack.popular ? "text-[#00E5FF]" : "text-[#E9C349]"
                  }`} />
                  <h3 className={`text-2xl font-display font-bold mb-2 ${pack.popular ? "text-[#00E5FF]" : ""}`}>{pack.name}</h3>
                  <div className={`${pack.name === "Custom" ? "text-2xl" : "text-5xl"} font-bold font-display my-4 min-h-[60px] flex items-center justify-center gap-1`}>
                    <ScrambleNumber value={pack.price} duration={1500 + idx * 400} className={pack.popular ? "text-white" : "text-[#E9C349]"} />
                    {pack.name !== "Custom" && <span className="text-xl text-slate-400 font-light">€</span>}
                  </div>
                  <p className="text-slate-400 text-sm font-light">{pack.description}</p>
                </div>
                
                <ul className="space-y-4 mb-10 flex-grow">
                  {pack.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm font-light text-slate-300">
                      <Check className={`w-5 h-5 shrink-0 ${pack.popular ? "text-[#00E5FF]" : "text-[#E9C349]"}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {pack.name === "Custom" ? (
                  <Tooltip content="Configura il tuo progetto su misura">
                    <a 
                      href={`https://wa.me/393755880609?text=${
                        lang === 'IT' ? 'Vorrei%20informazioni%20per%20il%20pacchetto%20Custom' :
                        lang === 'FR' ? 'Je%20souhaite%20des%20informations%20sur%20le%20pack%20Custom' :
                        'I%20would%20like%20information%20about%20the%20Custom%20package'
                      }`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block w-full mt-auto"
                    >
                      <button 
                        className="w-full py-4 rounded-xl border-2 border-dashed border-[#E9C349]/50 text-[#E9C349] font-bold text-sm tracking-widest uppercase hover:bg-[#E9C349]/10 hover:border-[#E9C349] transition-colors flex items-center justify-center gap-2"
                      >
                        {pack.cta}
                      </button>
                    </a>
                  </Tooltip>
                ) : (
                  <Tooltip content={`Scegli il piano ${pack.name}`}>
                    <Link to={`/checkout/${pack.name.toLowerCase()}`} className="block w-full mt-auto">
                      <button 
                        className={`w-full py-4 rounded-full font-bold text-sm tracking-widest uppercase transition-all flex items-center justify-center gap-2 ${
                          pack.popular 
                            ? "bg-gradient-to-r from-[#00E5FF] to-[#00B4D8] text-[#0B1120] hover:scale-105 ambient-shadow-cyan" 
                            : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                        }`}
                      >
                        {pack.cta}
                      </button>
                    </Link>
                  </Tooltip>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Comparison Table */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-32"
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-display text-3xl md:text-4xl font-bold">
                {t.compTitle1} <span className="text-gradient-cyan">{t.compTitle2}</span>
              </h2>
              <button 
                onClick={() => setIsMainTableOpen(!isMainTableOpen)}
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-bold tracking-widest uppercase transition-colors"
              >
                {isMainTableOpen ? t.hideComparison : t.viewComparison}
                {isMainTableOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
            
            {isMainTableOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="overflow-x-auto rounded-3xl border border-white/10 glass-panel"
              >
                <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="p-6 font-display font-bold text-lg text-white w-1/3">{t.compFeature}</th>
                    <th className="p-6 font-display font-bold text-lg text-center text-white w-[22%]">Essential</th>
                    <th className="p-6 font-display font-bold text-lg text-center text-[#00E5FF] w-[22%]">Professional</th>
                    <th className="p-6 font-display font-bold text-lg text-center text-[#E9C349] w-[22%]">Custom</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingData.comparisonData.map((category, catIdx) => (
                    <React.Fragment key={catIdx}>
                      <tr className="border-b border-white/10 bg-white/5">
                        <td colSpan={4} className="p-4 font-display font-bold text-[#00E5FF] tracking-widest uppercase text-sm">
                          {category.category}
                        </td>
                      </tr>
                      {category.features.map((feature, featIdx) => (
                        <tr key={featIdx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-slate-300 font-light text-sm pl-6">{feature.name}</td>
                          <td className="p-4 text-center text-sm font-light">{renderCell(feature.essential)}</td>
                          <td className="p-4 text-center text-sm font-light bg-[#00E5FF]/5">{renderCell(feature.professional)}</td>
                          <td className="p-4 text-center text-sm font-light">{renderCell(feature.custom)}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
              </motion.div>
            )}
          </div>
        </motion.section>

        {/* Marketplace: Somnia, Marketing, Care */}
        <section className="mb-32">
          <div className="max-w-6xl mx-auto space-y-24">
            
            {/* Somnia Tokens */}
            <div>
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  Somnia <span className="text-gradient">Token</span>
                </h2>
                <p className="text-slate-400 font-light max-w-2xl mx-auto">
                  {lang === 'EN' ? 'Purchase competence tokens without long-term commitments.' : lang === 'FR' ? 'Achetez des jetons de compétence sans engagement.' : lang === 'AR' ? 'شراء رموز الوحدات بدون التزامات.' : 'Acquista pacchetti di assistenza e sviluppo senza vincoli.'}
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {pricingData.boosters.slice(0, 3).map((booster, idx) => (
                  <div key={idx} className="glass-panel p-8 rounded-3xl border border-white/10 hover:border-[#00E5FF]/30 transition-all flex flex-col">
                    <h3 className="text-xl font-display font-bold text-white mb-2">{booster.name}</h3>
                    <p className="text-slate-400 font-light text-sm mb-6 flex-grow">{booster.description}</p>
                    <div className="text-2xl font-display font-bold text-[#00E5FF] mb-6">
                      <ScrambleNumber value={booster.price} duration={1200 + idx * 300} />
                    </div>
                    <Link to={`/checkout/${booster.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="w-full mt-auto">
                       <button className="w-full py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-[#00E5FF]/10 text-white font-bold text-sm tracking-widest uppercase transition-colors">
                         Buy Now
                       </button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Marketing Services */}
            <div>
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  Marketing <span className="text-gradient-cyan">Services</span>
                </h2>
                <p className="text-slate-400 font-light max-w-2xl mx-auto">
                  {lang === 'EN' ? 'Advanced tools to dominate local SEO and lead generation.' : lang === 'FR' ? 'Outils avancés pour dominer le SEO local et la génération de leads.' : lang === 'AR' ? 'أدوات متقدمة للسيطرة على السوق المحلي' : 'Strumenti avanzati per dominare il mercato locale e la SEO.'}
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {pricingData.boosters.slice(3, 6).map((booster, idx) => (
                  <div key={idx} className="glass-panel p-8 rounded-3xl border border-white/10 hover:border-[#E9C349]/30 transition-all flex flex-col">
                    <h3 className="text-xl font-display font-bold text-white mb-2">{booster.name}</h3>
                    <p className="text-slate-400 font-light text-sm mb-6 flex-grow">{booster.description}</p>
                    <div className="text-2xl font-display font-bold text-[#E9C349] mb-6">
                      <ScrambleNumber value={booster.price} duration={1200 + idx * 300} />
                    </div>
                    <Link to={`/checkout/${booster.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="w-full mt-auto">
                       <button className="w-full py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-[#E9C349]/10 text-white font-bold text-sm tracking-widest uppercase transition-colors">
                         Buy Now
                       </button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Sogni Care */}
            <div>
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  Sogni <span className="text-gradient">Care</span>
                </h2>
                <p className="text-slate-400 font-light max-w-2xl mx-auto">
                  {t.careDescExtended || t.careDesc}
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center mb-12">
                {pricingData.sogniCare.map((plan, idx) => (
                  <div key={idx} className={`glass-panel p-8 rounded-3xl border ${idx === 1 ? 'border-[#00E5FF]/30 shadow-[0_0_30px_rgba(0,229,255,0.1)]' : 'border-white/10'} hover:border-white/30 transition-all flex flex-col relative`}>
                    {idx === 1 && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#00E5FF] text-black text-[10px] font-bold tracking-widest uppercase rounded-full">PRO</div>}
                    <h3 className={`text-xl font-display font-bold mb-2 ${idx === 1 ? 'text-[#00E5FF]' : 'text-white'}`}>{plan.name}</h3>
                    <p className="text-slate-400 font-light text-sm mb-6 flex-grow">{plan.description}</p>
                    <div className="text-2xl font-display font-bold text-white mb-6">
                      <ScrambleNumber value={plan.price} duration={1200 + idx * 300} />
                    </div>
                    <Link to={`/checkout/${plan.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="w-full mt-auto">
                       <button className={`w-full py-3 rounded-xl font-bold text-sm tracking-widest uppercase transition-colors ${idx === 1 ? 'bg-[#00E5FF] text-black hover:bg-[#00B4D8]' : 'border border-white/10 bg-white/5 hover:bg-white/10 text-white'}`}>
                         Buy Now
                       </button>
                    </Link>
                  </div>
                ))}
              </div>

              {/* Sogni Care Comparison Table */}
              <div className="text-center mb-8">
                <button 
                  onClick={() => setIsCareTableOpen(!isCareTableOpen)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-bold tracking-widest uppercase transition-colors"
                >
                  {isCareTableOpen ? t.hideComparison : (lang === 'EN' ? 'Detailed Care Comparison' : ('Confronto Dettagliato Care'))}
                  {isCareTableOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
              
              {isCareTableOpen && (pricingData as any).careComparisonData && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="overflow-x-auto rounded-3xl border border-white/10 glass-panel max-w-4xl mx-auto"
                >
                  <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="p-6 font-display font-bold text-lg text-white w-1/2">{t.compFeature}</th>
                      <th className="p-6 font-display font-bold text-lg text-center text-white w-1/4">Sogni Care</th>
                      <th className="p-6 font-display font-bold text-lg text-center text-[#00E5FF] w-1/4">Sogni Care Pro</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(pricingData as any).careComparisonData.map((category: any, catIdx: number) => (
                      <React.Fragment key={catIdx}>
                        <tr className="border-b border-white/10 bg-white/5">
                          <td colSpan={3} className="p-4 font-display font-bold text-[#00E5FF] tracking-widest uppercase text-sm">
                            {category.category}
                          </td>
                        </tr>
                        {category.features.map((feature: any, featIdx: number) => (
                          <tr key={featIdx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="p-4 text-slate-300 font-light text-sm pl-6">{feature.name}</td>
                            <td className="p-4 text-center text-sm font-light">{renderCell(feature.care)}</td>
                            <td className="p-4 text-center text-sm font-light bg-[#00E5FF]/5">{renderCell(feature.carePro)}</td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
                </motion.div>
              )}
            </div>
            
          </div>
        </section>

        {/* Trust Signals */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-32"
        >
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                className="group cursor-default"
              >
                <div className="font-display text-5xl font-bold text-white mb-4 relative inline-block">
                  <span className="relative z-10 group-hover:animate-glitch inline-block">{t.trust1Value}</span>
                  <span className="absolute inset-0 text-[#00E5FF] opacity-0 group-hover:opacity-40 group-hover:translate-x-1 -z-10 transition-opacity">{t.trust1Value}</span>
                  <span className="absolute inset-0 text-[#E9C349] opacity-0 group-hover:opacity-40 group-hover:-translate-x-1 -z-10 transition-opacity">{t.trust1Value}</span>
                </div>
                <div className="text-slate-400 font-light group-hover:text-white transition-colors">{t.trust1Desc}</div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: 0.1 }}
                className="group cursor-default"
              >
                <div className="font-display text-5xl font-bold text-white mb-4 relative inline-block">
                  <span className="relative z-10 group-hover:animate-glitch inline-block">{t.trust2Value}</span>
                  <span className="absolute inset-0 text-[#00E5FF] opacity-0 group-hover:opacity-40 group-hover:translate-x-1 -z-10 transition-opacity">{t.trust2Value}</span>
                  <span className="absolute inset-0 text-[#E9C349] opacity-0 group-hover:opacity-40 group-hover:-translate-x-1 -z-10 transition-opacity">{t.trust2Value}</span>
                </div>
                <div className="text-slate-400 font-light group-hover:text-white transition-colors">{t.trust2Desc}</div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: 0.2 }}
                className="group cursor-default"
              >
                <div className="font-display text-5xl font-bold text-white mb-4 relative inline-block">
                  <span className="relative z-10 group-hover:animate-glitch inline-block">{t.trust3Value}</span>
                  <span className="absolute inset-0 text-[#00E5FF] opacity-0 group-hover:opacity-40 group-hover:translate-x-1 -z-10 transition-opacity">{t.trust3Value}</span>
                  <span className="absolute inset-0 text-[#E9C349] opacity-0 group-hover:opacity-40 group-hover:-translate-x-1 -z-10 transition-opacity">{t.trust3Value}</span>
                </div>
                <div className="text-slate-400 font-light group-hover:text-white transition-colors">{t.trust3Desc}</div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-32"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12">
              {t.faqTitle1} <span className="text-gradient-cyan">{t.faqTitle2}</span>
            </h2>
            <div className="space-y-4">
              {pricingData.faqs.map((faq, index) => (
                <div key={index} className="border border-white/10 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm">
                  <details className="group">
                    <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-white/5 transition-colors">
                      <span className="font-display font-semibold text-lg text-white">{faq.question}</span>
                      <span className="text-[#00E5FF] group-open:rotate-180 transition-transform duration-300">▼</span>
                    </summary>
                    <div className="p-6 pt-0 text-slate-400 font-light leading-relaxed border-t border-white/5 mt-2 bg-black/20">
                      {faq.answer}
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Affiliate Section */}
        <motion.section 
          id="affiliate"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-32"
        >
          <div className="max-w-3xl mx-auto p-10 md:p-14 rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#E9C349] to-transparent opacity-50" />
            
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                {lang === 'IT' ? 'Diventa un nostro Affiliato' : lang === 'FR' ? 'Devenez un Affilié' : 'Become an Affiliate'}
              </h2>
              <p className="text-slate-400 font-light max-w-xl mx-auto">
                {lang === 'IT' ? 'Aiutaci a crescere e guadagna commissioni esclusive.' : lang === 'FR' ? 'Aidez-nous à grandir et gagnez des commissions exclusives.' : 'Help us grow and earn exclusive commissions.'}
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleAffiliateSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 ml-1">
                    {lang === 'IT' ? 'Nome Completo' : lang === 'FR' ? 'Nom Complet' : 'Full Name'} *
                  </label>
                  <input 
                    type="text" 
                    required
                    value={affiliateData.name}
                    onChange={(e) => setAffiliateData({...affiliateData, name: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#E9C349] focus:ring-1 focus:ring-[#E9C349]/50 transition-all"
                    placeholder="Mario Rossi"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 ml-1">Email *</label>
                  <input 
                    type="email" 
                    required
                    value={affiliateData.email}
                    onChange={(e) => setAffiliateData({...affiliateData, email: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#E9C349] focus:ring-1 focus:ring-[#E9C349]/50 transition-all"
                    placeholder="mario@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 ml-1">
                    {lang === 'IT' ? 'Numero di Telefono' : lang === 'FR' ? 'Numéro de Téléphone' : 'Phone Number'} *
                  </label>
                  <input 
                    type="tel" 
                    required
                    value={affiliateData.phone}
                    onChange={(e) => setAffiliateData({...affiliateData, phone: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#E9C349] focus:ring-1 focus:ring-[#E9C349]/50 transition-all"
                    placeholder="+39 333 1234567"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 ml-1">
                    {lang === 'IT' ? 'Indirizzo' : lang === 'FR' ? 'Adresse' : 'Address'} *
                  </label>
                  <input 
                    type="text" 
                    required
                    value={affiliateData.address}
                    onChange={(e) => setAffiliateData({...affiliateData, address: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#E9C349] focus:ring-1 focus:ring-[#E9C349]/50 transition-all"
                    placeholder="Via Roma 1, Torino"
                  />
                </div>
              </div>

              <AnimatePresence>
                {isSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }} 
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 bg-[#E9C349]/10 border border-[#E9C349]/50 text-[#E9C349] rounded-xl text-center font-medium"
                  >
                    {lang === 'IT' ? 'Grazie per la tua candidatura! Ti contatteremo presto.' : 'Thanks for applying! We will contact you soon.'}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="pt-4 space-y-6">
                <input type="text" name="_honeypot" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#E9C349] to-yellow-600 text-[#0B1120] px-8 py-4 rounded-xl font-bold text-sm tracking-widest uppercase hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(233,195,73,0.3)] disabled:opacity-70 flex items-center justify-center h-[52px]"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : (
                    lang === 'IT' ? 'Invia Candidatura' : lang === 'FR' ? 'Soumettre la Candidature' : 'Submit Application'
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.section>

        {/* CTA Final */}
        <motion.section 
          initial={{ opacity: 0, translateZ: -100 }}
          whileInView={{ opacity: 1, translateZ: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <div className="max-w-2xl mx-auto p-12 rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent opacity-50" />
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">{t.finalCtaTitle}</h2>
            <p className="text-slate-400 font-light mb-8 leading-relaxed">
              {t.finalCtaDesc}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-block w-full sm:w-auto">
                <button className="w-full bg-gradient-to-r from-[#00E5FF] to-[#00B4D8] text-[#0B1120] px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase hover:scale-105 transition-transform ambient-shadow-cyan">
                  {t.finalCtaBtn}
                </button>
              </a>
              <Link to="/book" className="inline-flex w-full sm:w-auto items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase hover:scale-105 transition-transform">
                {lang === 'IT' ? 'Non sei sicuro? Prenota una chiamata' : lang === 'FR' ? 'Pas sûr ? Prenez rendez-vous' : 'Not sure? Book a call'}
              </Link>
            </div>
            <p className="mt-8 text-sm text-slate-500 font-light">{t.finalCtaSub}</p>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}
