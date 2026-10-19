import { readFile,writeFile,mkdir,access } from 'node:fs/promises';
import {randomBytes} from 'node:crypto';
import {loadEnvFile} from 'node:process';
import {validateKey} from './lib/indexnow.ts';
try{await access('.env');loadEnvFile('.env');}catch{}
await mkdir('config',{recursive:true});
let config:{key?:string}={};
try{config=JSON.parse(await readFile('config/indexnow.json','utf8'));}catch{}
const key=process.env.INDEXNOW_KEY||config.key||randomBytes(16).toString('hex');
validateKey(key);
await writeFile('config/indexnow.json',JSON.stringify({key},null,2)+'\n');
await mkdir('public',{recursive:true});
await writeFile(`public/${key}.txt`,key,'utf8');
console.log('IndexNow 验证文件已准备；构建不会自动提交 URL。');
