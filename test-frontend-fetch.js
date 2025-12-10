// Simple test to verify frontend can fetch data
const express = require('express');
const path = require('path');

const app = express();
const port = 3006;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Create a simple HTML page that tests the fetch
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Fetch Test</title>
    </head>
    <body>
        <h1>Fetch Test</h1>
        <button onclick="testFetch()">Test Fetch</button>
        <div id="result"></div>
        
        <script>
            async function testFetch() {
                const resultDiv = document.getElementById('result');
                resultDiv.innerHTML = 'Loading...';
                
                try {
                    // Use the same URL as the frontend component
                    const baseUrl = 'http://localhost:3005';
                    const apiUrl = baseUrl + '/api/foster-agency/england';
                    
                    console.log('Fetching from:', apiUrl);
                    
                    const response = await fetch(apiUrl);
                    
                    console.log('Response status:', response.status);
                    
                    if (!response.ok) {
                        throw new Error('HTTP error! status: ' + response.status);
                    }
                    
                    const data = await response.json();
                    console.log('Data received:', data);
                    
                    resultDiv.innerHTML = 
                        '<h2>Success!</h2>' +
                        '<p>Country: ' + data.title + '</p>' +
                        '<p>Regions: ' + data.regions.length + '</p>' +
                        '<p>Counties: ' + data.counties.length + '</p>' +
                        '<p>Blocks: ' + data.blocks.length + '</p>' +
                        '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
                } catch (error) {
                    console.error('Error:', error);
                    resultDiv.innerHTML = '<h2>Error:</h2><p>' + error.message + '</p>';
                }
            }
        </script>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log('Test server running at http://localhost:' + port + '/');
});