const data = {
  name: "System Test",
  email: "test-integration@sogni-digitali.com",
  business: "Technology",
  message: "Testing CRM connection from AI Studio",
  source: "Sogni Digitali Website"
};

async function runTest() {
  try {
    const res = await fetch('https://ais-dev-ke2nxixc46dxar4iggmjtj-267505094308.europe-west2.run.app/api/leads/capture', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'sh_live_bj73zm4ff5kbb07hohv6rw'
      },
      body: JSON.stringify(data)
    });
    console.log(`STATUS: ${res.status}`);
    const body = await res.text();
    console.log(`BODY: ${body}`);
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

runTest();
