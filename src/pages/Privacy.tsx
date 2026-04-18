import React, { useEffect } from 'react';
import { motion } from 'motion/react';

export default function Privacy({ lang }: { lang: string }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const content = {
    IT: {
      title: "Privacy Policy",
      lastUpdated: "Ultimo aggiornamento: Aprile 2026",
      sections: [
        {
          title: "1. Introduzione",
          text: "Sogni Digitali prende sul serio la tua privacy. Questa politica descrive come raccogliamo, utilizziamo e proteggiamo i tuoi dati personali ai sensi del GDPR (Regolamento UE 2016/679)."
        },
        {
          title: "2. Dati che Raccogliamo",
          text: "Raccogliamo i dati che ci fornisci volontariamente tramite moduli di contatto (nome, email, telefono, dettagli del progetto) e i dati raccolti automaticamente tramite cookie o log di sistema (indirizzi IP, comportamento di navigazione) previa approvazione."
        },
        {
          title: "3. Come Utilizziamo i Tuoi Dati",
          text: "I tuoi dati vengono utilizzati per: rispondere alle tue richieste, fornirti preventivi e servizi, inviare aggiornamenti (se iscritti) e analizzare il traffico del sito web per migliorare l'esperienza utente."
        },
        {
          title: "4. Archiviazione e Sicurezza dei Dati",
          text: "I tuoi dati vengono archiviati su server sicuri gestiti dai nostri partner di hosting nel rispetto degli standard UE. Adottiamo misure di sicurezza ragionevoli per prevenire l'accesso non autorizzato ai tuoi dati."
        },
        {
          title: "5. I Tuoi Diritti GDPR",
          text: "Hai il diritto di accedere, rettificare, scaricare o richiedere la cancellazione dei tuoi dati personali in qualsiasi momento (Diritto all'oblio). Puoi inoltre negare o ritirare il consenso all'uso dei cookie. Per esercitare questi diritti, contattaci a privacy@sognidigitali.com."
        },
        {
          title: "6. Modifiche a Questa Politica",
          text: "Potremmo aggiornare di tanto in tanto la nostra Privacy Policy. Ti avviseremo di qualsiasi modifica pubblicando la nuova politica su questa pagina."
        }
      ]
    },
    FR: {
      title: "Politique de Confidentialité",
      lastUpdated: "Dernière mise à jour : Avril 2026",
      sections: [
        {
          title: "1. Introduction",
          text: "Sogni Digitali prend votre vie privée au sérieux. Cette politique décrit comment nous collectons, utilisons et protégeons vos données personnelles conformément au RGPD (Règlement UE 2016/679)."
        },
        {
          title: "2. Données que nous collectons",
          text: "Nous collectons les données que vous nous fournissez volontairement via les formulaires de contact (nom, email, téléphone, détails du projet) ainsi que les données collectées automatiquement par les cookies ou logs système (adresses IP, comportement de navigation) après consentement."
        },
        {
          title: "3. Comment nous utilisons vos données",
          text: "Vos données sont utilisées pour : répondre à vos demandes, fournir des devis et nos services, envoyer des mises à jour (si vous êtes abonné) et analyser le trafic du site pour améliorer l'expérience utilisateur."
        },
        {
          title: "4. Stockage et sécurité des données",
          text: "Vos données sont stockées sur des serveurs sécurisés gérés par nos partenaires d'hébergement, dans le respect des normes européennes. Nous mettons en œuvre des mesures adaptées pour empêcher tout accès non autorisé à vos informations."
        },
        {
          title: "5. Vos droits RGPD",
          text: "Vous avez le droit d'accéder à vos données personnelles, de les modifier, de les télécharger ou de demander leur effacement à tout moment (Droit à l'oubli). Vous pouvez de plus refuser ou retirer votre consentement aux cookies. Pour exercer ces droits, contactez-nous à privacy@sognidigitali.com."
        },
        {
          title: "6. Modifications de cette politique",
          text: "Nous pouvons mettre à jour notre politique de confidentialité de temps à autre. Nous vous informerons de tout changement en publiant la nouvelle politique sur cette page."
        }
      ]
    },
    EN: {
      title: "Privacy Policy",
      lastUpdated: "Last updated: April 2026",
      sections: [
        {
          title: "1. Introduction",
          text: "Sogni Digitali takes your privacy seriously. This policy describes how we collect, use, and protect your personal data in compliance with the GDPR (EU Regulation 2016/679)."
        },
        {
          title: "2. Data We Collect",
          text: "We collect data you voluntarily provide through contact forms (name, email, phone, project details) and data collected automatically via cookies or system logs (IP addresses, browsing behavior) upon consent."
        },
        {
          title: "3. How We Use Your Data",
          text: "Your data is used to: respond to your inquiries, provide quotes and services, send updates (if subscribed), and analyze website traffic to improve user experience."
        },
        {
          title: "4. Data Storage and Security",
          text: "Your data is stored securely on servers operated by our hosting partners in compliance with EU standards. We implement reasonable security measures to prevent unauthorized access to your records."
        },
        {
          title: "5. Your GDPR Rights",
          text: "You have the right to access, rectify, download, or request the deletion of your personal data at any time (Right to be Forgotten). You can also deny or withdraw your consent regarding cookie usage. To exercise these rights, contact us at privacy@sognidigitali.com."
        },
        {
          title: "6. Changes to This Policy",
          text: "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page."
        }
      ]
    }
  };

  const currentContent = content[lang as keyof typeof content] || content.EN;

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            {currentContent.title}
          </h1>
          <p className="text-slate-400 font-light">
            {currentContent.lastUpdated}
          </p>
        </motion.div>

        <div className="space-y-12">
          {currentContent.sections.map((section, index) => (
            <motion.section 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h2 className="text-2xl font-display font-bold mb-4 text-white">
                {section.title}
              </h2>
              <p className="text-slate-300 font-light leading-relaxed">
                {section.text}
              </p>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
}
