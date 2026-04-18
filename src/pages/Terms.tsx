import React, { useEffect } from 'react';
import { motion } from 'motion/react';

export default function Terms({ lang }: { lang: string }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const content = {
    IT: {
      title: "Termini e Condizioni",
      lastUpdated: "Ultimo aggiornamento: Marzo 2026",
      sections: [
        {
          title: "1. Accettazione dei Termini",
          text: "Accedendo e utilizzando i servizi di Sogni Digitali, accetti di essere vincolato dai presenti Termini e Condizioni. Se non accetti questi termini, ti preghiamo di non utilizzare i nostri servizi."
        },
        {
          title: "2. Servizi Offerti",
          text: "Sogni Digitali fornisce servizi di web design, sviluppo software, integrazione di intelligenza artificiale e marketing digitale. I dettagli specifici dei servizi, inclusi i costi e le tempistiche, saranno definiti in un contratto separato o in un preventivo approvato."
        },
        {
          title: "3. Pagamenti e Fatturazione",
          text: "I pagamenti per i servizi devono essere effettuati secondo le scadenze concordate. Ci riserviamo il diritto di sospendere i servizi in caso di mancato pagamento. Tutti i prezzi indicati sono al netto dell'IVA, ove applicabile."
        },
        {
          title: "4. Proprietà Intellettuale",
          text: "Tutto il codice, il design e i contenuti creati da Sogni Digitali rimangono di nostra proprietà fino al saldo completo del pagamento. Una volta saldato, i diritti di utilizzo vengono trasferiti al cliente, salvo diversamente concordato."
        },
        {
          title: "5. Limitazione di Responsabilità",
          text: "Sogni Digitali non sarà responsabile per danni indiretti, incidentali o consequenziali derivanti dall'uso dei nostri servizi. La nostra responsabilità totale non supererà l'importo pagato per il servizio in questione."
        },
        {
          title: "6. Modifiche ai Termini",
          text: "Ci riserviamo il diritto di modificare questi termini in qualsiasi momento. Le modifiche saranno effettive immediatamente dopo la pubblicazione sul nostro sito web."
        }
      ]
    },
    FR: {
      title: "Termes et Conditions",
      lastUpdated: "Dernière mise à jour : Mars 2026",
      sections: [
        {
          title: "1. Acceptation des Termes",
          text: "En accédant et en utilisant les services de Sogni Digitali, vous acceptez d'être lié par les présents Termes et Conditions. Si vous n'acceptez pas ces termes, veuillez ne pas utiliser nos services."
        },
        {
          title: "2. Services Fournis",
          text: "Sogni Digitali fournit des services de conception web, de développement de logiciels, d'intégration d'intelligence artificielle et de marketing numérique. Les détails spécifiques des services, y compris les coûts et les délais, seront définis dans un contrat séparé ou un devis approuvé."
        },
        {
          title: "3. Paiements et Facturation",
          text: "Les paiements pour les services doivent être effectués selon les échéances convenues. Nous nous réservons le droit de suspendre les services en cas de non-paiement. Tous les prix indiqués s'entendent hors TVA, le cas échéant."
        },
        {
          title: "4. Propriété Intellectuelle",
          text: "Tout le code, le design et le contenu créés par Sogni Digitali restent notre propriété jusqu'au paiement intégral. Une fois payé, les droits d'utilisation sont transférés au client, sauf accord contraire."
        },
        {
          title: "5. Limitation de Responsabilité",
          text: "Sogni Digitali ne sera pas responsable des dommages indirects, accessoires ou consécutifs découlant de l'utilisation de nos services. Notre responsabilité totale ne dépassera pas le montant payé pour le service en question."
        },
        {
          title: "6. Modifications des Termes",
          text: "Nous nous réservons le droit de modifier ces termes à tout moment. Les modifications prendront effet immédiatement après leur publication sur notre site web."
        }
      ]
    },
    EN: {
      title: "Terms and Conditions",
      lastUpdated: "Last updated: March 2026",
      sections: [
        {
          title: "1. Acceptance of Terms",
          text: "By accessing and using the services of Sogni Digitali, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services."
        },
        {
          title: "2. Services Provided",
          text: "Sogni Digitali provides web design, software development, artificial intelligence integration, and digital marketing services. Specific details of the services, including costs and timelines, will be defined in a separate contract or approved quote."
        },
        {
          title: "3. Payments and Billing",
          text: "Payments for services must be made according to the agreed deadlines. We reserve the right to suspend services in case of non-payment. All prices quoted are exclusive of VAT, where applicable."
        },
        {
          title: "4. Intellectual Property",
          text: "All code, design, and content created by Sogni Digitali remain our property until full payment is received. Once paid, usage rights are transferred to the client, unless otherwise agreed."
        },
        {
          title: "5. Limitation of Liability",
          text: "Sogni Digitali shall not be liable for indirect, incidental, or consequential damages arising from the use of our services. Our total liability shall not exceed the amount paid for the service in question."
        },
        {
          title: "6. Changes to Terms",
          text: "We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website."
        }
      ]
    }
  };

  const currentContent = content[lang as keyof typeof content] || content.IT;

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
