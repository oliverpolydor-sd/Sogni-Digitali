export const getPricingData = (lang: string) => {
  const data = {
    IT: {
      packs: [
        {
          name: "Essential",
          price: "849",
          description: "Presenza digitale sovrana",
          features: [
            "Sito vetrina 5 pagine su misura",
            "SEO locale ottimizzata Torino/Piemonte",
            "Performance 100/100 mobile",
            "Design Cyber-Luxury (Glassmorphism)",
            "Hosting Europa 12 mesi incluso",
            "Consegna in 7 giorni lavorativi",
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
            "Chatbot IA prenotazioni 24/7",
            "Sistema di booking automatico",
            "Sogni Lead Hub (Mini-CRM interno)",
            "Generazione di lead qualificati",
            "Dashboard analytics",
            "Formazione 1h utilizzo",
            "Consegna in 10 giorni lavorativi",
          ],
          cta: "Scegli Professional",
          popular: true,
        },
        {
          name: "Custom",
          price: "Parla con il team",
          description: "Il tuo OS aziendale proprietario",
          features: [
            "Tutto il pacchetto Professional incluso",
            "Applicazione aziendale su misura",
            "App mobile nativa (iOS/Android)",
            "Sostituzione totale SaaS (HubSpot, ecc.)",
            "Integrazioni API di terze parti",
            "Database proprietario",
            "Formazione team completa",
            "Supporto prioritario 6 mesi",
          ],
          cta: "Parla con il team",
          popular: false,
        },
      ],
      boosters: [
        { name: "Google Local", price: "249€", description: "Per dominare le ricerche locali." },
        { name: "AI Content", price: "349€", description: "Contenuti SEO generati dall'IA e revisionati a mano." },
        { name: "Reputation QR", price: "179€", description: "Sistema fisico per raccogliere recensioni a 5 stelle su Google nel punto vendita." }
      ],
      sogniCare: [
        { name: "Care Essential", price: "49€/mese", description: "" },
        { name: "Care Pro", price: "99€/mese", description: "" },
        { name: "Nota", price: "", description: "Le ore fuori contratto sono fatturate a 65 €/h." }
      ],
      comparisonData: [
        {
          category: "SITO WEB",
          features: [
            { name: "Pagine su misura", essential: "max 5", professional: "10", custom: "Illimitato" },
            { name: "Design Cyber-Luxury (Glassmorphism)", essential: "✅", professional: "✅", custom: "✅" },
            { name: "Responsive mobile & tablet", essential: "✅", professional: "✅", custom: "✅" },
            { name: "Performance 90+ Core Web Vitals", essential: "✅", professional: "✅", custom: "✅" },
            { name: "SEO locale ottimizzata Torino/Piemonte", essential: "✅", professional: "✅", custom: "✅" },
            { name: "Blog/CMS integrato", essential: "❌", professional: "✅", custom: "✅" },
            { name: "Multi-lingua (IT/EN/FR)", essential: "❌", professional: "✅", custom: "✅" },
          ]
        },
        {
          category: "AUTOMAZIONE & IA",
          features: [
            { name: "Chatbot IA prenotazioni 24/7", essential: "❌", professional: "✅", custom: "✅ Avanzato" },
            { name: "Sistema di booking automatico", essential: "❌", professional: "✅", custom: "✅ Multi-calendari" },
            { name: "Risposte IA personalizzabili", essential: "❌", professional: "Base", custom: "Avanzato + training" },
          ]
        },
        {
          category: "CRM & GESTIONE",
          features: [
            { name: "Sogni Lead Hub (Mini-CRM)", essential: "❌", professional: "✅", custom: "✅ Avanzato" },
            { name: "Gestione contatti", essential: "❌", professional: "✅", custom: "✅ + segmentazione" },
            { name: "Pipeline di vendita", essential: "❌", professional: "Base", custom: "Avanzato" },
            { name: "Automazione email", essential: "❌", professional: "3 scenari", custom: "Illimitato" },
            { name: "Dashboard analytics", essential: "Base", professional: "Avanzato", custom: "Personalizzato" },
          ]
        },
        {
          category: "APPLICAZIONI",
          features: [
            { name: "Applicazione aziendale su misura", essential: "❌", professional: "❌", custom: "✅" },
            { name: "App mobile nativa (iOS/Android)", essential: "❌", professional: "❌", custom: "✅" },
            { name: "PWA (Progressive Web App)", essential: "❌", professional: "✅", custom: "✅" },
          ]
        },
        {
          category: "INTEGRAZIONI",
          features: [
            { name: "Sostituzione SaaS (HubSpot, ecc.)", essential: "❌", professional: "Parziale", custom: "Totale" },
            { name: "API di terze parti (Stripe, ecc.)", essential: "❌", professional: "2 incluse", custom: "Illimitato" },
            { name: "Webhook & automazioni", essential: "❌", professional: "Base", custom: "Avanzato" },
          ]
        },
        {
          category: "DATI & SOVRANITÀ",
          features: [
            { name: "Database proprietario", essential: "✅", professional: "✅", custom: "✅" },
            { name: "Hosting Europa (GDPR)", essential: "✅", professional: "✅", custom: "✅" },
            { name: "Export dati completo", essential: "✅", professional: "✅", custom: "✅" },
            { name: "Backup automatico quotidiano", essential: "✅", professional: "✅", custom: "✅" },
          ]
        },
        {
          category: "SUPPORTO",
          features: [
            { name: "Formazione utilizzo", essential: "30 min", professional: "1 ora", custom: "Team completo" },
            { name: "Supporto post-consegna", essential: "Email 48h", professional: "Email 24h", custom: "Telefono + email" },
            { name: "Sogni Care offerte (1° anno)", essential: "❌", professional: "Basic", custom: "Business" },
          ]
        }
      ],
      faqs: [
        { question: "Perché 'senza abbonamenti tossici'?", answer: "La maggior parte delle agenzie ti vende un sito e poi ti lascia prigioniero di 10-15 abbonamenti mensili (hosting, CRM, email marketing, chatbot...). Con Sogni Digitali, paghi una volta e possiedi il tuo sistema. L'unico costo ricorrente opzionale è Sogni Care per la manutenzione." },
        { question: "Cosa succede se voglio interrompere Sogni Care?", answer: "Il tuo sistema continua a funzionare normalmente. Rimani proprietario di tutto. Sogni Care è un'assicurazione di manutenzione, non un affitto. Puoi riprendere la manutenzione internamente o con un altro fornitore in qualsiasi momento." },
        { question: "Il pacchetto Professional sostituisce davvero HubSpot/Calendly?", answer: "Sì. Il Sogni Lead Hub integra: gestione dei contatti, tracciamento delle opportunità, cronologia delle interazioni, attività e promemoria. Il sistema di prenotazione sostituisce Calendly Premium. Risparmi 50-200€/mese di SaaS." },
        { question: "I miei dati sono al sicuro?", answer: "Assolutamente. Tutto è ospitato in Europa (principalmente tramite Supabase, ospitato in Germania/Francia). Nessun trasferimento verso gli USA. Piena conformità GDPR. Puoi esportare i tuoi dati in qualsiasi momento." },
        { question: "Cosa significa 'possiedi il codice'?", answer: "Al momento della consegna e del pagamento finale, diventi proprietario del codice sorgente. Puoi modificarlo, duplicarlo, venderlo. Non manteniamo alcun diritto. È il tuo asset digitale, non un affitto." },
        { question: "E se volessi passare al pacchetto Custom in seguito?", answer: "Perfetto. Il pacchetto Professional funge da solida base. Recuperiamo il tuo sistema esistente e sviluppiamo le funzionalità aziendali specifiche. Non perdi nulla, guadagni in potenza." },
        { question: "Come funziona il Chatbot IA?", answer: "Risponde alle domande frequenti, qualifica i lead, fissa appuntamenti 24/7 nel tuo calendario. Formazione continua possibile con Sogni Care Business. Impara dalle tue conversazioni." },
        { question: "Quali sono i tempi per vedere il mio sito online?", answer: "Essential: 7 giorni. Professional: 10 giorni. Custom: a seconda della complessità (6-12 settimane). Questi tempi iniziano quando ci fornisci i tuoi contenuti (testi, immagini, logo)." },
        { question: "Posso pagare a rate?", answer: "Sì. 50% all'ordine, 50% alla consegna. Per progetti Custom >5000€, possiamo dilazionare in 3 rate mensili (maggiorazione 5%)." },
        { question: "Lavorate solo a Torino?", answer: "Il nostro ufficio è a Torino, ma supportiamo clienti in tutto il Piemonte e anche oltre in videochiamata. L'importante è il tuo progetto, non il tuo codice postale." }
      ]
    },
    EN: {
      packs: [
        {
          name: "Essential",
          price: "849",
          description: "Sovereign digital presence",
          features: [
            "Custom 5-page showcase website",
            "Local SEO optimized Turin/Piedmont",
            "Performance 100/100 mobile",
            "Cyber-Luxury Design (Glassmorphism)",
            "Europe Hosting 12 months included",
            "Delivery in 7 working days",
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
            "24/7 AI Booking Chatbot",
            "Automatic booking system",
            "Sogni Lead Hub (Internal Mini-CRM)",
            "Qualified lead generation",
            "Analytics dashboard",
            "1h usage training",
            "Delivery in 10 working days",
          ],
          cta: "Choose Professional",
          popular: true,
        },
        {
          name: "Custom",
          price: "Talk to our team",
          description: "Your proprietary business OS",
          features: [
            "All Professional package included",
            "Custom business application",
            "Native mobile app (iOS/Android)",
            "Total SaaS replacement (HubSpot, etc.)",
            "Third-party API integrations",
            "Proprietary database",
            "Full team training",
            "6 months priority support",
          ],
          cta: "Talk to our team",
          popular: false,
        },
      ],
      boosters: [
        { name: "Google Local", price: "€249", description: "To dominate local searches." },
        { name: "AI Content", price: "€349", description: "AI-generated SEO content, hand-edited." },
        { name: "Reputation QR", price: "€179", description: "Physical system to collect 5-star Google reviews at the point of sale." }
      ],
      sogniCare: [
        { name: "Care Essential", price: "€49/month", description: "" },
        { name: "Care Pro", price: "€99/month", description: "" },
        { name: "Note", price: "", description: "Out-of-contract hours are billed at €65/h." }
      ],
      comparisonData: [
        {
          category: "WEB SITE",
          features: [
            { name: "Custom pages", essential: "max 5", professional: "10", custom: "Unlimited" },
            { name: "Cyber-Luxury Design (Glassmorphism)", essential: "✅", professional: "✅", custom: "✅" },
            { name: "Mobile & tablet responsive", essential: "✅", professional: "✅", custom: "✅" },
            { name: "Performance 90+ Core Web Vitals", essential: "✅", professional: "✅", custom: "✅" },
            { name: "Local SEO optimized Turin/Piedmont", essential: "✅", professional: "✅", custom: "✅" },
            { name: "Integrated Blog/CMS", essential: "❌", professional: "✅", custom: "✅" },
            { name: "Multi-language (IT/EN/FR)", essential: "❌", professional: "✅", custom: "✅" },
          ]
        },
        {
          category: "AUTOMATION & AI",
          features: [
            { name: "24/7 AI Booking Chatbot", essential: "❌", professional: "✅", custom: "✅ Advanced" },
            { name: "Automatic booking system", essential: "❌", professional: "✅", custom: "✅ Multi-calendars" },
            { name: "Customizable AI responses", essential: "❌", professional: "Basic", custom: "Advanced + training" },
          ]
        },
        {
          category: "CRM & MANAGEMENT",
          features: [
            { name: "Sogni Lead Hub (Mini-CRM)", essential: "❌", professional: "✅", custom: "✅ Advanced" },
            { name: "Contact management", essential: "❌", professional: "✅", custom: "✅ + segmentation" },
            { name: "Sales pipeline", essential: "❌", professional: "Basic", custom: "Advanced" },
            { name: "Email automation", essential: "❌", professional: "3 scenarios", custom: "Unlimited" },
            { name: "Analytics dashboard", essential: "Basic", professional: "Advanced", custom: "Custom" },
          ]
        },
        {
          category: "APPLICATIONS",
          features: [
            { name: "Custom business application", essential: "❌", professional: "❌", custom: "✅" },
            { name: "Native mobile app (iOS/Android)", essential: "❌", professional: "❌", custom: "✅" },
            { name: "PWA (Progressive Web App)", essential: "❌", professional: "✅", custom: "✅" },
          ]
        },
        {
          category: "INTEGRATIONS",
          features: [
            { name: "SaaS replacement (HubSpot, etc.)", essential: "❌", professional: "Partial", custom: "Total" },
            { name: "Third-party APIs (Stripe, etc.)", essential: "❌", professional: "2 included", custom: "Unlimited" },
            { name: "Webhooks & automations", essential: "❌", professional: "Basic", custom: "Advanced" },
          ]
        },
        {
          category: "DATA & SOVEREIGNTY",
          features: [
            { name: "Proprietary database", essential: "✅", professional: "✅", custom: "✅" },
            { name: "Europe Hosting (GDPR)", essential: "✅", professional: "✅", custom: "✅" },
            { name: "Full data export", essential: "✅", professional: "✅", custom: "✅" },
            { name: "Daily automatic backup", essential: "✅", professional: "✅", custom: "✅" },
          ]
        },
        {
          category: "SUPPORT",
          features: [
            { name: "Usage training", essential: "30 min", professional: "1 hour", custom: "Full team" },
            { name: "Post-delivery support", essential: "Email 48h", professional: "Email 24h", custom: "Phone + email" },
            { name: "Sogni Care offers (1st year)", essential: "❌", professional: "Basic", custom: "Business" },
          ]
        }
      ],
      faqs: [
        { question: "Why 'no toxic subscriptions'?", answer: "Most agencies sell you a site and then leave you trapped in 10-15 monthly subscriptions (hosting, CRM, email marketing, chatbot...). With Sogni Digitali, you pay once and you own your system. Your only optional recurring cost is Sogni Care for maintenance." },
        { question: "What happens if I want to stop Sogni Care?", answer: "Your system continues to function normally. You remain the owner of everything. Sogni Care is maintenance insurance, not a rental. You can take over maintenance internally or with another provider at any time." },
        { question: "Does the Professional Pack really replace HubSpot/Calendly?", answer: "Yes. The Sogni Lead Hub integrates: contact management, opportunity tracking, interaction history, tasks, and reminders. The booking system replaces Calendly Premium. You save 50-200€/month in SaaS." },
        { question: "Is my data secure?", answer: "Absolutely. Everything is hosted in Europe (primarily via Supabase, hosted in Germany/France). No transfers to the USA. Full GDPR compliance. You can export your data at any time." },
        { question: "What does 'you own the code' mean?", answer: "Upon delivery and final payment, you become the owner of the source code. You can modify it, duplicate it, sell it. We retain no rights. It's your digital asset, not a rental." },
        { question: "What if I want to upgrade to the Custom Pack later?", answer: "Perfect. The Professional Pack serves as a solid foundation. We take your existing system and develop the specific business features. You lose nothing, you gain power." },
        { question: "How does the AI Chatbot work?", answer: "It answers frequently asked questions, qualifies leads, and books appointments 24/7 in your calendar. Continuous training is possible with Sogni Care Business. It learns from your conversations." },
        { question: "How long until my site is online?", answer: "Essential: 7 days. Professional: 10 days. Custom: depending on complexity (6-12 weeks). These timeframes start when you provide us with your content (texts, images, logo)." },
        { question: "Can I pay in installments?", answer: "Yes. 50% upon order, 50% upon delivery. For Custom projects >5000€, we can spread it over 3 monthly installments (5% surcharge)." },
        { question: "Do you only work in Turin?", answer: "Our office is in Turin, but we support clients throughout Piedmont and even beyond via video call. The important thing is your project, not your zip code." }
      ]
    },
    FR: {
      packs: [
        {
          name: "Essential",
          price: "849",
          description: "Présence digitale souveraine",
          features: [
            "Site vitrine 5 pages sur-mesure",
            "SEO local optimisé Turin/Piémont",
            "Performance 100/100 mobile",
            "Design Cyber-Luxury (Glassmorphism)",
            "Hébergement Europe 12 mois inclus",
            "Livraison en 7 jours ouvrés",
          ],
          cta: "Choisir Essential",
          popular: false,
        },
        {
          name: "Professional",
          price: "1 599",
          description: "Votre première employée digitale",
          features: [
            "Tout le pack Essential inclus",
            "Chatbot IA réservations 24/7",
            "Système de booking automatique",
            "Sogni Lead Hub (Mini-CRM interne)",
            "Génération de leads qualifiés",
            "Tableau de bord analytics",
            "Formation 1h utilisation",
            "Livraison en 10 jours ouvrés",
          ],
          cta: "Choisir Professional",
          popular: true,
        },
        {
          name: "Custom",
          price: "Parlez à notre équipe",
          description: "Votre OS métier propriétaire",
          features: [
            "Tout le pack Professional inclus",
            "Application métier sur-mesure",
            "App mobile native (iOS/Android)",
            "Remplacement total SaaS (HubSpot, etc.)",
            "Intégrations API tierces",
            "Base de données propriétaire",
            "Formation équipe complète",
            "Support prioritaire 6 mois",
          ],
          cta: "Parlez à notre équipe",
          popular: false,
        },
      ],
      boosters: [
        { name: "Google Local", price: "249€", description: "Pour dominer les recherches locales." },
        { name: "AI Content", price: "349€", description: "Contenu SEO généré par IA et édité à la main." },
        { name: "Reputation QR", price: "179€", description: "Système physique pour récolter des avis 5 étoiles Google au point de vente." }
      ],
      sogniCare: [
        { name: "Care Essential", price: "49€/mois", description: "" },
        { name: "Care Pro", price: "99€/mois", description: "" },
        { name: "Note", price: "", description: "Les heures hors contrat sont facturées 65 €/h." }
      ],
      comparisonData: [
        {
          category: "SITE WEB",
          features: [
            { name: "Pages sur-mesure", essential: "max 5", professional: "10", custom: "Illimité" },
            { name: "Design Cyber-Luxury (Glassmorphism)", essential: "✅", professional: "✅", custom: "✅" },
            { name: "Responsive mobile & tablette", essential: "✅", professional: "✅", custom: "✅" },
            { name: "Performance 90+ Core Web Vitals", essential: "✅", professional: "✅", custom: "✅" },
            { name: "SEO local optimisé Turin/Piémont", essential: "✅", professional: "✅", custom: "✅" },
            { name: "Blog/CMS intégré", essential: "❌", professional: "✅", custom: "✅" },
            { name: "Multi-langue (IT/EN/FR)", essential: "❌", professional: "✅", custom: "✅" },
          ]
        },
        {
          category: "AUTOMATISATION & IA",
          features: [
            { name: "Chatbot IA réservations 24/7", essential: "❌", professional: "✅", custom: "✅ Avancé" },
            { name: "Système de booking automatique", essential: "❌", professional: "✅", custom: "✅ Multi-calendriers" },
            { name: "Réponses IA personnalisables", essential: "❌", professional: "Basique", custom: "Avancé + training" },
          ]
        },
        {
          category: "CRM & GESTION",
          features: [
            { name: "Sogni Lead Hub (Mini-CRM)", essential: "❌", professional: "✅", custom: "✅ Avancé" },
            { name: "Gestion des contacts", essential: "❌", professional: "✅", custom: "✅ + segmentation" },
            { name: "Pipeline de vente", essential: "❌", professional: "Basique", custom: "Avancé" },
            { name: "Automatisation emails", essential: "❌", professional: "3 scénarios", custom: "Illimité" },
            { name: "Tableau de bord analytics", essential: "Basique", professional: "Avancé", custom: "Personnalisé" },
          ]
        },
        {
          category: "APPLICATIONS",
          features: [
            { name: "Application métier sur-mesure", essential: "❌", professional: "❌", custom: "✅" },
            { name: "App mobile native (iOS/Android)", essential: "❌", professional: "❌", custom: "✅" },
            { name: "PWA (Progressive Web App)", essential: "❌", professional: "✅", custom: "✅" },
          ]
        },
        {
          category: "INTÉGRATIONS",
          features: [
            { name: "Remplacement SaaS (HubSpot, etc.)", essential: "❌", professional: "Partiel", custom: "Total" },
            { name: "API tierces (Stripe, etc.)", essential: "❌", professional: "2 incluses", custom: "Illimité" },
            { name: "Webhooks & automations", essential: "❌", professional: "Basique", custom: "Avancé" },
          ]
        },
        {
          category: "DONNÉES & SOUVERAINETÉ",
          features: [
            { name: "Base de données propriétaire", essential: "✅", professional: "✅", custom: "✅" },
            { name: "Hébergement Europe (RGPD)", essential: "✅", professional: "✅", custom: "✅" },
            { name: "Export données complet", essential: "✅", professional: "✅", custom: "✅" },
            { name: "Backup automatique quotidien", essential: "✅", professional: "✅", custom: "✅" },
          ]
        },
        {
          category: "ACCOMPAGNEMENT",
          features: [
            { name: "Formation utilisation", essential: "30 min", professional: "1 heure", custom: "Équipe complète" },
            { name: "Support post-livraison", essential: "Email 48h", professional: "Email 24h", custom: "Téléphone + email" },
            { name: "Sogni Care offerte (1ère année)", essential: "❌", professional: "Basic", custom: "Business" },
          ]
        }
      ],
      faqs: [
        { question: "Pourquoi 'sans abonnement toxique' ?", answer: "La plupart des agences vous vendent un site puis vous laissent prisonnier de 10-15 abonnements mensuels (hébergement, CRM, email marketing, chatbot...). Avec Sogni Digitali, vous payez une fois et vous possédez votre système. Votre seul coût récurrent optionnel est Sogni Care pour la maintenance." },
        { question: "Que se passe-t-il si je veux arrêter Sogni Care ?", answer: "Votre système continue de fonctionner normalement. Vous restez propriétaire de tout. Sogni Care est une assurance maintenance, pas une location. Vous pouvez reprendre la maintenance en interne ou chez un autre prestataire à tout moment." },
        { question: "Le Pack Professional remplace vraiment HubSpot/Calendly ?", answer: "Oui. Le Sogni Lead Hub intègre : gestion des contacts, suivi des opportunités, historique des interactions, tâches et rappels. Le système de réservation remplace Calendly Premium. Vous économisez 50-200€/mois de SaaS." },
        { question: "Mes données sont-elles en sécurité ?", answer: "Absolument. Tout est hébergé en Europe (principalement via Supabase, hébergé en Allemagne/France). Aucun transfert vers les USA. Conformité RGPD totale. Vous pouvez exporter vos données à tout moment." },
        { question: "Que veut dire 'vous possédez le code' ?", answer: "Dès la livraison et paiement final, vous devenez propriétaire du code source. Vous pouvez le modifier, le dupliquer, le vendre. Nous ne gardons aucun droit. C'est votre actif digital, pas une location." },
        { question: "Et si je veux évoluer vers le Pack Custom plus tard ?", answer: "Parfait. Le Pack Professional sert de fondation solide. Nous récupérons votre système existant et développons les fonctionnalités métier spécifiques. Vous ne perdez rien, vous gagnez en puissance." },
        { question: "Comment fonctionne le Chatbot IA ?", answer: "Il répond aux questions fréquentes, qualifie les prospects, prend des rendez-vous 24/7 dans votre calendrier. Formation continue possible avec Sogni Care Business. Il apprend de vos conversations." },
        { question: "Quel délai pour voir mon site en ligne ?", answer: "Essential : 7 jours. Professional : 10 jours. Custom : selon complexité (6-12 semaines). Ces délais commencent quand vous nous fournissez vos contenus (textes, images, logo)." },
        { question: "Puis-je payer en plusieurs fois ?", answer: "Oui. 50% à la commande, 50% à la livraison. Pour les projets Custom >5000€, nous pouvons étaler sur 3 mensualités (majoration 5%)." },
        { question: "Vous travaillez uniquement à Turin ?", answer: "Notre bureau est à Turin, mais nous accompagnons des clients dans tout le Piémont et même au-delà en visio. L'important est votre projet, pas votre code postal." }
      ]
    }
  };

  return data[lang as keyof typeof data] || data['IT'];
};
