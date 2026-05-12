export const getPricingData = (lang: string) => {
  const data = {
    IT: {
      packs: [
        {
          name: "Essential",
          price: "849",
          description: "Presenza digitale sovrana",
          features: [
            "Sito vetrina o Landing Page (fino a 5 pagine)",
            "SEO locale ottimizzata",
            "Performance 100/100 mobile",
            "Design Cyber-Luxury ultra veloce",
            "Certificato SSL e 12 mesi di hosting inclusi",
            "Moduli di contatto intelligenti",
          ],
          cta: "Scegli Essential",
          popular: false,
        },
        {
          name: "Professional",
          price: "1 599",
          description: "La tua prima dipendente digitale",
          features: [
            "Tutto il pacchetto Essential incluso",
            "Sogni Lead Hub (Mini-CRM integrato)",
            "Chatbot IA prenotazioni 24/7",
            "Sistema di booking automatizzato",
            "Generazione di lead qualificati",
            "Risposte personalizzate basate sul business",
          ],
          cta: "Scegli Professional",
          popular: true,
        },
        {
          name: "Custom",
          price: "Parla con noi",
          description: "Il tuo OS aziendale proprietario",
          features: [
            "Tutto il pacchetto Professional",
            "Sviluppo piattaforme complesse o App Native",
            "Sostituzione totale di SaaS costosi",
            "Integrazioni API complesse e tool",
            "Database e sistemi su misura",
            "Creazione E-commerce scalabili",
          ],
          cta: "Parla con il team",
          popular: false,
        },
      ],
      boosters: [
        { name: "Somnia Start (5 Token)", price: "300€", description: "Pacchetto di 5 unità di competenza. Costo unitario: 60€ (Risparmi 25€)." },
        { name: "Somnia Agile (10 Token)", price: "550€", description: "Pacchetto di 10 unità di competenza. Costo unitario: 55€ (Risparmi 100€)." },
        { name: "Somnia Impero (20 Token)", price: "1000€", description: "Pacchetto di 20 unità di competenza. Costo unitario: 50€ (Risparmi 300€)." },
        { name: "Google Local", price: "249€", description: "Per dominare le ricerche locali." },
        { name: "AI Content", price: "349€", description: "Contenuti SEO generati dall'IA e revisionati a mano." },
        { name: "Reputation QR", price: "179€", description: "Sistema fisico (NFC) per raccogliere recensioni a 5 stelle su Google nel punto vendita." }
      ],
      sogniCare: [
        { name: "Sogni Care", price: "49€/mese", description: "Sicurezza di base: Hosting standard, Backup mensili, Monitoraggio di base, 30 min/mese micro-interventi." },
        { name: "Sogni Care Pro", price: "99€/mese", description: "Velocità & Crescita: CDN Globale premium, Backup settimanali, Monitoraggio H24, 1 ora/mese prioritaria, Audit SEO trimestrale." },
        { name: "Valore di base", price: "65€", description: "1 Token Somnia / 1 Unità di Competenza o 1 Ora di lavoro extra fuori contratto se acquistato singolarmente." }
      ],
      comparisonData: [
        {
          category: "SITO WEB",
          features: [
            { name: "Pagine su misura", essential: "max 5", professional: "max 10", custom: "Illimitato" },
            { name: "Design Cyber-Luxury (Glassmorphism)", essential: "✅", professional: "✅", custom: "✅" },
            { name: "Responsive mobile & tablet", essential: "✅", professional: "✅", custom: "✅" },
            { name: "Performance ottimizzata Core Web Vitals", essential: "✅", professional: "✅", custom: "✅" },
            { name: "SEO locale ottimizzata", essential: "✅", professional: "✅", custom: "✅" },
            { name: "Moduli di contatto intelligenti", essential: "✅", professional: "✅", custom: "✅" },
          ]
        },
        {
          category: "AUTOMAZIONE & IA",
          features: [
            { name: "Chatbot IA istruto sul tuo business", essential: "❌", professional: "✅", custom: "✅ Avanzato" },
            { name: "Sistema di booking automatico", essential: "❌", professional: "✅", custom: "✅ Multi-calendari" },
            { name: "Qualificazione lead in automatico", essential: "❌", professional: "✅", custom: "Avanzato + training" },
          ]
        },
        {
          category: "CRM & GESTIONE",
          features: [
            { name: "Sogni Lead Hub (Mini-CRM)", essential: "❌", professional: "✅", custom: "✅ Avanzato" },
            { name: "Integrazione Calendario", essential: "❌", professional: "✅", custom: "✅ Avanzata" },
          ]
        },
        {
          category: "APPLICAZIONI & E-COMMERCE",
          features: [
            { name: "Applicazione aziendale su misura", essential: "❌", professional: "❌", custom: "✅" },
            { name: "App mobile nativa o Sistemi SaaS", essential: "❌", professional: "❌", custom: "✅" },
            { name: "Piattaforma E-commerce scalabile", essential: "❌", professional: "❌", custom: "✅" },
          ]
        },
        {
          category: "SUPPORTO & INFRASTRUTTURA",
          features: [
            { name: "Certificato SSL e Hosting", essential: "✅ (12 Mesi)", professional: "✅ (12 Mesi)", custom: "Custom" },
            { name: "Sostituzione vecchi SaaS", essential: "❌", professional: "Parziale", custom: "Totale" },
            { name: "Integrazione API di terze parti", essential: "❌", professional: "Base", custom: "Illimitato" },
          ]
        }
      ],
            careComparisonData: [
        {
          category: "SICUREZZA & INFRASTRUTTURA",
          features: [
            { name: "Hosting Ad Alte Prestazioni", care: "Standard", carePro: "Premium CDN Globale" },
            { name: "Certificato SSL & Dominio", care: "✅", carePro: "✅" },
            { name: "Backup dei Dati", care: "Mensile", carePro: "Settimanale" },
            { name: "Monitoraggio Uptime", care: "Base", carePro: "H24 con Avvisi" },
            { name: "Sicurezza Proattiva", care: "✅", carePro: "✅ Avanzata" }
          ]
        },
        {
          category: "SUPPORTO & INTERVENTI",
          features: [
            { name: "Micro-interventi mensili", care: "30 min/mese", carePro: "1 ora/mese (Prioritaria)" },
            { name: "Audit SEO e Prestazionale", care: "❌", carePro: "Trimestrale" }
          ]
        }
      ],
      faqs: [
        { question: "Perché 'senza abbonamenti tossici'?", answer: "La maggior parte delle agenzie ti vende un sito e poi ti lascia prigioniero di 10-15 abbonamenti mensili (hosting, CRM, email marketing, chatbot...). Con Sogni Digitali, paghi una volta e possiedi il tuo sistema. L'unico costo ricorrente opzionale è Sogni Care per la manutenzione." },
        { question: "Cos'è il sistema a Token Somnia?", answer: "Invece di preventivi lunghi, offriamo Token di competenza (1 Token = 65€ o sconti in pacchetti). Usa un token per una modifica al sito, l'aggiunta di una pagina banner, un'integrazione o ore di sviluppo. Validità di 1 anno con massima trasparenza." },
        { question: "Il pacchetto Professional sostituisce davvero SaaS costosi?", answer: "Sì. Il Sogni Lead Hub integra: gestione dei contatti, chatbot e tracking. Il sistema di prenotazione sostituisce Calendly. Risparmi 50-200€/mese tagliando servizi esterni superflui." },
        { question: "La differenza tra Sogni Care e Sogni Care Pro?", answer: "Care è una sicurezza di base con backup mensile a 49€. Care Pro (99€) aggiunge hosting CDN ultraveloce, monitoraggio 24/7, backup settimanale, assistenza prioritaria (1h) e un report SEO trimestrale strategico." },
        { question: "Cosa significa 'possiedi il codice'?", answer: "Al momento della consegna, ricevi diritti e controllo sulla piattaforma. Puoi modificarlo, spostarlo di hosting o rivenderlo. È il tuo asset digitale aziendale al 100% (Sovereign Digital Presence) come da nostra filosofia." },
        { question: "Come funziona il Chatbot AI nel pack Professional?", answer: "Lavora H24 qualifica i lead, risponde alle domande frequenti ed inserisce le prenotazioni direttamente nel calendario, imparando dalle configurazioni di base che inseriamo in fase di sviluppo." },
        { question: "Quali sono i tempi per vedere il mio sito online?", answer: "Essential: 7 giorni lavorativi. Professional: 10/14 giorni lavorativi. Custom: a seconda della complessità (dalle 4 settimane in su). I tempi scattano quando i contenuti sono condivisi." }
      ]
    },
    EN: {
      packs: [
        {
          name: "Essential",
          price: "849",
          description: "Sovereign digital presence",
          features: [
            "Custom showcase website (up to 5 pages)",
            "Optimized local SEO",
            "Performance 100/100 mobile",
            "Ultra-fast Cyber-Luxury Design",
            "SSL Certificate and 12 months hosting",
            "Intelligent contact forms",
          ],
          cta: "Choose Essential",
          popular: false,
        },
        {
          name: "Professional",
          price: "1 599",
          description: "Your first digital employee",
          features: [
            "All Essential package included",
            "Sogni Lead Hub (Internal Mini-CRM)",
            "24/7 AI Booking Chatbot",
            "Automated booking system",
            "Qualified lead generation",
            "Custom responses based on your business",
          ],
          cta: "Choose Professional",
          popular: true,
        },
        {
          name: "Custom",
          price: "Talk to us",
          description: "Your proprietary business OS",
          features: [
            "All Professional package included",
            "Complex platforms or Native App dev",
            "Total substitution of expensive SaaS",
            "Complex API and tools integration",
            "Custom systems and database",
            "Scalable E-commerce creation",
          ],
          cta: "Talk to our team",
          popular: false,
        },
      ],
      boosters: [
        { name: "Somnia Start (5 Tokens)", price: "€300", description: "Pack of 5 competence units. Unit cost: €60 (Save €25)." },
        { name: "Somnia Agile (10 Tokens)", price: "€550", description: "Pack of 10 competence units. Unit cost: €55 (Save €100)." },
        { name: "Somnia Impero (20 Tokens)", price: "€1000", description: "Pack of 20 competence units. Unit cost: €50 (Save €300)." },
        { name: "Google Local", price: "€249", description: "To dominate local searches." },
        { name: "AI Content", price: "€349", description: "AI-generated SEO content, hand-edited." },
        { name: "Reputation QR", price: "€179", description: "Physical system (NFC) to collect 5-star Google reviews." }
      ],
      sogniCare: [
        { name: "Sogni Care", price: "€49/mo", description: "Basic Security: Standard hosting, Monthly backups, Basic monitoring, 30 min/month micro-interventions included." },
        { name: "Sogni Care Pro", price: "€99/mo", description: "Performance & Growth: Premium Global CDN, Weekly backups, 24/7 monitoring, 1 hour/month priority, Quarterly SEO Audit." },
        { name: "Base Value", price: "€65", description: "1 Somnia Token / 1 Competence Unit or 1 Hour of extra work out-of-contract if bought separately." }
      ],
      comparisonData: [
        {
          category: "WEB SITE",
          features: [
            { name: "Custom pages", essential: "max 5", professional: "max 10", custom: "Unlimited" },
            { name: "Cyber-Luxury Design (Glassmorphism)", essential: "✅", professional: "✅", custom: "✅" },
            { name: "Mobile & tablet responsive", essential: "✅", professional: "✅", custom: "✅" },
            { name: "Optimized Core Web Vitals", essential: "✅", professional: "✅", custom: "✅" },
            { name: "Optimized local SEO", essential: "✅", professional: "✅", custom: "✅" },
            { name: "Intelligent forms", essential: "✅", professional: "✅", custom: "✅" },
          ]
        },
        {
          category: "AUTOMATION & AI",
          features: [
            { name: "AI Chatbot instructed on business", essential: "❌", professional: "✅", custom: "✅ Advanced" },
            { name: "Automatic booking system", essential: "❌", professional: "✅", custom: "✅ Multi-calendars" },
            { name: "Automatic Lead Qualification", essential: "❌", professional: "✅", custom: "Advanced + training" },
          ]
        },
        {
          category: "CRM & MANAGEMENT",
          features: [
            { name: "Sogni Lead Hub (Mini-CRM)", essential: "❌", professional: "✅", custom: "✅ Advanced" },
            { name: "Calendar Integration", essential: "❌", professional: "✅", custom: "✅ Advanced" },
          ]
        },
        {
          category: "APPLICATIONS & E-COMMERCE",
          features: [
            { name: "Custom business application", essential: "❌", professional: "❌", custom: "✅" },
            { name: "Native App or SaaS System", essential: "❌", professional: "❌", custom: "✅" },
            { name: "Scalable E-commerce platform", essential: "❌", professional: "❌", custom: "✅" },
          ]
        },
        {
          category: "SUPPORT & INFRASTRUCTURE",
          features: [
            { name: "SSL Certificate & Hosting", essential: "✅ (12 Mo)", professional: "✅ (12 Mo)", custom: "Custom" },
            { name: "Replacement of old SaaS", essential: "❌", professional: "Partial", custom: "Total" },
            { name: "Third-party APIs Integration", essential: "❌", professional: "Basic", custom: "Unlimited" },
          ]
        }
      ],
            careComparisonData: [
        {
          category: "SECURITY & INFRASTRUCTURE",
          features: [
            { name: "High Performance Hosting", care: "Standard", carePro: "Premium Global CDN" },
            { name: "SSL Certificate & Domain", care: "✅", carePro: "✅" },
            { name: "Data Backups", care: "Monthly", carePro: "Weekly" },
            { name: "Uptime Monitoring", care: "Basic", carePro: "24/7 with Alerts" },
            { name: "Proactive Security", care: "✅", carePro: "✅ Advanced" }
          ]
        },
        {
          category: "SUPPORT & INTERVENTIONS",
          features: [
            { name: "Monthly Micro-interventions", care: "30 min/mo", carePro: "1 hour/mo (Priority)" },
            { name: "SEO and Performance Audit", care: "❌", carePro: "Quarterly" }
          ]
        }
      ],
      faqs: [
        { question: "Why 'no toxic subscriptions'?", answer: "Most agencies sell you a site and then leave you trapped in 10-15 monthly subscriptions (hosting, CRM, email...). With Sogni Digitali, you pay once and own it. Your only optional recurring cost is Sogni Care for maintenance." },
        { question: "What is the Somnia Token system?", answer: "Instead of long quotes, we offer competence Tokens (1 Token = €65 or discounted in packs). Use a token for a site edit, adding a banner, or dev hours. Valid for 1 year with total transparency." },
        { question: "Does the Professional Pack really replace expensive SaaS?", answer: "Yes. The Sogni Lead Hub integrates: contact management, chatbot, and tracking. The booking system replaces Calendly. You save €50-200/month by cutting external services." },
        { question: "Difference between Sogni Care and Sogni Care Pro?", answer: "Care is basic security with monthly backups at €49. Care Pro (€99) adds ultra-fast CDN hosting, 24/7 monitoring, weekly backups, priority support (1h), and a strategic quarterly SEO report." },
        { question: "What does 'you own the code' mean?", answer: "Upon delivery, you receive full rights and control over the platform. You can modify it, change hosting, or resell it. It's your digital asset (Sovereign Digital Presence)." },
      ]
    },
    FR: {
      packs: [
        {
          name: "Essential",
          price: "849",
          description: "Présence digitale souveraine",
          features: [
            "Site 5 pages sur-mesure",
            "SEO local optimisé",
            "Performance 100/100 mobile",
            "Design Cyber-Luxury",
            "Hébergement 12 mois inclus",
            "Formulaires intelligents",
          ],
          cta: "Choisir Essential",
          popular: false,
        },
        {
          name: "Professional",
          price: "1 599",
          description: "Votre première employée digitale",
          features: [
            "Tout le pack Essential",
            "Sogni Lead Hub (Mini-CRM)",
            "Chatbot IA réservations 24/7",
            "Système booking automatique",
            "Génération leads qualifiés",
            "Réponses personnalisées métiers",
          ],
          cta: "Choisir Professional",
          popular: true,
        },
        {
          name: "Custom",
          price: "Parlez-nous",
          description: "Votre OS métier propriétaire",
          features: [
            "Tout le pack Professional",
            "App métier sur-mesure",
            "Remplacement SaaS complet",
            "Intégrations API complexes",
            "Bases de données dédiées",
            "Création E-commerce"
          ],
          cta: "Parlez à notre équipe",
          popular: false,
        },
      ],
      boosters: [
        { name: "Somnia Start (5 Jetons)", price: "300€", description: "Pack de 5 unités. Coût unitaire: 60€ (Économisez 25€)." },
        { name: "Somnia Agile (10 Jetons)", price: "550€", description: "Pack de 10 unités. Coût unitaire: 55€ (Économisez 100€)." },
        { name: "Somnia Impero (20 Jetons)", price: "1000€", description: "Pack de 20 unités. Coût unitaire: 50€ (Économisez 300€)." },
        { name: "Google Local", price: "249€", description: "Dominez les recherches." },
        { name: "AI Content", price: "349€", description: "Contenu SEO par IA." },
        { name: "Reputation QR", price: "179€", description: "Système NFC avis Google." }
      ],
      sogniCare: [
        { name: "Sogni Care", price: "49€/mois", description: "Sécurité de Base: Hébergement standard, Sauvegardes mensuelles, 30 min/mois incluses." },
        { name: "Sogni Care Pro", price: "99€/mois", description: "Performance & Croissance: CDN Global premium, Sauvegardes hebdo, Suivi H24, 1h/mois prio, Audit SEO trimestriel." },
        { name: "Valeur de base", price: "65€", description: "1 Jeton Somnia / 1 Unité de compétence ou 1H de travail extra." }
      ],
      comparisonData: [
        {
          category: "SITE WEB",
          features: [
            { name: "Pages sur-mesure", essential: "max 5", professional: "max 10", custom: "Illimité" },
            { name: "Design Cyber-Luxury", essential: "✅", professional: "✅", custom: "✅" },
            { name: "Mobile responsive", essential: "✅", professional: "✅", custom: "✅" }
          ]
        },
        {
          category: "AUTOMATISATION",
          features: [
            { name: "Chatbot IA métier", essential: "❌", professional: "✅", custom: "✅" },
            { name: "Booking auto", essential: "❌", professional: "✅", custom: "✅" }
          ]
        }
      ],
            careComparisonData: [
        {
          category: "SÉCURITÉ ET INFRASTRUCTURE",
          features: [
            { name: "Hébergement Haute Performance", care: "Standard", carePro: "CDN Global Premium" },
            { name: "Certificat SSL & Domaine", care: "✅", carePro: "✅" },
            { name: "Sauvegardes de Données", care: "Mensuel", carePro: "Hebdomadaire" },
            { name: "Surveillance de l'Uptime", care: "Basique", carePro: "H24 avec Alertes" },
            { name: "Sécurité Proactive", care: "✅", carePro: "✅ Avancé" }
          ]
        },
        {
          category: "SUPPORT & INTERVENTIONS",
          features: [
            { name: "Micro-interventions mensuelles", care: "30 min/mois", carePro: "1 heure/mois (Priorité)" },
            { name: "Audit SEO et Performance", care: "❌", carePro: "Trimestriel" }
          ]
        }
      ],
      faqs: [
        { question: "Pourquoi 'sans abonnement toxique' ?", answer: "Vous payez une fois et vous possédez votre système. Seul coût récurrent: Sogni Care optionnel." },
        { question: "Système Jetons Somnia ?", answer: "Achetez des unités de compétences au lieu de demander des devis et attendre. Validité 1 an." }
      ]
    },
    AR: {
      packs: [
        {
          name: "Essential",
          price: "849",
          description: "حضورك الرقمي",
          features: ["5 صفحات", "السيو المحلي", "أداء موبايل 100/100", "تصميم عصري سريع", "استضافة لمدة سنة", "نماذج ذكية"],
          cta: "اختر Essential",
          popular: false
        },
        {
          name: "Professional",
          price: "1 599",
          description: "موظفك الرقمي الأول",
          features: ["يشمل الأساسي", "Mini-CRM", "شات بوت ذكي 24/7", "نظام حجز آلي", "جلب عملاء وتأهيلهم", "ردود مخصصة"],
          cta: "اختر Professional",
          popular: true
        },
        {
          name: "Custom (Infinity)",
          price: "تحدث إلينا",
          description: "برمجياتك الخاصة",
          features: ["يشمل الاحترافي", "تطبيقات أو منصات", "استبدال اشتراكات خارجية", "دمج API", "قاعدة بيانات خاصة", "متجر الكتروني ضخم"],
          cta: "تحدث إلينا",
          popular: false
        }
      ],
      boosters: [
        { name: "Somnia Start (5 رموز)", price: "300€", description: "5 وحدات دعم وتطوير. توفير 25€" },
        { name: "Somnia Agile (10 رموز)", price: "550€", description: "10 وحدات دعم وتطوير. توفير 100€" },
        { name: "Somnia Impero (20 رمز)", price: "1000€", description: "20 وحدة دعم وتطوير. توفير 300€" }
      ],
      sogniCare: [
        { name: "Sogni Care", price: "49€/شهريا", description: "حماية أساسية وتحديثات دورية مع 30 دقيقة شهريا للدعم." },
        { name: "Sogni Care Pro", price: "99€/شهريا", description: "أداء استثنائي عبر CDN عالمي وتقارير شهرية وتدخل بدعم 60 دقيقة." },
        { name: "سعر الوحدة", price: "65€", description: "سعر رمز سومنيا (Somnia) إضافي للعمل أو الدعم خارج العقود." }
      ],
      comparisonData: [
        {
          category: "المميزات",
          features: [
            { name: "تصميم فخم وعصري", essential: "✅", professional: "✅", custom: "✅" },
            { name: "شات بوت للحجوزات", essential: "❌", professional: "✅", custom: "✅" }
          ]
        }
      ],
            careComparisonData: [
        {
          category: "الأمان والبنية التحتية",
          features: [
            { name: "استضافة عالية الأداء", care: "قياسي", carePro: "CDN عالمي" },
            { name: "شهادة SSL ونطاق", care: "✅", carePro: "✅" },
            { name: "النسخ الاحتياطي للبيانات", care: "شهري", carePro: "أسبوعي" },
            { name: "مراقبة وقت التشغيل", care: "أساسي", carePro: "24/7 مع تنبيهات" },
            { name: "أمان استباقي", care: "✅", carePro: "✅ متقدم" }
          ]
        },
        {
          category: "الدعم والتدخلات",
          features: [
            { name: "تدخلات صغيرة شهرية", care: "30 دقيقة/شهر", carePro: "1 ساعة/شهر (أولوية)" },
            { name: "تدقيق تحسين محركات البحث والأداء", care: "❌", carePro: "فصلي" }
          ]
        }
      ],
      faqs: [
        { question: "لماذا الاهتمام بالسيادة؟", answer: "أنت تملك نظامك لتجنب الإيجارات للبرامج الخارجية." }
      ]
    }
  };

  return data[lang as keyof typeof data] || data['EN']; // fallback to en if unverified lang
};
