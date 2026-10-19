export interface Plan {
  id: string;
  name: string;
  price: number;
  currency: string;
  billing: 'monthly' | 'yearly' | 'one-time';
  trafficGB: number;
  trafficUnit: 'GB' | 'GiB';
  trafficPeriod: 'month' | 'year' | 'total';
  multiplier: number;
  verified: boolean;
  available: boolean;
  source: string;
  verifiedAt: string;
}
export interface StabilityEvidence {
  source: string;
  environment: string;
  from: string;
  to: string;
  days: number;
  samplesPerDay: number;
  includesPeak: boolean;
  attempts: number;
  successes: number;
  downtimeMinutes: number;
}
export interface Airport {
  id: string;
  name: string;
  slug: string;
  description: string;
  officialUrl?: string;
  affiliateUrl?: string;
  startingPrice?: number;
  currency?: string;
  plans: Plan[];
  protocols: string[];
  regions: string[];
  routeType?: string;
  deviceLimit?: string;
  aiSupport?: string[];
  streamingSupport?: string[];
  advantages: string[];
  disadvantages: string[];
  suitableFor: string[];
  categories: string[];
  sources: string[];
  lastVerified?: string;
  testStatus: 'tested' | 'official-data' | 'unverified';
  stability?: StabilityEvidence;
  reviewPublished?: boolean;
}
// 用户要求品牌全部留空，待提供后录入；禁止把测试夹具放入本文件。
export const airports: Airport[] = [];
