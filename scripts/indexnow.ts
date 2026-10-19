import {readFile,writeFile,mkdir,appendFile,access} from 'node:fs/promises';
import {loadEnvFile} from 'node:process';
import {domain} from './shared.ts';
import {validateKey,validateUrls,changedUrls,submitBatch,type Manifest} from './lib/indexnow.ts';
try{await access('.env');loadEnvFile('.env');}catch{}
const args=process.argv.slice(2), dry=args.includes('--dry-run'), bootstrap=args.includes('--bootstrap');
const get=(flag:string)=>{const i=args.indexOf(flag);return i<0?undefined:args[i+1];};
try{
  const config=JSON.parse(await readFile('config/indexnow.json','utf8'));
  const key=process.env.INDEXNOW_KEY||config.key;validateKey(key);
  const current:Manifest=JSON.parse(await readFile('.indexnow/current.json','utf8'));
  let previous:Manifest={};let hasBaseline=false;
  try{previous=JSON.parse(await readFile('.indexnow/last-success.json','utf8'));hasBaseline=true;}catch{}
  const single=get('--url'),file=get('--file');
  if(args.includes('--url')&&!single)throw new Error('--url 后必须提供一个 URL。');
  if(args.includes('--file')&&!file)throw new Error('--file 后必须提供 JSON 文件路径。');
  if(!single&&!file&&!hasBaseline&&!bootstrap)throw new Error('首次提交需要 --bootstrap；先运行 npm run indexnow -- --bootstrap --dry-run 检查新增 URL。');
  const explicit=Boolean(single||file);
  const urls=validateUrls(single?[single]:file?JSON.parse(await readFile(file,'utf8')):changedUrls(current,previous),domain);
  for(const url of urls)if(!current[url]&&!previous[url])throw new Error(`URL 不在当前可索引清单或历史删除清单：${url}`);
  const payload={host:new URL(domain).host,key,keyLocation:`${domain}/${key}.txt`,urlList:urls};
  if(dry){console.log(JSON.stringify({dryRun:true,count:urls.length,urlList:urls},null,2));process.exit(0);}
  if(!urls.length){console.log('无新增、更新或删除 URL，无需提交。');process.exit(0);}
  const verification=await fetch(payload.keyLocation,{signal:AbortSignal.timeout(15000),redirect:'error'});
  if(!verification.ok||(await verification.text()).trim()!==key)throw new Error('正式域名 Key 文件校验失败，请先完成部署。');
  await mkdir('.indexnow',{recursive:true});
  const log=async(entry:Record<string,unknown>)=>{await appendFile('.indexnow/http-log.jsonl',JSON.stringify(entry)+'\n');};
  for(let start=0;start<urls.length;start+=10000){const list=urls.slice(start,start+10000);const status=await submitBatch({...payload,urlList:list},{log});console.log(`IndexNow HTTP ${status}：已接收 ${list.length} 个 URL${status===202?'，Key 校验待完成':''}；不代表已收录。`);}
  if(!explicit)await writeFile('.indexnow/last-success.json',JSON.stringify(current,null,2)+'\n');
  console.log('请保留 .indexnow/last-success.json 作为下次增量基线；HTTP 日志在 .indexnow/http-log.jsonl。');
}catch(error){console.error(String(error));process.exitCode=1;}
