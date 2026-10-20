import type { Airport, Plan } from '../data/airports';
export const unknown = '尚未核实';
export function usableGB(plan: Plan): number | undefined {
  if (!plan.verified || !plan.available || !plan.source || !Number.isFinite(plan.multiplier) || plan.multiplier <= 0 || plan.trafficGB <= 0 || !Number.isFinite(plan.trafficGB) || plan.price < 0 || !Number.isFinite(plan.price)) return;
  return plan.trafficGB * (plan.trafficUnit === 'GiB' ? 1.073741824 : 1) / plan.multiplier;
}
export function costPerGB(plan: Plan): number | undefined {
  const gb = usableGB(plan);
  if(gb===undefined)return;
  if(plan.billing==='monthly'&&plan.trafficPeriod!=='month'||plan.billing==='yearly'&&plan.trafficPeriod==='total'||plan.billing==='one-time'&&plan.trafficPeriod!=='total')return;
  const cycles=plan.billing==='yearly'&&plan.trafficPeriod==='month'?12:1;
  return plan.price / (gb * cycles);
}
export function verifiedPlans(airport: Airport) {
  return airport.testStatus === 'unverified' || !airport.lastVerified || !airport.sources.length ? [] : airport.plans.filter(p => costPerGB(p) !== undefined && p.verifiedAt);
}
export function entryPlan(airport: Airport) {
  const plans = verifiedPlans(airport).filter(p => p.billing === 'monthly' && p.trafficPeriod === 'month' && p.currency === 'CNY');
  return plans.sort((a,b) => a.price - b.price)[0];
}
export function rankingEntries(list: Airport[], kind: string, currency = 'CNY', billing: Plan['billing'] = 'monthly', trafficPeriod: Plan['trafficPeriod'] = 'month', environment?: string) {
  const candidates = list.filter(a => verifiedPlans(a).some(p => p.currency === currency && p.billing === billing && p.trafficPeriod === trafficPeriod));
  const representative = (a: Airport) => verifiedPlans(a).filter(p => p.currency === currency && p.billing === billing && p.trafficPeriod === trafficPeriod).sort((x,y) => kind === 'value' ? costPerGB(x)! - costPerGB(y)! : x.price - y.price)[0];
  if (kind === 'stable') {
    const eligible=candidates.filter(a => a.testStatus === 'tested' && a.stability && a.stability.days >= 7 && a.stability.samplesPerDay >= 3 && a.stability.includesPeak && a.stability.attempts >= a.stability.days * a.stability.samplesPerDay && a.stability.successes <= a.stability.attempts && a.stability.successes >= 0 && a.stability.downtimeMinutes >= 0 && a.stability.source && a.stability.environment);
    const group=environment||eligible.map(a=>a.stability!.environment).sort()[0];
    return eligible.filter(a=>a.stability!.environment===group).sort((a,b) => b.stability!.successes/b.stability!.attempts - a.stability!.successes/a.stability!.attempts || a.stability!.downtimeMinutes-b.stability!.downtimeMinutes);
  }
  if (kind === 'overall') return candidates.sort((a,b) => a.name.localeCompare(b.name, 'zh-CN'));
  return candidates.sort((a,b) => kind === 'value' ? costPerGB(representative(a))! - costPerGB(representative(b))! : representative(a).price - representative(b).price);
}
export function displayPrice(airport: Airport) {
  const p = entryPlan(airport);
  return p ? `¥${p.price} / 月` : airport.referenceOffer?.priceText || unknown;
}
export function displayTraffic(a: Airport) { const p=entryPlan(a); return p?`${p.trafficGB} ${p.trafficUnit} / 月`:a.referenceOffer?.trafficText||unknown; }
export function displayRoute(a: Airport) { return a.routeType||a.referenceOffer?.routeText||unknown; }
export function displayProtocols(a: Airport) { return a.protocols.join('、')||a.referenceOffer?.protocolText||unknown; }
export function evidenceLabel(a: Airport) { return a.testStatus==='tested'?'有测试记录':a.testStatus==='official-data'?'官方资料整理':a.referenceOffer?.sourceKind==='user'?'维护者提供资料':a.referenceOffer?'第三方参考资料':'资料待核验'; }
