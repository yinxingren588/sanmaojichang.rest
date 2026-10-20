import {readFile} from 'node:fs/promises';
import {load} from 'cheerio';
import {SITE} from '../src/data/site.ts';
import {result} from './shared.ts';

const target=new URL(process.env.DEPLOY_URL||SITE.domain);
if(target.protocol!=='https:'||target.username||target.password||!(target.hostname===new URL(SITE.domain).hostname||target.hostname.endsWith('.pages.dev')))throw new Error('请使用正式域名或已确认的 HTTPS pages.dev 项目地址。');
const origin=target.origin;
const local=JSON.parse(await readFile('dist/release.json','utf8'));
const paths=['/release.json','/','/about/','/sitemap-index.xml','/robots.txt','/missing-release-check/'];
const errors:string[]=[];
const checks=await Promise.all(paths.map(async path=>{
  try{
    const response=await fetch(origin+path,{signal:AbortSignal.timeout(15000),redirect:'follow'});
    const body=await response.text();
    const expected=path==='/missing-release-check/'?404:200;
    if(response.status!==expected)errors.push(`${path}: HTTP ${response.status}, expected ${expected}`);
    if(path==='/release.json'&&response.ok&&JSON.parse(body).contentHash!==local.contentHash)errors.push('线上版本与当前本地内容不一致');
    if(path==='/'){
      const $=load(body);
      if($('link[rel="canonical"]').attr('href')!==SITE.domain+'/')errors.push('首页 Canonical 不一致');
      if($('meta[name="robots"]').attr('content')?.includes('noindex'))errors.push('线上首页仍有 noindex');
    }
    if(path==='/about/'&&!body.includes(SITE.telegram.handle))errors.push('线上缺少最新联系方式');
    if(path==='/robots.txt'&&!body.includes(SITE.domain+'/sitemap-index.xml'))errors.push('robots 缺少正式 Sitemap');
    if(path==='/sitemap-index.xml'&&!body.includes(SITE.domain+'/sitemap-0.xml'))errors.push('Sitemap 索引缺少正式内容清单');
    return {path,status:response.status};
  }catch(error){errors.push(`${path}: ${String(error)}`);return {path,status:null};}
}));
await result('live-deployment',errors,{origin,expectedContentHash:local.contentHash,checks,scope:'只验证部署版本、入口、站点地图与404响应；不代表Bing验证或已收录'});
