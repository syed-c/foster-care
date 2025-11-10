const https = require('https');

// Test Supabase URL
const url = 'https://vcvvtklbyvdbysfdbnfp.supabase.co';

console.log('Testing HTTP connection to:', url);

https.get(url, (res) => {
  console.log('Status Code:', res.statusCode);
  console.log('Headers:', res.headers);
  
  res.on('data', (chunk) => {
    console.log('Body chunk length:', chunk.length);
  });
  
  res.on('end', () => {
    console.log('Request completed');
  });
}).on('error', (err) => {
  console.error('HTTP Error:', err.message);
});