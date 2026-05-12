import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { translations } from '../lib/translations';
import { Check, Star, Zap, Shield, HelpCircle, ArrowRight, Bot, Coins } from 'lucide-react';
import SEO from '../components/SEO';

export default function PackagesPage({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations['EN'];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const localizedContent = {
    IT: {
      tag: "L'Evoluzione del Tuo Business",
      title: "I Nostri",
      titleSpan: "Pacchetti",
      subtitle: "Un'analisi approfondita di ogni soluzione per aiutarti a scegliere l'evoluzione perfetta per il tuo business, senza sorprese e senza costi nascosti.",
      quizTitle: "Non sai quale scegliere?",
      qStep: "Domanda",
      qOf: "di",
      quizResult: "Il pacchetto ideale per te è:",
      quizResultSub: "Copre perfettamente i tuoi obiettivi aziendali.",
      btnDiscover: "Scopri l'intero pacchetto",
      btnRepeat: "Ripeti il test",
      popular: "Scelta Più Popolare",
      buyBtn: "Acquista / Scopri i Prezzi",
      affBadge: "Guadagna con Noi",
      affTitle: "Programma Affiliazione Elite.",
      affDesc: "Ambasciatore del lusso digitale. Consiglia Sogni Digitali ad amici e colleghi. Se decidono di costruire i loro ecosistemi digitali con noi, tu ricevi ricchi scompensi per ogni Referral chiuso con successo.",
      affList1: "Alto tasso di conversione",
      affList2: "Gestione autonoma e trasparenza",
      affList3: "Materiale promozionale e supporto passivo",
      affBtn: "Diventa Affiliato",
      questions: [
        {
          q: "Qual è il tuo obiettivo principale online?",
          options: [
            "Voglio solo un sito vetrina professionale per mostrare chi sono.",
            "Voglio ricevere prenotazioni o lead automaticamente senza sforzo.",
            "Voglio digitalizzare complessi processi interni o lanciare una startup."
          ]
        },
        {
          q: "Come gestisci i contatti e i clienti oggi?",
          options: [
            "Faccio tutto manualmente tramite email o messaggi.",
            "Vorrei che un software organizzasse contatti e chat H24.",
            "Ho bisogno di un software ERP/CRM totalmente cucito su di noi."
          ]
        }
      ],
      packages: [
        {
          id: "essential",
          name: "Essential",
          subtitle: "Presenza digitale sovrana",
          icon: <Star className="w-10 h-10 text-[#00E5FF]" />,
          desc: "Ideale per start-up e professionisti. Un ecosistema digitale di base ottimizzato per velocità, design premium e SEO locale.",
          fullDesc: "Il pacchetto Essential non è un semplice 'sito web'. È le fondamenta della tua nuova casa digitale. Costruito con le tecnologie più avanzate (React, Tailwind, hosting ultra-veloce in Europa), questo ecosistema assicura che il tuo brand venga percepito immediatamente come leader del settore. L'ottimizzazione SEO locale ti posiziona dove i tuoi clienti ti stanno cercando, mentre il design Cyber-Luxury cattura l'attenzione e costruisce fiducia dal primo sguardo.",
          points: [
            "Sito Vetrina o Landing Page (fino a 5 pagine)",
            "Design Cyber-Luxury ultra veloce e ottimizzato",
            "SEO locale potenziata e Performance 100/100 Mobile",
            "Moduli di contatto intelligenti",
            "Certificato SSL e 12 mesi di hosting verde in Europa"
          ]
        },
        {
          id: "professional",
          name: "Professional",
          subtitle: "La tua prima dipendente digitale",
          icon: <Zap className="w-10 h-10 text-[#E9C349]" />,
          popular: true,
          desc: "Il motore di crescita definitivo aziendale. L'IA lavora per te 24/7 prenotando appuntamenti e generando lead qualificati senza sosta.",
          fullDesc: "Passa al livello di vera automazione. Oltre a includere l'intero ecosistema Essential, implementiamo sistemi di Intelligenza Artificiale che lavorano quando tu dormi. Un Chatbot AI sempre attivo qualificherà i tuoi lead, risponderà istantaneamente alle FAQ e programmerà appuntamenti sul tuo calendario in totale autonomia. Gestisci tutto tramite il Sogni Lead Hub integrato.",
          points: [
            "Include tutto l'ecosistema Essential",
            "Sogni Lead Hub (Mini-CRM)",
            "Chatbot IA sempre attivo",
            "Sistema di booking automatizzato",
            "Generazione e qualificazione lead in automatico"
          ]
        },
        {
          id: "custom",
          name: "Custom (Infinity)",
          subtitle: "Il tuo OS aziendale proprietario",
          icon: <Shield className="w-10 h-10 text-emerald-400" />,
          desc: "Nessun limite. Piattaforme complesse, e-commerce, o automazioni su misura basate su IA e custom API aziendali.",
          fullDesc: "L'apice dell'innovazione digitale. Hai bisogno di un marketplace? Un software Saas gestionale interno? Un'App nativa iOS e Android? Il nostro pacchetto Infinity elimina le piattaforme di terze parti tossiche ed i loro costi nascosti, creandoti una piattaforma sovrana.",
          points: [
            "Sviluppo di piattaforme complesse o App Native",
            "Creazione di E-commerce scalabili di alto livello",
            "Integrazioni API complesse e tool esterni",
            "Sistemi e Database proprietari su misura",
            "Sostituzione di vecchi SaaS aziendali costosi"
          ]
        },
        {
          id: "care",
          name: "Sogni Care",
          subtitle: "L'essenziale: Sicurezza di Base",
          icon: <Bot className="w-10 h-10 text-[#00f2fe]" />,
          desc: "L'assicurazione tranquillità per i siti vetrina. Mantieni l'ecosistema sovrano aggiornato, intatto e fluido.",
          fullDesc: "Se i Somnia servono a far crescere il tuo sito, il Sogni Care serve a proteggere ciò che già esiste. Hosting, dominio, aggiornamenti di sicurezza proattivi, backup mensili e micro-interventi inclusi.",
          points: [
            "Hosting & Dominio gratuiti per sempre",
            "Sicurezza proattiva contro attacchi informatici",
            "Backup e salvataggio database mensili",
            "Micro-interventi inclusi (30 min/mese)",
            "Monitoraggio guasti di base"
          ]
        },
        {
          id: "care-pro",
          name: "Sogni Care Pro",
          subtitle: "Le Prestazioni: Velocità & Crescita",
          icon: <Shield className="w-10 h-10 text-orange-400" />,
          desc: "Il copilota per le aziende in crescita. Per garantire che il tuo sito sia sempre veloce e sicuro.",
          fullDesc: "Tutti i vantaggi del pacchetto base potenziati. Velocità estrema grazie a CDN Globale, monitoraggio h24, backup settimanali per la sicurezza dei tuoi clienti e un audit strategico trimestrale.",
          points: [
            "Velocità estrema (Hosting Premium CDN)",
            "Monitoraggio H24 con avvisi in tempo reale",
            "Backup di sicurezza settimanali",
            "Interventi prioritari inclusi (1 ora/mese)",
            "Audit SEO e prestazionale trimestrale valutativo"
          ]
        },
        {
          id: "somnia-token",
          name: "Somnia Token",
          subtitle: "Il Carburante dell'Innovazione",
          icon: <Coins className="w-10 h-10 text-purple-400" />,
          desc: "La nostra moneta di competenza. Trasparenza totale, zero attriti e accesso prioritario per far crescere il tuo ecosistema.",
          fullDesc: "Il Somnia è l'unità di valore esclusiva di Sogni Digitali. 1 Somnia = 1 Unità di competenza dedicata. Nessuna attesa per preventivi, pacchetti modulari per ogni tua esigenza futura.",
          points: [
            "Agilità estrema senza attese (Preventivi Flash)",
            "Trasparenza del costo al 100% prima d'iniziare",
            "Accesso allo sviluppo prioritario in azienda",
            "Lavori coperti validi 1 Anno intero",
            "Piani scalabili: Start, Agile e Impero"
          ]
        }
      ]
    },
    EN: {
      tag: "The Evolution of Your Business",
      title: "Our",
      titleSpan: "Packages",
      subtitle: "An in-depth analysis of each solution to help you choose the perfect evolution for your business, without surprises or hidden costs.",
      quizTitle: "Not sure which to choose?",
      qStep: "Question",
      qOf: "of",
      quizResult: "The perfect package for you is:",
      quizResultSub: "It perfectly covers your business goals.",
      btnDiscover: "Discover the full package",
      btnRepeat: "Retake the test",
      popular: "Most Popular Choice",
      buyBtn: "Buy / See Pricing",
      affBadge: "Earn with Us",
      affTitle: "Elite Affiliate Program.",
      affDesc: "An ambassador of digital luxury. Recommend Sogni Digitali to friends and colleagues. If they decide to build their digital ecosystems with us, you receive rich rewards for every successful closed Referral.",
      affList1: "High conversion rate",
      affList2: "Autonomous management and transparency",
      affList3: "Promotional material and passive support",
      affBtn: "Become an Affiliate",
      questions: [
        {
          q: "What is your main online goal?",
          options: [
            "I just want a professional showcase website to show who I am.",
            "I want to receive bookings or leads automatically without effort.",
            "I want to digitize complex internal processes or launch a startup."
          ]
        },
        {
          q: "How do you manage contacts and customers today?",
          options: [
            "I do everything manually via email or messages.",
            "I would like a software to organize contacts and chats 24/7.",
            "I need an ERP/CRM software totally tailored to us."
          ]
        }
      ],
      packages: [
        {
          id: "essential",
          name: "Essential",
          subtitle: "Sovereign digital presence",
          icon: <Star className="w-10 h-10 text-[#00E5FF]" />,
          desc: "Ideal for startups and professionals. A basic digital ecosystem optimized for speed, premium design, and local SEO.",
          fullDesc: "The Essential package is not just a 'website'. It's the foundation of your new digital home. Built with the most advanced technologies, this ecosystem ensures your brand is immediately perceived as an industry leader.",
          points: [
            "Showcase Website or Landing Page (up to 5 pages)",
            "Ultra-fast and optimized Cyber-Luxury Design",
            "Enhanced local SEO and 100/100 Mobile Performance",
            "Intelligent contact forms",
            "SSL Certificate and 12 months of green hosting in Europe"
          ]
        },
        {
          id: "professional",
          name: "Professional",
          subtitle: "Your first digital employee",
          icon: <Zap className="w-10 h-10 text-[#E9C349]" />,
          popular: true,
          desc: "The ultimate business growth engine. AI works for you 24/7 booking appointments and generating qualified leads nonstop.",
          fullDesc: "Move to the level of true automation. In addition to including the entire Essential ecosystem, we implement Artificial Intelligence systems that work when you sleep.",
          points: [
            "Includes the entire Essential ecosystem",
            "Sogni Lead Hub (Mini-CRM)",
            "Always-active AI Chatbot",
            "Automated booking system",
            "Automatic lead generation and qualification"
          ]
        },
        {
          id: "custom",
          name: "Custom (Infinity)",
          subtitle: "Your proprietary business OS",
          icon: <Shield className="w-10 h-10 text-emerald-400" />,
          desc: "No limits. Complex platforms, e-commerce, or bespoke AI-based automations and custom business APIs.",
          fullDesc: "The pinnacle of digital innovation. Do you need a marketplace? An internal SaaS management software? A native App? Our Infinity package eliminates toxic third-party platforms.",
          points: [
            "Development of complex platforms or Native Apps",
            "Creation of high-level scalable E-commerce",
            "Complex API integrations and external tools",
            "Proprietary Systems and Databases",
            "Total replacement of expensive corporate SaaS"
          ]
        },
        {
          id: "care",
          name: "Sogni Care",
          subtitle: "Basic Security",
          icon: <Bot className="w-10 h-10 text-[#00f2fe]" />,
          desc: "Peace of mind for showcase sites. Keep your sovereign ecosystem updated, intact, and fluid.",
          fullDesc: "If Somnia tokens grow your site, Sogni Care protects what already exists. Hosting, domain, proactive security and monthly backups included.",
          points: [
            "Hosting & Domain included forever",
            "Proactive security updates against attacks",
            "Monthly cloud security backups",
            "Minor modifications included (30 min/mo)",
            "Basic downtime monitoring"
          ]
        },
        {
          id: "care-pro",
          name: "Sogni Care Pro",
          subtitle: "Performance & Growth",
          icon: <Shield className="w-10 h-10 text-orange-400" />,
          desc: "The copilot for growing companies. Guarantee a fast and safe site at all times.",
          fullDesc: "All basic advantages upgraded. Extreme speed thanks to a Global CDN, 24/7 monitoring, weekly backups for your customers' data and quarterly strategic audits.",
          points: [
            "Extreme speed (Premium CDN Hosting)",
            "24/7 monitoring and real-time alerts",
            "Weekly security backups",
            "Priority interventions included (1 hr/mo)",
            "Quarterly strategic SEO & performance audit"
          ]
        },
        {
          id: "somnia-token",
          name: "Somnia Token",
          subtitle: "The Fuel of Innovation",
          icon: <Coins className="w-10 h-10 text-purple-400" />,
          desc: "Our currency of competence. Total transparency, zero friction, and priority access for development.",
          fullDesc: "The Somnia is Sogni Digitali's exclusive value unit. 1 Somnia = 1 dedicated unit of competence. Zero waiting for quotes, just pure agile development.",
          points: [
            "Extreme agility with zero waiting",
            "100% transparent cost before starting",
            "Priority access to development teams",
            "Credits valid for 1 full year",
            "Modular scaling: Start, Agile, and Empire"
          ]
        }
      ]
    },
    FR: {
      tag: "L'Évolution de Votre Entreprise",
      title: "Nos",
      titleSpan: "Forfaits",
      subtitle: "Une analyse approfondie de chaque solution pour vous aider à choisir l'évolution parfaite pour votre entreprise.",
      quizTitle: "Vous ne savez pas lequel choisir ?",
      qStep: "Question",
      qOf: "sur",
      quizResult: "Le forfait idéal pour vous est :",
      quizResultSub: "Il couvre parfaitement vos objectifs commerciaux.",
      btnDiscover: "Découvrir tout le forfait",
      btnRepeat: "Refaire le test",
      popular: "Choix le Populaire",
      buyBtn: "Acheter / Voir les Prix",
      affBadge: "Gagner avec Nous",
      affTitle: "Programme d'Affiliation Élite.",
      affDesc: "Héraut du luxe numérique. Recommandez Sogni Digitali à vos amis et recevez de riches récompenses pour chaque Référence réussie.",
      affList1: "Taux de conversion élevé",
      affList2: "Gestion autonome et transparence",
      affList3: "Soutien promotionnel et passif",
      affBtn: "Devenir Affilié",
      questions: [
        {
          q: "Quel est votre principal objectif en ligne ?",
          options: [
            "Je veux juste un site vitrine professionnel.",
            "Je veux recevoir des réservations automatiquement.",
            "Je veux numériser des processus complexes."
          ]
        },
        {
          q: "Comment gérez-vous vos contacts aujourd'hui ?",
          options: [
            "Manuellement par email.",
            "Un logiciel pour organiser H24.",
            "Un logiciel ERP/CRM totalement adapté."
          ]
        }
      ],
      packages: [
        {
          id: "essential",
          name: "Essential",
          subtitle: "Présence numérique souveraine",
          icon: <Star className="w-10 h-10 text-[#00E5FF]" />,
          desc: "Idéal pour les startups. Un écosystème numérique optimisé pour la vitesse, le design premium et le SEO local.",
          fullDesc: "Le package Essential n'est pas qu'un 'site web', c'est la fondation de votre maison numérique.",
          points: ["Site Vitrine ou Landing Page", "Design ultra rapide et optimisé", "SEO local amélioré", "Formulaires intelligents", "Certificat SSL"]
        },
        {
          id: "professional",
          name: "Professional",
          subtitle: "Employé numérique",
          icon: <Zap className="w-10 h-10 text-[#E9C349]" />,
          popular: true,
          desc: "L'IA travaille pour vous 24/7 pour prendre des rendez-vous et générer des leads qualifiés.",
          fullDesc: "Passez au niveau de la véritable automatisation avec une IA intégrée à votre business.",
          points: ["Inclut Essential", "Sogni Lead Hub (Mini-CRM)", "Chatbot IA toujours actif", "Réservation automatisée", "Génération de leads"]
        },
        {
          id: "custom",
          name: "Custom (Infinity)",
          subtitle: "OS métier propriétaire",
          icon: <Shield className="w-10 h-10 text-emerald-400" />,
          desc: "Sans limites. Plateformes complexes, e-commerce, ou automatisations IA sur mesure.",
          fullDesc: "L'apogée de l'innovation numérique pour dominer le marché.",
          points: ["Plateformes PWA", "E-commerces évolutifs", "Intégrations API", "Systèmes sur mesure", "Remplacement SaaS"]
        },
        {
          id: "care",
          name: "Sogni Care",
          subtitle: "Sécurité de Base",
          icon: <Bot className="w-10 h-10 text-[#00f2fe]" />,
          desc: "Gardez votre écosystème souverain à jour, un abonnement éthique.",
          fullDesc: "Sogni Care protège ce qui existe déjà (Hosting, mises à jour, sauvegardes).",
          points: ["Hébergement & Domaine inclus", "Sécurité proactive", "Sauvegardes mensuelles", "Micro-modifications", "Suivi basique"]
        },
        {
          id: "care-pro",
          name: "Sogni Care Pro",
          subtitle: "Performance & Croissance",
          icon: <Shield className="w-10 h-10 text-orange-400" />,
          desc: "Le copilote de croissance avec vitesses extrêmes et audits.",
          fullDesc: "CDN Global, suivi H24, sauvegardes hebdomadaires et audits trimestriels.",
          points: ["Vitesse Extrême CDN", "Suivi H24", "Sauvegardes hebdo", "1h modifs / mois", "Audit SEO trimestriel"]
        },
        {
          id: "somnia-token",
          name: "Somnia Token",
          subtitle: "Carburant de l'innovation",
          icon: <Coins className="w-10 h-10 text-purple-400" />,
          desc: "Devise de compétence. Transparence, zéro friction.",
          fullDesc: "1 Somnia = 1 Unité de compétence. Développez rapidement et sans attente.",
          points: ["Zéro friction pour les devis", "Transparence 100%", "Accès direct à l'équipe", "Validité 1 an", "Super packs (Start, Agile..)"]
        }
      ]
    },
    AR: {
      tag: "تطور عملك",
      title: "باقاتنا",
      titleSpan: "الخاصة",
      subtitle: "تحليل متعمق لكل حل لمساعدتك في اختيار التطور المثالي لعملك.",
      quizTitle: "لست متأكداً مما تختار؟",
      qStep: "سؤال",
      qOf: "من",
      quizResult: "الباقة المثالية لك هي:",
      quizResultSub: "تغطي أهداف عملك بشكل مثالي.",
      btnDiscover: "اكتشف الباقة",
      btnRepeat: "أعد الاختبار",
      popular: "شعبية",
      buyBtn: "شراء / اكتشف الأسعار",
      affBadge: "اربح معنا",
      affTitle: "برنامج شركاء النخبة.",
      affDesc: "كسفير رقمي. أوصِ بـ Sogni Digitali واربح معنا.",
      affList1: "معدل تحويل مرتفع",
      affList2: "إدارة ذاتية",
      affList3: "دعم سلس",
      affBtn: "أصبح شريكاً",
      questions: [
        { q: "ما هو هدفك؟", options: ["موقع سريع", "أتمتة وحجوزات", "نظام معقد"] },
        { q: "إدارتك للعملاء؟", options: ["يدويا", "شات بوت وأتمتة", "ERP مخصص"] }
      ],
      packages: [
        {
          id: "essential",
          name: "Essential",
          subtitle: "الأساس",
          icon: <Star className="w-10 h-10 text-[#00E5FF]" />,
          desc: "حضور رقمي سيادي. مثال للشركات الناشئة.",
          fullDesc: "الأساس للمنزل الرقمي الفاخر مع سيو قوي.",
          points: ["صفحة هبوط", "سرعة", "تحسين محركات بحث", "نماذج ذكية", "SSL"]
        },
        {
          id: "professional",
          name: "Professional",
          subtitle: "موظفك الرقمي",
          icon: <Zap className="w-10 h-10 text-[#E9C349]" />,
          popular: true,
          desc: "يعمل الذكاء الاصطناعي من أجلك 24/7 لحجز المواعيد.",
          fullDesc: "كل ميزات الأتمتة.",
          points: ["يشمل الأساسي", "CRM مدمج", "شات بوت 24/7", "حجز ذكي", "جلب عملاء تلقائيا"]
        },
        {
          id: "custom",
          name: "Custom (Infinity)",
          subtitle: "تطبيقك المخصص",
          icon: <Shield className="w-10 h-10 text-emerald-400" />,
          desc: "لا حدود. منصات معقدة وأتمتة ذكية.",
          fullDesc: "إنفينيتي لإنشاء حلول معمارية لمن يود السيطرة على السوق.",
          points: ["تطبيقات معقدة", "تجارة إلكترونية", "دمج APIs", "قواعد متقدمة", "استبدال SaaS القديم"]
        },
        {
          id: "care",
          name: "Sogni Care",
          subtitle: "الحماية",
          icon: <Bot className="w-10 h-10 text-[#00f2fe]" />,
          desc: "حافظ على نظامك محدثًا باشتراك شهري.",
          fullDesc: "حماية، تحديثات وتعديلات طفيفة.",
          points: ["استضافة مؤمنة", "حماية من الهجمات", "نسخ احتياطية", "تعديل بسيط", "متابعة أداء"]
        },
        {
          id: "care-pro",
          name: "Sogni Care Pro",
          subtitle: "الأداء العالي",
          icon: <Shield className="w-10 h-10 text-orange-400" />,
          desc: "سرعة وأداء غير مسبوق.",
          fullDesc: "استضافة عالمية فائقة مع متابعة حثيثة.",
          points: ["استضافة فائقة (CDN)", "تنبيهات واستجابة", "نسخ أسبوعية", "أولوية دعم", "تقارير الـ SEO"]
        },
        {
          id: "somnia-token",
          name: "Somnia Token",
          subtitle: "رموز الابتكار",
          icon: <Coins className="w-10 h-10 text-purple-400" />,
          desc: "طريقتنا لاحتساب الوقت بشكل مرن ومربح.",
          fullDesc: "بدون الانتظار للتسعيرات، وقت تطوير مباشر.",
          points: ["أسرع تطوير", "شفافية مطلقة", "أولوية قصوى", "صلاحية لعام", "خطط متعددة"]
        }
      ]
    }
  };

  const packText = localizedContent[lang as keyof typeof localizedContent] || localizedContent['EN'];
  const packages = packText.packages;

  // Interactive Assessment Tool
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [recommendation, setRecommendation] = useState<string | null>(null);

  const questions = packText.questions;

  const handleAnswer = (index: number) => {
    const newAnswers = [...answers, index];
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Calculate
      const sum = newAnswers.reduce((a, b) => a + b, 0);
      if (sum < 2) setRecommendation("essential");
      else if (sum < 4) setRecommendation("professional");
      else setRecommendation("custom");
    }
  };

  const resetTool = () => {
    setStep(0);
    setAnswers([]);
    setRecommendation(null);
  };

  return (
    <div className={`pt-32 pb-20 px-6 max-w-7xl mx-auto space-y-24 text-${lang === 'AR' ? 'right' : 'left'}`} dir={lang === 'AR' ? 'rtl' : 'ltr'}>
      <SEO 
        title={`Pacchetti | Sogni Digitali`} 
        description="Scopri i pacchetti Sogni Digitali. Piani scalabili, soluzioni pronte ed ottimizzate per farti crescere nel digitale." 
      />
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 text-sm mb-6"
        >
          <SparklesIcon className="w-4 h-4 text-[#00E5FF]" />
          {packText.tag}
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-display font-bold mb-6"
        >
          {packText.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#00B4D8]">{packText.titleSpan}</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-slate-400"
        >
          {packText.subtitle}
        </motion.p>
      </section>

      {/* Main 3 Packages Stack Array */}
      <section className="space-y-16 lg:space-y-24">
        {packages.slice(0, 3).map((pkg, i) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
          >
            {/* Context/Description Side */}
            <div className={`flex-1 space-y-6 ${lang === 'AR' ? 'text-right' : 'text-left'}`}>
              {pkg.popular && (
                <div className="inline-block bg-gradient-to-r from-[#E9C349] to-[#F2D769] text-black text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-[0_0_15px_rgba(233,195,73,0.3)]">
                  {packText.popular}
                </div>
              )}
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight">
                {pkg.name}
              </h2>
              <p className="text-[#00E5FF] text-lg font-medium tracking-wide uppercase">
                {pkg.subtitle}
              </p>
              
              <div className={`w-16 h-1 bg-white/10 rounded-full ${lang === 'AR' ? 'ml-auto mr-0' : ''}`} />
              
              <p className="text-slate-300 text-lg leading-relaxed">
                {pkg.desc}
              </p>
              
              <p className="text-slate-400 leading-relaxed text-sm">
                {pkg.fullDesc}
              </p>
            </div>

            {/* Features/Card Side */}
            <div className="flex-1 w-full max-w-lg">
              <div className={`bg-white/[0.02] border p-8 rounded-3xl relative overflow-hidden flex flex-col ${pkg.popular ? 'border-[#E9C349]/50 shadow-[0_0_50px_rgba(233,195,73,0.1)]' : 'border-white/10'}`}>
                <div className={`absolute -top-32 -right-32 w-64 h-64 blur-[100px] rounded-full pointer-events-none opacity-20 ${pkg.popular ? 'bg-[#E9C349]' : 'bg-[#00E5FF]'}`} />
                
                <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 relative z-10 backdrop-blur-md ${lang === 'AR' ? 'mr-auto' : ''}`}>
                  {pkg.icon}
                </div>

                <ul className="space-y-4 mb-10 relative z-10 flex-1">
                  {pkg.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <div className={`w-6 h-6 mt-0.5 rounded-full flex items-center justify-center shrink-0 ${pkg.popular ? 'bg-[#E9C349]/20' : 'bg-[#00E5FF]/20'}`}>
                        <Check className={`w-3.5 h-3.5 ${pkg.popular ? 'text-[#E9C349]' : 'text-[#00E5FF]'}`} />
                      </div>
                      <span className="text-slate-200">{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto relative z-10">
                  <Link to={`/pricing#${pkg.id}`} className={`w-full py-4 text-center rounded-xl font-bold flex items-center justify-center gap-3 transition-all ${pkg.popular ? 'bg-gradient-to-r from-[#E9C349] to-[#F2D769] text-black hover:scale-105' : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'}`}>
                    {packText.buyBtn} <ArrowRight className={`w-5 h-5 ${lang === 'AR' ? 'mirror-icon' : ''}`} />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Interactive Questionnaire Tool */}
      <section className="relative my-32">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00E5FF]/10 to-[#E9C349]/10 blur-[100px] -z-10 rounded-full" />
        <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <HelpCircle className="w-64 h-64" />
          </div>
          
          <h2 className="text-2xl font-display font-bold mb-8">{packText.quizTitle}</h2>
          
          {!recommendation ? (
            <div className="max-w-2xl">
              <p className="text-[#00E5FF] font-medium tracking-widest text-sm mb-4 uppercase">{packText.qStep} {step + 1} {packText.qOf} {questions.length}</p>
              <h3 className="text-xl md:text-2xl text-white font-medium mb-6">{questions[step].q}</h3>
              <div className="space-y-3">
                {questions[step].options.map((opt, i) => (
                  <button 
                    key={i}
                    onClick={() => handleAnswer(i)}
                    className="w-full text-left p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-[#00E5FF]/50 transition-all font-medium text-slate-300 hover:text-white"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
             <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="max-w-2xl"
             >
               <p className="text-slate-400 mb-2">{packText.quizResult}</p>
               <h3 className="text-4xl font-display font-bold text-white mb-2 capitalize drop-shadow-[0_0_15px_rgba(0,229,255,0.4)]">
                 {recommendation}
               </h3>
               <p className="text-lg text-[#00E5FF] mb-8">{packText.quizResultSub}</p>
               
               <div className="flex flex-wrap gap-4">
                 <Link to="/pricing" className="btn-primary px-8 py-3 rounded-full font-semibold">{packText.btnDiscover}</Link>
                 <button onClick={resetTool} className="px-8 py-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white font-medium">{packText.btnRepeat}</button>
               </div>
             </motion.div>
          )}
        </div>
      </section>

      {/* Supplemental Packages Array (Care, Care Pro, Token Somnia) */}
      <section className="space-y-16 lg:space-y-24">
        {packages.slice(3).map((pkg, i) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center ${i % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}
          >
            {/* Context/Description Side */}
            <div className={`flex-1 space-y-6 ${lang === 'AR' ? 'text-right' : 'text-left'}`}>
              {pkg.popular && (
                <div className="inline-block bg-gradient-to-r from-[#E9C349] to-[#F2D769] text-black text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-[0_0_15px_rgba(233,195,73,0.3)]">
                  {packText.popular}
                </div>
              )}
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight">
                {pkg.name}
              </h2>
              <p className={`text-[#00E5FF] text-lg font-medium tracking-wide uppercase ${pkg.id === 'somnia-token' ? 'text-purple-400' : ''}`}>
                {pkg.subtitle}
              </p>
              
              <div className={`w-16 h-1 bg-white/10 rounded-full ${lang === 'AR' ? 'ml-auto mr-0' : ''}`} />
              
              <p className="text-slate-300 text-lg leading-relaxed">
                {pkg.desc}
              </p>
              
              <p className="text-slate-400 leading-relaxed text-sm">
                {pkg.fullDesc}
              </p>
            </div>

            {/* Features/Card Side */}
            <div className="flex-1 w-full max-w-lg">
              <div className={`bg-white/[0.02] border p-8 rounded-3xl relative overflow-hidden flex flex-col border-white/10`}>
                <div className={`absolute -top-32 -right-32 w-64 h-64 blur-[100px] rounded-full pointer-events-none opacity-10 bg-white`} />
                
                <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 relative z-10 backdrop-blur-md`}>
                  {pkg.icon}
                </div>

                <ul className="space-y-4 mb-10 relative z-10 flex-1">
                  {pkg.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <div className={`w-6 h-6 mt-0.5 rounded-full flex items-center justify-center shrink-0 bg-white/10`}>
                        <Check className={`w-3.5 h-3.5 text-white`} />
                      </div>
                      <span className="text-slate-200">{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto relative z-10">
                  <Link to={`/pricing#${pkg.id}`} className={`w-full py-4 text-center rounded-xl font-bold flex items-center justify-center gap-3 transition-all bg-white/5 text-white border border-white/10 hover:bg-white/10`}>
                    {packText.buyBtn} <ArrowRight className={`w-5 h-5 ${lang === 'AR' ? 'mirror-icon' : ''}`} />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Book Call CTA */}
      <section className="mt-24 text-center space-y-6">
        <h3 className="text-2xl font-display font-bold">
          {lang === 'IT' ? 'Non sei sicuro di quale scegliere?' : lang === 'FR' ? 'Pas sûr de votre choix ?' : 'Not sure about your choice?'}
        </h3>
        <p className="text-slate-400">
          {lang === 'IT' ? 'Parla con i nostri esperti per trovare la soluzione perfetta per te.' : lang === 'FR' ? 'Parlez à nos experts pour trouver la solution parfaite.' : 'Talk to our experts to find the perfect solution.'}
        </p>
        <Link to="/book" className={`inline-flex btn-epic px-8 py-4 font-semibold text-sm tracking-wider uppercase items-center gap-2 hover:scale-105 transition-transform ${lang === 'AR' ? 'flex-row-reverse' : ''}`}>
           <div className="shine-layer"></div>
           <span className="relative z-10">{lang === 'IT' ? 'Prenota una Chiamata' : lang === 'FR' ? 'Prenez rendez-vous' : 'Book a Call'}</span>
           <ArrowRight className={`w-5 h-5 relative z-10 ${lang === 'AR' ? 'mr-2 rotate-180' : 'ml-2'}`} />
        </Link>
      </section>

      {/* Affiliate Section */}
      <section className="bg-gradient-to-br from-[#00E5FF]/5 to-transparent border border-[#00E5FF]/20 rounded-3xl p-8 md:p-12 mt-24 flex flex-col md:flex-row items-center gap-12" style={{ direction: lang === 'AR' ? 'rtl' : 'ltr' }}>
        <div className={`flex-1 space-y-6 ${lang === 'AR' ? 'text-right' : 'text-left'}`}>
          <div className="inline-block px-3 py-1 rounded-full bg-[#E9C349]/20 text-[#E9C349] text-xs font-bold tracking-widest uppercase">
            {packText.affBadge}
          </div>
          <h2 className="text-3xl font-display font-bold text-white">{packText.affTitle}</h2>
          <p className="text-slate-400 leading-relaxed max-w-lg">
            {packText.affDesc}
          </p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-slate-300"><Check className={`w-4 h-4 text-[#00E5FF] ${lang === 'AR' ? 'ml-2' : 'mr-2'}`} /> {packText.affList1}</li>
            <li className="flex items-center gap-2 text-slate-300"><Check className={`w-4 h-4 text-[#00E5FF] ${lang === 'AR' ? 'ml-2' : 'mr-2'}`} /> {packText.affList2}</li>
            <li className="flex items-center gap-2 text-slate-300"><Check className={`w-4 h-4 text-[#00E5FF] ${lang === 'AR' ? 'ml-2' : 'mr-2'}`} /> {packText.affList3}</li>
          </ul>
        </div>
        <div className="w-full md:w-1/3">
          <Link to="/pricing#affiliate" className="block w-full py-4 rounded-xl bg-gradient-to-r from-[#E9C349] to-[#F2D769] text-black font-bold text-center uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_30px_rgba(233,195,73,0.3)]">
            {packText.affBtn}
          </Link>
        </div>
      </section>

    </div>
  );
}

function SparklesIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3v18" />
      <path d="M3 12h18" />
      <path d="m15.5 8.5-7 7" />
      <path d="m8.5 8.5 7 7" />
    </svg>
  );
}
