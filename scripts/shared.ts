import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { load } from 'cheerio';
export const root = process.cwd();
export const domain = 'https://sanmaojichang.rest';
export async function files(dir:string, extension?:string):Promise<string[]>{
  const entries=await readdir(dir,{withFileTypes:true});
  const found=await Promise.all(entries.map(e=>e.isDirectory()?files(path.join(dir,e.name),extension):Promise.resolve(!extension||e.name.endsWith(extension)?[path.join(dir,e.name)]:[])));
  return found.flat();
}
export function urlForFile(file:string){
  const relative=path.relative(path.join(root,'dist'),file).replaceAll('\\','/');
  if(relative==='404.html')return '/404/';
  return '/'+relative.replace(/index\.html$/,'');
}
export async function pages(){
  return Promise.all((await files(path.join(root,'dist'),'.html')).map(async file=>{const html=await readFile(file,'utf8');return {file,html,$:load(html),url:urlForFile(file)};}));
}
export async function result(name:string,errors:string[],details:Record<string,unknown>={}){
  await mkdir(path.join(root,'docs','qa'),{recursive:true});
  const record={status:errors.length?'FAIL':'PASS',checkedAt:new Date().toISOString(),errors,...details};
  await writeFile(path.join(root,'docs','qa',name+'.json'),JSON.stringify(record,null,2)+'\n');
  console.log(`${name}: ${record.status}${errors.length?'\n'+errors.join('\n'):''}`);
  if(errors.length)process.exitCode=1;
  return record;
}
export function escapeXML(s:string){return s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');}
