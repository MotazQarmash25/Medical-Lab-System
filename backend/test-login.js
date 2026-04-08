const http = require('http');

const postData = JSON.stringify({
  username: 'doctor1',
  password: 'StrongPassword123!'
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/doctor/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log('HEADERS:', JSON.stringify(res.headers));
  
  res.setEncoding('utf8');
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('\n✅ Response Body:');
    try {
      console.log(JSON.stringify(JSON.parse(data), null, 2));
    } catch (e) {
      console.log(data);
    }
    process.exit(0);
  });
});

req.on('error', (e) => {
  console.error(`❌ Problem with request: ${e.message}`);
  process.exit(1);
});

console.log('🔍 Testing login with doctor1 / StrongPassword123!\n');
req.write(postData);
req.end();
