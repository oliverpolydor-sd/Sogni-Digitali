import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Globe, Code2, Bot, Store, ArrowRight, Sparkles, ChevronDown, MessageSquare, Menu, X, Check, Linkedin, Instagram, Facebook, MessageCircle, MapPin, Mail, Building2, TrendingUp, Target, Users, Star, Phone, Sun, Moon } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import Tooltip from './components/Tooltip';
import TikTokIcon from './components/TikTokIcon';
import { useTheme } from './contexts/ThemeContext';

import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { translations } from './lib/translations';
import { submitFormToBridge } from './lib/submitHelper';
import { getPricingData } from './lib/pricingData';
import ScrollToTopButton from './components/ScrollToTopButton';
import PromoPopup from './components/PromoPopup';
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import AccessibilityMenu from './components/AccessibilityMenu';
import CookieBanner from './components/CookieBanner';
import AIBot from './components/AIBot';
import SunBackground from './components/SunBackground';
import LoadingScreen from './components/LoadingScreen';
import ScrambleNumber from './components/ScrambleNumber';

// Lazy loaded pages to improve performance
const Pricing = React.lazy(() => import('./pages/Pricing'));
const Checkout = React.lazy(() => import('./pages/Checkout'));
const Terms = React.lazy(() => import('./pages/Terms'));
const Privacy = React.lazy(() => import('./pages/Privacy'));
const Legal = React.lazy(() => import('./pages/Legal'));
const Linktree = React.lazy(() => import('./pages/Linktree'));
const MarketingPage = React.lazy(() => import('./pages/Marketing'));
const PackagesPage = React.lazy(() => import('./pages/Packages'));
const PortfolioPage = React.lazy(() => import('./pages/Portfolio'));
const LuminaDetail = React.lazy(() => import('./pages/LuminaDetail'));
const NexusDetail = React.lazy(() => import('./pages/NexusDetail'));
const ServicesPage = React.lazy(() => import('./pages/Services'));
const BookingPage = React.lazy(() => import('./pages/Booking'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

// Lazy loaded heavy 3D components
const Dodo3D = React.lazy(() => import('./components/Dodo3D'));
const Rocket3D = React.lazy(() => import('./components/Rocket3D'));

function ScrollToHash() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);
  return null;
}

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    className={className}
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

import GlobalLoader from './components/GlobalLoader';
import Analytics from './components/Analytics';

function AppContent() {
  const { scrollY, scrollYProgress } = useScroll();
  const { isLightMode, toggleTheme } = useTheme();
  
  // Use location inside Router
  const location = useLocation();
  const isLinksPage = location.pathname === '/links';
  const y1 = useTransform(scrollY, [0, 5000], [0, -1000]);
  const y2 = useTransform(scrollY, [0, 5000], [0, -600]);
  const y3 = useTransform(scrollY, [0, 5000], [0, -1500]);
  const yNebula1 = useTransform(scrollY, [0, 5000], [0, -400]);
  const yNebula2 = useTransform(scrollY, [0, 5000], [0, -800]);
  const yNebula3 = useTransform(scrollY, [0, 5000], [0, -1200]);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServiziOpen, setIsMobileServiziOpen] = useState(false);
  const [lang, setLang] = useState('IT');
  
  // Handle Arabic RTL
  useEffect(() => {
    document.documentElement.dir = lang === 'AR' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang.toLowerCase();
  }, [lang]);

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', website: '', business: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  // High-tech luxury animation variants
  const luxuryReveal = {
    initial: { opacity: 0, y: 40, filter: 'blur(12px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as any } }
  };

  const luxuryStagger = {
    initial: { opacity: 0, scale: 0.95, filter: 'blur(10px)' },
    whileInView: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as any } },
    viewport: { once: true, margin: "-100px" }
  };

  const businessOptions = [
    "Ristorazione / Food & Beverage",
    "Studio Professionale",
    "E-commerce / Retail",
    "Salute e Benessere",
    "Tecnologia / IT",
    "Immobiliare / Real Estate",
    "Turismo / Hospitality",
    "Altro"
  ];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot check is done server-side, but we can also block it here if we want.
    // We proceed normally and send the honeypot value to the bridge.

    setIsSubmitting(true);
    
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const affiliateId = urlParams.get('ref') || urlParams.get('aff') || urlParams.get('affiliate') || localStorage.getItem('sogni_affiliate_id') || "";
      
      if (affiliateId) {
        localStorage.setItem('sogni_affiliate_id', affiliateId);
      }

      await submitFormToBridge(
        {
          ...formData,
          project_details: formData.message, // Map message to project_details for consistency
          pageSubject: 'Sogni Digitali Form',
          source: 'Sogni Digitali Website',
        },
        honeypot,
        affiliateId
      );
      
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', website: '', business: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
      alert("Si è verificato un errore durante l'invio. Riprova più tardi.");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappLink = "https://wa.me/393755880609?text=Vorrei%20iniziare%20la%20mia%20evoluzione%20digitale";

  return (
    <>
      <LoadingScreen />
      <Analytics />
      <ScrollToHash />
      <GlobalLoader />
      <ScrollToTopButton />
      <PromoPopup lang={lang} />
      {/* Scroll Progress Tracker */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00E5FF] to-[#E9C349] origin-left z-[10000]"
        style={{ scaleX: scrollYProgress }}
      />
    <div className="min-h-screen text-slate-50 selection:bg-[#00E5FF]/30 selection:text-white relative overflow-x-hidden">
      {/* Global Space Background */}
      <div className="space-bg">
        <motion.div className="space-layer-1" style={{ y: useTransform(scrollY, [0, 5000], [0, -200]) }} />
        <motion.div className="space-layer-2" style={{ y: useTransform(scrollY, [0, 5000], [0, -500]) }} />
        <motion.div className="space-layer-3" style={{ y: useTransform(scrollY, [0, 5000], [0, -900]) }} />
      </div>
      <SunBackground />
      <motion.div className="nebula-1" style={{ y: yNebula1 }} />
      <motion.div className="nebula-2" style={{ y: yNebula2 }} />
      <motion.div className="nebula-3" style={{ y: yNebula3 }} />
      <motion.div className="planet-1" style={{ y: y1 }} />
      <motion.div className="planet-2" style={{ y: y2, top: '40%', right: '-5%' }} />
      <motion.div className="planet-3" style={{ y: y3 }} />
      
      {/* Light Mode Suns */}
      <motion.div className="section-sun sun-1" style={{ y: y1 }} />
      <motion.div className="section-sun sun-2" style={{ y: y2 }} />
      <motion.div className="section-sun sun-3" style={{ y: y3 }} />

      <CustomCursor />
      {!isLinksPage && <AccessibilityMenu lang={lang} />}
      {!isLinksPage && <AIBot lang={lang} />}
      {/* Navbar */}
      {!isLinksPage && (
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'}`}>
        <div className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-16' : 'h-24'}`}>
          
          {/* Mobile spacer for centering logo */}
          <div className="w-10 md:hidden"></div>

          <Link to="/" className="flex items-center gap-3 justify-center md:justify-start flex-1 md:flex-none hover:opacity-80 transition-opacity">
            <img 
              src="/my-logo.png" 
              alt="Sogni Digitali Logo" 
              className={`transition-all duration-300 object-contain ${isScrolled ? 'h-8' : 'h-12'}`} 
            />
            <span className={`font-display font-bold tracking-widest uppercase transition-all duration-300 hidden md:block ${isScrolled ? 'text-lg' : 'text-xl'}`}>
              Sogni Digitali
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            <div className="relative group cursor-pointer z-50">
              <div className="flex items-center gap-1 text-sm font-semibold tracking-wider uppercase text-slate-400 hover:text-white transition-colors py-2">
                {translations[lang as keyof typeof translations].navServices}
                <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
              </div>
              <div className="absolute top-full left-0 mt-2 w-48 bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 overflow-hidden">
                <Link to="/services" className="block px-6 py-4 text-sm font-medium tracking-wider text-slate-300 hover:text-[#00E5FF] hover:bg-white/5 transition-all uppercase border-b border-white/5">
                  {translations[lang as keyof typeof translations].navServices}
                </Link>
                <Link to="/packages" className="block px-6 py-4 text-sm font-medium tracking-wider text-slate-300 hover:text-[#00E5FF] hover:bg-white/5 transition-all uppercase border-b border-white/5">
                  {translations[lang as keyof typeof translations].navPackages || "I Nostri Pacchetti"}
                </Link>
                <Link to="/marketing" className="block px-6 py-4 text-sm font-medium tracking-wider text-slate-300 hover:text-[#00E5FF] hover:bg-white/5 transition-all uppercase border-b border-white/5">
                  {translations[lang as keyof typeof translations].navMarketing}
                </Link>
                <Link to="/portfolio" className="block px-6 py-4 text-sm font-medium tracking-wider text-slate-300 hover:text-[#00E5FF] hover:bg-white/5 transition-all uppercase">
                  Portfolio Demo
                </Link>
              </div>
            </div>
            
            <Link to="/pricing" className="text-sm font-semibold tracking-wider uppercase text-slate-400 hover:text-white transition-colors">{translations[lang as keyof typeof translations].navPricing}</Link>
            <Link to="/#contatti" className="text-sm font-semibold tracking-wider uppercase text-slate-400 hover:text-white transition-colors">{translations[lang as keyof typeof translations].navContact}</Link>
            
            <div className="relative group cursor-pointer">
              <div className="flex items-center gap-1 text-sm font-medium tracking-widest uppercase text-slate-400 hover:text-white transition-colors">
                {lang} <ChevronDown className="w-4 h-4" />
              </div>
              <div className="absolute top-full right-0 mt-2 w-24 bg-black/80 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {['IT', 'EN', 'FR', 'AR'].map((l) => (
                  <button key={l} onClick={() => setLang(l)} className="block w-full text-left px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 first:rounded-t-lg last:rounded-b-lg">
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <Tooltip content={isLightMode ? "Passa al tema scuro" : "Passa al tema chiaro"}>
              <button aria-label="Toggle Light/Dark Mode" onClick={toggleTheme} className="text-slate-400 hover:text-white transition-colors">
                {isLightMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
            </Tooltip>

            <Tooltip content="Scopri i pacchetti">
              <Link to="/pricing" className="btn-primary px-6 py-3 rounded-full font-semibold text-sm tracking-wider uppercase hover:scale-105 transition-all flex items-center gap-2">
                <WhatsAppIcon className="w-4 h-4" />
                Inizia Ora
              </Link>
            </Tooltip>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <Tooltip content={isLightMode ? "Passa al tema scuro" : "Passa al tema chiaro"}>
              <button aria-label="Toggle Light/Dark Mode" onClick={toggleTheme} className="text-slate-400 hover:text-white transition-colors">
                {isLightMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
            </Tooltip>
            <Tooltip content="Menu navigazione">
              <button aria-label="Toggle Navigation Menu" className="text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </Tooltip>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/5 p-6 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => setIsMobileServiziOpen(!isMobileServiziOpen)}
                className="flex items-center justify-between text-xs font-bold tracking-[0.2em] uppercase text-[#00E5FF] w-full text-left"
              >
                {translations[lang as keyof typeof translations].navServices}
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isMobileServiziOpen ? 'rotate-180' : ''}`} />
              </button>
              {isMobileServiziOpen && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="flex flex-col gap-4 pl-4 py-2 border-l border-[#00E5FF]/20 overflow-hidden"
                >
                  <Link to="/services" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold tracking-wider uppercase text-slate-300 hover:text-white transition-colors">{translations[lang as keyof typeof translations].navServices}</Link>
                  <Link to="/packages" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold tracking-wider uppercase text-slate-300 hover:text-white transition-colors">{translations[lang as keyof typeof translations].navPackages || "I Nostri Pacchetti"}</Link>
                  <Link to="/marketing" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold tracking-wider uppercase text-slate-300 hover:text-white transition-colors">{translations[lang as keyof typeof translations].navMarketing}</Link>
                  <Link to="/portfolio" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold tracking-wider uppercase text-slate-300 hover:text-white transition-colors">{translations[lang as keyof typeof translations].footerPortfolio || "Portfolio"}</Link>
                </motion.div>
              )}
            </div>
            
            <Link to="/pricing" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold tracking-wider uppercase text-slate-300">{translations[lang as keyof typeof translations].navPricing}</Link>
            <Link to="/#contatti" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold tracking-wider uppercase text-slate-300">{translations[lang as keyof typeof translations].navContact}</Link>
            <div className="flex gap-4">
              {['IT', 'EN', 'FR', 'AR'].map((l) => (
                <button key={l} onClick={() => { setLang(l); setIsMobileMenuOpen(false); }} className={`text-sm font-semibold tracking-wider uppercase ${lang === l ? 'text-[#00E5FF]' : 'text-slate-500'}`}>
                  {l}
                </button>
              ))}
            </div>
            <Link to="/pricing" onClick={() => setIsMobileMenuOpen(false)} className="bg-gradient-to-r from-[#00E5FF] to-[#00B4D8] text-[#0B1120] px-6 py-3 rounded-full font-semibold text-sm tracking-wider uppercase flex items-center justify-center gap-2">
              <WhatsAppIcon className="w-4 h-4" />
              {translations[lang as keyof typeof translations].heroBtn1}
            </Link>
          </div>
        )}
      </header>
      )}

      <main className="relative z-10" style={{ perspective: '1200px' }}>
        <AnimatePresence mode="wait">
          <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center"><GlobalLoader /></div>}>
          <Routes location={location} key={location.pathname}>
            <Route path="/book" element={
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <BookingPage lang={lang} />
              </motion.div>
            } />
            <Route path="/marketing" element={
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <MarketingPage lang={lang} />
              </motion.div>
            } />
            <Route path="/services" element={
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ServicesPage lang={lang} />
              </motion.div>
            } />
            <Route path="/" element={
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
            >
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden min-h-[80vh] flex items-center z-10">
          <div className="max-w-7xl mx-auto w-full relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              {...luxuryReveal}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8">
                <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
                <span className="text-xs font-medium tracking-widest uppercase text-slate-300">{translations[lang as keyof typeof translations].heroBadge}</span>
              </div>
              
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1] mb-8 relative group pl-2">
                <span className="text-gradient-cyan relative z-10 inline-block hover:animate-glitch">{translations[lang as keyof typeof translations].heroTitle1}</span> <br className="hidden md:block" />
                <span className="text-white relative z-10">{translations[lang as keyof typeof translations].heroTitle2}</span>
                
                {/* Decorative Glitch Layers */}
                <span className="absolute inset-0 text-[#00E5FF] opacity-0 group-hover:opacity-20 group-hover:translate-x-1 -z-10 transition-opacity">{translations[lang as keyof typeof translations].heroTitle1} <br className="hidden md:block" />{translations[lang as keyof typeof translations].heroTitle2}</span>
                <span className="absolute inset-0 text-[#E9C349] opacity-0 group-hover:opacity-20 group-hover:-translate-x-1 -z-10 transition-opacity">{translations[lang as keyof typeof translations].heroTitle1} <br className="hidden md:block" />{translations[lang as keyof typeof translations].heroTitle2}</span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed max-w-xl mb-12">
                {translations[lang as keyof typeof translations].heroDesc}
              </p>

              <div className="flex flex-wrap items-center gap-6">
                <Link to="/pricing" className="bg-gradient-to-r from-[#00E5FF] to-[#00B4D8] text-black px-8 py-4 rounded-full font-semibold text-sm tracking-wider uppercase hover:scale-105 transition-transform ambient-shadow-cyan flex items-center gap-2">
                  {translations[lang as keyof typeof translations].heroBtn1}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/services" className="text-sm font-semibold tracking-wider uppercase text-slate-300 hover:text-white transition-colors flex items-center gap-2">
                  {translations[lang as keyof typeof translations].heroBtn2}
                </Link>
              </div>
            </motion.div>

            {/* Abstract Visual */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="aspect-square relative flex items-center justify-center">
                <div className="w-full h-full relative z-10">
                  <React.Suspense fallback={<div className="w-full h-full border border-white/5 bg-white/5 rounded-3xl flex items-center justify-center text-sm text-slate-500 uppercase tracking-widest animate-pulse">Loading 3D...</div>}>
                    <Dodo3D />
                  </React.Suspense>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section id="servizi" className="py-20 px-6 relative z-10 overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 50, rotateX: 5, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-7xl mx-auto"
          >
            <div className="mb-20 md:w-2/3">
              <div className="overflow-hidden pb-4">
                <motion.h2 
                  initial={{ y: "120%", opacity: 0, rotate: 2 }}
                  whileInView={{ y: 0, opacity: 1, rotate: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-6"
                >
                  {translations[lang as keyof typeof translations].serviziTitle1} <span className="text-gradient">{translations[lang as keyof typeof translations].serviziTitle2}</span>
                </motion.h2>
              </div>
              <div className="overflow-hidden">
                <motion.p 
                  initial={{ y: "150%", opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="text-slate-400 text-lg font-light leading-relaxed"
                >
                  {translations[lang as keyof typeof translations].serviziSubtitle}
                </motion.p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6">
              {/* Service 1 - Big Bento Tile */}
              <motion.div 
                {...luxuryStagger}
                whileHover={{ y: -10, transition: { duration: 0.4, ease: "easeOut" } }}
                className="md:col-span-2 md:row-span-2 glass-panel p-10 rounded-3xl relative group overflow-hidden flex flex-col justify-center"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#00E5FF]/10 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-[#00E5FF]/20" />
                <div className="w-16 h-16 rounded-2xl bg-[#00E5FF]/10 flex items-center justify-center mb-8 relative transition-all duration-500 group-hover:bg-[#00E5FF]/30 group-hover:shadow-[0_0_30px_rgba(0,229,255,0.4)]">
                  <div className="absolute inset-0 rounded-2xl border border-[#00E5FF]/20 group-hover:border-[#00E5FF]/50 group-hover:animate-pulse transition-all duration-500" />
                  <Code2 className="w-8 h-8 text-[#00E5FF] relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-[15deg] group-hover:drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]" />
                </div>
                <h3 className="font-display text-3xl md:text-4xl font-bold mb-4">{translations[lang as keyof typeof translations].servizi1Title}</h3>
                <p className="text-slate-400 font-light leading-relaxed text-base">
                  {translations[lang as keyof typeof translations].servizi1Desc}
                </p>
              </motion.div>

              {/* Service 2 - Medium Tile Top Right */}
              <motion.div 
                {...luxuryStagger}
                whileHover={{ y: -10, transition: { duration: 0.4, ease: "easeOut" } }}
                transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="md:col-span-2 md:row-span-1 glass-panel p-8 rounded-3xl relative group overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#E9C349]/10 rounded-full blur-2xl -mr-10 -mt-10 transition-all group-hover:bg-[#E9C349]/20" />
                <div className="w-12 h-12 rounded-2xl bg-[#E9C349]/10 flex items-center justify-center mb-6 relative transition-all duration-500 group-hover:bg-[#E9C349]/20 group-hover:shadow-[0_0_30px_rgba(233,195,73,0.3)]">
                  <div className="absolute inset-0 rounded-2xl border border-[#E9C349]/20 group-hover:border-[#E9C349]/50 group-hover:animate-pulse transition-all duration-500" />
                  <Bot className="w-5 h-5 text-[#E9C349] relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-[15deg] group-hover:drop-shadow-[0_0_8px_rgba(233,195,73,0.8)]" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-3">{translations[lang as keyof typeof translations].servizi2Title}</h3>
                <p className="text-slate-400 font-light leading-relaxed text-sm">
                  {translations[lang as keyof typeof translations].servizi2Desc}
                </p>
              </motion.div>

              {/* Service 3 - Medium Tile Bottom Right */}
              <motion.div 
                {...luxuryStagger}
                whileHover={{ y: -10, transition: { duration: 0.4, ease: "easeOut" } }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="md:col-span-2 md:row-span-1 glass-panel p-8 rounded-3xl relative group overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl -mr-10 -mt-10 transition-all group-hover:bg-purple-500/20" />
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 relative transition-all duration-500 group-hover:bg-purple-500/20 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                  <div className="absolute inset-0 rounded-2xl border border-purple-500/20 group-hover:border-purple-500/50 group-hover:animate-pulse transition-all duration-500" />
                  <Store className="w-5 h-5 text-purple-400 relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-[15deg] group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-3">{translations[lang as keyof typeof translations].servizi3Title}</h3>
                <p className="text-slate-400 font-light leading-relaxed text-sm">
                  {translations[lang as keyof typeof translations].servizi3Desc}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Digital Marketing & Growth Section */}
        <section id="marketing" className="py-20 px-6 relative overflow-hidden z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#E9C349]/5 rounded-full blur-[100px] pointer-events-none" />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-7xl mx-auto relative z-10"
          >
            <div className="mb-20 md:w-2/3">
              <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-6">
                {translations[lang as keyof typeof translations].marketingTitle1} <span className="text-[#E9C349] drop-shadow-[0_0_15px_rgba(233,195,73,0.3)]">{translations[lang as keyof typeof translations].marketingTitle2}</span>
              </h2>
              <p className="text-slate-400 text-lg font-light leading-relaxed">
                {translations[lang as keyof typeof translations].marketingSubtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Marketing Service 1 */}
              <div className="glass-panel p-8 rounded-3xl relative group overflow-hidden transition-all duration-500 hover:-translate-y-2 border border-white/5 hover:border-[#E9C349]/50 hover:bg-[#E9C349]/5">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 relative transition-all duration-500 group-hover:bg-[#E9C349]/20 group-hover:shadow-[0_0_30px_rgba(233,195,73,0.3)]">
                  <div className="absolute inset-0 rounded-2xl border border-[#E9C349]/0 group-hover:border-[#E9C349]/50 group-hover:animate-pulse transition-all duration-500" />
                  <MapPin className="w-6 h-6 text-[#E9C349] relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-[15deg] group-hover:drop-shadow-[0_0_8px_rgba(233,195,73,0.8)]" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3 text-white group-hover:text-[#E9C349] transition-colors">{translations[lang as keyof typeof translations].mktService1Title}</h3>
                <p className="text-slate-400 font-light text-sm leading-relaxed">
                  {translations[lang as keyof typeof translations].mktService1Desc}
                </p>
              </div>

              {/* Marketing Service 2 */}
              <div className="glass-panel p-8 rounded-3xl relative group overflow-hidden transition-all duration-500 hover:-translate-y-2 border border-white/5 hover:border-[#E9C349]/50 hover:bg-[#E9C349]/5">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 relative transition-all duration-500 group-hover:bg-[#E9C349]/20 group-hover:shadow-[0_0_30px_rgba(233,195,73,0.3)]">
                  <div className="absolute inset-0 rounded-2xl border border-[#E9C349]/0 group-hover:border-[#E9C349]/50 group-hover:animate-pulse transition-all duration-500" />
                  <Target className="w-6 h-6 text-[#E9C349] relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-[15deg] group-hover:drop-shadow-[0_0_8px_rgba(233,195,73,0.8)]" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3 text-white group-hover:text-[#E9C349] transition-colors">{translations[lang as keyof typeof translations].mktService2Title}</h3>
                <p className="text-slate-400 font-light text-sm leading-relaxed">
                  {translations[lang as keyof typeof translations].mktService2Desc}
                </p>
              </div>

              {/* Marketing Service 3 */}
              <div className="glass-panel p-8 rounded-3xl relative group overflow-hidden transition-all duration-500 hover:-translate-y-2 border border-white/5 hover:border-[#E9C349]/50 hover:bg-[#E9C349]/5">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 relative transition-all duration-500 group-hover:bg-[#E9C349]/20 group-hover:shadow-[0_0_30px_rgba(233,195,73,0.3)]">
                  <div className="absolute inset-0 rounded-2xl border border-[#E9C349]/0 group-hover:border-[#E9C349]/50 group-hover:animate-pulse transition-all duration-500" />
                  <Users className="w-6 h-6 text-[#E9C349] relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-[15deg] group-hover:drop-shadow-[0_0_8px_rgba(233,195,73,0.8)]" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3 text-white group-hover:text-[#E9C349] transition-colors">{translations[lang as keyof typeof translations].mktService3Title}</h3>
                <p className="text-slate-400 font-light text-sm leading-relaxed">
                  {translations[lang as keyof typeof translations].mktService3Desc}
                </p>
              </div>

              {/* Marketing Service 4 */}
              <div className="glass-panel p-8 rounded-3xl relative group overflow-hidden transition-all duration-500 hover:-translate-y-2 border border-white/5 hover:border-[#E9C349]/50 hover:bg-[#E9C349]/5">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 relative transition-all duration-500 group-hover:bg-[#E9C349]/20 group-hover:shadow-[0_0_30px_rgba(233,195,73,0.3)]">
                  <div className="absolute inset-0 rounded-2xl border border-[#E9C349]/0 group-hover:border-[#E9C349]/50 group-hover:animate-pulse transition-all duration-500" />
                  <Star className="w-6 h-6 text-[#E9C349] relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-[180deg] group-hover:drop-shadow-[0_0_8px_rgba(233,195,73,0.8)]" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3 text-white group-hover:text-[#E9C349] transition-colors">{translations[lang as keyof typeof translations].mktService4Title}</h3>
                <p className="text-slate-400 font-light text-sm leading-relaxed">
                  {translations[lang as keyof typeof translations].mktService4Desc}
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 px-6 relative overflow-hidden z-10">
          <React.Suspense fallback={<div className="absolute inset-0 flex items-center justify-center opacity-50"><div className="w-8 h-8 rounded-full border-2 border-t-[#E9C349] animate-spin"></div></div>}>
            <Rocket3D />
          </React.Suspense>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-7xl mx-auto"
          >
            <div className="text-center mb-20">
              <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-6">
                {translations[lang as keyof typeof translations].pricingTitle}
              </h2>
              <p className="text-slate-400 text-lg font-light">
                {translations[lang as keyof typeof translations].pricingSubtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 items-center">
              {getPricingData(lang).packs.map((pack, idx) => {
                const isEvo = pack.popular;
                const isCustom = pack.name === "Custom";
                return (
                  <motion.div 
                    key={idx}
                    whileHover={{ y: -10 }}
                    className={
                      isEvo 
                        ? "bg-black/60 backdrop-blur-xl border border-[#00E5FF]/30 p-10 rounded-3xl relative overflow-hidden flex flex-col h-full md:scale-105 z-10 ambient-shadow-cyan"
                        : isCustom
                        ? "glass-panel p-10 rounded-3xl relative overflow-hidden flex flex-col h-full border-2 border-dashed border-[#E9C349]/50 hover:border-[#E9C349] transition-colors cursor-pointer"
                        : "glass-panel p-10 rounded-3xl relative overflow-hidden flex flex-col h-full"
                    }
                    onClick={() => {
                      if (isCustom) {
                        window.location.href = '/pricing';
                      }
                    }}
                  >
                    <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl -mr-10 -mt-10 ${isEvo ? 'bg-[#00E5FF]/10' : 'bg-[#E9C349]/10'}`} />
                    {isEvo && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#00E5FF] text-black px-4 py-1 rounded-b-lg text-xs font-bold tracking-widest uppercase">
                        {translations[lang as keyof typeof translations].evoBadge}
                      </div>
                    )}
                    <h3 className={`font-display text-xl font-bold mb-2 ${isEvo ? 'text-[#00E5FF] mt-4' : 'text-[#E9C349]'}`}>
                      {pack.name}
                    </h3>
                    <div className="text-4xl font-bold font-display mb-8">
                      <ScrambleNumber value={pack.price} duration={1500 + idx * 500} className={isEvo ? 'text-white' : 'text-[#E9C349]'} />
                    </div>
                    <ul className="space-y-4 mb-10 flex-grow">
                      {pack.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-300 text-sm font-light">
                          <Check className={`w-5 h-5 shrink-0 ${isEvo ? 'text-[#00E5FF]' : 'text-[#E9C349]'}`} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/pricing" className={`w-full py-4 rounded-xl font-semibold text-sm tracking-wider uppercase transition-all text-center block ${
                      isEvo 
                        ? 'bg-gradient-to-r from-[#00E5FF] to-[#00B4D8] text-black hover:scale-105' 
                        : isCustom
                        ? 'border-2 border-dashed border-[#E9C349]/50 text-[#E9C349] hover:bg-[#E9C349]/10 hover:border-[#E9C349]'
                        : 'border border-[#E9C349]/30 text-[#E9C349] hover:bg-[#E9C349]/10'
                    }`}>
                      {pack.cta}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-16 text-center">
              <Link to="/pricing" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors font-semibold tracking-wider uppercase text-sm">
                {translations[lang as keyof typeof translations].seeAllPricing || "Scopri tutti i dettagli"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section id="contatti" className="py-20 px-6 relative overflow-hidden z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-7xl mx-auto relative z-10"
          >
            <div className="text-center mb-20">
              <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-6">
                {translations[lang as keyof typeof translations].contactTitle.replace('?', '')}<span className="text-gradient-cyan">?</span>
              </h2>
              <p className="text-slate-400 text-lg font-light">
                {translations[lang as keyof typeof translations].contactSubtitle}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16">
              {/* Left Column: Form & WhatsApp */}
              <div className="space-y-10">
                {/* WhatsApp Fast Track */}
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="w-full group flex items-center justify-between p-6 rounded-2xl bg-gradient-to-r from-[#00E5FF]/10 to-transparent border border-[#00E5FF]/20 hover:border-[#00E5FF]/50 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-[#25D366]/20 flex items-center justify-center border border-[#25D366]/30 group-hover:scale-110 transition-transform">
                      <WhatsAppIcon className="w-7 h-7 text-[#25D366]" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-white font-bold text-lg">{translations[lang as keyof typeof translations].contactWhatsApp}</h3>
                      <p className="text-slate-400 text-sm">{translations[lang as keyof typeof translations].contactWhatsAppSub}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-6 h-6 text-[#00E5FF] group-hover:translate-x-2 transition-transform" />
                </a>

                {/* Contact Form */}
                <form className="space-y-6 glass-panel p-8 rounded-3xl relative overflow-hidden" onSubmit={handleFormSubmit}>
                  {isSuccess && (
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-center p-8 animate-in fade-in duration-500">
                      <div className="w-16 h-16 rounded-full bg-[#E9C349]/20 flex items-center justify-center mb-4 border border-[#E9C349]/50">
                        <Check className="w-8 h-8 text-[#E9C349]" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Messaggio Inviato!</h3>
                      <p className="text-slate-400 text-sm">Ti risponderemo al più presto per iniziare la tua evoluzione digitale.</p>
                    </div>
                  )}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-medium tracking-widest uppercase text-slate-400">{translations[lang as keyof typeof translations].contactFormName}</label>
                      <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-transparent border border-[#E9C349]/30 focus:border-[#E9C349] text-white rounded-xl p-4 outline-none transition-colors" placeholder="Mario Rossi" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium tracking-widest uppercase text-slate-400">{translations[lang as keyof typeof translations].contactFormEmail}</label>
                      <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-transparent border border-[#E9C349]/30 focus:border-[#E9C349] text-white rounded-xl p-4 outline-none transition-colors" placeholder="mario@azienda.it" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-medium tracking-widest uppercase text-slate-400">
                        {/* @ts-ignore - Dynamic key access */}
                        {translations[lang as keyof typeof translations].contactFormPhone || 'Telefono'}
                      </label>
                      <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-transparent border border-[#E9C349]/30 focus:border-[#E9C349] text-white rounded-xl p-4 outline-none transition-colors" placeholder="+39 333 1234567" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium tracking-widest uppercase text-slate-400">
                        {/* @ts-ignore - Dynamic key access */}
                        {translations[lang as keyof typeof translations].contactFormWebsite || 'Sito Web Attuale'}
                      </label>
                      <input type="url" value={formData.website} onChange={(e) => setFormData({...formData, website: e.target.value})} className="w-full bg-transparent border border-[#E9C349]/30 focus:border-[#E9C349] text-white rounded-xl p-4 outline-none transition-colors" placeholder="https://www.azienda.it" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium tracking-widest uppercase text-slate-400">{translations[lang as keyof typeof translations].contactFormBusiness}</label>
                    <div className="relative">
                      <div 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={`w-full bg-transparent border border-[#E9C349]/30 hover:border-[#E9C349]/60 text-white rounded-xl p-4 transition-all cursor-pointer flex justify-between items-center ${isDropdownOpen ? 'border-[#E9C349] bg-white/5' : ''}`}
                      >
                        <span className={formData.business ? 'text-white' : 'text-slate-400 opacity-60'}>
                          {formData.business || "Seleziona il tipo di business..."}
                        </span>
                        <ChevronDown className={`w-5 h-5 text-[#E9C349] transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                      </div>
                      
                      {/* Luxurious Dropdown Implementation */}
                      <AnimatePresence>
                        {isDropdownOpen && (
                          <motion.div 
                            initial={{ opacity: 0, y: -10, scale: 0.95, filter: 'blur(8px)' }}
                            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -10, scale: 0.95, filter: 'blur(8px)' }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute top-full left-0 right-0 mt-2 z-50 bg-[#050505]/95 rounded-xl border border-[#E9C349]/50 overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,1)] backdrop-blur-3xl"
                          >
                            <div className="max-h-60 overflow-y-auto custom-scrollbar">
                              {businessOptions.map((option, idx) => (
                                <div 
                                  key={idx}
                                  onClick={() => {
                                    setFormData({...formData, business: option});
                                    setIsDropdownOpen(false);
                                  }}
                                  className="px-4 py-3 text-slate-300 hover:text-[#00E5FF] hover:bg-white/10 cursor-pointer transition-colors border-b border-white/5 last:border-0"
                                >
                                  {option}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium tracking-widest uppercase text-slate-400">{translations[lang as keyof typeof translations].contactFormMessage}</label>
                    <textarea required rows={4} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full bg-transparent border border-[#E9C349]/30 focus:border-[#E9C349] text-white rounded-xl p-4 outline-none transition-colors resize-none" placeholder="Come possiamo aiutarti a evolvere?"></textarea>
                  </div>
                  
                  {/* GDPR Consent Checkbox */}
                  <div className="flex items-start gap-3 mt-4 mb-6">
                    <input 
                      type="checkbox" 
                      id="privacyConsent" 
                      required 
                      className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-900/50 text-[#00E5FF] focus:ring-[#00E5FF]/50 focus:ring-offset-0 cursor-pointer"
                    />
                    <label htmlFor="privacyConsent" className="text-xs text-slate-400 leading-relaxed cursor-pointer select-none">
                      Acconsento al trattamento dei miei dati personali in conformità con la <Link to="/privacy" target="_blank" className="text-[#00E5FF] hover:underline">Privacy Policy</Link>. *
                    </label>
                  </div>

                  <div className="mb-6">
                    <input type="text" name="_honeypot" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
                  </div>

                  <Tooltip content="Invia la tua richiesta ora">
                    <button disabled={isSubmitting} className="w-full py-6 btn-epic font-bold text-lg tracking-wider uppercase antialiased disabled:opacity-70 flex items-center justify-center gap-3">
                      <div className="shine-layer"></div>
                      {isSubmitting ? (
                        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin relative z-10" />
                      ) : (
                        <span className="relative z-10 flex items-center gap-2">
                          {translations[lang as keyof typeof translations].contactFormSubmit}
                          <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
                        </span>
                      )}
                    </button>
                  </Tooltip>
                </form>
              </div>

              {/* Right Column: Map & Info */}
              <div className="space-y-8 h-full flex flex-col">
                {/* Dark Map */}
                <div className="w-full h-64 md:h-80 rounded-3xl overflow-hidden border border-white/10 relative glass-panel">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d89874.1554553255!2d7.580660601550993!3d45.0704907953331!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47886d126418be25%3A0x8903f804fb0c4b62!2sTurin%2C%20Metropolitan%20City%20of%20Turin%2C%20Italy!5e0!3m2!1sit!2sit!4v1709654321000!5m2!1sit!2sit" 
                    width="100%" 
                    height="100%" 
                    className="google-map-iframe"
                    style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(1.2)' }} 
                    allowFullScreen={false} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                  <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(11,17,32,0.8)]"></div>
                </div>

                {/* Company Info */}
                <div className="glass-panel p-8 rounded-3xl flex-grow flex flex-col justify-between">
                  <div className="space-y-6">
                    <h3 className="font-display text-xl font-bold text-white mb-6">{translations[lang as keyof typeof translations].contactInfoTitle}</h3>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                        <Building2 className="w-5 h-5 text-[#00E5FF]" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{translations[lang as keyof typeof translations].contactInfoCompany.split(': ')[1] || 'Sogni Digitali'}</p>
                        <p className="text-slate-400 text-sm">Agenzia Web & IA</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-[#E9C349]" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{translations[lang as keyof typeof translations].contactInfoLocation.split(': ')[1] || 'Torino, Italia'}</p>
                        <p className="text-slate-400 text-sm">Italia</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">hello@sogni-digitali.com</p>
                        <p className="text-slate-400 text-sm">{translations[lang as keyof typeof translations].contactInfoVat}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-[#25D366]" />
                      </div>
                      <div>
                        <p className="text-white font-medium">+39 375 5880609</p>
                        <p className="text-slate-400 text-sm">WhatsApp & Telefono</p>
                      </div>
                    </div>
                  </div>

                  {/* Socials */}
                  <div className="pt-8 mt-8 border-t border-white/10 flex items-center gap-4">
                    <Tooltip content="Metti 'Mi piace' su Facebook">
                      <a href="https://www.facebook.com/people/Sogni-Digitali/61570776753312/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#1877F2]/20 hover:text-[#1877F2] transition-colors">
                        <Facebook className="w-5 h-5" />
                      </a>
                    </Tooltip>
                    <Tooltip content="Seguici su Instagram">
                      <a href="https://www.instagram.com/digitalisogni/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#E1306C]/20 hover:text-[#E1306C] transition-colors">
                        <Instagram className="w-5 h-5" />
                      </a>
                    </Tooltip>
                    <Tooltip content="Scopri i nostri video">
                      <a href="https://www.tiktok.com/@sognidigitali?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#00f2fe]/20 hover:text-[#00f2fe] transition-colors">
                        <TikTokIcon className="w-5 h-5" />
                      </a>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
            </motion.div>
          } />
          <Route path="/pricing" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Pricing lang={lang} /></motion.div>} />
          <Route path="/packages" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><PackagesPage lang={lang} /></motion.div>} />
          <Route path="/portfolio" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><PortfolioPage lang={lang} /></motion.div>} />
          <Route path="/portfolio/lumina" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><LuminaDetail lang={lang} /></motion.div>} />
          <Route path="/portfolio/nexus" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><NexusDetail lang={lang} /></motion.div>} />
          <Route path="/checkout/:planId" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Checkout lang={lang} /></motion.div>} />
        <Route path="/terms" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Terms lang={lang} /></motion.div>} />
        <Route path="/privacy" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Privacy lang={lang} /></motion.div>} />
        <Route path="/legal" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Legal lang={lang} /></motion.div>} />
        <Route path="/links" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Linktree lang={lang} /></motion.div>} />
        <Route path="*" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><NotFound lang={lang} /></motion.div>} />
      </Routes>
      </React.Suspense>
      </AnimatePresence>
      </main>

      {/* Footer */}
      {!isLinksPage && (
      <footer className="footer-glass pt-16 pb-8 px-6 relative z-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Brand & Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/my-logo.png" 
                alt="Sogni Digitali Logo" 
                className="h-8 object-contain" 
              />
              <span className="font-display font-bold text-lg tracking-widest uppercase text-white">Sogni Digitali</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              {translations[lang as keyof typeof translations].footerAgencyName}
            </p>
            <p className="text-slate-500 text-sm">
              {translations[lang as keyof typeof translations].footerVat}
            </p>
          </div>

          {/* Column 2: Useful Links */}
          <div className="space-y-4">
            <h4 className="font-display font-bold tracking-widest uppercase text-sm text-white mb-4">{translations[lang as keyof typeof translations].footerUsefulLinks}</h4>
            <ul className="space-y-3">
              <li><Link to="/services" className="text-slate-400 hover:text-white text-sm transition-colors">{translations[lang as keyof typeof translations].navServices}</Link></li>
              <li><Link to="/packages" className="text-slate-400 hover:text-white text-sm transition-colors">{translations[lang as keyof typeof translations].navPackages || "Pacchetti"}</Link></li>
              <li><Link to="/portfolio" className="text-slate-400 hover:text-white text-sm transition-colors">{translations[lang as keyof typeof translations].footerPortfolio || "Portfolio"}</Link></li>
              <li><Link to="/marketing" className="text-slate-400 hover:text-white text-sm transition-colors">{translations[lang as keyof typeof translations].navMarketing}</Link></li>
              <li><Link to="/pricing" className="text-slate-400 hover:text-white text-sm transition-colors">{translations[lang as keyof typeof translations].navPricing}</Link></li>
              <li><Link to="/pricing#affiliate" className="text-slate-400 hover:text-white text-sm transition-colors">{lang === 'IT' ? 'Diventa Affiliato' : lang === 'FR' ? 'Devenir Affilié' : 'Become an Affiliate'}</Link></li>
              <li><Link to="/#contatti" className="text-slate-400 hover:text-white text-sm transition-colors">{translations[lang as keyof typeof translations].navContact}</Link></li>
            </ul>
          </div>

          {/* Column 3: Location & Contact */}
          <div className="space-y-4">
            <h4 className="font-display font-bold tracking-widest uppercase text-sm text-white mb-4">{translations[lang as keyof typeof translations].footerContactTitle}</h4>
            <p className="text-slate-400 text-sm">
              {translations[lang as keyof typeof translations].footerLocation}
            </p>
            <a href="mailto:hello@sogni-digitali.com" className="block text-slate-400 hover:text-white text-sm transition-colors">
              hello@sogni-digitali.com
            </a>
            <a href="tel:+393755880609" className="block text-slate-400 hover:text-white text-sm transition-colors">
              +39 375 5880609
            </a>
          </div>

          {/* Column 4: Socials */}
          <div className="space-y-4">
            <h4 className="font-display font-bold tracking-widest uppercase text-sm text-white mb-4">Social</h4>
            <div className="flex flex-wrap items-center gap-4">
              <Tooltip content="Scrivici subito">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#25D366]/20 hover:text-[#25D366] text-slate-400 transition-all">
                  <WhatsAppIcon className="w-4 h-4" />
                </a>
              </Tooltip>
              <Tooltip content="Seguici su Instagram">
                <a href="https://www.instagram.com/digitalisogni/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#E1306C]/20 hover:text-[#E1306C] text-slate-400 transition-all">
                  <Instagram className="w-4 h-4" />
                </a>
              </Tooltip>
              <Tooltip content="Scopri i nostri video">
                <a href="https://www.tiktok.com/@sognidigitali?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#00f2fe]/20 hover:text-[#00f2fe] text-slate-400 transition-all">
                  <TikTokIcon className="w-4 h-4" />
                </a>
              </Tooltip>
              <Tooltip content="Metti 'Mi piace' su Facebook">
                <a href="https://www.facebook.com/people/Sogni-Digitali/61570776753312/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#1877F2]/20 hover:text-[#1877F2] text-slate-400 transition-all">
                  <Facebook className="w-4 h-4" />
                </a>
              </Tooltip>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs text-center md:text-left">
            {translations[lang as keyof typeof translations].footerCopyright}
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link to="/links" className="text-slate-600 hover:text-white text-xs tracking-widest uppercase transition-colors">
              Link in Bio
            </Link>
            <Link to="/legal" className="text-slate-600 hover:text-white text-xs tracking-widest uppercase transition-colors">
              Mentions Légales
            </Link>
            <Link to="/privacy" className="text-slate-600 hover:text-white text-xs tracking-widest uppercase transition-colors">
              Privacy / Confidentialité
            </Link>
            <Link to="/terms" className="text-slate-600 hover:text-white text-xs tracking-widest uppercase transition-colors">
              {translations[lang as keyof typeof translations].terms || "Termini"}
            </Link>
          </div>
        </div>
      </footer>
      )}

      {/* GDPR Consent Cookie Banner */}
      {!isLinksPage && <CookieBanner lang={lang} />}
      
    </div>
    </>
  );
}

export default function App() {
  return (
    <AccessibilityProvider>
      <Router>
        <AppContent />
      </Router>
    </AccessibilityProvider>
  );
}
