import {access,readFile} from 'node:fs/promises';
import path from 'node:path';
import {load} from 'cheerio';
import {domain,pages,result} from './shared.ts';
const all=await pages(),errors:string[]=[];let links=0;const incoming=new Map(all.map(p=>[p.url,0]));
const external=new Set<string>();
for(const {url,$} of all){
  const refs=$('a[href],img[src],script[src],link[href]');
  for(const e of refs.toArray()){
    const value=$(e).attr('href')||$(e).attr('src');if(!value||value.startsWith('mailto:')||value.startsWith('data:'))continue;
    const target=new URL(value,domain+url);if(target.origin!==domain){external.add(target.href);continue;}links++;
    if(!target.pathname.endsWith('/')&& !path.extname(target.pathname))errors.push(`${url} 内链缺尾部斜杠：${value}`);
    const filename=target.pathname==='/404/'?path.join('dist','404.html'):path.join('dist',decodeURIComponent(target.pathname),target.pathname.endsWith('/')?'index.html':'');
    try{await access(filename);if(target.hash){const doc=load(await readFile(filename,'utf8'));const id=decodeURIComponent(target.hash.slice(1));if(!doc('[id]').toArray().some(x=>doc(x).attr('id')===id))errors.push(`${url} 锚点失效：${value}`);}}catch{errors.push(`${url} 内部目标不存在：${value}`);}
    if($(e).is('a')&&target.pathname!==url&&incoming.has(target.pathname))incoming.set(target.pathname,incoming.get(target.pathname)!+1);
  }
}
for(const [url,count] of incoming)if(!count && !['/','/404/'].includes(url))errors.push(`孤岛页面：${url}`);
await result('links',errors,{links,externalUrls:external.size,externalCheck:'NOT TESTED：外部站点状态不属于本地内链检查'});
