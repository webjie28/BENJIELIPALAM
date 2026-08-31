import puppeteer from 'puppeteer-core';
import fs from 'node:fs/promises';
import path from 'node:path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outputDir = path.resolve('screenshots', 'reels');
const captures = [
  { name: 'portfolio-ai-hero', url: 'http://127.0.0.1:5173/', waitFor: '.hero-section' },
  { name: 'ai-recruiter-overview', url: 'https://ai-recruitment-agent-n8n.vercel.app/', waitFor: 'h1' },
  { name: 'ai-recruiter-workflow', url: 'https://ai-recruitment-agent-n8n.vercel.app/', waitFor: 'img[alt="Final n8n canvas layout"]', selector: 'img[alt="Final n8n canvas layout"]' },
  { name: 'auto-clock-source', url: 'https://github.com/webjie28/n8n-auto-clock-in-out', waitFor: 'main' },
];

async function capture() {
  await fs.mkdir(outputDir, { recursive: true });
  const browser = await puppeteer.launch({ executablePath: chromePath, headless: true, args: ['--no-sandbox'] });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

    for (const item of captures) {
      await page.goto(item.url, { waitUntil: 'networkidle2', timeout: 45_000 });
      await page.waitForSelector(item.waitFor, { timeout: 20_000 });
      await page.evaluate(() => window.scrollTo(0, 0));
      const output = path.join(outputDir, `${item.name}.png`);
      if (item.selector) {
        const element = await page.$(item.selector);
        if (!element) throw new Error(`Missing capture target: ${item.selector}`);
        await element.screenshot({ path: output });
      } else {
        await page.screenshot({ path: output, fullPage: false });
      }
      console.log(`Saved ${path.basename(output)}`);
    }
  } finally {
    await browser.close();
  }
}

capture().catch((error) => { console.error(error); process.exitCode = 1; });
