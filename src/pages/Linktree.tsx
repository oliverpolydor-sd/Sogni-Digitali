import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Instagram, Facebook, Globe, MapPin, Mail, Calendar, Sparkles, Zap, Crown, Rocket, Settings, ArrowRight } from 'lucide-react';
import TikTokIcon from '../components/TikTokIcon';
import { Link } from 'react-router-dom';

const linkTranslations = {
  IT: {
    subtitle: "Evolvi la tua Realtà Digitale",
    bookConsultation: "Prenota Consulenza",
    bookSubtitle: "Call 1:1 con Oliver Polydor",
    exploreSite: "Esplora il Nostro Sito",
    exploreSubtitle: "Scopri i servizi Sogni Digitali",
    packsTitle: "I NOSTRI PACCHETTI",
    from: "da",
    custom: "Su Misura",
    oneShotTitle: "SERVIZI ONE-SHOT",
    restyling: "Restyling Completo",
    seo: "SEO & Plugin",
    location: "Torino, Italia"
  },
  FR: {
    subtitle: "Faites Évoluer Votre Réalité Numérique",
    bookConsultation: "Réserver une Consultation",
    bookSubtitle: "Appel 1:1 avec Oliver Polydor",
    exploreSite: "Explorer Notre Site",
    exploreSubtitle: "Découvrez les services Sogni Digitali",
    packsTitle: "NOS PACKS",
    from: "dès",
    custom: "Sur Mesure",
    oneShotTitle: "SERVICES ONE-SHOT",
    restyling: "Refonte Complète",
    seo: "SEO & Plugins",
    location: "Turin, Italie"
  },
  EN: {
    subtitle: "Evolve Your Digital Reality",
    bookConsultation: "Book a Consultation",
    bookSubtitle: "1:1 Call with Oliver Polydor",
    exploreSite: "Explore Our Website",
    exploreSubtitle: "Discover Sogni Digitali services",
    packsTitle: "OUR PACKAGES",
    from: "from",
    custom: "Custom",
    oneShotTitle: "ONE-SHOT SERVICES",
    restyling: "Full Restyling",
    seo: "SEO & Plugins",
    location: "Turin, Italy"
  }
};

const socials = [
  {
    url: 'https://www.instagram.com/digitalisogni/',
    icon: <Instagram className="w-6 h-6 text-[#E1306C]" />,
    style: 'bg-slate-900/40 hover:bg-[#E1306C]/20 border-white/10 hover:border-[#E1306C] hover:shadow-[0_0_20px_rgba(225,48,108,0.5)]'
  },
  {
    url: 'https://www.tiktok.com/@sognidigitali?is_from_webapp=1&sender_device=pc',
    icon: <TikTokIcon className="w-6 h-6 text-[#00f2fe]" />,
    style: 'bg-slate-900/40 hover:bg-[#00f2fe]/20 border-white/10 hover:border-[#00f2fe] hover:shadow-[0_0_20px_rgba(0,242,254,0.5)]'
  },
  {
    url: 'https://www.facebook.com/people/Sogni-Digitali/61570776753312/',
    icon: <Facebook className="w-6 h-6 text-[#1877F2]" />,
    style: 'bg-slate-900/40 hover:bg-[#1877F2]/20 border-white/10 hover:border-[#1877F2] hover:shadow-[0_0_20px_rgba(24,119,242,0.5)]'
  }
];

export default function Linktree({ lang = 'IT' }: { lang?: string }) {
  const t = linkTranslations[lang as keyof typeof linkTranslations] || linkTranslations.IT;

  const websiteLinks = [
    {
      title: t.bookConsultation,
      subtitle: t.bookSubtitle,
      url: 'https://calendar.app.google/', // Inserisci qui il tuo link esatto di Appuntamenti Google Calendar
      icon: <Calendar className="w-6 h-6 text-[#00E5FF]" />,
      style: 'bg-slate-900/40 hover:bg-[#00E5FF]/10 border-white/10 hover:border-[#00E5FF] hover:shadow-[0_0_25px_rgba(0,229,255,0.4)]'
    },
    {
      title: t.exploreSite,
      subtitle: t.exploreSubtitle,
      url: '/',
      icon: <Globe className="w-6 h-6 text-white" />,
      style: 'bg-slate-900/40 hover:bg-white/10 border-white/10 hover:border-white/40 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]'
    }
  ];

  const packs = [
    {
      title: 'Startup',
      price: `${t.from} 500€`,
      url: '/pricing',
      icon: <Zap className="w-8 h-8 mb-3 text-[#00E5FF]" />,
      className: 'bg-slate-900/40 hover:bg-[#00E5FF]/10 border-white/10 hover:border-[#00E5FF] hover:shadow-[0_0_25px_rgba(0,229,255,0.5)]'
    },
    {
      title: 'Business',
      price: `${t.from} 1.000€`,
      url: '/pricing',
      icon: <Sparkles className="w-8 h-8 mb-3 text-[#E9C349]" />,
      className: 'bg-slate-900/40 hover:bg-[#E9C349]/10 border-white/10 hover:border-[#E9C349] hover:shadow-[0_0_30px_rgba(233,195,73,0.5)]'
    },
    {
      title: 'Custom',
      price: t.custom,
      url: '/pricing',
      icon: <Crown className="w-8 h-8 mb-3 text-[#E1306C]" />,
      className: 'bg-slate-900/40 hover:bg-[#E1306C]/10 border-white/10 hover:border-[#E1306C] hover:shadow-[0_0_25px_rgba(225,48,108,0.5)]'
    }
  ];

  const oneShots = [
    {
      title: t.restyling,
      url: '/pricing',
      icon: <Rocket className="w-6 h-6 text-[#25D366]" />,
      className: 'bg-slate-900/40 hover:bg-[#25D366]/10 border-white/10 hover:border-[#25D366] hover:shadow-[0_0_20px_rgba(37,211,102,0.4)]'
    },
    {
      title: t.seo,
      url: '/pricing',
      icon: <Settings className="w-6 h-6 text-[#9C27B0]" />,
      className: 'bg-slate-900/40 hover:bg-[#9C27B0]/10 border-white/10 hover:border-[#9C27B0] hover:shadow-[0_0_20px_rgba(156,39,176,0.4)]'
    }
  ];
  const { scrollY } = useScroll();
  
  // Create parallax transformations based on scroll position
  const yBlackhole = useTransform(scrollY, [0, 1000], [0, 400]);
  const yStars1 = useTransform(scrollY, [0, 1000], [0, -200]);
  const yStars2 = useTransform(scrollY, [0, 1000], [0, -400]);
  const yPlanet1 = useTransform(scrollY, [0, 1000], [0, -150]);
  const yPlanet2 = useTransform(scrollY, [0, 1000], [0, -300]);
  const yPlanet3 = useTransform(scrollY, [0, 1000], [0, -500]);
  const ySun1 = useTransform(scrollY, [0, 1000], [0, -200]);

  const LinkWrapper = ({ link, children, className }: any) => {
    const isInternal = link.url.startsWith('/');
    if (isInternal) {
      return (
        <Link to={link.url} className={className}>
          {children}
        </Link>
      );
    }
    return (
      <a href={link.url} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative flex flex-col items-center py-20 px-0 font-sans">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      {/* Background Effect: Space Void & Blackhole with Parallax */}
      <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-black to-black opacity-80" />
        
        <motion.div 
          style={{ y: yBlackhole }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] bg-[conic-gradient(from_0deg,transparent_0%,#E9C349_25%,transparent_50%,#00E5FF_75%,transparent_100%)] opacity-20 blur-[80px] rounded-full"
        />
        
        <motion.div 
          style={{ y: yBlackhole }}
          className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-black rounded-full blur-[20px] shadow-[0_0_100px_rgba(0,0,0,1)]" 
        />

        {/* Ambient sun glow - parallax */}
        <motion.div 
          style={{ y: ySun1 }}
          className="absolute top-1/4 -right-[10%] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-[#E1306C] opacity-10 blur-[120px] rounded-full"
        />

        {/* Floating planet 1 */}
        <motion.div 
          style={{ y: yPlanet1 }}
          className="absolute top-[10%] -left-[5%] w-32 h-32 sm:w-48 sm:h-48 rounded-full bg-gradient-to-br from-[#00E5FF]/20 to-transparent blur-[8px] opacity-40 mix-blend-screen"
        />

        {/* Floating planet 2 */}
        <motion.div 
          style={{ y: yPlanet2 }}
          className="absolute top-[60%] right-[5%] w-24 h-24 sm:w-40 sm:h-40 rounded-full bg-gradient-to-bl from-[#E9C349]/20 to-transparent blur-[12px] opacity-30 mix-blend-screen"
        />

        {/* Floating planet 3 */}
        <motion.div 
          style={{ y: yPlanet3 }}
          className="absolute top-[80%] -left-[10%] w-40 h-40 sm:w-64 sm:h-64 rounded-full bg-gradient-to-tr from-[#9C27B0]/15 to-transparent blur-[16px] opacity-30 mix-blend-screen"
        />

        {/* Parallax Stars Layer 1 (Slower) */}
        <motion.div style={{ y: yStars1 }} className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={`star1-${i}`}
              className="absolute rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
              style={{
                width: Math.random() * 2 + 1 + 'px',
                height: Math.random() * 2 + 1 + 'px',
                top: Math.random() * 150 - 25 + '%',
                left: Math.random() * 100 + '%',
                opacity: Math.random() * 0.4 + 0.1
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.5, 0.1],
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {/* Parallax Stars Layer 2 (Faster) */}
        <motion.div style={{ y: yStars2 }} className="absolute inset-0">
          {Array.from({ length: 25 }).map((_, i) => (
            <motion.div
              key={`star2-${i}`}
              className="absolute rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
              style={{
                width: Math.random() * 3 + 1.5 + 'px',
                height: Math.random() * 3 + 1.5 + 'px',
                top: Math.random() * 200 - 50 + '%',
                left: Math.random() * 100 + '%',
                opacity: Math.random() * 0.6 + 0.2
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </div>

      <div className="relative z-10 w-full max-w-2xl px-6 flex flex-col items-center">
        
        {/* Profile/Logo */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 flex flex-col items-center"
        >
          <div className="w-28 h-28 rounded-full overflow-hidden p-1 bg-gradient-to-tr from-[#E9C349] to-[#00E5FF] mb-4 shadow-[0_0_40px_rgba(0,229,255,0.3)]">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center p-4">
              <img src="/my-logo.png" alt="Sogni Digitali Logo" className="w-full h-full object-contain" />
            </div>
          </div>
          <h1 className="text-2xl font-display font-bold tracking-widest uppercase bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Sogni Digitali
          </h1>
          <p className="text-slate-400 text-sm mt-2 font-medium tracking-wide">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="w-full space-y-10">
          
          {/* SECTION: Socials (Horizontal) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center justify-center gap-4"
          >
            {socials.map((social, idx) => (
              <a 
                key={idx}
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`w-14 h-14 rounded-full border backdrop-blur-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${social.style}`}
              >
                {social.icon}
              </a>
            ))}
          </motion.div>

          {/* SECTION: Website & Appointment (Vertical) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            {websiteLinks.map((link, idx) => (
              <LinkWrapper 
                key={idx} 
                link={link} 
                className={`group relative flex items-center p-4 py-5 rounded-2xl border backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] ${link.style}`}
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-black/50 border border-white/5 shrink-0 group-hover:scale-110 transition-transform duration-300">
                   {link.icon}
                </div>
                <div className="flex-1 ml-4">
                  <h3 className="font-bold text-white text-base">{link.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">{link.subtitle}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-500 mr-2 group-hover:text-white transition-colors" />
              </LinkWrapper>
            ))}
          </motion.div>

          {/* SECTION: Products / Packs (Horizontal Container) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h2 className="text-lg font-display font-bold tracking-widest text-white ml-2">{t.packsTitle}</h2>
            <div className="flex overflow-x-auto snap-x hide-scrollbar gap-4 pb-6 -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-3">
              {packs.map((pack, idx) => (
                <LinkWrapper 
                  key={idx} 
                  link={pack} 
                  className={`snap-center shrink-0 w-[200px] md:w-auto p-6 rounded-3xl border backdrop-blur-xl flex flex-col items-center justify-center text-center transition-all duration-300 transform hover:-translate-y-2 ${pack.className}`}
                >
                  {pack.icon}
                  <h3 className="font-bold text-white text-lg mb-1">{pack.title}</h3>
                  <p className="text-xs font-medium uppercase tracking-widest text-slate-300">{pack.price}</p>
                </LinkWrapper>
              ))}
            </div>
          </motion.div>

          {/* SECTION: One Shot (Horizontal Container) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-lg font-display font-bold tracking-widest text-white ml-2">{t.oneShotTitle}</h2>
            <div className="flex overflow-x-auto snap-x hide-scrollbar gap-4 pb-6 -mx-6 px-6 md:mx-0 md:grid md:grid-cols-2">
              {oneShots.map((shot, idx) => (
                <LinkWrapper 
                  key={idx} 
                  link={shot} 
                  className={`snap-center shrink-0 w-[240px] md:w-auto p-5 rounded-2xl border backdrop-blur-xl flex items-center gap-4 transition-all duration-300 transform hover:-translate-y-1 ${shot.className}`}
                >
                  <div className="p-3 rounded-xl bg-black/50 border border-white/5">
                    {shot.icon}
                  </div>
                  <h3 className="font-bold text-white text-sm">{shot.title}</h3>
                </LinkWrapper>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Footer info */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-12 mb-8 text-center flex flex-col items-center gap-3 text-slate-500 text-xs"
        >
          <div className="flex items-center gap-2">
            <Mail className="w-3 h-3" /> hello@sogni-digitali.com
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3 h-3" /> {t.location}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
