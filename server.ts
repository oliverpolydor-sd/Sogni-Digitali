import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import path from 'path';

// Ensure this matches what's in the original app.
// In a real app we would use process.env.GOOGLE_WEBHOOK_URL
// Removed hardcoded default to avoid exposing internal API on GitHub/Vercel

// Validate alphanumeric affiliate IDs (max 20 chars)
const isValidAffiliateId = (id: string | null) => {
  if (!id) return true; // Optional
  return /^[a-zA-Z0-9]{1,20}$/.test(id);
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Trust proxy is required when behind a reverse proxy (like Cloud Run or AI Studio)
  // This fixes the X-Forwarded-For rate limit warnings and correctly identifies client IPs
  app.set('trust proxy', 1);

  // Enhance security headers (using helmet but allowing our assets)
  app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  }));
  
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Set up rate limiting
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window`
    standardHeaders: true,
    legacyHeaders: false,
    validate: { trustProxy: false, xForwardedForHeader: false, forwardedHeader: false },
    message: { error: 'Too many requests from this IP, please try again after 15 minutes' }
  });

  // Strict rate limit for form submissions
  const formLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // Limit each IP to 10 submissions per hour
    validate: { trustProxy: false, xForwardedForHeader: false, forwardedHeader: false },
    message: { error: 'Too many submissions. Please try again later.' }
  });

  // Apply general API rate limit
  app.use('/api', apiLimiter);

  // Security Bridge Endpoint for Form Submissions
  app.post('/api/submit', formLimiter, async (req, res) => {
    const { _honeypot, affiliateId, ...formData } = req.body;
    
    // 1. Validate CAPTCHA Token (Honeypot)
    if (_honeypot && _honeypot.length > 0) {
      // If the honeypot is filled, silently succeed
      return res.status(200).json({ success: true, message: 'Submission successful' });
    }

    // 2. Strict Input Validation (Sanitize and validate affiliate ID)
    if (!isValidAffiliateId(affiliateId)) {
      return res.status(400).json({ error: 'Invalid Affiliate ID format.' });
    }

    try {
      // 3. Forward request to hidden Google Sheets Webhook
      const webhookUrl = process.env.GOOGLE_WEBHOOK_URL;
      if (!webhookUrl) {
        throw new Error('Missing environment variable: GOOGLE_WEBHOOK_URL');
      }
      
      const payload = {
        ...formData,
        affiliateId: affiliateId || '',
        timestamp: new Date().toISOString()
      };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain', // Google Apps Script often expects plain text rather than application/json across CORS
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Upstream error: ${response.status} from ${webhookUrl.substring(0, 20)}...`);
      }

      // We only return a simple success, not the internal upstream response
      res.status(200).json({ success: true, message: 'Submission successful' });
      
    } catch (error: any) {
      console.error('Submission error:', error.message || error);
      res.status(500).json({ error: 'Failed to process submission safely' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    // In dev mode, we start Vite and use it as middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve the built static assets from dist/
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
