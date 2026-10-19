import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {readFile} from 'node:fs/promises';
import {result} from './shared.ts';
const exec=promisify(execFile),base=process.env.QA_BASE_URL||'http://127.0.0.1:4321';
const errors:string[]=[],scores:Record<string,unknown>={},metrics:Record<string,unknown>={};
const targets=[['home-mobile','/',false],['home-desktop','/',true],['article-mobile','/blog/cost-per-gb/',false]] as const;
for(const [name,url,desktop]of targets){
  const filename=`docs/qa/lighthouse-${name}.json`;
  await exec(process.execPath,['node_modules/lighthouse/cli/index.js',base+url,'--output=json',`--output-path=${filename}`,'--chrome-flags=--headless --no-sandbox --disable-dev-shm-usage','--only-categories=performance,accessibility,best-practices,seo','--quiet',...desktop?['--preset=desktop']:[]],{env:{...process.env,CHROME_PATH:process.env.BROWSER_PATH||'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'},maxBuffer:2*1024*1024});
  const report=JSON.parse(await readFile(filename,'utf8'));
  const targetScores:Record<string,number>={};for(const [key,category]of Object.entries(report.categories)as [string,{score:number}][]){targetScores[key]=Math.round(category.score*100);if(targetScores[key]<(key==='seo'?95:90))errors.push(`${name} ${key}: ${targetScores[key]}`);}
  scores[name]=targetScores;metrics[name]={lcpMs:report.audits['largest-contentful-paint'].numericValue,cls:report.audits['cumulative-layout-shift'].numericValue,tbtMs:report.audits['total-blocking-time'].numericValue};
  console.log(name,JSON.stringify(targetScores));
}
await result('lighthouse',errors,{scores,metrics,scope:'本机 Chrome / Lighthouse 13.5.0，本地生产预览；首页手机、首页桌面、文章手机各一次。非线上实测，INP 未测试。'});
