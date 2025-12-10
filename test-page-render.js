// Simple test to verify page rendering
const puppeteer = require('puppeteer');
const path = require('path');

async function testPageRender() {
  console.log('Testing page render...');
  
  try {
    // Launch browser
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Navigate to the foster agency page
    console.log('Navigating to http://localhost:3001/foster-agency/england...');
    await page.goto('http://localhost:3001/foster-agency/england', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    
    // Wait for the page to load
    await page.waitForSelector('body', { timeout: 10000 });
    
    // Get the page title
    const title = await page.title();
    console.log('Page title:', title);
    
    // Get the page content
    const content = await page.content();
    
    // Check if we have the expected content
    if (content.includes('England') && content.includes('Counties')) {
      console.log('✅ Page rendered correctly with England data');
    } else {
      console.log('⚠️ Page may not have rendered correctly');
      console.log('Content snippet:', content.substring(0, 500));
    }
    
    // Take a screenshot
    await page.screenshot({ path: 'foster-agency-england-test.png' });
    console.log('Screenshot saved as foster-agency-england-test.png');
    
    await browser.close();
    console.log('Test completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testPageRender();