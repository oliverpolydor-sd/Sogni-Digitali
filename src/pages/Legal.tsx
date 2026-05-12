import React, { useEffect } from 'react';
import { motion } from 'motion/react';

export default function Legal({ lang }: { lang: string }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const content = {
    IT: {
      title: "Note legali",
      lastUpdated: "Ultimo aggiornamento: Aprile 2026",
      sections: [
        {
          title: "Informazioni Aziendali",
          text: "Sogni Digitali di Desire Laval Oliver Polydor\nSede legale: Torino, Piemonte, Italia\nPartita IVA: IT13347550017\nEmail: hello@sognidigitali.com\nTelefono: +39 375 588 0609\n\nOperazione in franchise di IVA (Regime Forfettario)."
        },
        {
          title: "Rappresentante Legale",
          text: "Directeur de la publication: Désiré Laval Oliver Polydor"
        },
        {
          title: "Hosting",
          text: "Questo sito web è ospitato da Hostinger International Ltd.\nIndirizzo Host: 61 Lordou Vironos Street, 6023 Larnaca, Cipro."
        },
        {
          title: "Diritti d'Autore",
          text: "Tutti i contenuti presenti su questo sito (testi, immagini, loghi, codice sorgente) sono di proprietà esclusiva di Sogni Digitali. È severamente vietata la riproduzione, totale o parziale, senza previo consenso scritto."
        }
      ]
    },
    FR: {
      title: "Mentions Légales",
      lastUpdated: "Dernière mise à jour : Avril 2026",
      sections: [
        {
          title: "Informations sur l'Entreprise",
          text: "Sogni Digitali di Desire Laval Oliver Polydor\nSiège social : Turin, Piémont, Italie\nNuméro de TVA: IT13347550017\nEmail : hello@sognidigitali.com\nTéléphone : +39 375 588 0609\n\nOpération en franchise de TVA (Regime Forfettario)."
        },
        {
          title: "Directeur de la publication",
          text: "Directeur de publication : Désiré Laval Oliver Polydor"
        },
        {
          title: "Hébergement",
          text: "Ce site internet est hébergé par Hostinger International Ltd.\nAdresse de l'hébergeur : 61 Lordou Vironos Street, 6023 Larnaca, Chypre."
        },
        {
          title: "Propriété Intellectuelle",
          text: "L'ensemble des éléments de ce site internet (textes, images, logos, code) est la propriété exclusive de Sogni Digitali. Toute reproduction partielle ou totale est strictement interdite sans accord écrit."
        }
      ]
    },
    EN: {
      title: "Legal Mentions",
      lastUpdated: "Last updated: April 2026",
      sections: [
        {
          title: "Company Information",
          text: "Sogni Digitali LLC / Ltd.\nRegistered Office: [Your Address], [City], [Country]\nVAT ID / Company Number: XX12345678901\nEmail: info@sognidigitali.com\nPhone: +1 234 567 890"
        },
        {
          title: "Publisher",
          text: "Publication Director / CEO: [Your Name]"
        },
        {
          title: "Hosting Provider",
          text: "This website is hosted on Google Cloud / Vercel.\nHost Address: [Host Address]."
        },
        {
          title: "Copyright & Intellectual Property",
          text: "All materials on this website (text, images, logos, source code) are the exclusive property of Sogni Digitali. Any partial or total reproduction is strictly prohibited without prior written consent."
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
              <p className="text-slate-300 font-light leading-relaxed whitespace-pre-line">
                {section.text}
              </p>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
}
