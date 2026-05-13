import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export default function Analytics() {
  const location = useLocation();

  useEffect(() => {
    const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-92SZE7Z7CS';
    
    if (!gaMeasurementId) return;

    // Only initialize once
    if (!window.gtag) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        window.dataLayer.push(arguments);
      };
      
      window.gtag('js', new Date());

      // Set default consent to 'denied'
      window.gtag('consent', 'default', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'analytics_storage': 'denied',
        'wait_for_update': 500
      });

      // Update consent based on existing cookie preferences
      try {
        const consent = localStorage.getItem('sogni_digitali_cookie_consent');
        if (consent === 'accepted_all') {
          window.gtag('consent', 'update', {
            'analytics_storage': 'granted',
            'ad_storage': 'granted',
            'ad_user_data': 'granted',
            'ad_personalization': 'granted'
          });
        } else if (consent && consent.includes('custom')) {
          const parsed = JSON.parse(consent);
          const prefs = parsed.preferences || {};
          window.gtag('consent', 'update', {
            'analytics_storage': prefs.analytics ? 'granted' : 'denied',
            'ad_storage': prefs.marketing ? 'granted' : 'denied',
            'ad_user_data': prefs.marketing ? 'granted' : 'denied',
            'ad_personalization': prefs.marketing ? 'granted' : 'denied'
          });
        }
      } catch (e) {
        // Ignore JSON parse errors
      }

      window.gtag('config', gaMeasurementId, {
        page_path: location.pathname + location.search,
      });

      // Inject the script tag
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`;
      script.async = true;
      document.head.appendChild(script);
    } else {
      // If already initialized, just track the pageview
      window.gtag('config', gaMeasurementId, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
}
