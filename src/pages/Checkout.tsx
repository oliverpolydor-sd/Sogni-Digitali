import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, ShieldCheck, ChevronRight, Check, Rocket, CreditCard, Landmark } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { submitFormToBridge } from '../lib/submitHelper';

const translations = {
  IT: {
    back: "Torna ai prezzi",
    checkoutTitle: "Finalizza il tuo ordine",
    checkoutSubtitle: "Sei a un passo dal trasformare il tuo business.",
    planDetails: "Dettagli del Piano",
    selectedPlan: "Piano Selezionato",
    total: "Totale",
    subtotal: "Subtotale",
    discountLabel: "Sconto",
    formTitle: "I tuoi dettagli",
    firstName: "Nome",
    lastName: "Cognome",
    email: "Email",
    phone: "Telefono",
    company: "Nome Azienda",
    projectDetails: "Parlaci brevemente del tuo progetto (opzionale)",
    submitBtn: "Procedi al pagamento sicuro",
    securePayment: "Pagamento sicuro crittografato a 256-bit",
    oneShotLabel: "Opzione One-Shot",
    successTitle: "Ordine Ricevuto!",
    successDesc: "Ti contatteremo entro 24 ore per iniziare il tuo progetto.",
    giftCode: "Codice Regalo / Promo",
    apply: "Applica",
    addExtras: "Aggiungi opzioni extra",
    addMaintenance: "Aggiungi Sogni Care (Annuale)",
    agreementPlan: "Procedendo, accetti di pagare l'intero importo per avviare il progetto.",
    agreementOneShot: "Procedendo, accetti di pagare l'intero importo per questo servizio one-shot."
  },
  EN: {
    back: "Back to pricing",
    checkoutTitle: "Finalize your order",
    checkoutSubtitle: "You're one step away from transforming your business.",
    planDetails: "Plan Details",
    selectedPlan: "Selected Plan",
    total: "Total",
    subtotal: "Subtotal",
    discountLabel: "Discount",
    formTitle: "Your Details",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    phone: "Phone",
    company: "Company Name",
    projectDetails: "Tell us briefly about your project (optional)",
    submitBtn: "Proceed to secure payment",
    securePayment: "256-bit encrypted secure payment",
    oneShotLabel: "One-Shot Option",
    successTitle: "Order Received!",
    successDesc: "We will contact you within 24 hours to start your project.",
    giftCode: "Gift / Promo Code",
    apply: "Apply",
    addExtras: "Add extra options",
    addMaintenance: "Add Sogni Care (Annual)",
    agreementPlan: "By proceeding, you agree to pay the full amount to start the project.",
    agreementOneShot: "By proceeding, you agree to pay the full amount for this one-shot service."
  },
  FR: {
    back: "Retour aux prix",
    checkoutTitle: "Finalisez votre commande",
    checkoutSubtitle: "Vous êtes à un pas de transformer votre entreprise.",
    planDetails: "Détails du Forfait",
    selectedPlan: "Forfait Sélectionné",
    total: "Total",
    subtotal: "Sous-total",
    discountLabel: "Réduction",
    formTitle: "Vos Coordonnées",
    firstName: "Prénom",
    lastName: "Nom",
    email: "Email",
    phone: "Téléphone",
    company: "Nom de l'entreprise",
    projectDetails: "Parlez-nous brièvement de votre projet (optionnel)",
    submitBtn: "Procéder au paiement sécurisé",
    securePayment: "Paiement sécurisé crypté 256-bit",
    oneShotLabel: "Option One-Shot",
    successTitle: "Commande Reçue !",
    successDesc: "Nous vous contacterons sous 24 heures pour démarrer votre projet.",
    giftCode: "Code Cadeau / Promo",
    apply: "Appliquer",
    addExtras: "Ajouter des options supplémentaires",
    addMaintenance: "Ajouter Sogni Care (Annuel)",
    agreementPlan: "En procédant, vous acceptez de payer le montant total pour démarrer le projet.",
    agreementOneShot: "En procédant, vous acceptez de payer le montant total pour ce service one-shot."
  }
};

const planData = {
  essential: { name: "Essential", price: 849, type: "plan" },
  professional: { name: "Professional", price: 1599, type: "plan" },
  custom: { name: "Custom", price: 2999, type: "plan" },
  
  // IT slugs
  "ottimizzazione-google-business": { name: "Google Business Optimisation", price: 149, type: "oneshot" },
  "generazione-contenuti-ia": { name: "IA Content Generation", price: 199, type: "oneshot" },
  "sistema-reputazione-qr-code": { name: "Système Réputation QR Code", price: 99, type: "oneshot" },
  
  // EN slugs
  "google-business-optimization": { name: "Google Business Optimisation", price: 149, type: "oneshot" },
  "ai-content-generation": { name: "IA Content Generation", price: 199, type: "oneshot" },
  "qr-code-reputation-system": { name: "Système Réputation QR Code", price: 99, type: "oneshot" },

  // FR slugs
  "google-business-optimisation": { name: "Google Business Optimisation", price: 149, type: "oneshot" },
  "ia-content-generation": { name: "IA Content Generation", price: 199, type: "oneshot" },
  "syst-me-r-putation-qr-code": { name: "Système Réputation QR Code", price: 99, type: "oneshot" },
  
  // Fallbacks
  "google-business": { name: "Google Business Optimisation", price: 149, type: "oneshot" },
  "ai-content": { name: "IA Content Generation", price: 199, type: "oneshot" },
  "qr-code": { name: "Système Réputation QR Code", price: 99, type: "oneshot" },
};

const availableExtras = [
  { id: 'google-business', name: 'Google Business Optimisation', price: 149 },
  { id: 'ai-content', name: 'IA Content Generation', price: 199 },
  { id: 'qr-code', name: 'Système Réputation QR Code', price: 99 }
];

const availableMaintenance = [
  { id: 'care-basic', name: 'Sogni Care - Basic', price: 290 },
  { id: 'care-business', name: 'Sogni Care - Business', price: 590 },
  { id: 'care-premium', name: 'Sogni Care - Premium', price: 990 }
];

export default function Checkout({ lang }: { lang: string }) {
  const { planId } = useParams<{ planId: string }>();
  const { isLightMode } = useTheme();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [giftCode, setGiftCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [selectedMaintenance, setSelectedMaintenance] = useState<string | null>(null);
  
  const t = translations[lang as keyof typeof translations] || translations['IT'];
  
  const plan = planData[(planId || '').toLowerCase() as keyof typeof planData];

  if (!plan) {
    return (
      <div className="min-h-screen bg-[#0B1120] text-white flex items-center justify-center flex-col">
        <h1 className="text-2xl font-bold mb-4">Plan not found</h1>
        <Link to="/pricing" className="text-[#00E5FF] hover:underline">Return to pricing</Link>
      </div>
    );
  }

  const handleApplyCode = () => {
    // Simple mock promo code logic
    if (giftCode.toUpperCase() === 'SOGNI5') {
      setDiscount(0.05); // 5% off
    } else if (giftCode.toUpperCase() === 'WELCOME10') {
      setDiscount(0.1); // 10% off
    } else {
      setDiscount(0);
      alert("Invalid code");
    }
  };

  const toggleExtra = (id: string) => {
    setSelectedExtras(prev => 
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    const form = e.target as HTMLFormElement;
    
    // Quick form data extraction since there's no state bindings
    const elements = form.elements as any;
    const formData = {
      name: `${elements[0]?.value || ''} ${elements[1]?.value || ''}`.trim(),
      email: elements[2]?.value,
      phone: elements[3]?.value,
      company: elements[4]?.value,
      project_details: elements[5]?.value || '',
      checkout_plan: `${plan?.name || ''} (${planId || ''})`,
      checkout_discount: giftCode || 'None',
      checkout_maintenance: selectedMaintenance || 'None',
      checkout_extras: selectedExtras.join(', ') || 'None',
    };

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const affiliateId = urlParams.get('ref') || urlParams.get('aff') || urlParams.get('affiliate') || localStorage.getItem('sogni_affiliate_id') || "";

      await submitFormToBridge({
        ...formData,
        pageSubject: 'Checkout Initiation',
        source: 'Sogni Digitali Website Checkout',
      }, honeypot, affiliateId);
      
      // Simulate payment processing flow locally
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 1500);
      
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      alert("Error initiating checkout");
    }
  };

  const basePrice = plan.price;
  const extrasPrice = selectedExtras.reduce((sum, extraId) => {
    const extra = availableExtras.find(e => e.id === extraId);
    return sum + (extra ? extra.price : 0);
  }, 0);
  
  const maintenancePrice = availableMaintenance.find(m => m.id === selectedMaintenance)?.price || 0;
  
  const subtotal = basePrice + extrasPrice + maintenancePrice;
  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount;

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#0B1120] text-white flex items-center justify-center p-6">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full bg-white/5 border border-white/10 rounded-3xl p-10 text-center backdrop-blur-xl"
        >
          <div className="w-20 h-20 bg-[#00E5FF]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-[#00E5FF]" />
          </div>
          <h2 className="text-3xl font-display font-bold mb-4">{t.successTitle}</h2>
          <p className="text-slate-400 mb-8">{t.successDesc}</p>
          <Link to="/">
            <button className="w-full py-4 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#00B4D8] text-[#0B1120] font-bold tracking-widest uppercase hover:scale-105 transition-transform">
              Return Home
            </button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden z-10" style={{ perspective: '1200px' }}>
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
        className="max-w-6xl mx-auto relative z-10"
      >
        <Link to="/pricing" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-10 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-bold tracking-widest uppercase">{t.back}</span>
        </Link>

        <motion.div 
          variants={{
            initial: { opacity: 0, y: 30, rotateX: 5 },
            animate: { opacity: 1, y: 0, rotateX: 0 }
          }}
          className="mb-12 relative group"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 relative z-10 hover:animate-glitch">
            {t.checkoutTitle}
          </h1>
          {/* Glitch Layers */}
          <span className="absolute top-0 left-0 text-[#00E5FF] opacity-0 group-hover:opacity-30 group-hover:translate-x-1 -z-10 transition-opacity text-4xl md:text-5xl font-display font-bold">{t.checkoutTitle}</span>
          <span className="absolute top-0 left-0 text-[#E9C349] opacity-0 group-hover:opacity-30 group-hover:-translate-x-1 -z-10 transition-opacity text-4xl md:text-5xl font-display font-bold">{t.checkoutTitle}</span>
          
          <p className="text-xl text-slate-400 font-light">
            {t.checkoutSubtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Form Section */}
          <motion.div 
            variants={{
              initial: { opacity: 0, x: -30, rotateY: 5 },
              animate: { opacity: 1, x: 0, rotateY: 0 }
            }}
            className="lg:col-span-7 order-2 lg:order-1"
          >
            <div className="glass-panel rounded-3xl p-8 md:p-10">
              <h2 className="text-2xl font-display font-bold mb-8">{t.formTitle}</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">{t.firstName}</label>
                    <input required type="text" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00E5FF] transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">{t.lastName}</label>
                    <input required type="text" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00E5FF] transition-colors" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">{t.email}</label>
                    <input required type="email" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00E5FF] transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">{t.phone}</label>
                    <input required type="tel" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00E5FF] transition-colors" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">{t.company}</label>
                  <input required type="text" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00E5FF] transition-colors" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">{t.projectDetails}</label>
                  <textarea rows={4} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00E5FF] transition-colors resize-none"></textarea>
                </div>

                <div className="space-y-4">
                  <input type="text" name="_honeypot" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
                  <button type="submit" disabled={isSubmitting} className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#00B4D8] text-[#0B1120] font-bold text-sm tracking-widest uppercase hover:scale-[1.02] transition-transform mt-8 flex items-center justify-center gap-2 ambient-shadow-cyan">
                    {isSubmitting ? <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" /> : <>{t.submitBtn} <ChevronRight className="w-4 h-4" /></>}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-slate-400 text-sm mt-4">
                  <ShieldCheck className="w-4 h-4 text-[#00E5FF]" />
                  <span>{t.securePayment}</span>
                </div>
              </form>
            </div>

            {/* Promo Code Ad */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 bg-gradient-to-r from-[#00E5FF]/10 to-transparent border border-[#00E5FF]/20 rounded-3xl p-8 relative overflow-hidden"
            >
              <div className="absolute -right-4 -top-4 opacity-20 pointer-events-none">
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    x: [0, 10, 0],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Rocket className="w-32 h-32 text-[#00E5FF]" />
                </motion.div>
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <Rocket className="w-6 h-6 text-[#00E5FF]" />
                  <h3 className="text-xl font-display font-bold text-white">Unlock 5% OFF</h3>
                </div>
                <p className="text-slate-300 mb-4 max-w-sm">
                  Ready to launch? Use the promo code <span className="text-[#00E5FF] font-bold">SOGNI5</span> to get an instant 5% discount on your first project!
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Order Summary */}
          <motion.div 
            variants={{
              initial: { opacity: 0, x: 30, rotateY: -5 },
              animate: { opacity: 1, x: 0, rotateY: 0 }
            }}
            className="lg:col-span-5 order-1 lg:order-2"
          >
            <div className="glass-panel rounded-3xl p-8 md:p-10 sticky top-32">
              <h3 className="text-xl font-display font-bold mb-6">{t.planDetails}</h3>
              
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/10">
                <div>
                  <div className="text-xs font-bold tracking-widest uppercase text-[#00E5FF] mb-1">
                    {plan.type === 'plan' ? t.selectedPlan : t.oneShotLabel}
                  </div>
                  <div className="text-2xl font-display font-bold text-white">{plan.name}</div>
                </div>
                <div className="text-2xl font-light text-white">
                  {plan.price}€
                </div>
              </div>

              {/* Extras Selection */}
              {plan.type === 'plan' && ['essential', 'professional'].includes((planId || '').toLowerCase()) && (
                <>
                  <div className="mb-8 border-b border-white/10 pb-6">
                    <h4 className="text-sm font-bold tracking-widest uppercase text-white mb-4">{t.addExtras}</h4>
                    <div className="space-y-3">
                      {availableExtras.map(extra => (
                        <label key={extra.id} className="flex items-center justify-between cursor-pointer group" onClick={() => toggleExtra(extra.id)}>
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedExtras.includes(extra.id) ? 'bg-[#00E5FF] border-[#00E5FF]' : 'border-slate-500 group-hover:border-[#00E5FF]'}`}>
                              {selectedExtras.includes(extra.id) && <Check className="w-3 h-3 text-[#0B1120]" />}
                            </div>
                            <span className="text-slate-300 text-sm">{extra.name}</span>
                          </div>
                          <span className="text-white text-sm font-medium">+{extra.price}€</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8 border-b border-white/10 pb-6">
                    <h4 className="text-sm font-bold tracking-widest uppercase text-white mb-4">{t.addMaintenance || "Add Sogni Care (Annual)"}</h4>
                    <div className="space-y-3">
                      {availableMaintenance.map(maint => (
                        <label key={maint.id} className="flex items-center justify-between cursor-pointer group" onClick={() => setSelectedMaintenance(prev => prev === maint.id ? null : maint.id)}>
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${selectedMaintenance === maint.id ? 'bg-[#E9C349] border-[#E9C349]' : 'border-slate-500 group-hover:border-[#E9C349]'}`}>
                              {selectedMaintenance === maint.id && <div className="w-2.5 h-2.5 rounded-full bg-[#0B1120]" />}
                            </div>
                            <span className="text-slate-300 text-sm">{maint.name}</span>
                          </div>
                          <span className="text-white text-sm font-medium">+{maint.price}€/yr</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Gift Code */}
              <div className="mb-8 border-b border-white/10 pb-6">
                <label className="text-sm font-medium text-slate-300 mb-2 block">{t.giftCode}</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={giftCode}
                    onChange={(e) => setGiftCode(e.target.value)}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-[#00E5FF] transition-colors" 
                    placeholder="Promo code"
                  />
                  <button 
                    type="button"
                    onClick={handleApplyCode}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-bold transition-colors border border-white/10"
                  >
                    {t.apply}
                  </button>
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-slate-300">
                  <span>{t.subtotal}</span>
                  <span>{subtotal}€</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#00E5FF]">
                    <span>{t.discountLabel}</span>
                    <span>-{discountAmount.toFixed(2)}€</span>
                  </div>
                )}
                <div className="flex justify-between text-white font-bold text-xl pt-4 border-t border-white/10">
                  <span>{t.total}</span>
                  <span className="text-[#00E5FF]">{total.toFixed(2)}€</span>
                </div>
              </div>

              <div className="bg-black/20 rounded-xl p-6 border border-white/5">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="flex items-center gap-3 text-slate-400">
                    <CreditCard className="w-5 h-5" />
                    <span className="text-sm font-medium">Accepted Payment Methods</span>
                  </div>
                  <div className="flex flex-wrap justify-center items-center gap-6 opacity-90">
                    <img src="https://cdn.simpleicons.org/visa" alt="Visa" className="h-6" />
                    <img src="https://cdn.simpleicons.org/mastercard" alt="Mastercard" className="h-6" />
                    <img src={`https://cdn.simpleicons.org/applepay/${isLightMode ? '000000' : 'ffffff'}`} alt="Apple Pay" className="h-8" />
                    <img src={`https://cdn.simpleicons.org/googlepay/${isLightMode ? '000000' : 'ffffff'}`} alt="Google Pay" className="h-8" />
                    <img src="https://cdn.simpleicons.org/paypal" alt="PayPal" className="h-6" />
                    <div className={`flex items-center gap-2 font-bold text-sm tracking-wider ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                      <Landmark className="w-5 h-5" />
                      <span>BANK TRANSFER (SAFE)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
