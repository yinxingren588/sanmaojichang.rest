import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';

const base = process.env.QA_BASE_URL || 'http://127.0.0.1:4322';
const browser = await chromium.launch({ executablePath: process.env.BROWSER_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: true });
const page = await browser.newPage();
const errors = [], requests = [];
page.on('pageerror', error => errors.push(error.message));
page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
page.on('request', request => requests.push(request.url()));
try {
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const path of ['/', '/blog/cost-per-gb/', '/compare/', '/guides/', '/recommend/beginner/', '/ranking/overall/']) {
      await page.goto(base + path, { waitUntil: 'load' });
      const state = await page.evaluate(() => ({ overflow: document.documentElement.scrollWidth > innerWidth + 1, scenery: getComputedStyle(document.querySelector('.anime-scenery')).backgroundImage, animation: getComputedStyle(document.querySelector('.scenery-cloud')).animationName }));
      if (state.overflow) errors.push(`${width}px ${path} horizontal overflow`);
      if (!state.scenery.includes(width <= 600 ? 'anime-sky-mobile.webp' : 'anime-sky.webp')) errors.push(`${width}px ${path} wrong background`);
      if (state.animation !== 'scenery-cloud-drift') errors.push(`${width}px ${path} animation missing`);
    }
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  if (await page.locator('.scenery-cloud').first().evaluate(e => getComputedStyle(e).animationName) !== 'none') errors.push('Reduced motion preference was not respected');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base + '/');
  await page.getByLabel('展开导航').click();
  if (!await page.getByRole('navigation', { name: '移动端导航' }).isVisible()) errors.push('Mobile navigation failed');
  await mkdir('docs/qa/screenshots', { recursive: true });
  await page.goto(base + '/');
  await page.screenshot({ path: 'docs/qa/screenshots/anime-home-mobile.png', fullPage: true, animations: 'disabled' });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(base + '/');
  await page.screenshot({ path: 'docs/qa/screenshots/anime-home-desktop.png', fullPage: true, animations: 'disabled' });
  await page.screenshot({ path: 'docs/qa/screenshots/anime-home-preview.png', animations: 'disabled' });
  await page.goto(base + '/blog/cost-per-gb/');
  await page.screenshot({ path: 'docs/qa/screenshots/anime-article-desktop.png', animations: 'disabled' });
} finally { await browser.close(); }
const report = { status: errors.length ? 'FAIL' : 'PASS', checkedAt: new Date().toISOString(), errors, scope: '6 representative routes at 320/390/768/1440px; background assets, reduced motion, mobile menu and browser errors', assetRequests: [...new Set(requests.filter(url => url.includes('/images/')))] };
await writeFile('docs/qa/background.json', JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
if (errors.length) process.exitCode = 1;
