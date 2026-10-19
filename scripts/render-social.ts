import {chromium} from '@playwright/test';
import {readFile} from 'node:fs/promises';
const browser=await chromium.launch({executablePath:process.env.BROWSER_PATH||'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:true});
try{const page=await browser.newPage({viewport:{width:1200,height:630},deviceScaleFactor:1});const svg=await readFile('public/social.svg','utf8');await page.setContent(`<style>html,body{margin:0;width:1200px;height:630px;overflow:hidden}</style>${svg}`);await page.screenshot({path:'public/social.png'});console.log('1200 × 630 PNG 社交分享图已导出。');}finally{await browser.close();}
