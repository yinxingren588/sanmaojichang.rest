import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {writeFile,mkdir} from 'node:fs/promises';
const exec=promisify(execFile);
const npm=process.env.npm_execpath;
if(!npm)throw new Error('请通过 npm run verify 执行。');
await mkdir('docs/qa',{recursive:true});
for(const [script,record,args]of [['check','types',[]],['test','unit',[]],['build','',[]],['audit','',[]],['indexnow','indexnow-dry-run',['--','--bootstrap','--dry-run']]] as const){
  try{const r=await exec(process.execPath,[npm,'run',script,...args],{maxBuffer:5*1024*1024});if(record){await writeFile(`docs/qa/${record}.json`,JSON.stringify({status:'PASS',checkedAt:new Date().toISOString(),output:r.stdout},null,2)+'\n');}console.log(`${script}: PASS`);}
  catch(error){const e=error as {stdout?:string;stderr?:string};if(record)await writeFile(`docs/qa/${record}.json`,JSON.stringify({status:'FAIL',checkedAt:new Date().toISOString(),output:e.stdout,error:e.stderr},null,2)+'\n');console.error(e.stdout,e.stderr);process.exitCode=1;break;}
}
