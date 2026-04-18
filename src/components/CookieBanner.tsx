import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, Check, X, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import Tooltip from './Tooltip'; // We can use the existing tooltip or built-in elements

declare global {
  interface Window {
    SOGNI_HUB_CONFIG?: any;
  }
}

export default function CookieBanner({ lang }: { lang: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  
  // Cookie preference states
  const [cookies, setCookies] = useState({
    essential: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    const consent = localStorage.getItem('sogni_digitali_cookie_consent');
    if (!consent) {
      // Show immediately or with a small delay
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('sogni_digitali_cookie_consent', 'accepted_all');
    if (window.SOGNI_HUB_CONFIG) {
      window.SOGNI_HUB_CONFIG.collectCookies = true;
    }
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('sogni_digitali_cookie_consent', JSON.stringify({
      status: 'custom',
      preferences: cookies
    }));
    if (window.SOGNI_HUB_CONFIG) {
      // Allow tracker if they accepted either marketing or analytics
      window.SOGNI_HUB_CONFIG.collectCookies = cookies.marketing || cookies.analytics;
    }
    setIsVisible(false);
  };

  const handleRejectNonEssential = () => {
    localStorage.setItem('sogni_digitali_cookie_consent', 'rejected_non_essential');
    if (window.SOGNI_HUB_CONFIG) {
      window.SOGNI_HUB_CONFIG.collectCookies = false;
    }
    setIsVisible(false);
  };

  const toggleCookie = (type: 'analytics' | 'marketing') => {
    setCookies(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const currentContent = {
    title: lang === 'IT' ? "Centro Preferenze Privacy" : lang === 'FR' ? "Centre de Préférences de Confidentialité" : "Privacy Preference Center",
    intro: lang === 'IT' 
      ? `Utilizziamo i cookie per offrirti un'esperienza di lusso, personalizzata e per analizzare le prestazioni del nostro sito. Puoi personalizzare le tue preferenze o accettare tutto. Leggi la nostra ` 
      : lang === 'FR' 
      ? `Nous utilisons des cookies pour vous offrir une expérience de luxe et sur mesure, et pour analyser nos performances. Vous pouvez personnaliser vos choix. Lisez notre ` 
      : `We use cookies to offer you a luxurious, personalized experience and to analyze site performance. Customize your preferences below. Read our `,
    essentialDesc: lang === 'IT' ? "Cookie Tecnici (Necessari per il funzionamento del sito)" : lang === 'FR' ? "Cookies Techniques (Nécessaires)" : "Essential Cookies (Required)",
    analyticsDesc: lang === 'IT' ? "Cookie Analitici (Per capire come navighi e migliorare l'esperienza)" : lang === 'FR' ? "Cookies Analytiques (Statistiques de navigation)" : "Analytics Cookies",
    marketingDesc: lang === 'IT' ? "Cookie di Profilazione (Marketing e Pubblicità)" : lang === 'FR' ? "Cookies de Profilage (Marketing & Publicité)" : "Marketing Cookies",
    policy: lang === 'IT' ? "Privacy Policy" : lang === 'FR' ? "Politique de Confidentialité" : "Privacy Policy",
    acceptAll: lang === 'IT' ? "Accetta Tutti" : lang === 'FR' ? "Tout Accepter" : "Accept All",
    savePref: lang === 'IT' ? "Salva Preferenze" : lang === 'FR' ? "Enregistrer" : "Save Preferences",
    rejectAll: lang === 'IT' ? "Solo Necessari" : lang === 'FR' ? "Essentiels Uniquement" : "Reject All",
    customize: lang === 'IT' ? "Gestisci Preferenze" : lang === 'FR' ? "Personnaliser" : "Customize"
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-full max-w-2xl bg-[#090A0F] border border-white/10 rounded-3xl p-6 md:p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col"
            style={{ maxHeight: '90vh' }}
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <div className="absolute top-[-20%] left-[-10%] w-[300px] h-[300px] bg-[#00E5FF] opacity-10 blur-[100px]" />
              <div className="absolute bottom-[-20%] right-[-10%] w-[300px] h-[300px] bg-[#E9C349] opacity-5 blur-[100px]" />
            </div>

            <div className="relative z-10 flex flex-col h-full overflow-hidden">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-6 h-6 text-[#00E5FF]" />
                </div>
                <h2 className="font-display font-bold text-white text-xl md:text-2xl">{currentContent.title}</h2>
              </div>
              
              <div className="overflow-y-auto pr-2 custom-scrollbar">
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {currentContent.intro} <Link to="/privacy" className="text-[#00E5FF] hover:underline" onClick={() => setIsVisible(false)}>{currentContent.policy}</Link>.
                </p>

                {showPreferences ? (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }} 
                    className="space-y-4 mb-6"
                  >
                    {/* Essential (Disabled Toggle) */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                      <div className="pr-4">
                        <p className="text-white text-sm font-semibold">{currentContent.essentialDesc}</p>
                      </div>
                      <div className="w-11 h-6 bg-[#00E5FF] rounded-full flex items-center p-1 relative opacity-50 cursor-not-allowed">
                        <div className="w-4 h-4 bg-black rounded-full absolute right-1" />
                      </div>
                    </div>

                    {/* Analytics */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                      <div className="pr-4">
                        <p className="text-white text-sm font-medium">{currentContent.analyticsDesc}</p>
                      </div>
                      <button 
                        onClick={() => toggleCookie('analytics')}
                        className={`w-11 h-6 rounded-full flex items-center p-1 relative transition-colors ${cookies.analytics ? 'bg-[#00E5FF]' : 'bg-slate-700'}`}
                      >
                        <motion.div 
                          layout
                          className={`w-4 h-4 rounded-full ${cookies.analytics ? 'bg-black' : 'bg-white'}`}
                          animate={{ x: cookies.analytics ? 20 : 0 }}
                        />
                      </button>
                    </div>

                    {/* Marketing */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                      <div className="pr-4">
                        <p className="text-white text-sm font-medium">{currentContent.marketingDesc}</p>
                      </div>
                      <button 
                        onClick={() => toggleCookie('marketing')}
                        className={`w-11 h-6 rounded-full flex items-center p-1 relative transition-colors ${cookies.marketing ? 'bg-[#00E5FF]' : 'bg-slate-700'}`}
                      >
                        <motion.div 
                          layout
                          className={`w-4 h-4 rounded-full ${cookies.marketing ? 'bg-black' : 'bg-white'}`}
                          animate={{ x: cookies.marketing ? 20 : 0 }}
                        />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <div className="mb-6">
                    <button 
                      onClick={() => setShowPreferences(true)}
                      className="text-slate-400 hover:text-white text-sm font-medium transition-colors border-b border-transparent hover:border-white/20 pb-0.5"
                    >
                      {currentContent.customize}
                    </button>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full mt-auto pt-4 border-t border-white/10">
                <button 
                  onClick={handleRejectNonEssential}
                  className="w-full sm:w-auto flex-1 px-6 py-3 bg-transparent text-slate-300 font-semibold rounded-full border border-white/10 hover:bg-white/5 transition-colors text-sm"
                >
                  {currentContent.rejectAll}
                </button>
                {showPreferences && (
                  <button 
                    onClick={handleSavePreferences}
                    className="w-full sm:w-auto flex-1 px-6 py-3 bg-white/10 text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-colors text-sm"
                  >
                    {currentContent.savePref}
                  </button>
                )}
                <button 
                  onClick={handleAcceptAll}
                  className="w-full sm:w-auto flex-1 px-6 py-3 bg-[#00E5FF] text-black font-semibold rounded-full hover:bg-[#00B4D8] transition-colors shadow-[0_0_20px_rgba(0,229,255,0.3)] text-sm"
                >
                  {currentContent.acceptAll}
                </button>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
