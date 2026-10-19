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
      const state = await page.evaluate(() => ({ overflow: document.documentElement.scrollWidth > innerWidth + 1, scenery: getComputedStyle(document.querySelector('.anime-scenery')).backgroundImage, animation: getComputedStyle(document.querySelector('.scenery-cloud')).animationName, sky: getComputedStyle(document.querySelector('.scenery-sky-art')).animationName }));
      if (state.overflow) errors.push(`${width}px ${path} horizontal overflow`);
      if (!state.scenery.includes(width <= 600 ? 'anime-sky-mobile.webp' : 'anime-sky.webp')) errors.push(`${width}px ${path} wrong background`);
      if (state.animation !== 'scenery-cloud-drift') errors.push(`${width}px ${path} animation missing`);
      if (state.sky !== 'scenery-sky-drift') errors.push(`${width}px ${path} illustrated sky animation missing`);
    }
  }
  const movingBefore = await page.locator('.scenery-cloud.one').evaluate(e => e.getBoundingClientRect().x);
  await page.waitForTimeout(1000);
  const movingAfter = await page.locator('.scenery-cloud.one').evaluate(e => e.getBoundingClientRect().x);
  if (Math.abs(movingAfter - movingBefore) < 5) errors.push('Clouds did not visibly move during the sample');
  await page.getByLabel('暂停云朵飘动', { exact: true }).click();
  const pausedBefore = await page.locator('.scenery-cloud.one').evaluate(e => e.getBoundingClientRect().x);
  await page.waitForTimeout(700);
  const pausedAfter = await page.locator('.scenery-cloud.one').evaluate(e => e.getBoundingClientRect().x);
  if (Math.abs(pausedAfter - pausedBefore) > .5) errors.push('Pause button did not stop the clouds');
  await page.getByLabel('播放云朵飘动', { exact: true }).click();
  if (await page.locator('.scenery-sky-art').evaluate(e => getComputedStyle(e).animationPlayState) !== 'running') errors.push('Play button did not resume the illustrated sky');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload({ waitUntil: 'load' });
  if (await page.locator('.scenery-cloud').first().evaluate(e => getComputedStyle(e).animationPlayState) !== 'paused') errors.push('Reduced motion preference was not respected');
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
const report = { status: errors.length ? 'FAIL' : 'PASS', checkedAt: new Date().toISOString(), errors, scope: '6 representative routes at 320/390/768/1440px; visible cloud displacement, sky layer, pause/play, reduced motion, mobile menu and browser errors', assetRequests: [...new Set(requests.filter(url => url.includes('/images/')))] };
await writeFile('docs/qa/background.json', JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
if (errors.length) process.exitCode = 1;
