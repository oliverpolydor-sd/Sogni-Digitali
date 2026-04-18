import https from 'https';

const data = JSON.stringify({
  name: "System Test",
  email: "test-integration@sogni-digitali.com",
  business: "Technology",
  message: "Testing CRM connection from AI Studio",
  source: "Sogni Digitali Website"
});

const req = https.request('https://ais-dev-ke2nxixc46dxar4iggmjtj-267505094308.europe-west2.run.app/api/leads/capture', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'sh_live_bj73zm4ff5kbb07hohv6rw',
    'Content-Length': data.length
  }
}, (res) => {
  let responseBody = '';
  res.on('data', (chunk) => responseBody += chunk);
  res.on('end', () => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`BODY: ${responseBody}`);
  });
});

req.on('error', (e) => console.error(e));
req.write(data);
req.end();
