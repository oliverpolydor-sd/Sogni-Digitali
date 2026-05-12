import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Smartphone, Code, Cpu, Palette, LineChart, Globe, Zap, ArrowRight, X, Sparkles, Search, CheckCircle, AlertCircle, Building, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const t = {
  EN: {
    badge: "The Sogni Standard",
    title1: "Architects of the ",
    title2: "Digital Elite",
    subtitle: "More than code. We engineer psychological experiences, data-driven revenue engines, and aesthetic masterpieces.",
    dpTitle1: "Invisible forces.",
    dpTitle2: "Tangible profits.",
    dpDesc: "A premium digital presence is no longer a luxury; it's the definitive barrier to entry. Every second a prospect interacts with your brand online is a psychological negotiation. We shape that reality.",
    dpAuth: "Authority at first glance.",
    dpAuthSub: "75% of users judge a company's credibility based entirely on their website design within 50 milliseconds.",
    dpAlg: "Unfair algorithmic advantage.",
    dpAlgSub: "By perfectly structuring speed, accessibility, and AI metadata, we tell Google exactly who you are.",
    domTitle: "Secure Your Empire",
    domSub: "Check global namespace availability in real-time. Don't let your competitors take your name.",
    domBtnEmpty: "Initialize Vector Scan",
    domBtnCheck: "Checking...",
    domFree: "🎁 First year domain registration is on us",
    domAvailable: "is Available",
    domTaken: "is Taken",
    domAvailDesc: "This premium domain is available for registration. Secure it immediately via our platform.",
    domTakenDesc: "This domain is currently occupied. Need an alternative? Our AI can generate available premium variants.",
    domBtnAcquire: "Acquire this domain",
    gdprTitle: "Global Compliance & Privacy",
    gdprDesc: "Data privacy is a fundamental human right. In a landscape of GDPR, CCPA, and evolving regulations, your digital infrastructure must be untouchable. We build natively compliant systems that respect user privacy and protect your brand from devastating legal liabilities.",
    gdpr1Title: "GDPR & CCPA Native",
    gdpr1Desc: "Cookie-less tracking options, clear consent flows, and transparent data architecture built securely from the ground up.",
    gdpr2Title: "Zero-Trust Architecture",
    gdpr2Desc: "We implement advanced encryption and zero-trust data strategies, ensuring that user data is structurally isolated and impenetrable.",
    sovTitle: "Digital Sovereignty: Own, Don't Rent",
    sovDesc: "Building on SaaS platforms like Shopify or Wix is like renting an apartment in a building you don't own. The landlord can raise the rent, change the rules, or kick you out at any time. We build proprietary digital real estate.",
    sov1Title: "No Toxic Subscriptions",
    sov1Desc: "Stop paying monthly percentages of your own revenue. Once we build your system, you own the code, the data, and the infrastructure.",
    sov2Title: "Absolute Control",
    sov2Desc: "You dictate the rules. No platform restrictions, no sudden algorithm changes killing your business overnight.",
    coreTitle: "Core Infrastructure",
    coreSub: "The foundational pillars of the Sogni Digitali ecosystem.",
    partners: "Powered by the absolute best",
    ctaTitle: "Ready to start your digital evolution?",
    ctaBtn: "Book a Technical Consultation",
    visionTitle: "Our Vision",
    visionSub: "We don't just build software; we engineer digital dominion.",
    visionDesc: "Sogni Digitali was founded on a simple premise: in the modern economy, your digital presence is your primary asset. We believe in crafting bespoke, high-performance systems that don't just exist, but actively dominate their market. Our mission is to transform premium brands into untouchable digital entities through uncompromising code, sovereign data architecture, and deep psychological design.",
    wcuTitle: "Why Choose Sogni Digitali?",
    wcu1: "Total Sovereignty",
    wcu1Desc: "You own the code and infrastructure. No toxic vendor lock-ins.",
    wcu2: "Uncompromising Quality",
    wcu2Desc: "We build tailored solutions that perform flawlessly under pressure.",
    wcu3: "Security & Compliance",
    wcu3Desc: "Built-in GDPR and zero-trust architectures from day one.",
    svc1Title: "Luxury Web Development",
    svc1Desc: "Bespoke, high-performance websites engineered for premium brands.",
    svc2Title: "Premium E-Commerce",
    svc2Desc: "Scalable, conversion-optimized online flagships with custom checkout flows.",
    svc3Title: "App Development",
    svc3Desc: "Native and cross-platform mobile architecture built for the modern consumer.",
    svc4Title: "Custom CRM Ecosystems",
    svc4Desc: "Tailored management systems that automate revenue and client workflows.",
    svc5Title: "Booking & Reservation Engines",
    svc5Desc: "Advanced reservation systems with automated payments and smart scheduling.",
    svc6Title: "Scalable Infrastructure",
    svc6Desc: "Enterprise-grade hosting, APIs, and zero-trust security."
  },
  IT: {
    badge: "Lo Standard Sogni",
    title1: "Architetti dell'",
    title2: "Elite Digitale",
    subtitle: "Più che codice. Progettiamo esperienze psicologiche, motori di guadagno basati sui dati e capolavori estetici.",
    dpTitle1: "Forze invisibili.",
    dpTitle2: "Profitti tangibili.",
    dpDesc: "Una presenza digitale premium non è più un lusso; è la barriera d'ingresso definitiva. Ogni secondo che un potenziale cliente interagisce con il tuo brand è una negoziazione psicologica.",
    dpAuth: "Autorità a prima vista.",
    dpAuthSub: "Il 75% degli utenti giudica la credibilità di un'azienda basandosi sul web design in 50 millisecondi.",
    dpAlg: "Vantaggio algoritmico sleale.",
    dpAlgSub: "Strutturando perfettamente velocità, accessibilità e metadati IA, diciamo a Google esattamente chi sei.",
    domTitle: "Proteggi il tuo Impero",
    domSub: "Verifica la disponibilità dei domini in tempo reale. Non lasciare che i competitor rubino il tuo nome.",
    domBtnEmpty: "Inizializza Scansione Vettoriale",
    domBtnCheck: "Verifica in corso...",
    domFree: "🎁 Il primo anno di dominio te lo regaliamo noi",
    domAvailable: "è Disponibile",
    domTaken: "è Occupato",
    domAvailDesc: "Questo dominio premium è disponibile. Assicuratelo immediatamente tramite la nostra piattaforma.",
    domTakenDesc: "Questo dominio è occupato. Serve un'alternativa? La nostra IA può generare varianti premium disponibili.",
    domBtnAcquire: "Acquisisci questo dominio",
    gdprTitle: "Conformità Globale e Leggi Digitali",
    gdprDesc: "La privacy dei dati è un diritto fondamentale. Con il GDPR, il CCPA e le continue normative, la tua infrastruttura deve essere inattaccabile. Costruiamo sistemi nativamente conformi che proteggono le responsabilità legali del tuo brand.",
    gdpr1Title: "Nativo GDPR & CCPA",
    gdpr1Desc: "Opzioni di tracciamento senza cookie, flussi di consenso chiari e architettura dei dati trasparente.",
    gdpr2Title: "Architettura Zero-Trust",
    gdpr2Desc: "Implementiamo crittografia avanzata e strategie zero-trust per isolare e proteggere i dati.",
    sovTitle: "Sovranità Digitale: Possiedi, Non Affittare",
    sovDesc: "Costruire su SaaS (Shopify, Wix) è come affittare un appartamento. Il proprietario può alzare l'affitto o cambiarti le regole. Noi costruiamo tuoi immobili digitali di proprietà.",
    sov1Title: "Nessun Abbonamento Tossico",
    sov1Desc: "Smetti di pagare percentuali mensili sui tuoi guadagni. Una volta costruito il sistema, possiedi tutto: codice, dati e infrastruttura.",
    sov2Title: "Controllo Assoluto",
    sov2Desc: "Tu detti le regole. Nessuna restrizione della piattaforma, nessun cambio di algoritmo improvviso che distrugge il tuo business.",
    coreTitle: "Infrastruttura Core",
    coreSub: "I pilastri fondamentali dell'ecosistema Sogni Digitali.",
    partners: "Basati sulle migliori tecnologie",
    ctaTitle: "Pronto per la tua evoluzione digitale?",
    ctaBtn: "Prenota una Consulenza Tecnica",
    visionTitle: "La Nostra Visione",
    visionSub: "Non costruiamo solo software; ingegnerizziamo il dominio digitale.",
    visionDesc: "Sogni Digitali si fonda su una semplice premessa: nell'economia moderna, la tua presenza digitale è il tuo asset principale. Crediamo nella creazione di sistemi su misura e ad alte prestazioni che non si limitano a esistere, ma dominano attivamente il loro mercato.",
    wcuTitle: "Perché Scegliere Sogni Digitali?",
    wcu1: "Sovranità Totale",
    wcu1Desc: "Possiedi il codice e l'infrastruttura. Nessun vincolo tossico.",
    wcu2: "Qualità Senza Compromessi",
    wcu2Desc: "Costruiamo soluzioni efficaci che eccellono sotto pressione.",
    wcu3: "Sicurezza e Conformità",
    wcu3Desc: "Architetture zero-trust e GDPR integrato fin dal primo giorno.",
    svc1Title: "Sviluppo Web Luxury",
    svc1Desc: "Siti web su misura e ad alte prestazioni progettati per brand premium.",
    svc2Title: "E-Commerce Premium",
    svc2Desc: "Piattaforme di vendita scalabili, ottimizzate per la conversione.",
    svc3Title: "Sviluppo App",
    svc3Desc: "Architettura mobile nativa e cross-platform per il consumatore moderno.",
    svc4Title: "Ecosistemi CRM Proprietari",
    svc4Desc: "Sistemi di gestione personalizzati che automatizzano le operazioni di vendita.",
    svc5Title: "Sistemi di Prenotazione",
    svc5Desc: "Motori di prenotazione avanzati con pagamenti automatizzati.",
    svc6Title: "Infrastruttura Scalabile",
    svc6Desc: "Hosting di livello aziendale, API e sicurezza zero-trust."
  },
  FR: {
    badge: "Le Standard Sogni",
    title1: "Architectes de l'",
    title2: "Élite Numérique",
    subtitle: "Plus que du code. Nous concevons des expériences psychologiques, des moteurs de revenus basés sur les données et des chefs-d'œuvre esthétiques.",
    dpTitle1: "Forces invisibles.",
    dpTitle2: "Profits tangibles.",
    dpDesc: "Une présence numérique premium n'est plus un luxe ; c'est la barrière à l'entrée définitive. Chaque seconde où un prospect interagit avec votre marque est une négociation psychologique.",
    dpAuth: "Autorité au premier coup d'œil.",
    dpAuthSub: "75% des utilisateurs jugent la crédibilité d'une entreprise sur la base de son web design en 50 millisecondes.",
    dpAlg: "Avantage algorithmique déloyal.",
    dpAlgSub: "En structurant parfaitement la vitesse, l'accessibilité et les métadonnées IA, nous disons à Google exactement qui vous êtes.",
    domTitle: "Sécurisez votre Empire",
    domSub: "Vérifiez la disponibilité en temps réel. Ne laissez pas vos concurrents prendre votre nom.",
    domBtnEmpty: "Initialiser le Balayage Vectoriel",
    domBtnCheck: "Vérification...",
    domFree: "🎁 La première année de votre domaine est offerte",
    domAvailable: "est Disponible",
    domTaken: "est Pris",
    domAvailDesc: "Ce domaine premium est disponible. Sécurisez-le immédiatement via notre plateforme.",
    domTakenDesc: "Ce domaine est occupé. Besoin d'une alternative ? Notre IA peut générer des variantes premium disponibles.",
    domBtnAcquire: "Acquérir ce domaine",
    gdprTitle: "Conformité Globale et Lois Numériques",
    gdprDesc: "La confidentialité des données est un droit fondamental. Face au RGPD, CCPA et autres régulations croissantes, votre infrastructure doit être intouchable. Nous créons des systèmes conformes qui protègent votre marque des conséquences juridiques.",
    gdpr1Title: "Agnostique RGPD & CCPA",
    gdpr1Desc: "Options de suivi sans cookies, flux de consentement clairs et architecture de données transparente construite à partir de zéro.",
    gdpr2Title: "Architecture Zéro-Confiance",
    gdpr2Desc: "Nous mettons en œuvre un chiffrement avancé et des stratégies de données zéro-confiance pour isoler et protéger vos données.",
    sovTitle: "Souveraineté Numérique: Possédez, Ne Louez Pas",
    sovDesc: "Construire sur des SaaS comme Shopify ou Wix, c'est comme louer un appartement. Le propriétaire peut augmenter le loyer ou changer les règles. Nous construisons votre propre immobilier numérique.",
    sov1Title: "Pas d'Abonnements Toxiques",
    sov1Desc: "Arrêtez de payer un pourcentage sur vos propres revenus. Une fois le système construit, vous possédez le code, les données et l'infrastructure.",
    sov2Title: "Contrôle Absolu",
    sov2Desc: "Vous dictez les règles. Pas de restrictions de plateforme, pas de changements d'algorithme soudains.",
    coreTitle: "Infrastructure de Base",
    coreSub: "Les piliers fondamentaux de l'écosystème Sogni Digitali.",
    partners: "Propulsé par la crème de la technologie",
    ctaTitle: "Prêt à démarrer votre évolution numérique ?",
    ctaBtn: "Réserver une Consultation Technique",
    visionTitle: "Notre Vision",
    visionSub: "Nous ne construisons pas de logiciels ; nous concevons le domaine numérique.",
    visionDesc: "Sogni Digitali a été fondée sur une prémisse simple : dans l'économie moderne, votre présence numérique est votre atout principal. Notre mission est de transformer les marques premium en entités numériques intouchables grâce à un code intransigeant et une conception psychologique profonde.",
    wcuTitle: "Pourquoi Choisir Sogni Digitali ?",
    wcu1: "Souveraineté Totale",
    wcu1Desc: "Vous possédez le code. Pas de verrouillage technologique toxique.",
    wcu2: "Qualité Sans Compromis",
    wcu2Desc: "Nous concevons des solutions sur mesure qui performent sous pression.",
    wcu3: "Sécurité & Conformité",
    wcu3Desc: "Architectures zéro-confiance et conformité RGPD native.",
    svc1Title: "Développement Web de Luxe",
    svc1Desc: "Sites web sur mesure à haute performance pour les marques premium.",
    svc2Title: "E-Commerce Premium",
    svc2Desc: "Vaisseaux amiraux en ligne scalables et optimisés pour la conversion.",
    svc3Title: "Développement d'Applications",
    svc3Desc: "Architecture mobile native et multiplateforme pour les consommateurs d'aujourd'hui.",
    svc4Title: "Écosystèmes CRM Sur Mesure",
    svc4Desc: "Systèmes de gestion qui automatisent vos flux de revenus et clients.",
    svc5Title: "Moteurs de Réservation",
    svc5Desc: "Systèmes de réservation avancés avec paiements automatisés et planification intelligente.",
    svc6Title: "Infrastructure Évolutive",
    svc6Desc: "Hébergement d'entreprise, création d'API et sécurité zéro-confiance."
  },
  AR: {
    badge: "معيار سوني",
    title1: "مهندسو ",
    title2: "النخبة الرقمية",
    subtitle: "أكثر من مجرد كود. نحن نصمم تجارب نفسية، ومحركات إيرادات تعتمد على البيانات، وتحف فنية جذابة.",
    dpTitle1: "قوى خفية.",
    dpTitle2: "أرباح ملموسة.",
    dpDesc: "التواجد الرقمي المتميز لم يعد رفاهية؛ إنه الحاجز الحاسم للدخول. كل ثانية يتفاعل فيها العميل مع علامتك التجارية هي مفاوضة نفسية.",
    dpAuth: "السلطة من النظرة الأولى.",
    dpAuthSub: "75٪ من المستخدمين يحكمون على مصداقية الشركة استنادًا إلى تصميم الويب في 50 مللي ثانية.",
    dpAlg: "ميزة خوارزمية غير عادلة.",
    dpAlgSub: "من خلال هيكلة السرعة وإمكانية الوصول والبيانات الوصفية للذكاء الاصطناعي، نخبر Google بالضبط من أنت.",
    domTitle: "تأمين إمبراطوريتك",
    domSub: "تحقق من توفر النطاقات في الوقت الفعلي. لا تدع منافسيك يأخذون اسمك.",
    domBtnEmpty: "بدء الفحص",
    domBtnCheck: "جار التحقق...",
    domFree: "🎁 السنة الأولى لتسجيل النطاق مجانية تمامًا",
    domAvailable: "متاح",
    domTaken: "مأخوذ",
    domAvailDesc: "هذا النطاق المتميز متاح. قم بتأمينه فورًا عبر منصتنا.",
    domTakenDesc: "هذا النطاق مشغول. هل تحتاج إلى بديل؟ يمكن للذكاء الاصطناعي لدينا توليد خيارات متاحة.",
    domBtnAcquire: "الحصول على هذا النطاق",
    gdprTitle: "الامتثال العالمي والقوانين الرقمية",
    gdprDesc: "خصوصية البيانات حق أساسي. في ظل قوانين (GDPR) وقوانين الخصوصية المتطورة، يجب أن تكون بنيتك التحتية الرقمية منيعة. نحن نبني أنظمة متوافقة بشكل أصلي تحمي علامتك التجارية من المسؤوليات القانونية المدمرة.",
    gdpr1Title: "متوافق مع GDPR & CCPA",
    gdpr1Desc: "خيارات تتبع بدون ملفات تعريف الارتباط، وتدفقات موافقة واضحة، وبنية بيانات شفافة ومؤمنة تمامًا.",
    gdpr2Title: "بنية انعدام الثقة (Zero-Trust)",
    gdpr2Desc: "نقوم بتنفيذ تشفير متقدم وإستراتيجيات بيانات انعدام الثقة لضمان عزل البيانات وحمايتها.",
    sovTitle: "السيادة الرقمية: تملك ولا تستأجر",
    sovDesc: "البناء على منصات مثل Shopify أو Wix يشبه استئجار شقة. يمكن للمالك زيادة الإيجار أو تغيير القواعد. نحن نبني لك عقاراتك الرقمية الخاصة بك.",
    sov1Title: "لا اشتراكات سامة",
    sov1Desc: "توقف عن دفع نسب شهرية من أرباحك. بمجرد بناء النظام، ستمتلك الكود والبيانات والبنية التحتية.",
    sov2Title: "السيطرة المطلقة",
    sov2Desc: "أنت تملي القواعد. لا توجد قيود من المنصات ولا تغييرات مفاجئة في الخوارزمية.",
    coreTitle: "البنية التحتية الأساسية",
    coreSub: "الركائز الأساسية لنظام سوني ديجيتالي البيئي.",
    partners: "مدعوم من الأفضل على الإطلاق",
    ctaTitle: "هل أنت مستعد لبدء تطورك الرقمي؟",
    ctaBtn: "احجز استشارة فنية",
    visionTitle: "رؤيتنا",
    visionSub: "نحن لا نبني برمجيات فقط؛ بل نصمم سيادة رقمية.",
    visionDesc: "تأسست سوني ديجيتالي على فرضية بسيطة: في الاقتصاد الحديث، تواجدك الرقمي هو أصلك الأساسي. نحن نؤمن ببناء أنظمة مخصصة وعالية الأداء لا تكتفي بوجودها، بل تسيطر بفعالية على أسواقها.",
    wcuTitle: "لماذا تختار سوني ديجيتالي؟",
    wcu1: "السيادة المطلقة",
    wcu1Desc: "أنت تمتلك الكود والبنية التحتية. لا احتكارات برمجية.",
    wcu2: "جودة لا تقبل المساومة",
    wcu2Desc: "نبني حلولًا مخصصة تعمل بكفاءة تحت الضغط.",
    wcu3: "الأمان والامتثال",
    wcu3Desc: "بنية غير قابلة للاختراق (Zero-Trust) وتوافق مدمج مع قوانين البيانات.",
    svc1Title: "تطوير الويب الفاخر",
    svc1Desc: "مواقع ويب مخصصة وعالية الأداء مصممة للعلامات التجارية المتميزة.",
    svc2Title: "التجارة الإلكترونية المتقدمة",
    svc2Desc: "متاجر إلكترونية قابلة للتوسع ومحسّنة لزيادة المبيعات.",
    svc3Title: "تطوير التطبيقات",
    svc3Desc: "تطبيقات الهاتف المحمول للمستهلك الحديث.",
    svc4Title: "أنظمة CRM المخصصة",
    svc4Desc: "نظام إدارة علاقات عملاء مصمم لأتمتة المبيعات والعمليات.",
    svc5Title: "أنظمة الحجز والمواعيد",
    svc5Desc: "نظام حجز إلكتروني مع بوابات دفع وجدولة ذكية.",
    svc6Title: "بنية تحتية قابلة للتوسع",
    svc6Desc: "استضافة مؤسسية وأمان قوي للبيانات."
  }
};

const domainsTLD = ['.com', '.it', '.fr', '.shop', '.co.uk', '.io', '.ai'];

// Define SVG components for specific logos Since the simpleicons url requires internet and could be slow or missing, we fall back to reliable icons or image links.
const partners = [
  { name: 'Google Cloud', logo: 'https://cdn.simpleicons.org/googlecloud/white' },
  { name: 'Vercel', logo: 'https://cdn.simpleicons.org/vercel/white' },
  { name: 'Hostinger', logo: 'https://cdn.simpleicons.org/hostinger/white' },
  { name: 'Meta', logo: 'https://cdn.simpleicons.org/meta/white' },
  { name: 'OpenAI', logo: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2057 5.9847 5.9847 0 0 0 3.989-2.9 6.051 6.051 0 0 0-.7388-7.0732zM13.2599 22.5002c-1.2298 0-2.3533-.5651-3.085-1.5814l.0354-.0228 3.7719-2.1852h.0016a1.218 1.218 0 0 0 .6116-1.0594V9.8967l1.7963 1.037.0016.0355v7.7972a3.027 3.027 0 0 1-3.1334 3.7338zm-9.3563-3.6932a3.0252 3.0252 0 0 1 .4911-4.8212l1.793-1.034.0016.0355v1.077c0 .4285.228.8105.5894 1.0186l6.7381 3.89-.0015.0355-1.7947 1.0385c-1.0852.6254-2.4533.4566-3.3541-.4154a4.4996 4.4996 0 0 1-1.378-2.6468l-3.085-5.1772zm-1.8544-7.5342a3.0252 3.0252 0 0 1 3.2384-1.27l.0015.0355-1.7947 1.0385V15.05L1.87 13.974c-1.0852-.6254-1.636-1.8845-1.3524-3.0903a4.5028 4.5028 0 0 1 1.5407-2.6105zm14.1952-6.52c1.2298 0 2.3533.5651 3.085 1.5814l-.0354.0228-3.7719 2.1852h-.0016a1.218 1.218 0 0 0-.6116 1.0594V14.1033l-1.7963-1.037-.0016-.0355V5.2687a3.027 3.027 0 0 1 3.1334-3.7338zM8.887 2.1706a3.0252 3.0252 0 0 1 4.5015 1.7042l.0014.0355-1.7946 1.0385v-1.077c0-.4285-.228-.8105-.5894-1.0186L4.2678 1.002h-.0015L6.061-.0365c1.0852-.6254 2.4533-.4566 3.3541.4154a4.4996 4.4996 0 0 1 1.378 2.6468l-1.9061 5.9405zm14.1352 5.0392a3.0252 3.0252 0 0 1-3.2384 1.27l-.0015-.0355 1.7947-1.0385V3.4287l1.3853 2.1772c1.0852.6254 1.636 1.8845 1.3524 3.0903a4.5028 4.5028 0 0 1-1.5407 2.6105l-4.5768-.1355c.3486-.3957.5447-.905.5447-1.4394V5.7001l3.2803-1.894zM12 15.6983a3.4988 3.4988 0 0 1-1.748-6.529l3.411-1.9687c.7891.4556 1.7828 1.0298 2.5719 1.4854l-3.364 1.942v3.9174A3.4883 3.4883 0 0 1 12 15.6983z"/></svg>' },
  { name: 'Claude', logo: 'https://cdn.simpleicons.org/anthropic/white' },
  { name: 'Gemini', logo: 'https://cdn.simpleicons.org/googlegemini/white' },
];

export default function ServicesPage({ lang }: { lang: string }) {
  const currentLang = (['EN', 'IT', 'FR', 'AR'].includes(lang) ? lang : 'EN') as keyof typeof t;
  const content = t[currentLang];
  
  const [activeModal, setActiveModal] = useState<any | null>(null);
  const [domainQuery, setDomainQuery] = useState('');
  const [selectedTld, setSelectedTld] = useState('.com');
  const [isChecking, setIsChecking] = useState(false);
  const [domainResult, setDomainResult] = useState<'available' | 'taken' | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const checkDomain = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domainQuery) return;
    
    setIsChecking(true);
    setDomainResult(null);
    
    try {
      const q = domainQuery.replace(/[^a-z0-9-]/g, '') + selectedTld;
      const res = await fetch(`https://dns.google/resolve?name=${q}&type=NS`);
      const data = await res.json();
      
      // Status 3 is NXDOMAIN (domain doesn't exist, likely available)
      // Status 0 is NOERROR (domain exists, definitely taken)
      if (data.Status === 3) {
        setDomainResult('available');
      } else {
        setDomainResult('taken');
      }
    } catch(err) {
      setDomainResult('available');
    } finally {
      setIsChecking(false);
    }
  };

  const servicesList = [
    {
      icon: <Globe className="w-8 h-8 text-[#00E5FF]" />,
      title: content.svc1Title,
      desc: content.svc1Desc,
      fullDesc: "We engineer bespoke, high-performance web experiences that command attention. Using cutting-edge frameworks like React and 3D WebGL, we merge cinematic aesthetics with flawless technical execution.",
      color: "from-[#00E5FF]/20 to-transparent",
      border: "border-[#00E5FF]/30",
      hover: "group-hover:border-[#00E5FF]/80 group-hover:shadow-[0_0_30px_rgba(0,229,255,0.3)]"
    },
    {
      icon: <Search className="w-8 h-8 text-[#E9C349]" />,
      title: content.svc2Title,
      desc: content.svc2Desc,
      fullDesc: "We build ultra-fast, high-converting stores designed to maximize AOV and customer lifetime value. Complete control over checkout flows, subscription models, and loyalty programs.",
      color: "from-[#E9C349]/20 to-transparent",
      border: "border-[#E9C349]/30",
      hover: "group-hover:border-[#E9C349]/80 group-hover:shadow-[0_0_30px_rgba(233,195,73,0.3)]"
    },
    {
      icon: <Smartphone className="w-8 h-8 text-white" />,
      title: content.svc3Title,
      desc: content.svc3Desc,
      fullDesc: "From iOS to Android, we build native-feeling experiences utilizing cross-platform or native code natively configured to engage your users repeatedly.",
      color: "from-white/10 to-transparent",
      border: "border-white/20",
      hover: "group-hover:border-white/60 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
    },
    {
      icon: <Layers className="w-8 h-8 text-[#00E5FF]" />,
      title: content.svc4Title,
      desc: content.svc4Desc,
      fullDesc: "Stop fighting off-the-shelf software. We construct robust, customized Customer Relationship Management systems exactly mapped to your company's unique sales and service lifecycle.",
      color: "from-[#00E5FF]/20 to-transparent",
      border: "border-[#00E5FF]/30",
      hover: "group-hover:border-[#00E5FF]/80 group-hover:shadow-[0_0_30px_rgba(0,229,255,0.3)]"
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-[#E9C349]" />,
      title: content.svc5Title,
      desc: content.svc5Desc,
      fullDesc: "Eliminate friction for your customers. We design complex calendaring systems, dynamic pricing grids, and automated deposit structures that handle reservations flawlessly.",
      color: "from-[#E9C349]/20 to-transparent",
      border: "border-[#E9C349]/30",
      hover: "group-hover:border-[#E9C349]/80 group-hover:shadow-[0_0_30px_rgba(233,195,73,0.3)]"
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-white" />,
      title: content.svc6Title,
      desc: content.svc6Desc,
      fullDesc: "We implement enterprise-grade security protocols, robust decentralized cloud hosting, and strict database architectures to keep your digital assets definitively secure.",
      color: "from-white/10 to-transparent",
      border: "border-white/20",
      hover: "group-hover:border-white/60 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
    }
  ];

  return (
    <div 
      className={`pt-32 pb-20 px-6 max-w-7xl mx-auto relative z-10 overflow-hidden ${lang === 'AR' ? 'text-right' : 'text-left'}`}
      dir={lang === 'AR' ? 'rtl' : 'ltr'}
    >
      
      {createPortal(
        <AnimatePresence>
          {activeModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={() => setActiveModal(null)}
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-2xl bg-[#0B1120] border border-white/10 rounded-3xl p-6 md:p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-y-auto max-h-[90vh]"
                style={{ direction: lang === 'AR' ? 'rtl' : 'ltr' }}
              >
                <button onClick={() => setActiveModal(null)} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all z-10">
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-4 mb-8 mt-2">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 shadow-lg">
                    {activeModal.icon}
                  </div>
                  <h2 className="text-3xl font-display font-bold text-white">{activeModal.title}</h2>
                </div>
                <div className="space-y-6">
                  <p className="text-xl font-light text-slate-300">{activeModal.desc}</p>
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <p className="text-slate-400 font-light leading-relaxed">{activeModal.fullDesc}</p>
                  <div className="pt-4 flex justify-end">
                    <Link to="/book" onClick={() => setActiveModal(null)} className="btn-epic px-8 py-4 font-semibold text-sm tracking-wider uppercase inline-flex items-center gap-3">
                      <div className="shine-layer"></div>
                      <span className="relative z-10">Request Details</span>
                      <Sparkles className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-center mb-24">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mx-auto mb-6">
          <Zap className="w-4 h-4 text-[#E9C349]" />
          <span className="text-xs font-semibold tracking-widest uppercase text-slate-300">{content.badge}</span>
        </div>
        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter mb-6">
          {content.title1}<span className="text-gradient hover:text-white transition-colors">{content.title2}</span>
        </h1>
        <p className="text-xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
          {content.subtitle}
        </p>
      </motion.div>

      {/* DP Section */}
      <motion.section initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="mb-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120] via-white/5 to-[#0B1120] rounded-[3rem] -z-10 blur-3xl opacity-50" />
        <div className="glass-panel p-10 md:p-16 rounded-[3rem] border border-white/10 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight flex flex-col">
              <span className="text-white">{content.dpTitle1}</span>
              <span className="text-slate-500">{content.dpTitle2}</span>
            </h2>
            <p className="text-slate-400 text-lg font-light leading-relaxed mb-8">{content.dpDesc}</p>
            <ul className="space-y-4 font-light text-slate-300">
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-[#00E5FF]/20 flex items-center justify-center shrink-0 mt-1"><CheckCircle className="w-4 h-4 text-[#00E5FF]" /></div>
                <span><strong>{content.dpAuth}</strong> {content.dpAuthSub}</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-[#E9C349]/20 flex items-center justify-center shrink-0 mt-1"><CheckCircle className="w-4 h-4 text-[#E9C349]" /></div>
                <span><strong>{content.dpAlg}</strong> {content.dpAlgSub}</span>
              </li>
            </ul>
          </div>

          {/* Domain Checker */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00E5FF]/20 to-[#E9C349]/20 blur-[50px] -z-10 rounded-full" />
            <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              <h3 className="text-xl font-bold mb-4 font-display">{content.domTitle}</h3>
              <p className="text-sm text-slate-400 font-light mb-6">{content.domSub}</p>
              
              <form onSubmit={checkDomain} className="relative">
                <div className="flex items-center bg-white/5 border border-white/10 rounded-xl overflow-hidden focus-within:border-[#E9C349]/50 transition-colors">
                  <input 
                    dir="ltr"
                    type="text" 
                    value={domainQuery}
                    onChange={(e) => setDomainQuery(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                    placeholder="your-brand"
                    className="w-full bg-transparent border-none outline-none py-4 px-4 text-white font-mono text-lg text-left"
                  />
                  <select 
                    value={selectedTld} 
                    onChange={(e) => setSelectedTld(e.target.value)} 
                    className="bg-transparent text-slate-300 font-mono py-4 pr-4 pl-2 outline-none appearance-none cursor-pointer border-l border-white/10"
                    dir="ltr"
                  >
                    {domainsTLD.map(tld => <option key={tld} value={tld} className="bg-black text-white">{tld}</option>)}
                  </select>
                </div>
                <div className="text-xs text-[#00E5FF] mt-3 font-semibold tracking-wider uppercase flex items-center gap-2">
                  <Sparkles className="w-3 h-3" /> {content.domFree}
                </div>
                <button type="submit" disabled={isChecking || !domainQuery} className="mt-6 w-full bg-white text-black font-semibold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors disabled:opacity-50">
                  {isChecking ? (
                    <><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}><Zap className="w-5 h-5 text-black" /></motion.div> {content.domBtnCheck}</>
                  ) : (
                    <><Search className="w-5 h-5" /> {content.domBtnEmpty}</>
                  )}
                </button>
              </form>

              <AnimatePresence>
                {domainResult && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className={`mt-6 p-4 rounded-xl border ${domainResult === 'available' ? 'bg-[#00E5FF]/10 border-[#00E5FF]/30 text-[#00E5FF]' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
                    <div className="flex items-start gap-3">
                      {domainResult === 'available' ? <CheckCircle className="w-6 h-6 mt-0.5 shrink-0" /> : <AlertCircle className="w-6 h-6 mt-0.5 shrink-0" />}
                      <div>
                        <h4 className="font-bold text-lg mb-1" dir="ltr">{domainQuery}{selectedTld} {domainResult === 'available' ? content.domAvailable : content.domTaken}</h4>
                        <p className="text-sm opacity-80">{domainResult === 'available' ? content.domAvailDesc : content.domTakenDesc}</p>
                      </div>
                    </div>
                    {domainResult === 'available' && (
                      <div className={`mt-4 pt-4 border-t border-[#00E5FF]/20 flex justify-end`}>
                        <Link to="/book" className="px-6 py-2 rounded-lg bg-[#00E5FF]/20 hover:bg-[#00E5FF]/30 text-[#00E5FF] font-semibold text-sm transition-colors flex items-center gap-2">
                          <span className={`flex items-center gap-2`}>
                            {content.domBtnAcquire}
                            <ArrowRight className={`w-4 h-4 ${lang === 'AR' ? 'mirror-icon' : ''}`} />
                          </span>
                        </Link>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Sovereignty Section */}
      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-32">
        <div className="p-1 glass-panel rounded-[3rem] overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/5 via-transparent to-purple-500/5 group-hover:from-[#00E5FF]/10 transition-colors duration-1000" />
          <div className="bg-black/80 rounded-[2.8rem] p-10 md:p-16 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-white leading-tight">{content.sovTitle}</h2>
                <p className="text-slate-400 font-light leading-relaxed mb-8 text-lg">{content.sovDesc}</p>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                      <X className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{content.sov1Title}</h4>
                      <p className="text-sm text-slate-400 font-light">{content.sov1Desc}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/20 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5 text-[#00E5FF]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{content.sov2Title}</h4>
                      <p className="text-sm text-slate-400 font-light">{content.sov2Desc}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative h-[300px] w-full rounded-3xl overflow-hidden glass-panel flex items-center justify-center border-white/5">
                <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop" alt="Digital Infrastructure" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                {/* 3D Representation of real estate */}
                <div className="text-center relative z-20">
                  <div className="px-6 py-3 rounded-full bg-white text-black font-bold uppercase tracking-widest text-sm inline-flex items-center gap-2">
                    <CheckCircle className="w-4 h-4"/> 100% Ownership
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* GDPR Section */}
      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-32">
        <div className="p-1 glass-panel rounded-[3rem] overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-[#00E5FF]/5 group-hover:from-green-500/10 transition-colors duration-1000" />
          <div className="bg-black/80 rounded-[2.8rem] p-10 md:p-16 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className={`relative h-[300px] w-full rounded-3xl overflow-hidden glass-panel flex items-center justify-center border-white/5 ${lang === 'AR' ? 'lg:order-2' : ''}`}>
                <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop" alt="Cybersecurity" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                <div className="text-center relative z-20">
                  <div className={`px-6 py-3 rounded-full bg-white text-black font-bold uppercase tracking-widest text-sm inline-flex items-center gap-2 ${lang === 'AR' ? 'flex-row-reverse' : ''}`}>
                    <CheckCircle className="w-4 h-4"/> 100% Compliant
                  </div>
                </div>
              </div>
              <div className={`${lang === 'AR' ? 'lg:order-1' : ''}`}>
                <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-white leading-tight">{content.gdprTitle}</h2>
                <p className="text-slate-400 font-light leading-relaxed mb-8 text-lg">{content.gdprDesc}</p>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{content.gdpr1Title}</h4>
                      <p className="text-sm text-slate-400 font-light">{content.gdpr1Desc}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/20 flex items-center justify-center shrink-0">
                      <Layers className="w-5 h-5 text-[#00E5FF]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{content.gdpr2Title}</h4>
                      <p className="text-sm text-slate-400 font-light">{content.gdpr2Desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Vision & Why Choose Us */}
      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-white leading-tight">{content.visionTitle}</h2>
          <p className="text-[#00E5FF] font-medium tracking-wide uppercase text-sm mb-6">{content.visionSub}</p>
          <p className="text-slate-400 font-light leading-relaxed max-w-3xl mx-auto text-lg">{content.visionDesc}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative z-10" style={{ direction: lang === 'AR' ? 'rtl' : 'ltr' }}>
          {[
            {
              icon: <Building className="w-6 h-6 text-[#00E5FF]" />,
              title: content.wcu1,
              desc: content.wcu1Desc
            },
            {
              icon: <Sparkles className="w-6 h-6 text-[#E9C349]" />,
              title: content.wcu2,
              desc: content.wcu2Desc
            },
            {
              icon: <ShieldCheck className="w-6 h-6 text-white" />,
              title: content.wcu3,
              desc: content.wcu3Desc
            }
          ].map((item, i) => (
            <div key={i} className="glass-panel p-8 rounded-3xl border border-white/5 relative overflow-hidden group text-center md:text-left" style={{ textAlign: lang === 'AR' ? 'right' : undefined }}>
              <div className={`w-12 h-12 rounded-2xl border border-white/5 flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform ${lang === 'AR' ? 'mr-0 ml-auto' : ''}`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-bold font-display text-white mb-3 relative z-10">{item.title}</h3>
              <p className="text-slate-400 font-medium text-sm relative z-10">{item.desc}</p>
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </motion.section>

      {/* Services Grid */}
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-display font-bold mb-4">{content.coreTitle}</h2>
        <p className="text-slate-400 font-light max-w-2xl mx-auto">{content.coreSub}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
        {servicesList.map((service, idx) => (
          <motion.div
            key={idx} onClick={() => setActiveModal(service)}
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: idx * 0.1 }}
            className={`group relative p-8 rounded-3xl glass-panel border ${service.border} transition-all hover:-translate-y-2 cursor-pointer ${service.hover}`}
          >
            <div className="relative z-10 flex flex-col h-full">
              <div className="mb-6 inline-flex w-16 h-16 rounded-2xl bg-black/40 border border-white/5 group-hover:scale-110 transition-transform items-center justify-center">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold font-display text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">
                {service.title}
              </h3>
              <p className="text-slate-400 font-medium">{service.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="text-center">
        <h2 className="text-3xl font-display font-bold mb-8">{content.ctaTitle}</h2>
        <Link to="/book" className="btn-epic px-10 py-5 font-semibold text-sm tracking-wider uppercase inline-flex items-center gap-3">
          <div className="shine-layer"></div>
          <span className="relative z-10">{content.ctaBtn}</span>
          <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </div>
  );
}
