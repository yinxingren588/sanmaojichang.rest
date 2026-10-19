import {readFile,writeFile} from 'node:fs/promises';
import {topics,sections,rankingTypes,SITE} from '../src/data/site.ts';
import {files} from './shared.ts';
const rows:string[][]=[['Keyword','Intent','Target URL','Page Type','Priority','Title','H1']];
const add=(k:string,i:string,u:string,p:string,priority:string,title:string,h1:string)=>rows.push([k,i,SITE.domain+u,p,priority,title,h1]);
add('三毛机场; 三毛导航','主题博客与信息导航','/','Homepage','P0','三毛机场博客与机场推荐指南｜三毛导航','三毛机场博客 让每一次选择，更有依据。');
add('机场推荐; 三毛机场推荐','选择方法与需求分类','/recommend/','Pillar','P0','机场推荐怎么选：六类需求与购买前检查｜三毛导航','机场推荐，先从你的需求出发');
for(const t of topics)add(`${t.name}机场怎么选`,'需求专题',`/recommend/${t.slug}/`,'Topic','P1',`${t.headline}｜三毛导航`,t.headline);
for(const r of rankingTypes)add(r.name,'已核验数据比较；当前无数据 noindex',`/ranking/${r.slug}/`,'Ranking','P2',`${r.name}：规则、候选资料与来源｜三毛导航`,r.name);
for(const [section,s]of Object.entries(sections))add(s.name,'目录导航',`/${section}/`,'Collection','P1',`${s.name}｜三毛导航`,s.name);
for(const f of await files('src/content/articles','.md')){const text=await readFile(f,'utf8');const get=(key:string)=>text.match(new RegExp(`^${key}: (.+)$`,'m'))?.[1]||'';add(get('title'),'具体问题解答',`/${get('section')}/${get('slug')}/`,'Article','P1',`${get('title')}｜三毛导航`,get('title'));}
await writeFile('docs/keyword-map.csv','\uFEFF'+rows.map(row=>row.map(c=>'"'+c.replaceAll('"','""')+'"').join(',')).join('\n')+'\n');
console.log(`关键词地图：${rows.length-1} 条意图映射；未提供或推断搜索量。`);
