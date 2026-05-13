import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Users, Crown, Zap, Gift, Target, Megaphone, Coins, ChevronRight, CheckCircle2, Bot, Layers, TrendingUp, Handshake, Briefcase, FileText, Calculator, ShieldCheck, Mail, Star, HeartHandshake } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

function CommissionSimulator({ lang }: { lang: string }) {
  const isFR = lang === "FR";
  const isIT = lang === "IT";

  const [salesEssential, setSalesEssential] = useState(0);
  const [salesPro, setSalesPro] = useState(1);
  const [salesCustom, setSalesCustom] = useState(0);
  const [addons, setAddons] = useState(2);
  const [somniaRefills, setSomniaRefills] = useState(5);

  // Math
  const totalVolume = salesEssential + salesPro + salesCustom;
  let bonusMultiplier = 0;
  if (totalVolume >= 3 && totalVolume <= 5) bonusMultiplier = 0.02;
  if (totalVolume >= 6) bonusMultiplier = 0.05; // Simplifying the 6-10 and 10+ for the sim

  const commEssential = salesEssential * 849 * (0.10 + bonusMultiplier);
  const commPro = salesPro * 1599 * (0.12 + bonusMultiplier);
  // Assuming a custom pack averages 4000
  const commCustom = salesCustom * 4000 * (0.15 + bonusMultiplier);
  // Addons avg 150 each
  const commAddons = addons * 150 * 0.10;
  // Somnia token refills avg 100€
  const commSomnia = somniaRefills * 100 * 0.10;

  const totalComm = Math.round(commEssential + commPro + commCustom + commAddons + commSomnia);

  const t = {
    title: isFR ? "Simulateur de Gains Mensuels" : isIT ? "Simulatore di Guadagni Mensili" : "Monthly Earnings Simulator",
    essential: "Essential",
    pro: "Professional",
    custom: "Custom",
    addonsLabel: isFR ? "Add-ons Moyens" : isIT ? "Add-ons Medi" : "Avg Add-ons",
    somniaLabel: isFR ? "Recharges Somnia" : isIT ? "Ricariche Somnia" : "Somnia Refills",
    totalLabel: isFR ? "Gains Estimés" : isIT ? "Guadagno Stimato" : "Estimated Earnings",
    bonusActive: isFR ? "Bonus Volume Actif!" : isIT ? "Bonus Volume Attivo!" : "Volume Bonus Active!",
    noBonus: isFR ? "Visez 3 ventes pour un bonus de +2%" : isIT ? "Punta a 3 vendite per il bonus del +2%" : "Hit 3 sales for a +2% bonus",
  };

  return (
    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-10">
        <Calculator className="w-48 h-48 text-[#00E5FF]" />
      </div>
      <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-3">
            <Calculator className="w-8 h-8 text-[#00E5FF]" />
            {t.title}
          </h3>
          
          <div className="space-y-5">
            <SliderControl label={t.essential} value={salesEssential} setter={setSalesEssential} max={10} color="from-slate-400" />
            <SliderControl label={t.pro} value={salesPro} setter={setSalesPro} max={10} color="from-[#00E5FF]" />
            <SliderControl label={t.custom} value={salesCustom} setter={setSalesCustom} max={5} color="from-[#E9C349]" />
            <div className="h-px bg-white/10 my-4" />
            <SliderControl label={t.addonsLabel} value={addons} setter={setAddons} max={20} color="from-[#E11D48]" />
            <SliderControl label={t.somniaLabel} value={somniaRefills} setter={setSomniaRefills} max={50} color="from-green-400" />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-8 bg-white/5 border border-white/10 rounded-2xl relative">
          <div className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-2">
            {t.totalLabel}
          </div>
          <div className="text-6xl md:text-8xl font-display font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-br from-white to-[#00E5FF]">
            €{totalComm.toLocaleString('it-IT')}
          </div>
          <div className={`text-sm font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full border ${bonusMultiplier > 0 ? 'bg-[#00E5FF]/20 border-[#00E5FF]/50 text-[#00E5FF]' : 'bg-white/5 border-white/10 text-slate-500'}`}>
            {bonusMultiplier > 0 ? t.bonusActive : t.noBonus}
          </div>
        </div>
      </div>
    </div>
  );
}

function SliderControl({ label, value, setter, max, color }: any) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="font-medium text-slate-300 uppercase tracking-widest text-xs">{label}</span>
        <span className="font-bold text-white ml-4">{value}</span>
      </div>
      <input 
        type="range" 
        min="0" 
        max={max} 
        value={value} 
        onChange={(e) => setter(parseInt(e.target.value))}
        className="w-full accent-[#00E5FF] h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
}

export default function Affiliate({ lang }: { lang: string }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isFR = lang === "FR";
  const isIT = lang === "IT";

  const t = {
    title: isIT ? "Programma Affiliati Sogni Digitali" : isFR ? "Programme Partenaire Sogni Digitali" : "Sogni Digitali Affiliate Program",
    subtitle: isIT ? "Costruiamo motori di crescita autonomi guidati dall'IA." : isFR ? "Nous construisons des moteurs de croissance autonomes pilotés par l'IA." : "We build autonomous AI-driven growth engines.",
    description: isIT 
      ? "Benvenuto nel Programma Affiliati Sogni Digitali. Questa pagina delinea la nostra struttura ufficiale delle commissioni, combinando vendite one-off ad alto valore con entrate ricorrenti a lungo termine attraverso la nostra valuta di calcolo AI proprietaria. Guadagna commissioni segnalando clienti alla nostra web agency."
      : isFR 
      ? "Bienvenue dans le Programme Partenaire Sogni Digitali. Ce document décrit notre structure officielle de commissions, combinant des ventes directes à forte valeur ajoutée avec des revenus récurrents à long terme grâce à notre monnaie de calcul IA propriétaire. Gagnez des commissions en recommandant des clients."
      : "Welcome to the Sogni Digitali Affiliate Program. This document outlines our official commission structure, combining high-ticket one-off sales with long-term recurring revenue through our proprietary AI computing currency. Earn commissions by referring clients to our agency.",
    cta: isIT ? "Unisciti al Programma" : isFR ? "Rejoindre le Programme" : "Join the Program",
    
    packsTitle: isIT ? "Pacchetti di Implementazione (Bonus Una Tantum)" : isFR ? "Packs d'Implémentation (Primes Uniques)" : "Implementation Packs (One-Time Bounties)",
    packsDesc: isIT ? "Guadagna alte percentuali di commissione su ogni pacchetto di setup iniziale." : isFR ? "Gagnez des pourcentages de commission élevés sur chaque pack de configuration initial." : "Earn high-percentage commissions on every upfront setup package sold.",
    packs: [
      { name: "Essential Pack", price: "€849", comm: "10%", payout: "€84", icon: <Target className="w-6 h-6 text-slate-300" /> },
      { name: "Professional Pack", price: "€1.599", comm: "12%", payout: "€191", icon: <Zap className="w-6 h-6 text-[#00E5FF]" /> },
      { name: "Custom Pack", price: "€2.999+", comm: "15%", payout: "€449+", icon: <Crown className="w-6 h-6 text-[#E9C349]" /> }
    ],
    addonsTitle: isIT ? "Servizi Add-on (Commissione del 10% su tutti):" : isFR ? "Services Additionnels (Commission de 10% sur tous) :" : "Add-on Services (10% Commission on all):",
    addons: [
      isIT ? "Local Google Add-on: €149 (Guadagni €14)" : isFR ? "Module Google Local : 149 € (Vous gagnez 14 €)" : "Local Google Add-on: €149 (You earn €14)",
      isIT ? "IA Content Add-on: €199 (Guadagni €19)" : isFR ? "Module Contenu IA : 199 € (Vous gagnez 19 €)" : "IA Content Add-on: €199 (You earn €19)",
      isIT ? "Reputation Add-on: €99 (Guadagni €9)" : isFR ? "Module Réputation : 99 € (Vous gagnez 9 €)" : "Reputation Add-on: €99 (You earn €9)"
    ],

    bonusTitle: isIT ? "Il Bonus Palier (Moltiplicatori di Performance)" : isFR ? "Le Bonus Palier (Multiplicateurs de Performance)" : "The Bonus Palier (Performance Multipliers)",
    bonusDesc: isFR ? "Si vous apportez du volume au cours d'un même mois, vos pourcentages de base augmentent automatiquement sur toutes vos ventes du mois." : isIT ? "Se porti volume in un singolo mese, le tue percentuali base aumentano automaticamente su tutte le tue vendite di quel mese." : "If you bring in volume within a single calendar month, your base percentages automatically increase across all your sales for that month:",
    bonuses: [
      { tier: "3 to 5", desc: isFR ? "+2% de bonus sur toutes les commissions." : isIT ? "+2% di bonus su tutte le commissioni." : "+2% bonus on all commissions." },
      { tier: "6 to 10", desc: isFR ? "+5% de bonus sur toutes les commissions." : isIT ? "+5% di bonus su tutte le commissioni." : "+5% bonus on all commissions." },
      { tier: "10+", desc: isFR ? "Accord direct personnalisé et rang VIP." : isIT ? "Accordo diretto personalizzato e grado VIP." : "Custom direct agreement and VIP tier unlock." }
    ],

    somniaTitle: isIT ? "Il Somnia Token (Entrate Ricorrenti Passive)" : isFR ? "Le Somnia Token (Revenus Récurrents Passifs)" : "The Somnia Token (Passive Recurring Revenue)",
    somniaDesc: isFR ? "Pour offrir à nos partenaires de véritables revenus passifs (MRR), nous avons intégré le système Somnia Token. 1 Somnia Token = 1 Action IA. Vous gagnez 10% perpétuellement sur toutes les recharges de vos clients, pour la durée de vie du client." : isIT ? "Per offrire ai nostri partner vere entrate passive (MRR), abbiamo integrato il Token Somnia. 1 Token = 1 Azione IA. Guadagni il 10% in modo perpetuo su tutte le ricariche dei tuoi clienti a vita." : "We integrated the Somnia Token system into our affiliate model. Clients purchase Somnia Tokens to keep their AI engines running. You earn a perpetual 10% commission every time your client recharges their tokens.",

    operationsTitle: isIT ? "Operazioni e Pagamenti" : isFR ? "Opérations et Paiements" : "Operations & Payouts",
    operations: [
      { t: isFR ? "Attribution des Leads" : "Lead Attribution", d: isFR ? "Vérouillés pour vous 90 jours depuis le premier contact." : "Locked to you for 90 days from the first touchpoint." },
      { t: isFR ? "Calendrier des Paiements" : "Payout Timing", d: isFR ? "Payé le 15 du mois suivant la réception du solde validé." : "Paid by the 15th of the month following the final balance receipt." },
      { t: "Taxes", d: isFR ? "Paiements émis sur réception d'une facture standard (ou équivalent)." : "Payments are issued upon receipt of your standard P.IVA invoice / equivalent." }
    ],

    kitTitle: isIT ? "Il Kit Affiliato (Il Tuo Arsenale)" : isFR ? "Le Kit Partenaire (Votre Arsenal de Vente)" : "The 'Kit Affiliato' (Your Sales Arsenal)",
    kitDesc: isFR ? "Dès votre activation, nous vous fournissons tout le nécessaire pour conclure des ventes immédiatement :" : "Upon activation, we provide everything you need to start closing deals immediately:",
    kitItems: [
      isFR ? "Lien de tracking personnalisé & ID Affilié unique." : "Personalized tracking link & unique Affiliate ID.",
      isFR ? "Le pitch deck PDF comparatif 'Anti-SaaS'." : "The 'Anti-SaaS' comparative PDF pitch deck.",
      isFR ? "Scénarios de vente WhatsApp et Email prêts à l'emploi." : "Ready-to-use WhatsApp and Email sales scripts.",
      isFR ? "Accès à votre tableau de bord des commissions (Google Sheet partagé)." : "Access to your personal Commission Dashboard (Shared Google Sheet).",
      isFR ? "Un outil numérique pour générer facilement vos factures/reçus." : "A digital tool to easily generate your tax receipts."
    ],

    perksTitle: isIT ? "10 Motivi per Scegliere Noi" : isFR ? "10 Raisons de Devenir Partenaire" : "10 Reasons to Partner With Us",
    perks: [
      { icon: <Briefcase className="w-5 h-5 text-[#00E5FF]"/>, text: isFR ? "Manager de compte dédié direct via WhatsApp" : isIT ? "Account manager dedicato via WhatsApp" : "Dedicated account manager via WhatsApp" },
      { icon: <FileText className="w-5 h-5 text-[#00E5FF]"/>, text: isFR ? "Pitch decks générés auto pour vos prospects" : isIT ? "Pitch deck auto-generati per i tuoi prospect" : "Auto-generated pitch decks for your prospects" },
      { icon: <ShieldCheck className="w-5 h-5 text-[#00E5FF]"/>, text: isFR ? "Utilisez notre portfolio sous marque blanche" : isIT ? "Usa il nostro portfolio in white-label" : "Use our portfolio in white-label when pitching" },
      { icon: <HeartHandshake className="w-5 h-5 text-[#00E5FF]"/>, text: isFR ? "Communauté privée Telegram des meilleurs affiliés" : isIT ? "Community privata Telegram per i top affiliati" : "Private Telegram community for top affiliates" },
      { icon: <Zap className="w-5 h-5 text-[#00E5FF]"/>, text: isFR ? "Bonus d'action rapide : +50€ 1ère vente (30j)" : isIT ? "Bonus azione rapida: +50€ 1a vendita (30g)" : "Fast-action bonus: +€50 first sale (30d)" },
      { icon: <Handshake className="w-5 h-5 text-[#00E5FF]"/>, text: isFR ? "Système Handoff : amenez le lead, on conclut" : isIT ? "Sistema Handoff: porta il lead, noi chiudiamo" : "Handoff system: bring the lead, we close" },
      { icon: <Users className="w-5 h-5 text-[#00E5FF]"/>, text: isFR ? "Programme Sous-Affilié : 2% sur leurs ventes" : isIT ? "Programma Sub-Affiliati: 2% sulle loro vendite" : "Sub-Affiliate network: 2% on their sales" },
      { icon: <Crown className="w-5 h-5 text-[#00E5FF]"/>, text: isFR ? "Retraite annuelle Mastery (Dîner à Turin)" : isIT ? "Ritiro annuale Mastery (Cena a Torino)" : "Yearly Mastery retreat (Dinner in Torino)" },
      { icon: <Coins className="w-5 h-5 text-[#00E5FF]"/>, text: isFR ? "Wallet Token Custom pour racheter des services" : isIT ? "Wallet Token Custom per acquistare servizi" : "Custom Token Wallet to buy agency services" },
      { icon: <Star className="w-5 h-5 text-[#00E5FF]"/>, text: isFR ? "Dashboard de suivi en temps réel des commissions" : isIT ? "Dashboard di tracciamento commissioni in tempo reale" : "Real-time commission tracking dashboard" }
    ]
  };

  return (
    <div className="relative text-slate-300 font-sans selection:bg-[#00E5FF]/30 pb-20">
      <SEO 
        title={`${t.title} | Sogni Digitali`}
        description={t.description}
      />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-6 min-h-[60vh] flex items-center justify-center text-center">
        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-md mb-6"
          >
            <Crown className="w-4 h-4 text-[#E9C349]" />
            <span className="text-[#00E5FF] text-xs font-bold tracking-widest uppercase">{t.title}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight"
          >
            {t.subtitle}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-slate-300 font-light max-w-3xl mx-auto backdrop-blur-sm p-4 rounded-xl bg-black/20 border border-white/5"
          >
            {t.description}
          </motion.p>
        </div>
      </section>

      {/* Tiers Section */}
      <section className="py-16 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 uppercase tracking-wider">
              {t.packsTitle}
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto text-lg">{t.packsDesc}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-end">
            {t.packs.map((pack, idx) => (
              <motion.div
                key={pack.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative rounded-3xl overflow-hidden bg-black/40 backdrop-blur-xl border border-white/10 p-8 shadow-2xl hover:border-[#00E5FF]/50 transition-colors"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                    {pack.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white font-display uppercase tracking-wide">{pack.name}</h3>
                    <p className="text-sm text-slate-400">{pack.price}</p>
                  </div>
                </div>

                <div className="mb-4 space-y-1">
                  <div className="text-xs font-bold tracking-widest text-[#00E5FF] uppercase">Commission</div>
                  <div className="text-4xl font-bold text-white">{pack.comm}</div>
                  <div className="text-sm font-semibold text-[#E9C349]">Payout: {pack.payout}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="mt-12 bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 max-w-3xl mx-auto"
          >
            <h4 className="font-bold text-white mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#00E5FF]" />
              {t.addonsTitle}
            </h4>
            <div className="grid gap-3">
              {t.addons.map((add, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-[#E11D48] shrink-0" />
                  {add}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bonus Palier */}
      <section className="py-16 px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-4">
              <TrendingUp className="w-10 h-10 text-[#E9C349]" />
              {t.bonusTitle}
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              {t.bonusDesc}
            </p>
          </motion.div>
          <motion.div
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="space-y-4"
          >
            {t.bonuses.map((b, i) => (
              <div key={i} className="flex items-center gap-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/5 transition-colors">
                <div className="w-16 text-center">
                  <span className="block text-2xl font-bold text-white">{b.tier}</span>
                  <span className="text-[10px] uppercase tracking-widest text-[#00E5FF]">Sales/mo</span>
                </div>
                <div className="h-12 w-px bg-white/10" />
                <div className="text-sm text-slate-300 font-medium">
                  {b.desc}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Somnia Token Section */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-black/60 to-[#0A2E3F]/40 backdrop-blur-xl border border-[#00E5FF]/20 rounded-3xl p-10 md:p-16 shadow-[0_0_50px_rgba(0,229,255,0.1)]">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 mb-8 rounded-2xl bg-black border border-[#00E5FF]/30 flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.3)]">
              <Bot className="w-10 h-10 text-[#00E5FF]" />
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 uppercase tracking-wider">
              {t.somniaTitle}
            </h2>
            <p className="text-slate-300 max-w-3xl text-lg leading-relaxed">
              {t.somniaDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Operations & Kit Grid */}
      <section className="py-16 px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-10"
          >
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <MonitoredIcon icon={<Briefcase />} />
              {t.operationsTitle}
            </h3>
            <div className="space-y-6">
              {t.operations.map((op, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-xs font-bold tracking-widest text-[#E9C349] uppercase mb-1">{op.t}</span>
                  <span className="text-slate-300 text-sm">{op.d}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-10"
          >
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <MonitoredIcon icon={<FileText />} />
              {t.kitTitle}
            </h3>
            <p className="text-sm text-slate-400 mb-6">{t.kitDesc}</p>
            <div className="space-y-4">
              {t.kitItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#00E5FF] shrink-0" />
                  <span className="text-sm text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* 10 Ecosystem Perks */}
      <section className="py-16 px-6 relative z-10 w-full overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.05)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 uppercase tracking-wider">
              {t.perksTitle}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {t.perks.map((perk, i) => (
              <motion.div
                 key={i}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.05 }}
                 className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center hover:bg-white/5 hover:border-[#00E5FF]/30 transition-all group shadow-xl"
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                  {perk.icon}
                </div>
                <p className="text-sm text-slate-300 group-hover:text-white transition-colors">{perk.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Simulator */}
      <section className="py-24 px-6 relative z-10 w-full border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <CommissionSimulator lang={lang} />
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="py-24 px-6 relative text-center z-10">
        <div className="max-w-3xl mx-auto space-y-8">
           <h2 className="text-3xl md:text-5xl font-display font-bold text-white">
            {isFR ? "Rejoignez Sogni Digitali et monétisez la révolution de l'IA." : isIT ? "Unisciti a Sogni Digitali e monetizza la rivoluzione dell'IA." : "Join Sogni Digitali and start monetizing the AI revolution."}
          </h2>
          <Link 
            to="/book"
            className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-black uppercase tracking-widest text-lg overflow-hidden rounded-2xl transition-all hover:scale-105 shadow-[0_0_40px_rgba(233,195,73,0.3)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#E9C349] to-[#FCD34D] transition-transform group-hover:scale-105" />
            <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform" />
            <span className="relative flex items-center gap-3">
              {t.cta}
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </section>

    </div>
  );
}

function MonitoredIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
      {icon}
    </div>
  );
}
