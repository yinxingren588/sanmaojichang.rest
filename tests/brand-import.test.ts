import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {airports} from '../src/data/airports.ts';
import {displayPrice,displayTraffic,entryPlan,rankingEntries,evidenceLabel} from '../src/lib/airports.ts';
test('29 supplied brands and referral fragments survive import exactly',()=>{
  const rows=JSON.parse(readFileSync('docs/brand-input.json','utf8')) as string[][];
  assert.equal(airports.length,29);assert.equal(rows.length,29);
  for(const [name,slug,url,coupon] of rows){const a=airports.find(a=>a.slug===slug)!;assert.ok(a);assert.equal(a.name,name);assert.equal(a.affiliateUrl,url);assert.equal(a.coupon?.code,coupon||undefined);assert.equal(new URL(url).hash.startsWith('#/?code='),true);}
  assert.equal(airports.filter(a=>a.coupon).length,12);
});
test('reference summaries preserve annual billing and unknown traffic periods',()=>{
  for(const slug of ['flycat','firefly','kuaili'])assert.match(displayPrice(airports.find(a=>a.slug===slug)!),/年付折算/);
  assert.equal(displayPrice(airports.find(a=>a.slug==='edgenova')!),'约 ¥86/年起');
  assert.equal(displayTraffic(airports.find(a=>a.slug==='breezenet')!),'200GB');
  const dalao=airports.find(a=>a.slug==='dalaocloud')!;
  assert.equal(displayPrice(dalao),'¥19.9');assert.equal(displayTraffic(dalao),'100GB');
  assert.equal(dalao.referenceOffer?.priceKind,'unspecified');
  assert.equal(dalao.referenceOffer?.sourceKind,'user');assert.equal(evidenceLabel(dalao),'维护者提供资料');
  assert.equal(airports.some(a=>a.slug==='pandacloud'),false);
});
test('third-party summaries never become verified plans or invented rankings',()=>{
  assert.equal(airports.filter(a=>a.referenceOffer&&a.referenceOffer.sourceKind!=='user').length,28);
  assert.equal(airports.filter(a=>a.referenceOffer?.sourceKind==='user').length,1);
  for(const a of airports){assert.equal(a.testStatus,'unverified');assert.equal(a.plans.length,0);assert.equal(entryPlan(a),undefined);assert.equal(a.lastVerified,undefined);}
  for(const kind of ['overall','budget','value','stable'])assert.deepEqual(rankingEntries(airports,kind),[]);
});
