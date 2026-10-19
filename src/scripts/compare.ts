import type { Airport } from '../data/airports';
import { costPerGB, entryPlan, displayPrice, unknown } from '../lib/airports';
import { addCandidate, removeCandidate } from '../lib/compare';
export function initCompare(){
  const root=document.querySelector<HTMLElement>('#compare-tool'); if(!root)return;
  const airports:Airport[]=JSON.parse(root.dataset.airports||'[]');
  const select=document.querySelector<HTMLSelectElement>('#brand-select')!;
  const add=document.querySelector<HTMLButtonElement>('#add-brand')!;
  const clear=document.querySelector<HTMLButtonElement>('#clear-brands')!;
  const status=document.querySelector<HTMLElement>('#compare-status')!;
  const chips=document.querySelector<HTMLElement>('#compare-chips')!;
  const output=document.querySelector<HTMLElement>('#compare-output')!;
  const empty=document.querySelector<HTMLElement>('#compare-empty')!;
  let ids:string[]=[];
  const cell=(tag:string,text:string)=>{const e=document.createElement(tag);e.textContent=text;return e;};
  const redraw=(message='')=>{
    chips.replaceChildren(); output.replaceChildren();
    ids.forEach(id=>{const a=airports.find(a=>a.id===id)!;const button=document.createElement('button');button.type='button';button.textContent=`${a.name} ×`;button.setAttribute('aria-label',`移除${a.name}`);button.addEventListener('click',()=>{ids=removeCandidate(ids,id);redraw();select.focus();});chips.append(button);});
    clear.disabled=!ids.length;empty.hidden=ids.length>=2;output.hidden=ids.length<2;
    status.textContent=message||(!airports.length?'品牌资料尚未录入，暂时无法添加候选。':ids.length<2?`已选择 ${ids.length} 家，请至少选择 2 家。`:`正在比较 ${ids.length} 家品牌，最多可选 4 家。`);
    if(ids.length<2)return;
    const list=ids.map(id=>airports.find(a=>a.id===id)!);
    const table=document.createElement('table');table.className='compare-table';
    const caption=cell('caption','候选品牌横向比较');caption.className='sr-only';table.append(caption);
    const head=document.createElement('thead');const hr=document.createElement('tr');hr.append(cell('th','比较维度'));list.forEach(a=>hr.append(cell('th',a.name)));head.append(hr);table.append(head);
    const body=document.createElement('tbody');
    const rows:[string,(a:Airport)=>string][]=[
      ['月付起价',a=>displayPrice(a)],
      ['套餐流量',a=>{const p=entryPlan(a);return p?`${p.trafficGB} ${p.trafficUnit}/月，${p.multiplier}×`:unknown;}],
      ['每 GB 成本',a=>{const p=entryPlan(a);return p?`${costPerGB(p)!.toFixed(4)} ${p.currency}/GB`:unknown;}],
      ['节点地区',a=>a.regions.join('、')||unknown],['协议',a=>a.protocols.join('、')||unknown],['线路',a=>a.routeType||unknown],
      ['设备限制',a=>a.deviceLimit||unknown],['AI 支持（资料）',a=>a.aiSupport?.join('、')||unknown],['流媒体支持（资料）',a=>a.streamingSupport?.join('、')||unknown],
      ['优点',a=>a.advantages.join('；')||unknown],['注意事项',a=>a.disadvantages.join('；')||unknown],['适合人群',a=>a.suitableFor.join('、')||unknown],['最后核验',a=>a.lastVerified||unknown]
    ];
    rows.forEach(([label,fn])=>{const tr=document.createElement('tr');const th=cell('th',label);th.setAttribute('scope','row');tr.append(th);list.forEach(a=>tr.append(cell('td',fn(a))));body.append(tr);});
    const links=document.createElement('tr');links.append(cell('th','来源与资料'));list.forEach(a=>{const td=document.createElement('td'),link=document.createElement('a');link.href=`/airport/${a.slug}/`;link.textContent='查看品牌来源 →';td.append(link);links.append(td);});body.append(links);table.append(body);output.append(table);
  };
  add.addEventListener('click',()=>{const result=addCandidate(ids,select.value,airports.map(a=>a.id));ids=result.ids;redraw(result.message);});
  clear.addEventListener('click',()=>{ids=[];redraw();select.focus();});
}
