import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar as CalendarIcon, Clock, Video, Building2, ChevronRight, ArrowLeft, ArrowRight, Send, CheckCircle } from 'lucide-react';
import { format, addDays, startOfToday, isSameDay, getDay } from 'date-fns';
import { Link } from 'react-router-dom';
import { submitFormToBridge } from '../lib/submitHelper';
import { generateProposalPDF } from '../lib/pdfGenerator';
import SEO from '../components/SEO';

const timeSlots = ["10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];

const t = {
  EN: {
    title: "Book your Consultation",
    subtitle: "Schedule a technical discovery session with our architects.",
    back: "Back",
    step1Title: "Select Meeting Format",
    formatOnline: "Google Meet",
    formatOnlineDesc: "A 45-minute remote strategy session with screen sharing.",
    formatInPerson: "In-Store Visit",
    formatInPersonDesc: "We visit your physical store to discuss your project directly on-site.",
    select: "Select",
    step2Title: "Select a Date & Time",
    availDays: "Available Days",
    availTimes: "Select Time",
    pickDateFirst: "Please select a date first to view available time slots.",
    continue: "Continue",
    step3Title: "Final Step: Project Intelligence",
    step3Sub: "Provide context so our architects can prepare a tailored strategy.",
    fName: "Full Name *",
    fEmail: "Work Email *",
    fCompany: "Company Name",
    fUrl: "Current Website URL",
    fBudget: "Project Budget Estimate *",
    budgets: ['Less than €5k', '€5k - €15k', '€15k - €50k', '€50k+'],
    fGoals: "Primary Objectives",
    fGoalsPlace: "e.g. We need a luxury rebrand and an AI chatbot...",
    btnConfirm: "Confirm Booking",
    processing: "Processing...",
    successTitle: "Request Confirmed.",
    successDesc: "Your luxury strategy session has been securely logged. An architect from Sogni Digitali will review your project parameters and send you a calendar invite shortly.",
    successDate: "Date & Time",
    successFormat: "Format",
    btnHome: "Return to Homepage",
  },
  IT: {
    title: "Prenota la tua Consulenza",
    subtitle: "Pianifica una sessione tecnica di scoperta con i nostri architetti.",
    back: "Indietro",
    step1Title: "Seleziona il Formato del Meeting",
    formatOnline: "Google Meet",
    formatOnlineDesc: "Una sessione strategica da remoto di 45 minuti con condivisione schermo.",
    formatInPerson: "Visita in Negozio",
    formatInPersonDesc: "Visitiamo il tuo negozio fisico per discutere il progetto direttamente in sede.",
    select: "Seleziona",
    step2Title: "Seleziona Data e Ora",
    availDays: "Giorni Disponibili",
    availTimes: "Seleziona Ora",
    pickDateFirst: "Seleziona prima una data per visualizzare gli orari disponibili.",
    continue: "Continua",
    step3Title: "Ultimo Step: Intelligence del Progetto",
    step3Sub: "Fornisci contesto affinché i nostri architetti possano preparare una strategia su misura.",
    fName: "Nome Completo *",
    fEmail: "Email Lavorativa *",
    fCompany: "Nome Azienda",
    fUrl: "URL Sito Web Attuale",
    fBudget: "Stima Budget di Progetto *",
    budgets: ['Meno di €5k', '€5k - €15k', '€15k - €50k', '€50k+'],
    fGoals: "Obiettivi Principali",
    fGoalsPlace: "es. Abbiamo bisogno di un rebrand luxury e di un chatbot IA...",
    btnConfirm: "Conferma Prenotazione",
    processing: "Elaborazione...",
    successTitle: "Richiesta Confermata.",
    successDesc: "La tua sessione strategica è stata registrata. Un architetto di Sogni Digitali esaminerà i parametri e ti invierà un invito a breve.",
    successDate: "Data e Ora",
    successFormat: "Formato",
    btnHome: "Ritorna alla Home",
  },
  FR: {
    title: "Réservez votre Consultation",
    subtitle: "Planifiez une session de découverte technique avec nos architectes.",
    back: "Retour",
    step1Title: "Sélectionnez le format",
    formatOnline: "Google Meet",
    formatOnlineDesc: "Une session stratégique à distance de 45 minutes.",
    formatInPerson: "Visite en Boutique",
    formatInPersonDesc: "Nous visitons votre boutique physique pour discuter de votre projet sur place.",
    select: "Sélectionner",
    step2Title: "Sélectionnez une date et heure",
    availDays: "Jours disponibles",
    availTimes: "Sélectionner l'heure",
    pickDateFirst: "Veuillez d'abord sélectionner une date.",
    continue: "Continuer",
    step3Title: "Dernière étape: Intelligence du Projet",
    step3Sub: "Fournissez du contexte pour préparer une stratégie sur mesure.",
    fName: "Nom Complet *",
    fEmail: "Email Pro *",
    fCompany: "Nom de l'entreprise",
    fUrl: "Site Web Actuel",
    fBudget: "Budget Estimé *",
    budgets: ['Moins de 5k€', '5k€ - 15k€', '15k€ - 50k€', '50k€+'],
    fGoals: "Objectifs Principaux",
    fGoalsPlace: "ex. Nous avons besoin d'un rebranding de luxe...",
    btnConfirm: "Confirmer la Réservation",
    processing: "Traitement...",
    successTitle: "Demande Confirmée.",
    successDesc: "Votre demande est enregistrée. Un architecte de Sogni Digitali vous enverra bientôt une invitation.",
    successDate: "Date et Heure",
    successFormat: "Format",
    btnHome: "Retour à l'accueil",
  },
  AR: {
    title: "احجز استشارتك",
    subtitle: "حدد موعدًا لجلسة اكتشاف فنية مع مهندسينا.",
    back: "العودة",
    step1Title: "حدد شكل الاجتماع",
    formatOnline: "Google Meet",
    formatOnlineDesc: "جلسة إستراتيجية عن بُعد لمدة 45 دقيقة مع مشاركة الشاشة.",
    formatInPerson: "زيارة للمتجر",
    formatInPersonDesc: "نقوم بزيارة متجرك الفعلي لمناقشة مشروعك مباشرة في الموقع.",
    select: "تحديد",
    step2Title: "حدد التاريخ والوقت",
    availDays: "الأيام المتاحة",
    availTimes: "حدد الوقت",
    pickDateFirst: "يرجى تحديد تاريخ أولاً لعرض الأوقات المتاحة.",
    continue: "متابعة",
    step3Title: "الخطوة النهائية: ذكاء المشروع",
    step3Sub: "قدم السياق حتى يتمكن مهندسونا من إعداد استراتيجية مخصصة.",
    fName: "الاسم الكامل *",
    fEmail: "البريد الإلكتروني للعمل *",
    fCompany: "اسم الشركة",
    fUrl: "عنوان موقع الويب الحالي",
    fBudget: "الميزانية التقديرية *",
    budgets: ['أقل من 5000 يورو', '5000 - 15000 يورو', '15000 - 50000 يورو', '50000+ يورو'],
    fGoals: "الأهداف الرئيسية",
    fGoalsPlace: "على سبيل المثال، نحتاج إلى تغيير العلامة التجارية...",
    btnConfirm: "تأكيد الحجز",
    processing: "جاري المعالجة...",
    successTitle: "تم تأكيد الطلب.",
    successDesc: "تم تسجيل جلستك بشكل آمن. سيقوم أحد مهندسينا بمراجعة المعلمات وإرسال دعوة التقويم قريبًا.",
    successDate: "التاريخ والوقت",
    successFormat: "الشكل",
    btnHome: "العودة إلى الصفحة الرئيسية",
  }
};

export default function BookingPage({ lang }: { lang: string }) {
  const currentLang = (['EN', 'IT', 'FR', 'AR'].includes(lang) ? lang : 'EN') as keyof typeof t;
  const content = t[currentLang];

  const [step, setStep] = useState(1); 
  const [meetingType, setMeetingType] = useState<'online' | 'in-person' | null>(null);
  
  const today = startOfToday();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', website: '', budget: '', goals: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => Math.max(1, s - 1));

  const availableDates = Array.from({ length: 14 }).map((_, i) => addDays(today, i + 1))
    .filter(date => getDay(date) !== 0 && getDay(date) !== 6).slice(0, 7);

  const [honeypot, setHoneypot] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const affiliateId = urlParams.get('ref') || urlParams.get('aff') || urlParams.get('affiliate') || localStorage.getItem('sogni_affiliate_id') || "";

      await submitFormToBridge({
        source: 'Premium Booking System',
        pageSubject: 'Meeting Request',
        meeting_type: meetingType,
        meeting_date: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : null,
        meeting_time: selectedTime,
        ...formData
      }, honeypot, affiliateId);
      
      setIsSubmitting(false);
      setStep(4);

      // Auto-generate proposal PDF
      setTimeout(() => {
        generateProposalPDF(formData, lang);
      }, 500);
      
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      alert('Error submitting request. Please try again.');
    }
  };

  return (
    <div className={`min-h-screen pt-32 pb-20 px-6 relative z-10 flex flex-col items-center ${lang === 'AR' ? 'text-right' : 'text-left'}`}>
      <SEO 
        title={`Prenota una consulenza | Sogni Digitali`} 
        description="Fissa un appuntamento o richiedi una consulenza con gli esperti di Sogni Digitali. Scopri le strategie per ottimizzare il tuo business online." 
      />
      <div className="absolute top-0 w-full h-[500px] bg-gradient-to-b from-[#0B1120] via-[#00E5FF]/5 to-transparent -z-10" />
      
      <div className="w-full max-w-4xl" dir={lang === 'AR' ? 'rtl' : 'ltr'}>
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">{content.title}</h1>
          <p className="text-slate-400 font-light max-w-2xl mx-auto mb-8">{content.subtitle}</p>
          
          <div className="flex items-center justify-center gap-4 max-w-md mx-auto" dir="ltr">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-sm transition-colors ${step >= i ? 'bg-[#E9C349] text-black font-bold' : 'bg-white/5 text-slate-500 border border-white/10'}`}>
                  {step > i ? <CheckCircle className="w-4 h-4" /> : i}
                </div>
                {i < 3 && <div className={`w-16 h-px mx-2 transition-colors ${step > i ? 'bg-[#E9C349]' : 'bg-white/10'}`} />}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-black/60 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] relative overflow-hidden shadow-2xl min-h-[500px]">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E9C349] to-transparent opacity-50" />
          
          <div className="p-8 md:p-12 relative z-10">
            {step > 1 && step < 4 && (
              <button onClick={handleBack} className={`absolute top-8 md:top-12 flex items-center gap-2 text-slate-400 hover:text-white transition-colors ${lang === 'AR' ? 'right-8 md:right-12' : 'left-8 md:left-12'}`}>
                {lang === 'AR' ? <ChevronRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />} {content.back}
              </button>
            )}

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="pt-10 max-w-2xl mx-auto">
                  <h2 className="text-2xl font-display font-bold mb-8 text-center">{content.step1Title}</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <button onClick={() => { setMeetingType('online'); handleNext(); }} className={`text-left p-8 rounded-2xl border transition-all group ${meetingType === 'online' ? 'bg-[#00E5FF]/10 border-[#00E5FF]/50 shadow-[0_0_20px_rgba(0,229,255,0.2)]' : 'bg-white/5 border-white/10 hover:border-white/30'}`}>
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00E5FF] to-blue-600 flex items-center justify-center mb-6">
                        <Video className="w-6 h-6 text-black" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{content.formatOnline}</h3>
                      <p className="text-slate-400 text-sm font-light">{content.formatOnlineDesc}</p>
                      <div className={`mt-6 flex items-center gap-2 text-[#00E5FF] opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium ${lang === 'AR' ? 'justify-end' : ''}`}>
                        {content.select} {lang === 'AR' ? <ArrowLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </div>
                    </button>

                    <button onClick={() => { setMeetingType('in-person'); handleNext(); }} className={`text-left p-8 rounded-2xl border transition-all group ${meetingType === 'in-person' ? 'bg-[#E9C349]/10 border-[#E9C349]/50 shadow-[0_0_20px_rgba(233,195,73,0.2)]' : 'bg-white/5 border-white/10 hover:border-white/30'}`}>
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#E9C349] to-yellow-600 flex items-center justify-center mb-6">
                        <Building2 className="w-6 h-6 text-black" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{content.formatInPerson}</h3>
                      <p className="text-slate-400 text-sm font-light">{content.formatInPersonDesc}</p>
                      <div className={`mt-6 flex items-center gap-2 text-[#E9C349] opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium ${lang === 'AR' ? 'justify-end' : ''}`}>
                        {content.select} {lang === 'AR' ? <ArrowLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </div>
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="pt-10">
                  <h2 className="text-2xl font-display font-bold mb-8 text-center">{content.step2Title}</h2>
                  <div className="grid md:grid-cols-2 gap-12">
                    <div>
                      <h3 className={`text-sm font-semibold tracking-widest uppercase text-slate-500 mb-4 flex items-center gap-2`}>
                        <CalendarIcon className="w-4 h-4" /> {content.availDays}
                      </h3>
                      <div className="space-y-3">
                        {availableDates.map((date, i) => (
                          <button key={i} onClick={() => setSelectedDate(date)} className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all ${selectedDate && isSameDay(selectedDate, date) ? 'bg-white text-black border-white' : 'bg-transparent border-white/10 text-white hover:border-white/30 hover:bg-white/5'}`}>
                            <span className="font-medium" dir="ltr">{format(date, 'EEEE, MMM do')}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className={`text-sm font-semibold tracking-widest uppercase text-slate-500 mb-4 flex items-center gap-2`}>
                        <Clock className="w-4 h-4" /> {content.availTimes}
                      </h3>
                      {!selectedDate ? (
                        <div className="h-full flex items-center justify-center border border-dashed border-white/10 rounded-xl p-8">
                          <p className="text-slate-500 font-light text-center">{content.pickDateFirst}</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-3" dir="ltr">
                          {timeSlots.map(time => (
                            <button key={time} onClick={() => setSelectedTime(time)} className={`p-4 rounded-xl border font-mono transition-all ${selectedTime === time ? 'bg-[#E9C349] text-black border-[#E9C349]' : 'bg-white/5 border-white/10 text-white hover:border-[#E9C349]/50'}`}>
                              {time}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={`mt-12 flex pt-6 border-t border-white/10 justify-end`}>
                    <button onClick={handleNext} disabled={!selectedDate || !selectedTime} className="btn-epic px-8 py-3 disabled:opacity-50 disabled:pointer-events-none">
                      <span className={`relative z-10 flex items-center gap-2`}>{content.continue} {lang === 'AR' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="pt-10">
                  <h2 className="text-2xl font-display font-bold mb-2 text-center md:text-left" style={{textAlign: lang === 'AR' ? 'center' : 'left'}}>{content.step3Title}</h2>
                  <p className="text-slate-400 font-light mb-8 text-center md:text-left" style={{textAlign: lang === 'AR' ? 'center' : 'left'}}>{content.step3Sub}</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 px-1">{content.fName}</label>
                        <input dir="auto" type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E9C349] transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 px-1">{content.fEmail}</label>
                        <input dir="ltr" type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E9C349] transition-all" />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 px-1">{content.fCompany}</label>
                        <input dir="auto" type="text" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E9C349] transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 px-1">{content.fUrl}</label>
                        <input dir="ltr" type="url" value={formData.website} onChange={e => setFormData({...formData, website: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E9C349] mb:text-left" placeholder="https://" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-slate-300 px-1">{content.fBudget}</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {content.budgets.map((budget, i) => (
                          <button type="button" key={i} onClick={() => setFormData({...formData, budget})} className={`py-3 rounded-xl border text-sm transition-all ${formData.budget === budget ? 'bg-[#E9C349] text-black border-[#E9C349] font-bold' : 'bg-transparent border-white/10 text-white hover:border-white/30'}`}>
                            {budget}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300 px-1">{content.fGoals}</label>
                      <textarea dir="auto" rows={3} value={formData.goals} onChange={e => setFormData({...formData, goals: e.target.value})} placeholder={content.fGoalsPlace} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E9C349] resize-none" />
                    </div>
                    <div className="space-y-4">
                      <input type="text" name="_honeypot" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
                    </div>
                    <div className={`pt-6 border-t border-white/10 flex justify-end`}>
                      <button type="submit" disabled={isSubmitting || !formData.name || !formData.email || !formData.budget} className="btn-epic px-10 py-4 font-semibold tracking-wider uppercase inline-flex items-center gap-3 disabled:opacity-50">
                        <div className="shine-layer"></div>
                        <span className={`relative z-10 flex items-center gap-2`}>
                          {isSubmitting ? content.processing : <>{content.btnConfirm} <Send className={`w-4 h-4 ml-2 ${lang === 'AR' ? 'mirror-icon' : ''}`} /></>}
                        </span>
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="pt-16 pb-8 text-center flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-[#E9C349]/20 flex items-center justify-center mx-auto mb-8 border border-[#E9C349]/50">
                    <CheckCircle className="w-12 h-12 text-[#E9C349]" />
                  </div>
                  <h2 className="text-3xl font-display font-bold mb-4">{content.successTitle}</h2>
                  <p className="text-slate-400 font-light max-w-xl mx-auto mb-8 text-lg">{content.successDesc}</p>
                  
                  <div className="inline-flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 text-left w-auto" dir={lang === 'AR' ? 'rtl' : 'ltr'}>
                     <div>
                       <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">{content.successDate}</div>
                       <div className="font-semibold" dir="ltr">{selectedDate && format(selectedDate, 'MMM do, yyyy')} @ {selectedTime}</div>
                     </div>
                     <div className="w-px bg-white/10 mx-2" />
                     <div>
                       <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">{content.successFormat}</div>
                       <div className="font-semibold capitalize">{meetingType === 'online' ? content.formatOnline : content.formatInPerson}</div>
                     </div>
                  </div>
                  
                  <div className="mt-12">
                    <Link to="/" className="text-slate-400 hover:text-white flex items-center justify-center gap-2">
                       {lang === 'AR' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />} {content.btnHome}
                    </Link>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
