import * as fs from 'fs';

let code = fs.readFileSync('src/lib/pricingData.ts', 'utf8');

const careIT = `      careComparisonData: [
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
      faqs: [`;

const careEN = `      careComparisonData: [
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
      faqs: [`;

const careFR = `      careComparisonData: [
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
      faqs: [`;

const careAR = `      careComparisonData: [
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
      faqs: [`;

let parts = code.split(/faqs:\s*\[/);

if (parts.length === 5) {
  code = parts[0] + careIT + parts[1] + careEN + parts[2] + careFR + parts[3] + careAR + parts[4];
  fs.writeFileSync('src/lib/pricingData.ts', code, 'utf8');
  console.log("Updated pricingData.ts successfully.");
} else {
  console.log("Could not find faqs: [ in 4 places. Found " + (parts.length - 1));
}
