import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {files,result} from './shared.ts';
const errors:string[]=[],records:{file:string;section:string;slug:string;title:string;characters:number;headings:number;links:number;sources:string[]}[]=[];
const paragraphs=new Map<string,{text:string;files:string[]}>();
const titles=new Set<string>(),ids=new Set<string>();
for(const file of await files('src/content/articles','.md')){
  const text=await readFile(file,'utf8');
  const body=text.replace(/^---\r?\n[\s\S]*?---\r?\n/,'').trim();
  const value=(key:string)=>{const raw=text.match(new RegExp(`^${key}: (.+)$`,'m'))?.[1]||'';return raw.startsWith('"')?JSON.parse(raw):raw;};
  const section=value('section'),slug=value('slug'),title=value('title');
  const id=section+'/'+slug;
  if(titles.has(title)||ids.has(id))errors.push(`重复标题或路径：${id}`);titles.add(title);ids.add(id);
  const headings=(body.match(/^## /gm)||[]).length;
  const links=(body.match(/\]\(\/(?!\/)/g)||[]).length;
  const sources=(text.split(/^---\r?$/m)[1]?.match(/^  - https?:\/\/\S+/gm)||[]).map(s=>s.trim().slice(2));
  const expanded=section==='blog'&&/^(buy|net|use)-/.test(slug)||section==='guides'&&!['windows','macos','android','ios','troubleshooting'].includes(slug);
  if(expanded&&(body.length<600||headings<4||links<2||!sources.length))errors.push(`${id} 不满足正文/章节/内链/来源要求`);
  if(expanded&&/(待补充正文|TODO|lorem ipsum|此处填写)/i.test(body))errors.push(`${id} 存在占位内容`);
  for(const paragraph of body.split(/\r?\n\s*\r?\n/)){
    const normalized=paragraph.replace(/\s/g,'');
    if(normalized.length<120||normalized.startsWith('#')||normalized.startsWith('```'))continue;
    const hash=createHash('sha256').update(normalized).digest('hex');
    const record=paragraphs.get(hash)||{text:normalized,files:[]};record.files.push(id);paragraphs.set(hash,record);
  }
  records.push({file,section,slug,title,characters:body.length,headings,links,sources});
}
const counts=Object.fromEntries(['guides','blog','glossary'].map(section=>[section,records.filter(r=>r.section===section).length]));
if(counts.guides!==30||counts.blog!==200||counts.glossary!==5)errors.push(`文章数量不符：${JSON.stringify(counts)}`);
const repeated=[...paragraphs.values()].filter(p=>new Set(p.files).size>=3);
for(const repeat of repeated)errors.push(`跨文章重复长段落（${repeat.text.length}字符）：${repeat.files.join(', ')}`);
const csv=[['栏目','标题','路径','正文字符','二级章节','内链','来源'],...records.sort((a,b)=>(a.section+a.slug).localeCompare(b.section+b.slug)).map(r=>[r.section,r.title,`/${r.section}/${r.slug}/`,r.characters,r.headings,r.links,r.sources.join(' | ')])].map(row=>row.map(v=>'"'+String(v).replaceAll('"','""')+'"').join(',')).join('\n');
await writeFile('docs/content-catalog.csv','\uFEFF'+csv+'\n');
await result('collection',errors,{counts,total:records.length,minExpandedCharacters:Math.min(...records.filter(r=>/^(buy|net|use)-/.test(r.slug)).map(r=>r.characters)),repeatedLongParagraphs:repeated.length,scope:'篇数、标题路径、章节、内链、来源字段、占位符与重复长段落；不等同逐条事实审定或软件实机验证'});
