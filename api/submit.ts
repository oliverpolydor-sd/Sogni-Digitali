import type { VercelRequest, VercelResponse } from '@vercel/node';

const isValidAffiliateId = (id: string | null) => {
  if (!id) return true;
  return /^[a-zA-Z0-9]{1,20}$/.test(id);
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { _honeypot, affiliateId, ...formData } = req.body;
  
  if (_honeypot && _honeypot.length > 0) {
    return res.status(200).json({ success: true, message: 'Submission successful' });
  }

  if (!isValidAffiliateId(affiliateId)) {
    return res.status(400).json({ error: 'Invalid Affiliate ID format.' });
  }

  try {
    const webhookUrl = process.env.GOOGLE_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error('Missing GOOGLE_WEBHOOK_URL in environment');
      return res.status(500).json({ error: 'Internal Server Configuration Error' });
    }
    
    const payload = {
      ...formData,
      affiliateId: affiliateId || '',
      timestamp: new Date().toISOString()
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Upstream error: ${response.status}`);
    }

    res.status(200).json({ success: true, message: 'Submission successful' });
    
  } catch (error: any) {
    console.error('Submission error:', error.message || error);
    res.status(500).json({ error: 'Failed to process submission safely' });
  }
}
