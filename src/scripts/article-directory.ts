const directory=document.querySelector<HTMLElement>('[data-article-directory]');
if(directory){
  const input=directory.querySelector<HTMLInputElement>('#directory-search')!;
  const items=[...directory.querySelectorAll<HTMLElement>('[data-directory-item]')];
  const topicButtons=[...directory.querySelectorAll<HTMLButtonElement>('[data-directory-category]')];
  const pages=directory.querySelector<HTMLElement>('.directory-pages')!;
  const status=directory.querySelector<HTMLElement>('.directory-status')!;
  const empty=directory.querySelector<HTMLElement>('.directory-empty')!;
  const size=Number(directory.dataset.pageSize)||12;
  let category='',page=1;
  const restore=()=>{
    const params=new URLSearchParams(location.search);
    const topic=params.get('topic')||'';
    category=topicButtons.some(button=>button.dataset.directoryCategory===topic)?topic:'';
    input.value=params.get('q')||'';
    const requested=Number(params.get('page'));
    page=Number.isSafeInteger(requested)&&requested>0?requested:1;
  };
  const draw=(scroll=false)=>{
    const words=input.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    const matches=items.filter(item=>(!category||item.dataset.directoryTopics!.split('|').includes(category))&&words.every(word=>item.dataset.directorySearch!.toLocaleLowerCase().includes(word)));
    const totalPages=Math.max(1,Math.ceil(matches.length/size));page=Math.min(page,totalPages);
    const url=new URL(location.href);
    for(const [key,value] of [['topic',category],['q',input.value.trim()],['page',page>1?String(page):'']]){
      if(value)url.searchParams.set(key,value);else url.searchParams.delete(key);
    }
    history.replaceState(null,'',url);
    const active=new Set(matches.slice((page-1)*size,page*size));items.forEach(item=>{item.hidden=!active.has(item);});
    topicButtons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.directoryCategory===category)));
    status.textContent=matches.length?`${category||'全部专题'} · 共 ${matches.length} 篇，显示第 ${(page-1)*size+1}–${Math.min(page*size,matches.length)} 篇`:'找到 0 篇文章';
    empty.hidden=matches.length>0;pages.replaceChildren();pages.hidden=totalPages<=1;
    const button=(label:string,target:number,disabled=false)=>{const b=document.createElement('button');b.type='button';b.textContent=label;b.disabled=disabled;if(label===String(page))b.setAttribute('aria-current','page');if(/^\d+$/.test(label))b.setAttribute('aria-label',`第 ${label} 页`);b.addEventListener('click',()=>{page=target;draw(true);});pages.append(b);};
    button('上一页',page-1,page===1);
    const numbers=[...new Set([1,page-1,page,page+1,totalPages].filter(n=>n>=1&&n<=totalPages))].sort((a,b)=>a-b);
    numbers.forEach((n,i)=>{if(i&&n>numbers[i-1]+1){const gap=document.createElement('span');gap.textContent='…';gap.setAttribute('aria-hidden','true');pages.append(gap);}button(String(n),n);});
    button('下一页',page+1,page===totalPages);
    if(scroll)status.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
  };
  directory.querySelector<HTMLElement>('.directory-controls')!.hidden=false;
  input.addEventListener('input',()=>{page=1;draw();});
  topicButtons.forEach(button=>button.addEventListener('click',()=>{category=button.dataset.directoryCategory!;page=1;draw();}));
  restore();draw();
  window.addEventListener('popstate',()=>{restore();draw();});
}
