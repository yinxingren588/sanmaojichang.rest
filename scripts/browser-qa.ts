import {chromium} from '@playwright/test';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {load} from 'cheerio';
import {pages,result} from './shared.ts';
import type {Airport} from '../src/data/airports.ts';
const base=process.env.QA_BASE_URL||'http://127.0.0.1:4321';
const executablePath=process.env.BROWSER_PATH||'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const errors:string[]=[],checks:string[]=[];
const browser=await chromium.launch({executablePath,headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
const consoleErrors:string[]=[];page.on('pageerror',e=>consoleErrors.push(e.message));
try{
  const all=await pages();
  for(const width of [320,390,768,1440]){
    await page.setViewportSize({width,height:1000});
    for(const p of all){
      const response=await page.goto(base+(p.url==='/404/'?'/missing-page-qa/':p.url),{waitUntil:'networkidle'});
      if(response?.status()!==(p.url==='/404/'?404:200))errors.push(`${p.url} HTTP ${response?.status()}`);
      const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+1);
      if(overflow)errors.push(`${p.url} ${width}px 页面横向溢出`);
    }
  }
  checks.push('41 页面 × 4 种视口，无整页横向溢出；404 返回正确状态');
  await page.setViewportSize({width:390,height:844});await page.goto(base);
  await page.getByLabel('展开导航').click();
  if(!await page.getByRole('navigation',{name:'移动端导航'}).isVisible())errors.push('移动导航不可见');
  await page.getByRole('navigation',{name:'移动端导航'}).getByRole('link',{name:'使用教程'}).click();
  if(!page.url().endsWith('/guides/'))errors.push('移动导航跳转失败');else checks.push('移动导航可展开并完成跳转');
  await page.goto(base);const faq=page.locator('.faq-list details').first();await faq.locator('summary').click();if(!await faq.getAttribute('open')&&await faq.getAttribute('open')!== '')errors.push('FAQ 未展开');else checks.push('FAQ 原生展开');
  await page.goto(base+'/search/');await page.getByLabel('搜索内容',{exact:true}).fill('Windows');if(await page.locator('.search-list li:visible').count()!==1)errors.push('搜索 Windows 筛选数量异常');
  await page.getByLabel('搜索内容',{exact:true}).fill('no-such-text-qa');if(await page.locator('.search-list li:visible').count()!==0)errors.push('搜索空状态异常');
  await page.getByLabel('搜索内容',{exact:true}).fill('');if(await page.locator('.search-list li:visible').count()!==15)errors.push('搜索清空后恢复异常');else checks.push('搜索筛选、无结果与清空恢复');
  await page.goto(base+'/compare/');if(!await page.locator('#add-brand').isDisabled()||!await page.locator('#brand-select').isDisabled())errors.push('无品牌时添加入口未禁用');else checks.push('生产比较工具真实空状态');
  // Isolated response fixture only: no synthetic brand is saved to production files.
  const data:Airport[]=Array.from({length:5},(_,i)=>({id:`fixture-${i}`,name:`TEST_${i}`,slug:`fixture-${i}`,description:'仅自动测试',testStatus:'official-data',lastVerified:'2026-10-19',sources:['https://example.test/'],plans:[{id:'p',name:'p',price:20+i,currency:'CNY',billing:'monthly',trafficGB:100,trafficUnit:'GB',trafficPeriod:'month',multiplier:2,verified:true,available:true,source:'https://example.test/',verifiedAt:'2026-10-19'}],protocols:[],regions:[],advantages:[],disadvantages:[],suitableFor:[],categories:[]}));
  const raw=await readFile('dist/compare/index.html','utf8'),$=load(raw);$('#compare-tool').attr('data-airports',JSON.stringify(data));$('#brand-select').removeAttr('disabled').html('<option value="">请选择品牌</option>'+data.map(a=>`<option value="${a.id}">${a.name}</option>`).join(''));$('#add-brand').removeAttr('disabled');
  await page.route('**/compare/',route=>route.fulfill({status:200,contentType:'text/html',body:$.html()}));
  await page.goto(base+'/compare/');
  const add=async(id:string)=>{await page.locator('#brand-select').selectOption(id);await page.locator('#add-brand').click();};
  await add('fixture-0');if(!await page.locator('#compare-output').isHidden())errors.push('少于两家不应展示比较表');
  await add('fixture-1');if(!await page.locator('#compare-output').isVisible()||!await page.locator('#compare-output').getByText('0.4000 CNY/GB',{exact:true}).isVisible())errors.push('双候选成本计算未显示');
  await add('fixture-1');if(await page.locator('#compare-chips button').count()!==2)errors.push('重复候选未阻止');
  await add('fixture-2');await add('fixture-3');await add('fixture-4');if(await page.locator('#compare-chips button').count()!==4)errors.push('四家上限无效');
  if(!await page.locator('#compare-status').textContent().then(s=>s?.includes('最多')))errors.push('上限提示缺失');
  const scrolled=await page.locator('#compare-output').evaluate(e=>{e.scrollLeft=100;return e.scrollLeft>0;});if(!scrolled)errors.push('移动比较表无法横向滚动');
  await page.getByRole('button',{name:'移除TEST_1'}).click();if(await page.locator('#compare-chips button').count()!==3)errors.push('移除候选失败');
  await page.locator('#clear-brands').click();if(await page.locator('#compare-chips button').count()!==0||!await page.locator('#compare-output').isHidden())errors.push('清空候选失败');else checks.push('独立测试夹具：2–4 家比较、成本、去重、上限、移除、清空、移动表格滚动');
  await page.unroute('**/compare/');
  const nojs=await browser.newContext({javaScriptEnabled:false});const staticPage=await nojs.newPage();await staticPage.goto(base+'/blog/cost-per-gb/');if((await staticPage.locator('main').innerText()).length<1000)errors.push('禁用 JavaScript 后正文缺失');else checks.push('禁用 JavaScript 后文章全文与内链可读');await nojs.close();
  await mkdir('docs/qa/screenshots',{recursive:true});
  await page.setViewportSize({width:1440,height:1000});await page.goto(base);await page.screenshot({path:'docs/qa/screenshots/home-desktop.png',fullPage:true});
  await page.setViewportSize({width:390,height:844});await page.goto(base);await page.screenshot({path:'docs/qa/screenshots/home-mobile.png',fullPage:true});
  await page.goto(base+'/blog/cost-per-gb/');await page.screenshot({path:'docs/qa/screenshots/article-mobile.png',fullPage:true});
}catch(e){errors.push(String(e));}finally{await browser.close();}
errors.push(...consoleErrors.map(e=>'浏览器脚本错误：'+e));
await result('browser',errors,{checks,viewports:[320,390,768,1440],browser:'Installed Google Chrome, Playwright headless',scope:'本地生产构建；比较有品牌路径使用隔离测试数据，生产数据库保持空白'});
