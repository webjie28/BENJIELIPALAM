import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function run() {
  console.log('Starting full system capture...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    console.log('Navigating and logging in...');
    await page.goto('https://automotive-spare-parts-dss-thesis.vercel.app/', {
      waitUntil: 'networkidle2'
    });

    await page.waitForSelector('input[type="email"]');
    await page.type('input[type="email"]', 'sample@gmail.com');
    await page.type('input[type="password"]', '1234');
    await page.click('button[type="submit"]');

    // Wait for dashboard
    await new Promise(r => setTimeout(r, 8000));
    console.log('Logged in. Capturing Dashboard Overview...');
    await page.screenshot({ path: 'thesis_1_dashboard.png' });
    console.log('Saved thesis_1_dashboard.png');

    // Helper to click sidebar item by text
    const clickSidebarItem = async (text) => {
      console.log(`Attempting to click sidebar item: "${text}"`);
      const clicked = await page.evaluate((btnText) => {
        const elements = Array.from(document.querySelectorAll('a, button, span, li'));
        const target = elements.find(el => {
          const t = el.textContent.trim().toLowerCase();
          return t === btnText.toLowerCase();
        });
        if (target) {
          target.click();
          return true;
        }
        return false;
      }, text);
      return clicked;
    };

    // Category 2: Predictions & Trends
    const click2 = await clickSidebarItem('Predictions & Trends');
    console.log('Clicked Predictions & Trends:', click2);
    await new Promise(r => setTimeout(r, 5000));
    await page.screenshot({ path: 'thesis_2_predictions.png' });
    console.log('Saved thesis_2_predictions.png');

    // Category 3: Recommendations
    const click3 = await clickSidebarItem('Recommendations');
    console.log('Clicked Recommendations:', click3);
    await new Promise(r => setTimeout(r, 5000));
    await page.screenshot({ path: 'thesis_3_recommendations.png' });
    console.log('Saved thesis_3_recommendations.png');

    // Category 4: Inventory
    const click4 = await clickSidebarItem('Inventory');
    console.log('Clicked Inventory:', click4);
    await new Promise(r => setTimeout(r, 5000));
    await page.screenshot({ path: 'thesis_4_inventory.png' });
    console.log('Saved thesis_4_inventory.png');

  } catch (error) {
    console.error('Capture failed:', error);
  } finally {
    await browser.close();
    console.log('Browser closed.');
  }
}

run();
