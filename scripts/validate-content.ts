import {readFile} from 'node:fs/promises';
import {files,result,pages} from './shared.ts';
import {airports} from '../src/data/airports.ts';
import {costPerGB} from '../src/lib/airports.ts';
const errors:string[]=[];const articles=await files('src/content/articles','.md');const bodies=new Set<string>(),slugs=new Set<string>();
for(const file of articles){const text=await readFile(file,'utf8');const body=text.replace(/^---[\s\S]*?---\s*/,'').trim();if(body.length<500)errors.push(`${file} 正文不足 500 字符`);const normalized=body.replace(/\s/g,'');if(bodies.has(normalized))errors.push(`${file} 正文完全重复`);bodies.add(normalized);const slug=text.match(/^slug: (.+)$/m)?.[1],section=text.match(/^section: (.+)$/m)?.[1];const id=`${section}/${slug}`;if(!slug||slugs.has(id))errors.push(`${file} Slug 重复或缺失`);slugs.add(id);if(!text.includes('sources:'))errors.push(`${file} 缺少来源`);const published=text.match(/^published: '([^']+)'$/m)?.[1],updated=text.match(/^updated: '([^']+)'$/m)?.[1];if(!published||!updated||updated<published||updated>'2026-10-19')errors.push(`${file} 内容日期错误`);}
const ids=new Set<string>();for(const a of airports){if(ids.has(a.slug))errors.push(`品牌重复 ${a.slug}`);ids.add(a.slug);if(!/^[a-z0-9-]+$/.test(a.slug))errors.push(`品牌 slug 不规范 ${a.slug}`);if(a.testStatus!=='unverified'&&(!a.lastVerified||!a.sources.length))errors.push(`${a.name} 已核验状态缺来源或日期`);if(a.officialUrl&&!a.sources.includes(a.officialUrl))errors.push(`${a.name} 官网未列入来源`);if(a.testStatus==='tested'&&!a.stability)errors.push(`${a.name} 实测缺记录`);if(a.reviewPublished&&(a.testStatus!=='tested'||!a.stability))errors.push(`${a.name} 评测缺测试记录`);for(const p of a.plans){if(p.verified&&(!p.source||!p.verifiedAt||costPerGB(p)===undefined))errors.push(`${a.name}/${p.name} 已核验套餐缺依据或数值无效`);}}
for(const p of await pages()){
  const sentences=p.$('main').text().split(/[。！？\n]/);
  if(sentences.some(s=>/(亲测推荐|永久解锁|保证排名第一|100%稳定)/.test(s)&&!/(不应|不代表|不保证|不能|不发布|无法|不作|不构成|不使用|禁止|不得)/.test(s)))errors.push(`${p.url} 存在需要人工复核的强承诺`);
}
await result('content',errors,{articles:articles.length,brands:airports.length,brandData:airports.length?'逐项需人工复核':'按用户要求保持空白，无样例品牌',scope:'结构、重复与证据字段检查；自动化不能证明来源真实性，需维护者人工核验'});
