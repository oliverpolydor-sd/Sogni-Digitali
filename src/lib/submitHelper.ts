export const submitFormToBridge = async (formData: any, _honeypot: string, affiliateId: string | null) => {
  if (affiliateId && !/^[a-zA-Z0-9]{1,20}$/.test(affiliateId)) {
    throw new Error('Invalid Affiliate ID format');
  }

  try {
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        _honeypot,
        affiliateId,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Submission failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error("Form submission error:", error);
    throw error;
  }
};
