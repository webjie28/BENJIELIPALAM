import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function run() {
  console.log('Starting screenshot generation...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    // Use high resolution for a clear dashboard view
    await page.setViewport({ width: 1440, height: 900 });

    console.log('Navigating to thesis app...');
    await page.goto('https://automotive-spare-parts-dss-thesis.vercel.app/', {
      waitUntil: 'networkidle2'
    });

    console.log('Filling out login form...');
    await page.waitForSelector('input[type="email"]');
    await page.type('input[type="email"]', 'sample@gmail.com', { delay: 50 });
    await page.type('input[type="password"]', '1234', { delay: 50 });

    console.log('Clicking login button natively...');
    await page.click('button[type="submit"]');

    console.log('Waiting for dashboard container/elements to render...');
    // We saw recharts-surface in the SVG list, let's wait for it or just wait 10 seconds for stability
    await new Promise(r => setTimeout(r, 10000));

    console.log('Checking page text to verify login...');
    const bodyText = await page.evaluate(() => document.body.innerText);
    if (bodyText.includes('Dashboard Overview') || bodyText.includes('Sales & Analytics')) {
      console.log('Login verified successfully!');
      
      const screenshotPath = path.resolve('thesis_screenshot.png');
      await page.screenshot({ path: screenshotPath });
      console.log(`Saved screenshot to: ${screenshotPath}`);
    } else {
      console.error('Could not verify dashboard text. Current page text:', bodyText.slice(0, 500));
      throw new Error('Login verification failed.');
    }

    // Clean up debug/temp files from previous diagnostics
    const filesToClean = [
      'debug_step_1_empty.png',
      'debug_step_2_typed.png',
      'debug_step_3_clicked.png',
      'debug_step_4_final.png',
      'diag_before_click.png',
      'diag_after_click_1.png',
      'diag_after_click_2.png',
      'diag_after_click_3.png',
      'diag_after_click_4.png',
      'diag_after_click_5.png'
    ];

    for (const file of filesToClean) {
      const filePath = path.resolve(file);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`Deleted temp file: ${file}`);
      }
    }

  } catch (error) {
    console.error('Automation failed:', error);
  } finally {
    await browser.close();
    console.log('Browser closed.');
  }
}

run();
