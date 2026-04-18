const WEBHOOK_URL = "https://ais-dev-ke2nxixc46dxar4iggmjtj-267505094308.europe-west2.run.app/api/leads/capture";

async function test() {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        business: 'Altro',
        message: 'Test message from Node.js script',
        source: 'Sogni Digitali Website',
        createdAt: new Date().toISOString()
      })
    });
    
    const text = await response.text();
    console.log('Status:', response.status);
    console.log('Headers:', response.headers);
    console.log('Response:', text);
  } catch (err) {
    console.error('Error:', err);
  }
}

test();
