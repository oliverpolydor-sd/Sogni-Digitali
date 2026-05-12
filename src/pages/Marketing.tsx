import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Target, Sparkles, TrendingUp, BarChart, Users, ArrowRight, X, DollarSign, MousePointerClick, Zap, Smartphone, Link as LinkIcon, MapPin, MessageSquare, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import GhostTraffic from '../components/GhostTraffic';
import PhygitalSandbox from '../components/PhygitalSandbox';
import SEO from '../components/SEO';
import { 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis
} from 'recharts';

const chartData = [
  { month: 'M1', traditional: 1000, ai: 1200 },
  { month: 'M2', traditional: 1500, ai: 2800 },
  { month: 'M3', traditional: 2100, ai: 5400 },
  { month: 'M4', traditional: 2400, ai: 9800 },
  { month: 'M5', traditional: 2900, ai: 15000 },
  { month: 'M6', traditional: 3300, ai: 24000 },
];

const t = {
  EN: {
    heroTitle1: "Algorithmic ",
    heroTitle2: "Domination",
    heroDesc: "In 2026, mere presence is not enough. You need psychological precision, algorithmic advantage, and campaigns that resonate deeply with your audience.",
    gapTitle: "The AI Performance Gap",
    gapDesc: "Traditional marketing relies on static demographics and guesswork. Our AI-driven infrastructure continuously learns, perfectly mapping user intent to your offerings in real-time, resulting in exponential growth curves.",
    tradAgency: "Traditional Agency",
    tradGrowth: "Linear Growth",
    aiHub: "Sogni Digitali AI marketing boost",
    aiGrowth: "Exponential",
    standAgency: "Standard Agency",
    sogniAi: "Sogni AI",
    roiTitle: "Predictive ROI Engine",
    roiDesc: "Adjust your monthly ad spend to see our AI's predicted return on investment based on current market data models.",
    adSpend: "Monthly Ad Spend",
    estTraffic: "Est. Monthly Traffic",
    qualVis: "Qualified Visitors",
    newLeads: "New Leads",
    convRate: "+5% Conversion Rate",
    predRev: "Predicted Revenue",
    basedOn: "Based on average €50 LTV per acquired customer.",
    coreTitle: "Sovereign Marketing & Influence",
    coreDesc: "At Sogni Digitali, we merge the physical and digital worlds to transform every interaction into a growth opportunity. Our marketing is data-driven, reputation-centric, and 100% sovereign.",
    coreQuote: "\"We don't just seek to make you visible. We build the tools that make you essential, by making you the owner of every generated data point.\"",
    ctaTitle: "Ready to dominate your market?",
    ctaPack: "Discover Our Packages",
    ctaAud: "Book an Audit",
    packs: [
      {
        title: "Phygital Reputation Engineering (NFC & QR)",
        desc: "We capture value where it resides: in your establishment. We transform physical customers into instant digital ambassadors.",
        dropdowns: [
          { title: "Premium NFC Ecosystem", desc: "Design and deployment of smart physical supports (plates, cards, stands) enabling frictionless interaction." },
          { title: "Google Reviews Acceleration", desc: "Optimized systems to boost your social proof and climb trust rankings in record time." },
          { title: "Point-of-Sale Data Capture", desc: "Transforming a checkout or room visit into a qualified entry in your CRM." }
        ]
      },
      {
        title: "Sovereign Links Ecosystem",
        desc: "We free our clients from dependence on third-party platforms. Your digital identity must belong to you, from the first click to final conversion.",
        dropdowns: [
          { title: "Proprietary Linktree Alternative", desc: "Development of redirection hubs on your own domain name for maximum SEO authority." },
          { title: "Tracking Pixel Mastery", desc: "Integration of pixels (Meta, Google, LinkedIn) on private servers to recycle your audience without data loss." },
          { title: "Unified Branding", desc: "Every shared link reinforces your brand image, not a third-party provider's." }
        ]
      },
      {
        title: "Local SEO & Territorial Domination",
        desc: "We apply surgical precision so that you are the obvious answer to every local search, whether in Turin, Mauritius, or internationally.",
        dropdowns: [
          { title: "Google Business Profile Optimization", desc: "Advanced and strategic management to dominate Google's \"Local Pack\"." },
          { title: "Geo-Targeted Content Interlinking", desc: "Creation of satellite pages optimized for search intents specific to your catchment area." },
          { title: "Visibility Algorithms", desc: "Constant monitoring of search engine updates to maintain your leadership on strategic keywords." }
        ]
      },
      {
        title: "Automation & Retention Strategies",
        desc: "Marketing doesn't stop at the sale. We create self-sustaining customer lifecycles through your CRM's intelligence.",
        dropdowns: [
          { title: "Loyalty Workflows", desc: "Automatic triggering of campaigns (Email/SMS) based on real customer behavior (NFC scan, booking, purchase)." },
          { title: "Predictive Customer Intelligence", desc: "Analysis of data collected to identify top customers and anticipate their needs." },
          { title: "Sogni Retargeting", desc: "Smart recall strategies to transform a curious prospect into a loyal customer, without ad harassment." }
        ]
      }
    ]
  },
  IT: {
    heroTitle1: "Dominio ",
    heroTitle2: "Algoritmico",
    heroDesc: "Nel 2026, la mera presenza non basta. Hai bisogno di precisione psicologica, vantaggio algoritmico e campagne che risuonino profondamente con il tuo pubblico.",
    gapTitle: "Il Divario di Prestazioni dell'IA",
    gapDesc: "Il marketing tradizionale si affida a dati demografici statici. La nostra infrastruttura guidata dall'IA apprende continuamente, mappando perfettamente le intenzioni degli utenti per una crescita esponenziale.",
    tradAgency: "Agenzia Tradizionale",
    tradGrowth: "Crescita Lineare",
    aiHub: "Hub AI Sogni Digitali marketing boost",
    aiGrowth: "Esponenziale",
    standAgency: "Agenzia Standard",
    sogniAi: "Sogni IA",
    roiTitle: "Motore di ROI Predittivo",
    roiDesc: "Regola il budget pubblicitario mensile per vedere il ritorno sull'investimento previsto dalla nostra IA basato sui modelli di mercato attuali.",
    adSpend: "Spesa Pubblicitaria Mensile",
    estTraffic: "Traffico Mensile Stimato",
    qualVis: "Visitatori Qualificati",
    newLeads: "Nuovi Contatti",
    convRate: "+5% Tasso di Conversione",
    predRev: "Fatturato Previsto",
    basedOn: "Basato su un Customer LTV medio di 50 €.",
    coreTitle: "Marketing & Influenza Sovrana",
    coreDesc: "In Sogni Digitali uniamo il mondo fisico e digitale per trasformare ogni interazione in un'opportunità di crescita. Il nostro marketing è data-driven, centrato sulla reputazione e sovrano al 100%.",
    coreQuote: "\"Non cerchiamo solo di renderti visibile. Costruiamo gli strumenti che ti rendono indispensabile, rendendoti proprietario di ogni singolo dato generato.\"",
    ctaTitle: "Pronto a dominare il mercato?",
    ctaPack: "Scopri i Nostri Pacchetti",
    ctaAud: "Prenota un Audit",
    packs: [
      {
        title: "Ingegneria della Reputazione Figitale (NFC & QR)",
        desc: "Catturiamo il valore dove si trova: nel tuo locale. Trasformiamo i clienti fisici in ambasciatori digitali istantanei.",
        dropdowns: [
          { title: "Ecosistema NFC Premium", desc: "Progettazione e implementazione di supporti fisici intelligenti (targhe, card, espositori) per un'interazione senza attriti." },
          { title: "Accelerazione Recensioni Google", desc: "Sistemi ottimizzati per potenziare la riprova sociale e scalare le classifiche di fiducia a tempo di record." },
          { title: "Acquisizione Dati nel Punto Vendita", desc: "Trasformazione di un passaggio in cassa o visita in camera in un contatto qualificato nel CRM." }
        ]
      },
      {
        title: "Ecosistema Sovereign Links",
        desc: "Liberiamo i nostri clienti dalla dipendenza verso piattaforme di terze parti. La tua identità digitale deve appartenerti, dal primo clic alla conversione finale.",
        dropdowns: [
          { title: "Alternativa Proprietaria a Linktree", desc: "Sviluppo di hub di reindirizzamento sul tuo dominio per la massima autorità SEO." },
          { title: "Padronanza Tracking Pixel", desc: "Integrazione di pixel (Meta, Google, LinkedIn) su server privati per riciclare l'audience senza perdite di dati." },
          { title: "Branding Unificato", desc: "Ogni link condiviso rafforza l'immagine del tuo brand, non quella di un fornitore terzo." }
        ]
      },
      {
        title: "SEO Locale & Dominazione Territoriale",
        desc: "Applichiamo una precisione chirurgica affinché tu sia la risposta ovvia a ogni ricerca locale, che sia a Torino, Mauritius o a livello internazionale.",
        dropdowns: [
          { title: "Ottimizzazione Google Business Profile", desc: "Gestione avanzata e strategica per dominare il \"Local Pack\" di Google." },
          { title: "Intreccio Contenuti Geo-Targettizzati", desc: "Creazione di pagine satellite ottimizzate per intenti di ricerca specifici della tua zona." },
          { title: "Algoritmi di Visibilità", desc: "Monitoraggio costante degli aggiornamenti dei motori di ricerca per mantenere la leadership sulle keyword strategiche." }
        ]
      },
      {
        title: "Automazioni & Strategie di Ritenzione",
        desc: "Il marketing non si ferma alla vendita. Creiamo cicli di vita cliente auto-alimentati grazie all'intelligenza del tuo CRM.",
        dropdowns: [
          { title: "Workflow di Fidelizzazione", desc: "Attivazione automatica di campagne (Email/SMS) basate sul comportamento reale (scansione NFC, prenotazione, acquisto)." },
          { title: "Intelligenza Cliente Predittiva", desc: "Analisi dei dati per identificare i migliori clienti e anticiparne le esigenze." },
          { title: "Retargeting Sogni", desc: "Strategie intelligenti per trasformare un prospect in cliente fedele, senza stressarlo con la pubblicità." }
        ]
      }
    ]
  },
  FR: {
    heroTitle1: "Domination ",
    heroTitle2: "Algorithmique",
    heroDesc: "En 2026, la simple présence ne suffit plus. Vous avez besoin d'une précision psychologique, d'un avantage algorithmique et de campagnes percutantes.",
    gapTitle: "Le fossé de la performance IA",
    gapDesc: "Le marketing traditionnel repose sur l'intuition. Notre infrastructure IA apprend en permanence, alignant parfaitement l'intention de l'utilisateur sur vos offres.",
    tradAgency: "Agence Traditionnelle",
    tradGrowth: "Croissance Linéaire",
    aiHub: "Sogni Digitali AI marketing boost",
    aiGrowth: "Exponentiel",
    standAgency: "Agence Standard",
    sogniAi: "Sogni IA",
    roiTitle: "Moteur de ROI Prédictif",
    roiDesc: "Ajustez vos dépenses publicitaires mensuelles pour voir le retour sur investissement prévu par notre IA.",
    adSpend: "Dépenses publicitaires (mois)",
    estTraffic: "Trafic Mensuel Estimé",
    qualVis: "Visiteurs Qualifiés",
    newLeads: "Nouveaux Contacts",
    convRate: "+5% Taux de Conversion",
    predRev: "Revenus Prévus",
    basedOn: "Basé sur une valeur à vie (LTV) moyenne de 50 €.",
    coreTitle: "Marketing & Influence Souveraine",
    coreDesc: "Chez Sogni Digitali, nous fusionnons le monde physique et le monde numérique pour transformer chaque interaction en une opportunité de croissance. Notre marketing est data-driven, centré sur la réputation et 100% souverain.",
    coreQuote: "\"Nous ne cherchons pas seulement à vous rendre visible. Nous bâtissons les outils qui vous rendent incontournable, en vous rendant propriétaire de chaque donnée générée.\"",
    ctaTitle: "Prêt à dominer votre marché ?",
    ctaPack: "Découvrir Nos Forfaits",
    ctaAud: "Réserver un Audit",
    packs: [
      {
        title: "Ingénierie de Réputation Phygitale (NFC & QR)",
        desc: "Nous captons la valeur là où elle se trouve : dans votre établissement. Nous transformons vos clients physiques en ambassadeurs digitaux instantanés.",
        dropdowns: [
          { title: "Écosystème NFC Premium", desc: "Conception et déploiement de supports physiques intelligents (plaques, cartes, socles) permettant une interaction sans friction." },
          { title: "Accélération d'Avis Google", desc: "Systèmes optimisés pour booster votre preuve sociale et grimper dans les classements de confiance en un temps record." },
          { title: "Capture de Data en Lieu de Vente", desc: "Transformation d'un passage en caisse ou d'une visite en chambre en une entrée qualifiée dans votre CRM." }
        ]
      },
      {
        title: "Écosystème de Liens Souverains (Sovereign Links)",
        desc: "Nous libérons nos clients de la dépendance aux plateformes tierces. Votre identité numérique doit vous appartenir, du premier clic à la conversion finale.",
        dropdowns: [
          { title: "Alternative Linktree Propriétaire", desc: "Développement de hubs de redirection sur votre propre nom de domaine pour une autorité SEO maximale." },
          { title: "Maîtrise du Tracking Pixel", desc: "Intégration de pixels (Meta, Google, LinkedIn) sur des serveurs privés pour recycler votre audience sans perte de données." },
          { title: "Branding Unifié", desc: "Chaque lien partagé renforce votre image de marque, pas celle d'un prestataire tiers." }
        ]
      },
      {
        title: "SEO Local & Domination Territoriale",
        desc: "Nous appliquons une précision chirurgicale pour que vous soyez la réponse évidente à chaque recherche locale, que ce soit à Turin, à Maurice ou à l'international.",
        dropdowns: [
          { title: "Optimisation Google Business Profile", desc: "Gestion avancée et stratégique pour dominer le \"Local Pack\" de Google." },
          { title: "Maillage de Contenu Géo-Ciblé", desc: "Création de pages satellites optimisées pour les intentions de recherche spécifiques à votre zone de chalandise." },
          { title: "Algorithmes de Visibilité", desc: "Veille constante sur les mises à jour des moteurs de recherche pour maintenir votre position de leader sur vos mots-clés stratégiques." }
        ]
      },
      {
        title: "Stratégies d'Automatisation & Rétention (CRM Marketing)",
        desc: "Le marketing ne s'arrête pas à la vente. Nous créons des cycles de vie clients qui s'auto-alimentent grâce à l'intelligence de votre CRM.",
        dropdowns: [
          { title: "Workflows de Fidélisation", desc: "Déclenchement automatique de campagnes (Email/SMS) basées sur le comportement réel du client (scan NFC, réservation, achat)." },
          { title: "Intelligence Client Prédictive", desc: "Analyse des données collectées via Google Sheets pour identifier vos meilleurs clients et anticiper leurs besoins." },
          { title: "Sogni Retargeting", desc: "Stratégies de rappel intelligentes pour transformer un prospect curieux en un client fidèle, sans harcèlement publicitaire." }
        ]
      }
    ]
  },
  AR: {
    heroTitle1: "السيطرة ",
    heroTitle2: "الخوارزمية",
    heroDesc: "في عام 2026، مجرد الوجود لم يعد كافياً. أنت بحاجة إلى دقة نفسية، وميزة خوارزمية، وحملات تتردد صداها بعمق مع جمهورك.",
    gapTitle: "فجوة أداء الذكاء الاصطناعي",
    gapDesc: "يعتمد التسويق التقليدي على الديموغرافيات الثابتة والتخمين. تتعلم بنية الذكاء الاصطناعي لدينا باستمرار، وتخطط نية المستخدم بدقة لزيادة النمو الأسي.",
    tradAgency: "الوكالة التقليدية",
    tradGrowth: "نمو خطي",
    aiHub: "تعزيز التسويق بالذكاء الاصطناعي من سوني",
    aiGrowth: "أسي",
    standAgency: "الوكالة القياسية",
    sogniAi: "سوني للذكاء الاصطناعي",
    roiTitle: "محرك العائد على الاستثمار المتوقع",
    roiDesc: "اضبط إنفاقك الإعلاني الشهري لرؤية عائد الاستثمار المتوقع للذكاء الاصطناعي بناءً على نماذج السوق الحالية.",
    adSpend: "الإنفاق الإعلاني الشهري",
    estTraffic: "الزيارات الشهرية المقدرة",
    qualVis: "زوار مؤهلون",
    newLeads: "عملاء محتملون جدد",
    convRate: "+5% معدل التحويل",
    predRev: "الإيرادات المتوقعة",
    basedOn: "بناءً على متوسط 50 يورو للعميل.",
    coreTitle: "التسويق والنفوذ السيادي",
    coreDesc: "في سوني ديجيتالي، ندمج العوالم المادية والرقمية لتحويل كل تفاعل إلى فرصة نمو. تسويقنا يعتمد على البيانات، ويركز على السمعة، وسيادي بنسبة 100%.",
    coreQuote: "\"نحن لا نسعى فقط لجعلك مرئياً. نحن نبني الأدوات التي تجعلك أساسياً، من خلال جعلك المالك لكل نقطة بيانات يتم إنشاؤها.\"",
    ctaTitle: "هل أنت مستعد للسيطرة على سوقك؟",
    ctaPack: "اكتشف باقاتنا",
    ctaAud: "احجز تدقيق أداء",
    packs: [
      {
        title: "هندسة السمعة الرقمية (NFC و QR)",
        desc: "نلتقط القيمة حيث توجد: في مؤسستك. نحول العملاء الفعليين إلى سفراء رقميين فوريين.",
        dropdowns: [
          { title: "نظام NFC المتميز", desc: "تصميم وتنفيذ دعامات مادية ذكية (لوحات، بطاقات، حوامل) تتيح تفاعلاً خالياً من الاحتكاك." },
          { title: "تسريع مراجعات Google", desc: "أنظمة محسنة لتعزيز دليلك الاجتماعي وتسلق تصنيفات الثقة في وقت قياسي." },
          { title: "التقاط بيانات نقطة البيع", desc: "تحويل عملية الدفع أو زيارة الغرفة إلى إدخال مؤهل في نظام إدارة علاقات العملاء الخاص بك." }
        ]
      },
      {
        title: "نظام الروابط السيادية البيئي",
        desc: "نحرر عملائنا من الاعتماد على منصات الطرف الثالث. يجب أن تنتمي هويتك الرقمية إليك، من النقرة الأولى إلى التحويل النهائي.",
        dropdowns: [
          { title: "بديل Linktree المملوك", desc: "تطوير مراكز إعادة التوجيه على اسم المجال الخاص بك للحصول على أقصى سلطة لتحسين محركات البحث." },
          { title: "إتقان بكسل التتبع", desc: "دمج البكسل (Meta، Google، LinkedIn) على خوادم خاصة لإعادة تدوير جمهورك دون فقدان البيانات." },
          { title: "علامة تجارية موحدة", desc: "يعزز كل رابط تمت مشاركته صورة علامتك التجارية، وليس صورة مزود طرف ثالث." }
        ]
      },
      {
        title: "محسّن محركات البحث المحلي والسيطرة الإقليمية",
        desc: "نطبق دقة جراحية بحيث تكون الإجابة الواضحة لكل بحث محلي، سواء في تورينو أو موريشيوس أو دولياً.",
        dropdowns: [
          { title: "تحسين ملف تعريف أعمال Google", desc: "إدارة متقدمة واستراتيجية للسيطرة على \"الحزمة المحلية\" من Google." },
          { title: "الترابط الداخلي للمحتوى المستهدف جغرافياً", desc: "إنشاء صفحات قمر صناعي محسنة لنوايا البحث الخاصة بمنطقة التجمع الخاصة بك." },
          { title: "خوارزميات الرؤية", desc: "مراقبة مستمرة لتحديثات محرك البحث للحفاظ على ريادتك على الكلمات الرئيسية الاستراتيجية." }
        ]
      },
      {
        title: "استراتيجيات الأتمتة والاحتفاظ",
        desc: "التسويق لا يتوقف عند البيع. نقوم بإنشاء دورات حياة عملاء ذاتية الاستدامة من خلال ذكاء نظام إدارة علاقات العملاء الخاص بك.",
        dropdowns: [
          { title: "سير عمل الولاء", desc: "التشغيل التلقائي للحملات (البريد الإلكتروني / الرسائل القصيرة) بناءً على سلوك العميل الحقيقي (مسح NFC ، الحجز ، الشراء)." },
          { title: "ذكاء العملاء التنبؤي", desc: "تحليل البيانات التي تم جمعها عبر جداول بيانات Google لتحديد كبار عملائك وتوقع احتياجاتهم." },
          { title: "سوني لإعادة الاستهداف", desc: "استراتيجيات استدعاء ذكية لتحويل احتمال فضولي إلى عميل مخلص، دون مضايقات إعلانية." }
        ]
      }
    ]
  }
};

const packImages = [
  "/regenerated_image_1777389747175.png",
  "/regenerated_image_1777389745857.png",
  "/regenerated_image_1777389611424.png",
  "/regenerated_image_1777389612335.png"
];

const packStyles = [
  { borderColor: "border-[#00E5FF]/20", iconBg: "bg-[#00E5FF]/10", textHighlight: "text-[#00E5FF]", icon: <Smartphone className="w-8 h-8 text-[#00E5FF]" /> },
  { borderColor: "border-[#E9C349]/20", iconBg: "bg-[#E9C349]/10", textHighlight: "text-[#E9C349]", icon: <LinkIcon className="w-8 h-8 text-[#E9C349]" /> },
  { borderColor: "border-orange-400/20", iconBg: "bg-orange-400/10", textHighlight: "text-orange-400", icon: <MapPin className="w-8 h-8 text-orange-400" /> },
  { borderColor: "border-emerald-400/20", iconBg: "bg-emerald-400/10", textHighlight: "text-emerald-400", icon: <MessageSquare className="w-8 h-8 text-emerald-400" /> }
];

const PackSection = ({ pack, index, isArabic, image, style }: any) => {
  const [openIndex, setOpenIndex] = useState(0);
  const isEven = index % 2 === 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center mb-32`}
    >
      <div className="w-full lg:w-1/2 flex flex-col justify-center">
        <div className="flex items-center gap-4 mb-8" dir={isArabic ? 'rtl' : 'ltr'}>
           <div className={`w-14 h-14 rounded-xl ${style.iconBg} border ${style.borderColor} flex items-center justify-center shrink-0`}>
              {style.icon}
           </div>
           <h3 className="text-2xl md:text-4xl font-display font-bold text-white leading-tight drop-shadow-md">{pack.title}</h3>
        </div>
        <div className={`relative rounded-3xl overflow-hidden aspect-[4/3] group border ${style.borderColor}`}>
          <img src={image} alt={pack.title} className="w-full h-full object-cover opacity-80 mix-blend-screen transition-transform duration-700 group-hover:scale-105" />
        </div>
      </div>
      <div className="w-full lg:w-1/2 space-y-8" dir={isArabic ? 'rtl' : 'ltr'}>
        <p className="text-xl text-slate-200 font-medium leading-relaxed drop-shadow-sm">{pack.desc}</p>
        <div className="space-y-4">
          {pack.dropdowns.map((drop: any, idx: number) => (
             <div key={idx} className={`border border-white/10 rounded-2xl overflow-hidden transition-all ${openIndex === idx ? 'bg-white/5' : 'hover:bg-white/5'}`}>
                <button 
                  onClick={() => setOpenIndex(idx === openIndex ? -1 : idx)} 
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className={`font-bold text-lg ${openIndex === idx ? style.textHighlight : 'text-slate-200'} transition-colors`}>{drop.title}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-white/5 border border-white/10 shrink-0 transition-transform duration-300 ${openIndex === idx ? (isArabic ? 'rotate-180' : 'rotate-180') : ''}`}>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </div>
                </button>
                <AnimatePresence>
                  {openIndex === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }} 
                      animate={{ height: 'auto', opacity: 1 }} 
                      exit={{ height: 0, opacity: 0 }} 
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-slate-400 font-light text-base leading-relaxed border-t border-white/5 pt-4 mt-2">
                        {drop.desc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};


export default function MarketingPage({ lang }: { lang: string }) {
  const currentLang = (['EN', 'IT', 'FR', 'AR'].includes(lang) ? lang : 'EN') as keyof typeof t;
  const content = t[currentLang];

  const [budget, setBudget] = useState(1000);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 1 }
  };

  const trafficEstimate = Math.floor(budget * 4.2);
  const leadEstimate = Math.floor((trafficEstimate * 0.05));
  const revenueEstimate = Math.floor(leadEstimate * 50);
  const isArabic = lang === 'AR';

  return (
    <div className={`pt-32 pb-20 px-6 max-w-7xl mx-auto relative z-10 overflow-hidden ${isArabic ? 'text-right' : 'text-left'}`}>
      <SEO 
        title={`Marketing Digitale e AI | Sogni Digitali`} 
        description="Fai crescere il tuo business con le strategie di Marketing Digitale e Intelligenza Artificiale offerte da Sogni Digitali. ROI Predittivo ed Automazione." 
      />
      <motion.div {...fadeIn} className="text-center mb-24">
        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter mb-6 relative inline-block">
          {content.heroTitle1} <span className="text-gradient">{content.heroTitle2}</span>
        </h1>
        <p className="text-xl text-slate-400 font-light max-w-3xl mx-auto leading-relaxed">
          {content.heroDesc}
        </p>
      </motion.div>

      {/* 1. Motore di ROI Predittivo */}
      <motion.section {...fadeIn} className="mb-32">
        <div className="bg-gradient-to-r from-[#E9C349]/10 to-transparent border border-[#E9C349]/20 rounded-[3rem] p-8 md:p-16" dir={isArabic ? 'rtl' : 'ltr'}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">{content.roiTitle}</h2>
            <p className="text-slate-400 font-light max-w-2xl mx-auto">{content.roiDesc}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex justify-between items-end mb-4">
                <span className="text-sm font-semibold tracking-widest uppercase text-slate-400">{content.adSpend}</span>
                <span className="text-3xl font-display font-bold text-[#E9C349]" dir="ltr">€ {budget.toLocaleString()}</span>
              </div>
              <input type="range" min="100" max="5000" step="100" value={budget} onChange={(e) => setBudget(Number(e.target.value))} className={`w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#E9C349] ${isArabic ? 'rotate-180' : ''}`} />
              <div className={`flex justify-between mt-2 text-xs text-slate-500 font-mono ${isArabic ? 'flex-row-reverse' : ''}`} dir="ltr">
                <span>€100</span>
                <span>€5k+</span>
              </div>
              <div className={`mt-12 flex justify-start`}>
                <Link to="/book" className="px-8 py-4 rounded-xl font-bold text-sm tracking-wider uppercase bg-[#E9C349]/10 hover:bg-[#E9C349]/20 border border-[#E9C349]/30 text-[#E9C349] transition-all flex items-center gap-3">
                  <span className={`flex items-center gap-3`}>
                     {content.ctaAud}
                     <ArrowRight className={`w-4 h-4 ${isArabic ? 'mirror-icon' : ''}`} />
                  </span>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-white/5 relative overflow-hidden">
                <div className={`absolute top-0 p-4 opacity-10 ${isArabic ? 'left-0' : 'right-0'}`}><MousePointerClick className="w-12 h-12 text-white" /></div>
                <div className="text-sm font-semibold tracking-widest uppercase text-slate-500 mb-2">{content.estTraffic}</div>
                <div className="text-3xl font-display font-bold text-white">{trafficEstimate.toLocaleString()}</div>
                <div className="text-xs text-[#E9C349] mt-2 font-mono flex items-center gap-1"><Sparkles className="w-3 h-3"/> {content.qualVis}</div>
              </div>

              <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-white/5 relative overflow-hidden">
                <div className={`absolute top-0 p-4 opacity-10 ${isArabic ? 'left-0' : 'right-0'}`}><Target className="w-12 h-12 text-white" /></div>
                <div className="text-sm font-semibold tracking-widest uppercase text-slate-500 mb-2">{content.newLeads}</div>
                <div className="text-3xl font-display font-bold text-white">{leadEstimate.toLocaleString()}</div>
                <div className="text-xs text-[#00E5FF] mt-2 font-mono flex items-center gap-1"><Sparkles className="w-3 h-3"/> {content.convRate}</div>
              </div>

              <div className="bg-gradient-to-br from-[#E9C349]/20 to-transparent backdrop-blur-md rounded-2xl p-6 border border-[#E9C349]/30 sm:col-span-2 relative overflow-hidden">
                <div className={`absolute top-0 p-6 opacity-20 ${isArabic ? 'left-0' : 'right-0'}`}><DollarSign className="w-16 h-16 text-[#E9C349]" /></div>
                <div className="text-sm font-semibold tracking-widest uppercase text-[#E9C349] mb-2">{content.predRev}</div>
                <div className="text-4xl md:text-5xl font-display font-bold text-white mb-2" dir="ltr" style={{textAlign: isArabic ? 'right' : 'left'}}>€ {revenueEstimate.toLocaleString()}</div>
                <div className="text-sm text-slate-400 font-light">{content.basedOn}</div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 2. Marketing Packs Section (New Layout) */}
      <section className="mb-32">
        {content.packs.map((pack: any, index: number) => (
          <PackSection 
            key={index} 
            pack={pack} 
            index={index} 
            isArabic={isArabic}
            image={packImages[index]}
            style={packStyles[index]}
          />
        ))}
      </section>

      {/* 3. Core Competencies (Sovereign Marketing & Influence) */}
      <motion.section {...fadeIn} className="mb-32">
        <div className="glass-panel p-10 md:p-16 rounded-[3rem] border border-white/10 relative overflow-hidden h-full text-center" dir={isArabic ? 'rtl' : 'ltr'}>
          <div className={`absolute top-0 w-96 h-96 bg-[#00E5FF]/5 rounded-full blur-3xl -ml-48 left-1/2 -translate-x-1/2 -z-10`} />
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-white">{content.coreTitle}</h2>
          <p className="text-white bg-clip-text text-xl md:text-2xl font-light mb-8 max-w-4xl mx-auto">{content.coreDesc}</p>
          
          <div className="max-w-4xl mx-auto text-center border-t border-white/10 pt-10 mt-10">
            <div className="inline-block p-6 bg-white/5 rounded-2xl border border-white/10 shadow-lg relative">
              <Sparkles className="w-6 h-6 text-[#E9C349] absolute -top-3 -right-3" />
              <p className="text-slate-300 font-medium text-lg md:text-xl italic">
                {content.coreQuote}
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 4. AI Performance Gap */}
      <motion.section {...fadeIn} className="mb-32">
        <div className="glass-panel p-8 md:p-12 rounded-[3rem] border border-white/10 relative overflow-hidden" dir={isArabic ? 'rtl' : 'ltr'}>
          <div className={`absolute top-0 w-96 h-96 bg-[#00E5FF]/10 rounded-full blur-[100px] -z-10 ${isArabic ? 'left-1/4' : 'right-1/4'}`} />
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">{content.gapTitle}</h2>
              <p className="text-slate-400 font-light text-lg mb-8 leading-relaxed">
                {content.gapDesc}
              </p>
              
              <div className="space-y-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-mono text-slate-400 uppercase tracking-widest">{content.tradAgency}</span>
                    <span className="text-sm font-semibold text-white">{content.tradGrowth}</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="bg-slate-500 w-1/3 h-full rounded-full" />
                  </div>
                </div>

                <div className="bg-[#00E5FF]/10 border border-[#00E5FF]/30 rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00E5FF]/10 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]" />
                  <div className="flex items-center justify-between mb-2 relative z-10">
                    <span className="text-sm font-mono text-[#00E5FF] uppercase tracking-widest">{content.aiHub}</span>
                    <span className="text-sm font-bold text-[#00E5FF] flex items-center gap-1"><Zap className="w-4 h-4"/> {content.aiGrowth}</span>
                  </div>
                  <div className="w-full bg-[#00E5FF]/20 h-2 rounded-full overflow-hidden relative z-10">
                    <motion.div initial={{ width: "33%" }} whileInView={{ width: "95%" }} transition={{ duration: 1.5, ease: "easeOut" }} className="bg-[#00E5FF] h-full rounded-full shadow-[0_0_10px_#00E5FF]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="h-[400px] w-full" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorAi" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#00E5FF" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorTrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `€${val/1000}k`} />
                  <RechartsTooltip contentStyle={{ backgroundColor: '#0B1120', borderColor: '#ffffff20', borderRadius: '12px' }} itemStyle={{ color: '#fff' }} />
                  <Area type="monotone" dataKey="traditional" stroke="#94a3b8" fillOpacity={1} fill="url(#colorTrad)" name={content.standAgency} />
                  <Area type="monotone" dataKey="ai" stroke="#00E5FF" fillOpacity={1} fill="url(#colorAi)" name={content.sogniAi} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 5. CTA Section */}
      <motion.div {...fadeIn} className="text-center mb-16 mt-24">
        <h2 className="text-3xl font-display font-bold mb-8">{content.ctaTitle}</h2>
        <div className={`flex flex-wrap items-center justify-center gap-6 ${isArabic ? 'flex-row-reverse' : ''}`}>
          <Link to="/pricing" className={`btn-epic px-8 py-4 font-semibold text-sm tracking-wider uppercase flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <div className="shine-layer"></div>
            <span className="relative z-10">{content.ctaPack}</span>
            {isArabic ? <ArrowRight className="w-5 h-5 mr-2 relative z-10" style={{transform:"rotate(180deg)"}} /> : <ArrowRight className="w-5 h-5 ml-2 relative z-10" />}
          </Link>
          <Link to="/book" className={`px-8 py-4 rounded-xl border border-[#E9C349]/50 text-[#E9C349] font-semibold text-sm tracking-wider uppercase hover:bg-[#E9C349]/10 transition-colors flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
            {content.ctaAud}
            <Sparkles className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
