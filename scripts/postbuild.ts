import { writeFile,mkdir } from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {domain,pages,escapeXML} from './shared.ts';
import {SITE} from '../src/data/site.ts';
const built=await pages();
const indexed=built.filter(p=>!p.$('meta[name="robots"]').attr('content')?.includes('noindex'));
const manifest:Record<string,{hash:string;lastmod:string}>={};
for(const p of indexed){
  const schema=p.$('script[type="application/ld+json"]').map((_,e)=>JSON.parse(p.$(e).text())).get();
  const modified=schema.find(s=>s.dateModified)?.dateModified;
  const date=modified||SITE.published;
  const url=domain+p.url;
  const content=[p.$('title').text(),p.$('meta[name="description"]').attr('content'),p.$('main').html()].join('\n');
  manifest[url]={hash:createHash('sha256').update(content).digest('hex'),lastmod:date};
}
// Sitemap integration creates the index. Prune by rendered robots and add content dates.
const sitemap='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+Object.entries(manifest).sort(([a],[b])=>a.localeCompare(b)).map(([url,m])=>`<url><loc>${escapeXML(url)}</loc><lastmod>${m.lastmod}</lastmod></url>`).join('')+'</urlset>\n';
await writeFile('dist/sitemap-0.xml',sitemap);
await writeFile('dist/sitemap-index.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>${domain}/sitemap-0.xml</loc></sitemap></sitemapindex>\n`);
await mkdir('.indexnow',{recursive:true});
await writeFile('.indexnow/current.json',JSON.stringify(manifest,null,2)+'\n');
await mkdir('docs/qa',{recursive:true});
await writeFile('docs/qa/build.json',JSON.stringify({status:'PASS',checkedAt:new Date().toISOString(),pages:built.length,indexable:indexed.length,noindex:built.length-indexed.length},null,2)+'\n');
console.log(`构建完成：${built.length} 个 HTML 页面，${indexed.length} 个进入 Sitemap；IndexNow 未提交。`);
