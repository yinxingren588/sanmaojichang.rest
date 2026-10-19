export function validateKey(key:string){if(!/^[a-zA-Z0-9-]{8,128}$/.test(key))throw new Error('IndexNow Key 必须为 8–128 位字母、数字或连字符。');}
export function validateUrls(urls:string[],domain:string){
  const origin=new URL(domain).origin;
  for(const value of urls){const u=new URL(value);if(u.origin!==origin||u.username||u.password||u.hash||u.search)throw new Error(`禁止提交非本站规范 URL：${value}`);if(!u.pathname.endsWith('/'))throw new Error(`HTML URL 必须保留尾部斜杠：${value}`);}
  return [...new Set(urls)];
}
export type Manifest=Record<string,{hash:string;lastmod:string}>;
export function changedUrls(current:Manifest,previous:Manifest){return [...new Set([...Object.keys(current).filter(url=>!previous[url]||current[url].hash!==previous[url].hash),...Object.keys(previous).filter(url=>!current[url])])];}
export async function submitBatch(payload:Record<string,unknown>,options:{fetcher?:typeof fetch;sleep?:(ms:number)=>Promise<void>;log?:(entry:Record<string,unknown>)=>Promise<void>}={}){
  const fetcher=options.fetcher||fetch, sleep=options.sleep||((ms:number)=>new Promise<void>(r=>setTimeout(r,ms)));
  let lastError='';
  for(let attempt=1;attempt<=3;attempt++){
    try{
      const response=await fetcher('https://api.indexnow.org/indexnow',{method:'POST',headers:{'Content-Type':'application/json; charset=utf-8'},body:JSON.stringify(payload),signal:AbortSignal.timeout(15000)});
      await options.log?.({time:new Date().toISOString(),attempt,httpStatus:response.status,count:(payload.urlList as string[]).length});
      if(response.status===200||response.status===202)return response.status;
      lastError=`HTTP ${response.status}`;
      if(response.status!==429 && response.status<500)throw new Error(`不可重试响应：${lastError}`);
      if(attempt<3){const retry=response.headers.get('retry-after');const seconds=retry?Number(retry):NaN;const delay=Number.isFinite(seconds)?seconds*1000:300*2**(attempt-1);await sleep(Math.max(0,Math.min(5000,delay)));}
    }catch(error){lastError=String(error);if(lastError.includes('不可重试'))throw error;await options.log?.({time:new Date().toISOString(),attempt,error:lastError});if(attempt<3)await sleep(300*2**(attempt-1));}
  }
  throw new Error(`IndexNow 三次尝试后失败：${lastError}`);
}
