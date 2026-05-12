import React, { useEffect } from 'react';
import { motion } from 'motion/react';

export default function Terms({ lang }: { lang: string }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const content = {
    IT: {
      title: "Termini e Condizioni (CGV)",
      lastUpdated: "Ultimo aggiornamento: Aprile 2026",
      sections: [
        {
          title: "1. Oggetto",
          text: "Le presenti CGV regolano i rapporti contrattuali tra Sogni Digitali di Desire Laval Oliver Polydor e il Cliente per i servizi di web design e IA."
        },
        {
          title: "2. Proprietà e Trasferimento",
          text: "Sogni Digitali conserva la proprietà delle creazioni fino al saldo completo. Una volta saldato, viene rilasciata una Licenza di Proprietà al Cliente."
        },
        {
          title: "3. Pagamenti (Kill-Switch)",
          text: "In caso di mancato pagamento, Sogni Digitali sospenderà immediatamente l'accesso ai sistemi e la consegna delle chiavi amministrative."
        },
        {
          title: "4. Limitazione Responsabilità IA",
          text: "L'IA è una tecnologia probabilistica. Sogni Digitali non garantisce l'assenza totale di errori (hallucinations) e il Cliente è responsabile della supervisione delle risposte."
        }
      ]
    },
    FR: {
      title: "Conditions Générales de Vente (CGV)",
      lastUpdated: "Dernière mise à jour : Avril 2026",
      sections: [
        {
          title: "1. Objet",
          text: "Les présentes CGV régissent les relations contractuelles entre Sogni Digitali di Desire Laval Oliver Polydor et le Client pour les services web et IA."
        },
        {
          title: "2. Propriété et Transfert",
          text: "Sogni Digitali conserve la propriété des créations jusqu'au paiement intégral. Une fois soldé, une Licence de Propriété est délivrée au Client."
        },
        {
          title: "3. Paiements (Kill-Switch)",
          text: "En cas de défaut de paiement, Sogni Digitali suspendra immédiatement l'accès aux systèmes et la remise des clés d'administration."
        },
        {
          title: "4. Limitation Responsabilité IA",
          text: "L'IA est une technologie probabiliste. Sogni Digitali ne garantit pas l'absence totale d'erreurs (hallucinations). Le Client est responsable de la supervision."
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
