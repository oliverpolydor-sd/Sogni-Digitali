import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  type?: string;
  image?: string;
  keywords?: string[];
}

export default function SEO({ 
  title = "Sogni Digitali | Agenzia Web & Intelligenza Artificiale",
  description = "Sogni Digitali ti accompagna nell'evoluzione digitale con soluzioni Web, App e Intelligenza Artificiale su misura. Soluzioni efficaci, veloci e 100% tue.",
  type = "website",
  image = "https://sognidigitali.com/nexus%20os.png",
  keywords = ["agenzia web", "intelligenza artificiale", "siti web creazioni", "web design", "sviluppo web", "Sogni Digitali", "agenzia digitale Torino"]
}: SEOProps) {
  const location = useLocation();
  const currentUrl = `https://sognidigitali.com${location.pathname}`;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="it_IT" />
      <meta property="og:site_name" content="Sogni Digitali" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />

      {/* Structured Data (JSON-LD) */}
      {/* Example for Organization data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Sogni Digitali",
          "url": "https://sognidigitali.com",
          "logo": "https://sognidigitali.com/my-logo.png",
          "description": "Sogni Digitali ti accompagna nell'evoluzione digitale con soluzioni Web, App e Intelligenza Artificiale su misura.",
          "contactPoint": {
            "@type": "ContactPoint",
            "email": "contact@sogni-digitali.com",
            "contactType": "customer service"
          }
        })}
      </script>
    </Helmet>
  );
}
