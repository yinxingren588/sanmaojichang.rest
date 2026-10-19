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
  coupon?: { code: string; providedAt: string; source: 'user'; status: 'unverified' };
  referenceOffer?: {
    priceText: string;
    trafficText: string;
    routeText: string;
    protocolText: string;
    priceKind: 'monthly' | 'annual-equivalent' | 'yearly' | 'unspecified';
    source: string;
    collectedAt: string;
  };
  editorialNotes?: string[];
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
// 品牌与推广入口由用户提供；参考报价保留第三方原文，与已核验套餐分开维护。
export const airports: Airport[] = [
  {
    "id": "invisible",
    "name": "隐形人",
    "slug": "invisible",
    "description": "隐形人价格与流量资料：参考站列示¥24/月起、144GB/月。附用户提供优惠码 yxr888；保留付款周期与来源说明，当前价格请以下单页为准。",
    "affiliateUrl": "https://varnexa.invisibleaff.com/#/?code=JF4seZUy",
    "coupon": {
      "code": "yxr888",
      "providedAt": "2026-10-19",
      "source": "user",
      "status": "unverified"
    },
    "referenceOffer": {
      "priceText": "¥24/月起",
      "trafficText": "144GB/月",
      "routeText": "IEPL纯专线",
      "protocolText": "主流协议",
      "priceKind": "monthly",
      "source": "https://jichang-tuijian.org/brands/invisible",
      "collectedAt": "2026-10-19"
    },
    "editorialNotes": [
      "参考站仅披露起步报价与基础流量，未提供完整套餐档位、流量倍率或当前可售状态；这些资料不参与自动成本排序。"
    ],
    "plans": [],
    "protocols": [],
    "regions": [],
    "advantages": [],
    "disadvantages": [],
    "suitableFor": [],
    "categories": [
      "premium",
      "beginner"
    ],
    "sources": [
      "https://jichang-tuijian.org/brands/invisible"
    ],
    "testStatus": "unverified"
  },
  {
    "id": "twilight",
    "name": "暮光网络",
    "slug": "twilight",
    "description": "暮光网络价格与流量资料：参考站列示¥20/月起、120GB/月。保留付款周期与来源说明，当前价格请以下单页为准。",
    "affiliateUrl": "https://varnexa.twilightaff.com/#/?code=3qqonTlH",
    "referenceOffer": {
      "priceText": "¥20/月起",
      "trafficText": "120GB/月",
      "routeText": "专线节点",
      "protocolText": "VLESS",
      "priceKind": "monthly",
      "source": "https://jichang-tuijian.org/brands/twilight",
      "collectedAt": "2026-10-19"
    },
    "editorialNotes": [
      "参考站仅披露起步报价与基础流量，未提供完整套餐档位、流量倍率或当前可售状态；这些资料不参与自动成本排序。"
    ],
    "plans": [],
    "protocols": [],
    "regions": [],
    "advantages": [],
    "disadvantages": [],
    "suitableFor": [],
    "categories": [
      "premium",
      "beginner"
    ],
    "sources": [
      "https://jichang-tuijian.org/brands/twilight"
    ],
    "testStatus": "unverified"
  },
  {
    "id": "breezenet",
    "name": "微风网络 Breezenet",
    "slug": "breezenet",
    "description": "微风网络 Breezenet价格与流量资料：参考站列示¥8/月起、200GB。附用户提供优惠码 weifeng90；保留付款周期与来源说明，当前价格请以下单页为准。",
    "affiliateUrl": "https://edp01.breezenetaff.com/#/?code=4KDOroY0",
    "coupon": {
      "code": "weifeng90",
      "providedAt": "2026-10-19",
      "source": "user",
      "status": "unverified"
    },
    "referenceOffer": {
      "priceText": "¥8/月起",
      "trafficText": "200GB",
      "routeText": "IEPL/IPLC",
      "protocolText": "VLESS",
      "priceKind": "monthly",
      "source": "https://jichang-tuijian.org/brands/breezenet",
      "collectedAt": "2026-10-19"
    },
    "editorialNotes": [
      "参考站给出了流量数值，但没有明确其重置周期，暂不补写为“每月”。",
      "参考站仅披露起步报价与基础流量，未提供完整套餐档位、流量倍率或当前可售状态；这些资料不参与自动成本排序。"
    ],
    "plans": [],
    "protocols": [],
    "regions": [],
    "advantages": [],
    "disadvantages": [],
    "suitableFor": [],
    "categories": [
      "premium",
      "budget",
      "beginner"
    ],
    "sources": [
      "https://jichang-tuijian.org/brands/breezenet"
    ],
    "testStatus": "unverified"
  },
  {
    "id": "flycat",
    "name": "飞猫云",
    "slug": "flycat",
    "description": "飞猫云价格与流量资料：参考站列示约 ¥7/月起（年付折算月）、150GB。附用户提供优惠码 flycat888；保留付款周期与来源说明，当前价格请以下单页为准。",
    "affiliateUrl": "https://flycat1.flycatvipaff.cc/#/?code=Os3T3OxW",
    "coupon": {
      "code": "flycat888",
      "providedAt": "2026-10-19",
      "source": "user",
      "status": "unverified"
    },
    "referenceOffer": {
      "priceText": "约 ¥7/月起（年付折算月）",
      "trafficText": "150GB",
      "routeText": "IEPL/IPLC / 优质中转线路",
      "protocolText": "Shadowsocks / V2Ray",
      "priceKind": "annual-equivalent",
      "source": "https://jichang-tuijian.org/brands/flycat",
      "collectedAt": "2026-10-19"
    },
    "editorialNotes": [
      "参考价格为年付折算月均值，不代表可以按该金额购买一个月；实际年付总额尚未核实。",
      "参考站给出了流量数值，但没有明确其重置周期，暂不补写为“每月”。",
      "参考站仅披露起步报价与基础流量，未提供完整套餐档位、流量倍率或当前可售状态；这些资料不参与自动成本排序。"
    ],
    "plans": [],
    "protocols": [],
    "regions": [],
    "advantages": [],
    "disadvantages": [],
    "suitableFor": [],
    "categories": [
      "premium",
      "budget"
    ],
    "sources": [
      "https://jichang-tuijian.org/brands/flycat"
    ],
    "testStatus": "unverified"
  },
  {
    "id": "dalaocloud",
    "name": "大佬云",
    "slug": "dalaocloud",
    "description": "大佬云品牌入口已由站点维护者提供。当前尚未取得可引用的价格、流量与套餐周期资料，页面保留推广入口及待核验项目。",
    "affiliateUrl": "https://vip.dalaocloud.com/#/?code=Cp2sfYZg",
    "editorialNotes": [
      "用户提供了品牌推广入口，但指定参考站中没有找到该品牌的价格和流量；暂不使用其他品牌的数据填充。"
    ],
    "plans": [],
    "protocols": [],
    "regions": [],
    "advantages": [],
    "disadvantages": [],
    "suitableFor": [],
    "categories": [],
    "sources": [],
    "testStatus": "unverified"
  },
  {
    "id": "fei-v",
    "name": "飞V",
    "slug": "fei-v",
    "description": "飞V价格与流量资料：参考站列示¥4.9/月起、提供不限时套餐。保留付款周期与来源说明，当前价格请以下单页为准。",
    "affiliateUrl": "https://varnexa.flyvaff.com/#/?code=UoU2Izm5",
    "referenceOffer": {
      "priceText": "¥4.9/月起",
      "trafficText": "提供不限时套餐",
      "routeText": "优化线路",
      "protocolText": "Trojan / V2Ray",
      "priceKind": "monthly",
      "source": "https://jichang-tuijian.org/brands/fei-v",
      "collectedAt": "2026-10-19"
    },
    "editorialNotes": [
      "参考站没有给出可计算的基础流量数值，不能从“多种套餐”或“大流量”等文字推断额度。",
      "参考站仅披露起步报价与基础流量，未提供完整套餐档位、流量倍率或当前可售状态；这些资料不参与自动成本排序。"
    ],
    "plans": [],
    "protocols": [],
    "regions": [],
    "advantages": [],
    "disadvantages": [],
    "suitableFor": [],
    "categories": [
      "budget",
      "beginner"
    ],
    "sources": [
      "https://jichang-tuijian.org/brands/fei-v"
    ],
    "testStatus": "unverified"
  },
  {
    "id": "laddercloud",
    "name": "梯子云 LadderCloud",
    "slug": "laddercloud",
    "description": "梯子云 LadderCloud价格与流量资料：参考站列示¥25/月起、125GB。保留付款周期与来源说明，当前价格请以下单页为准。",
    "affiliateUrl": "https://varnexa.ladderaff.com/#/?code=kuE4kqxo",
    "referenceOffer": {
      "priceText": "¥25/月起",
      "trafficText": "125GB",
      "routeText": "优化中转/专线",
      "protocolText": "主流协议",
      "priceKind": "monthly",
      "source": "https://jichang-tuijian.org/brands/laddercloud",
      "collectedAt": "2026-10-19"
    },
    "editorialNotes": [
      "参考站给出了流量数值，但没有明确其重置周期，暂不补写为“每月”。",
      "参考站仅披露起步报价与基础流量，未提供完整套餐档位、流量倍率或当前可售状态；这些资料不参与自动成本排序。"
    ],
    "plans": [],
    "protocols": [],
    "regions": [],
    "advantages": [],
    "disadvantages": [],
    "suitableFor": [],
    "categories": [
      "premium",
      "beginner"
    ],
    "sources": [
      "https://jichang-tuijian.org/brands/laddercloud"
    ],
    "testStatus": "unverified"
  },
  {
    "id": "lingdong",
    "name": "灵动云",
    "slug": "lingdong",
    "description": "灵动云价格与流量资料：参考站列示¥20/月起、100GB/月起。保留付款周期与来源说明，当前价格请以下单页为准。",
    "affiliateUrl": "https://varnexa.lingdongaff.com/#/?code=QcRK6OPG",
    "referenceOffer": {
      "priceText": "¥20/月起",
      "trafficText": "100GB/月起",
      "routeText": "优化节点",
      "protocolText": "Trojan",
      "priceKind": "monthly",
      "source": "https://jichang-tuijian.org/brands/lingdong",
      "collectedAt": "2026-10-19"
    },
    "editorialNotes": [
      "参考站仅披露起步报价与基础流量，未提供完整套餐档位、流量倍率或当前可售状态；这些资料不参与自动成本排序。"
    ],
    "plans": [],
    "protocols": [],
    "regions": [],
    "advantages": [],
    "disadvantages": [],
    "suitableFor": [],
    "categories": [
      "beginner"
    ],
    "sources": [
      "https://jichang-tuijian.org/brands/lingdong"
    ],
    "testStatus": "unverified"
  },
  {
    "id": "wavenet",
    "name": "浪网 WaveNet",
    "slug": "wavenet",
    "description": "浪网 WaveNet价格与流量资料：参考站列示¥30/月起、150GB/月。保留付款周期与来源说明，当前价格请以下单页为准。",
    "affiliateUrl": "https://varnexa.wavenetaff.com/#/?code=oU77JXen",
    "referenceOffer": {
      "priceText": "¥30/月起",
      "trafficText": "150GB/月",
      "routeText": "自研客户端优化线路",
      "protocolText": "VLESS",
      "priceKind": "monthly",
      "source": "https://jichang-tuijian.org/brands/wavenet",
      "collectedAt": "2026-10-19"
    },
    "editorialNotes": [
      "参考站仅披露起步报价与基础流量，未提供完整套餐档位、流量倍率或当前可售状态；这些资料不参与自动成本排序。"
    ],
    "plans": [],
    "protocols": [],
    "regions": [],
    "advantages": [],
    "disadvantages": [],
    "suitableFor": [],
    "categories": [
      "beginner"
    ],
    "sources": [
      "https://jichang-tuijian.org/brands/wavenet"
    ],
    "testStatus": "unverified"
  },
  {
    "id": "firefly",
    "name": "Firefly机场",
    "slug": "firefly",
    "description": "Firefly机场价格与流量资料：参考站列示约 ¥8/月（年付折算）、60GB/月。附用户提供优惠码 firefly；保留付款周期与来源说明，当前价格请以下单页为准。",
    "affiliateUrl": "https://vip02.fireflyaff.com/#/?code=Fes6j9rn",
    "coupon": {
      "code": "firefly",
      "providedAt": "2026-10-19",
      "source": "user",
      "status": "unverified"
    },
    "referenceOffer": {
      "priceText": "约 ¥8/月（年付折算）",
      "trafficText": "60GB/月",
      "routeText": "优质线路",
      "protocolText": "VLESS",
      "priceKind": "annual-equivalent",
      "source": "https://jichang-tuijian.org/brands/firefly",
      "collectedAt": "2026-10-19"
    },
    "editorialNotes": [
      "参考价格为年付折算月均值，不代表可以按该金额购买一个月；实际年付总额尚未核实。",
      "参考站仅披露起步报价与基础流量，未提供完整套餐档位、流量倍率或当前可售状态；这些资料不参与自动成本排序。"
    ],
    "plans": [],
    "protocols": [],
    "regions": [],
    "advantages": [],
    "disadvantages": [],
    "suitableFor": [],
    "categories": [
      "budget"
    ],
    "sources": [
      "https://jichang-tuijian.org/brands/firefly"
    ],
    "testStatus": "unverified"
  },
  {
    "id": "civet",
    "name": "灵猫",
    "slug": "civet",
    "description": "灵猫价格与流量资料：参考站列示¥25/月起、150GB/月。保留付款周期与来源说明，当前价格请以下单页为准。",
    "affiliateUrl": "https://vip02.civetaff.com/#/?code=kZlRw46w",
    "referenceOffer": {
      "priceText": "¥25/月起",
      "trafficText": "150GB/月",
      "routeText": "IPLC",
      "protocolText": "V2Ray",
      "priceKind": "monthly",
      "source": "https://jichang-tuijian.org/brands/civet",
      "collectedAt": "2026-10-19"
    },
    "editorialNotes": [
      "参考站仅披露起步报价与基础流量，未提供完整套餐档位、流量倍率或当前可售状态；这些资料不参与自动成本排序。"
    ],
    "plans": [],
    "protocols": [],
    "regions": [],
    "advantages": [],
    "disadvantages": [],
    "suitableFor": [],
    "categories": [
      "premium",
      "beginner"
    ],
    "sources": [
      "https://jichang-tuijian.org/brands/civet"
    ],
    "testStatus": "unverified"
  },
  {
    "id": "flashleap",
    "name": "闪跃 FlashLeap",
    "slug": "flashleap",
    "description": "闪跃 FlashLeap价格与流量资料：参考站列示¥24/月起、150GB/月。附用户提供优惠码 shanyue；保留付款周期与来源说明，当前价格请以下单页为准。",
    "affiliateUrl": "https://vip02.flashleapaff.com/#/?code=FkCGEeaC",
    "coupon": {
      "code": "shanyue",
      "providedAt": "2026-10-19",
      "source": "user",
      "status": "unverified"
    },
    "referenceOffer": {
      "priceText": "¥24/月起",
      "trafficText": "150GB/月",
      "routeText": "IPLC纯专线",
      "protocolText": "主流协议",
      "priceKind": "monthly",
      "source": "https://jichang-tuijian.org/brands/flashleap",
      "collectedAt": "2026-10-19"
    },
    "editorialNotes": [
      "参考站仅披露起步报价与基础流量，未提供完整套餐档位、流量倍率或当前可售状态；这些资料不参与自动成本排序。"
    ],
    "plans": [],
    "protocols": [],
    "regions": [],
    "advantages": [],
    "disadvantages": [],
    "suitableFor": [],
    "categories": [
      "premium",
      "beginner"
    ],
    "sources": [
      "https://jichang-tuijian.org/brands/flashleap"
    ],
    "testStatus": "unverified"
  },
  {
    "id": "worryfree",
    "name": "无忧链接",
    "slug": "worryfree",
    "description": "无忧链接价格与流量资料：参考站列示¥19/月起、100GB/月。附用户提供优惠码 wuyou666；保留付款周期与来源说明，当前价格请以下单页为准。",
    "affiliateUrl": "https://wep01.worryfreeaff.com/#/?code=56A0RTpU",
    "coupon": {
      "code": "wuyou666",
      "providedAt": "2026-10-19",
      "source": "user",
      "status": "unverified"
    },
    "referenceOffer": {
      "priceText": "¥19/月起",
      "trafficText": "100GB/月",
      "routeText": "IPLC",
      "protocolText": "Shadowsocks / V2Ray",
      "priceKind": "monthly",
      "source": "https://jichang-tuijian.org/brands/worryfree",
      "collectedAt": "2026-10-19"
    },
    "editorialNotes": [
      "参考站仅披露起步报价与基础流量，未提供完整套餐档位、流量倍率或当前可售状态；这些资料不参与自动成本排序。"
    ],
    "plans": [],
    "protocols": [],
    "regions": [],
    "advantages": [],
    "disadvantages": [],
    "suitableFor": [],
    "categories": [
      "premium",
      "beginner"
    ],
    "sources": [
      "https://jichang-tuijian.org/brands/worryfree"
    ],
    "testStatus": "unverified"
  },
  {
    "id": "kuajie",
    "name": "跨界云",
    "slug": "kuajie",
    "description": "跨界云价格与流量资料：参考站列示¥20/月起、120GB/月。保留付款周期与来源说明，当前价格请以下单页为准。",
    "affiliateUrl": "https://vip02.kuajieaff.com/#/?code=VfWeYwHM",
    "referenceOffer": {
      "priceText": "¥20/月起",
      "trafficText": "120GB/月",
      "routeText": "全专线架构",
      "protocolText": "Shadowsocks",
      "priceKind": "monthly",
      "source": "https://jichang-tuijian.org/brands/kuajie",
      "collectedAt": "2026-10-19"
    },
    "editorialNotes": [
      "参考站仅披露起步报价与基础流量，未提供完整套餐档位、流量倍率或当前可售状态；这些资料不参与自动成本排序。"
    ],
    "plans": [],
    "protocols": [],
    "regions": [],
    "advantages": [],
    "disadvantages": [],
    "suitableFor": [],
    "categories": [
      "premium",
      "beginner"
    ],
    "sources": [
      "https://jichang-tuijian.org/brands/kuajie"
    ],
    "testStatus": "unverified"
  },
  {
    "id": "stardream",
    "name": "星岛梦 StarDream",
    "slug": "stardream",
    "description": "星岛梦 StarDream价格与流量资料：参考站列示¥16/月起、100GB/月。附用户提供优惠码 nmw888；保留付款周期与来源说明，当前价格请以下单页为准。",
    "affiliateUrl": "https://kfccbb.xingdaomeng.com/#/?code=JTRIWFim",
    "coupon": {
      "code": "nmw888",
      "providedAt": "2026-10-19",
      "source": "user",
      "status": "unverified"
    },
    "referenceOffer": {
      "priceText": "¥16/月起",
      "trafficText": "100GB/月",
      "routeText": "IPLC / IEPL",
      "protocolText": "V2Ray",
      "priceKind": "monthly",
      "source": "https://jichang-tuijian.org/brands/stardream",
      "collectedAt": "2026-10-19"
    },
    "editorialNotes": [
      "参考站仅披露起步报价与基础流量，未提供完整套餐档位、流量倍率或当前可售状态；这些资料不参与自动成本排序。"
    ],
    "plans": [],
    "protocols": [],
    "regions": [],
    "advantages": [],
    "disadvantages": [],
    "suitableFor": [],
    "categories": [
      "premium",
      "beginner"
    ],
    "sources": [
      "https://jichang-tuijian.org/brands/stardream"
    ],
    "testStatus": "unverified"
  },
  {
    "id": "lightspeed",
    "name": "光速云 LightSpeed",
    "slug": "lightspeed",
    "description": "光速云 LightSpeed价格与流量资料：参考站列示¥23/月起、148GB。附用户提供优惠码 jichangcha09；保留付款周期与来源说明，当前价格请以下单页为准。",
    "affiliateUrl": "https://mdlky.gsyaff.com/#/?code=6tRWbtgK",
    "coupon": {
      "code": "jichangcha09",
      "providedAt": "2026-10-19",
      "source": "user",
      "status": "unverified"
    },
    "referenceOffer": {
      "priceText": "¥23/月起",
      "trafficText": "148GB",
      "routeText": "公网隧道中转",
      "protocolText": "主流协议",
      "priceKind": "monthly",
      "source": "https://jichang-tuijian.org/brands/lightspeed",
      "collectedAt": "2026-10-19"
    },
    "editorialNotes": [
      "参考站给出了流量数值，但没有明确其重置周期，暂不补写为“每月”。",
      "参考站仅披露起步报价与基础流量，未提供完整套餐档位、流量倍率或当前可售状态；这些资料不参与自动成本排序。"
    ],
    "plans": [],
    "protocols": [],
    "regions": [],
    "advantages": [],
    "disadvantages": [],
    "suitableFor": [],
    "categories": [
      "beginner"
    ],
    "sources": [
      "https://jichang-tuijian.org/brands/lightspeed"
    ],
    "testStatus": "unverified"
  },
  {
    "id": "v2yun",
    "name": "唯兔云（V2云）",
    "slug": "v2yun",
    "description": "唯兔云（V2云）价格与流量资料：参考站列示¥14.9/月起、100GB/月。附用户提供优惠码 rabbit；保留付款周期与来源说明，当前价格请以下单页为准。",
    "affiliateUrl": "https://fast.v2yunvipaff.com/#/?code=xYEe8gyb",
    "coupon": {
      "code": "rabbit",
      "providedAt": "2026-10-19",
      "source": "user",
      "status": "unverified"
    },
    "referenceOffer": {
      "priceText": "¥14.9/月起",
      "trafficText": "100GB/月",
      "routeText": "IPLC专线",
      "protocolText": "VLESS / SS",
      "priceKind": "monthly",
      "source": "https://jichang-tuijian.org/brands/v2yun",
      "collectedAt": "2026-10-19"
    },
    "editorialNotes": [
      "参考站仅披露起步报价与基础流量，未提供完整套餐档位、流量倍率或当前可售状态；这些资料不参与自动成本排序。"
    ],
    "plans": [],
    "protocols": [],
    "regions": [],
    "advantages": [],
    "disadvantages": [],
    "suitableFor": [],
    "categories": [
      "premium",
      "budget",
      "beginner"
    ],
    "sources": [
      "https://jichang-tuijian.org/brands/v2yun"
    ],
    "testStatus": "unverified"
  },
  {
    "id": "u1s1",
    "name": "U1S1（有一说一）",
    "slug": "u1s1",
    "description": "U1S1（有一说一）价格与流量资料：参考站列示¥20/月起、120GB/月。附用户提供优惠码 U1S1；保留付款周期与来源说明，当前价格请以下单页为准。",
    "affiliateUrl": "https://pkdj7.vipaff.cc/#/?code=NMjmHbvu",
    "coupon": {
      "code": "U1S1",
      "providedAt": "2026-10-19",
      "source": "user",
      "status": "unverified"
    },
    "referenceOffer": {
      "priceText": "¥20/月起",
      "trafficText": "120GB/月",
      "routeText": "BGP三网优化 + IEPL",
      "protocolText": "Shadowsocks",
      "priceKind": "monthly",
      "source": "https://jichang-tuijian.org/brands/u1s1",
      "collectedAt": "2026-10-19"
    },
    "editorialNotes": [
      "参考站仅披露起步报价与基础流量，未提供完整套餐档位、流量倍率或当前可售状态；这些资料不参与自动成本排序。"
    ],
    "plans": [],
    "protocols": [],
    "regions": [],
    "advantages": [],
    "disadvantages": [],
    "suitableFor": [],
    "categories": [
      "premium",
      "beginner"
    ],
    "sources": [
      "https://jichang-tuijian.org/brands/u1s1"
    ],
    "testStatus": "unverified"
  },
  {
    "id": "jilianyun",
    "name": "极连云",
    "slug": "jilianyun",
    "description": "极连云价格与流量资料：参考站列示¥14.4/月起、100GB/月。保留付款周期与来源说明，当前价格请以下单页为准。",
    "affiliateUrl": "https://kdjhao.jlyvipaff.com/#/?code=poyoU7mq",
    "referenceOffer": {
      "priceText": "¥14.4/月起",
      "trafficText": "100GB/月",
      "routeText": "IPLC / IEPL",
      "protocolText": "自研/通用",
      "priceKind": "monthly",
      "source": "https://jichang-tuijian.org/brands/jilianyun",
      "collectedAt": "2026-10-19"
    },
    "editorialNotes": [
      "参考站仅披露起步报价与基础流量，未提供完整套餐档位、流量倍率或当前可售状态；这些资料不参与自动成本排序。"
    ],
    "plans": [],
    "protocols": [],
    "regions": [],
    "advantages": [],
    "disadvantages": [],
    "suitableFor": [],
    "categories": [
      "premium",
      "budget",
      "beginner"
    ],
    "sources": [
      "https://jichang-tuijian.org/brands/jilianyun"
    ],
    "testStatus": "unverified"
  },
  {
    "id": "globalcloud",
    "name": "全球云",
    "slug": "globalcloud",
    "description": "全球云价格与流量资料：参考站列示约 ¥20/月起、120GB/月。附用户提供优惠码 tt88；保留付款周期与来源说明，当前价格请以下单页为准。",
    "affiliateUrl": "https://sswdh.gcvipaff.com/#/?code=NE1AcNIX",
    "coupon": {
      "code": "tt88",
      "providedAt": "2026-10-19",
      "source": "user",
      "status": "unverified"
    },
    "referenceOffer": {
      "priceText": "约 ¥20/月起",
      "trafficText": "120GB/月",
      "routeText": "中转优化",
      "protocolText": "VLESS / Trojan",
      "priceKind": "monthly",
      "source": "https://jichang-tuijian.org/brands/globalcloud",
      "collectedAt": "2026-10-19"
    },
    "editorialNotes": [
      "参考站仅披露起步报价与基础流量，未提供完整套餐档位、流量倍率或当前可售状态；这些资料不参与自动成本排序。"
    ],
    "plans": [],
    "protocols": [],
    "regions": [],
    "advantages": [],
    "disadvantages": [],
    "suitableFor": [],
    "categories": [
      "beginner"
    ],
    "sources": [
      "https://jichang-tuijian.org/brands/globalcloud"
    ],
    "testStatus": "unverified"
  },
  {
    "id": "lightyear",
    "name": "光年梯",
    "slug": "lightyear",
    "description": "光年梯价格与流量资料：参考站列示¥12.6/月起、110GB/月。保留付款周期与来源说明，当前价格请以下单页为准。",
    "affiliateUrl": "https://ggmq.gntaff.com/#/?code=RAJFvngV",
    "referenceOffer": {
      "priceText": "¥12.6/月起",
      "trafficText": "110GB/月",
      "routeText": "IEPL专线",
      "protocolText": "Shadowsocks",
      "priceKind": "monthly",
      "source": "https://jichang-tuijian.org/brands/lightyear",
      "collectedAt": "2026-10-19"
    },
    "editorialNotes": [
      "参考站仅披露起步报价与基础流量，未提供完整套餐档位、流量倍率或当前可售状态；这些资料不参与自动成本排序。"
    ],
    "plans": [],
    "protocols": [],
    "regions": [],
    "advantages": [],
    "disadvantages": [],
    "suitableFor": [],
    "categories": [
      "premium",
      "budget",
      "beginner"
    ],
    "sources": [
      "https://jichang-tuijian.org/brands/lightyear"
    ],
    "testStatus": "unverified"
  },
  {
    "id": "sogocloud",
    "name": "Sogo云",
    "slug": "sogocloud",
    "description": "Sogo云价格与流量资料：参考站列示¥25/月起、150GB/月。保留付款周期与来源说明，当前价格请以下单页为准。",
    "affiliateUrl": "https://wzjc.sogoyunaff.cc/#/?code=2x2EywO9",
    "referenceOffer": {
      "priceText": "¥25/月起",
      "trafficText": "150GB/月",
      "routeText": "IEPL企业级专线",
      "protocolText": "自研协议/通用协议",
      "priceKind": "monthly",
      "source": "https://jichang-tuijian.org/brands/sogocloud",
      "collectedAt": "2026-10-19"
    },
    "editorialNotes": [
      "参考站仅披露起步报价与基础流量，未提供完整套餐档位、流量倍率或当前可售状态；这些资料不参与自动成本排序。"
    ],
    "plans": [],
    "protocols": [],
    "regions": [],
    "advantages": [],
    "disadvantages": [],
    "suitableFor": [],
    "categories": [
      "premium",
      "beginner"
    ],
    "sources": [
      "https://jichang-tuijian.org/brands/sogocloud"
    ],
    "testStatus": "unverified"
  },
  {
    "id": "yuzhou",
    "name": "宇宙云 YuZhou",
    "slug": "yuzhou",
    "description": "宇宙云 YuZhou价格与流量资料：参考站列示¥14.9/月起、60GB/月起。附用户提供优惠码 YUZHOU553；保留付款周期与来源说明，当前价格请以下单页为准。",
    "affiliateUrl": "https://wzjc.yuzoucloud.cc/#/?code=wL7YStBa",
    "coupon": {
      "code": "YUZHOU553",
      "providedAt": "2026-10-19",
      "source": "user",
      "status": "unverified"
    },
    "referenceOffer": {
      "priceText": "¥14.9/月起",
      "trafficText": "60GB/月起",
      "routeText": "IPLC / IEPL",
      "protocolText": "主流协议",
      "priceKind": "monthly",
      "source": "https://jichang-tuijian.org/brands/yuzhou",
      "collectedAt": "2026-10-19"
    },
    "editorialNotes": [
      "参考站仅披露起步报价与基础流量，未提供完整套餐档位、流量倍率或当前可售状态；这些资料不参与自动成本排序。"
    ],
    "plans": [],
    "protocols": [],
    "regions": [],
    "advantages": [],
    "disadvantages": [],
    "suitableFor": [],
    "categories": [
      "premium",
      "budget",
      "beginner"
    ],
    "sources": [
      "https://jichang-tuijian.org/brands/yuzhou"
    ],
    "testStatus": "unverified"
  },
  {
    "id": "2mao",
    "name": "二猫云 2mao",
    "slug": "2mao",
    "description": "二猫云 2mao价格与流量资料：参考站列示约 ¥15/月起、多种套餐。保留付款周期与来源说明，当前价格请以下单页为准。",
    "affiliateUrl": "https://waaa.2maoyunaff.cc/#/?code=uHeyKG44",
    "referenceOffer": {
      "priceText": "约 ¥15/月起",
      "trafficText": "多种套餐",
      "routeText": "多节点覆盖",
      "protocolText": "主流协议",
      "priceKind": "monthly",
      "source": "https://jichang-tuijian.org/brands/2mao",
      "collectedAt": "2026-10-19"
    },
    "editorialNotes": [
      "参考站没有给出可计算的基础流量数值，不能从“多种套餐”或“大流量”等文字推断额度。",
      "参考站仅披露起步报价与基础流量，未提供完整套餐档位、流量倍率或当前可售状态；这些资料不参与自动成本排序。"
    ],
    "plans": [],
    "protocols": [],
    "regions": [],
    "advantages": [],
    "disadvantages": [],
    "suitableFor": [],
    "categories": [
      "budget",
      "beginner"
    ],
    "sources": [
      "https://jichang-tuijian.org/brands/2mao"
    ],
    "testStatus": "unverified"
  },
  {
    "id": "1fly",
    "name": "一翻云 1fly",
    "slug": "1fly",
    "description": "一翻云 1fly价格与流量资料：参考站列示¥25/月起、150GB/月。保留付款周期与来源说明，当前价格请以下单页为准。",
    "affiliateUrl": "https://wzjc.1flyunaff.cc/#/?code=F7eaT191",
    "referenceOffer": {
      "priceText": "¥25/月起",
      "trafficText": "150GB/月",
      "routeText": "专线节点",
      "protocolText": "主流协议",
      "priceKind": "monthly",
      "source": "https://jichang-tuijian.org/brands/1fly",
      "collectedAt": "2026-10-19"
    },
    "editorialNotes": [
      "参考站仅披露起步报价与基础流量，未提供完整套餐档位、流量倍率或当前可售状态；这些资料不参与自动成本排序。"
    ],
    "plans": [],
    "protocols": [],
    "regions": [],
    "advantages": [],
    "disadvantages": [],
    "suitableFor": [],
    "categories": [
      "premium",
      "beginner"
    ],
    "sources": [
      "https://jichang-tuijian.org/brands/1fly"
    ],
    "testStatus": "unverified"
  },
  {
    "id": "edgenova",
    "name": "边缘节点 EdgeNova",
    "slug": "edgenova",
    "description": "边缘节点 EdgeNova价格与流量资料：参考站列示约 ¥86/年起、大流量套餐。保留付款周期与来源说明，当前价格请以下单页为准。",
    "affiliateUrl": "https://work.edgenovaaff.cc/#/?code=z81zCfw1",
    "referenceOffer": {
      "priceText": "约 ¥86/年起",
      "trafficText": "大流量套餐",
      "routeText": "IEPL专线直连",
      "protocolText": "专用客户端支持",
      "priceKind": "yearly",
      "source": "https://jichang-tuijian.org/brands/edgenova",
      "collectedAt": "2026-10-19"
    },
    "editorialNotes": [
      "参考站按年标价；不要将其当作月付价格，具体付款周期与续费条件需在下单前确认。",
      "参考站没有给出可计算的基础流量数值，不能从“多种套餐”或“大流量”等文字推断额度。",
      "参考站仅披露起步报价与基础流量，未提供完整套餐档位、流量倍率或当前可售状态；这些资料不参与自动成本排序。"
    ],
    "plans": [],
    "protocols": [],
    "regions": [],
    "advantages": [],
    "disadvantages": [],
    "suitableFor": [],
    "categories": [
      "premium"
    ],
    "sources": [
      "https://jichang-tuijian.org/brands/edgenova"
    ],
    "testStatus": "unverified"
  },
  {
    "id": "kosing",
    "name": "可信云",
    "slug": "kosing",
    "description": "可信云价格与流量资料：参考站列示¥9/月起、45GB/月。保留付款周期与来源说明，当前价格请以下单页为准。",
    "affiliateUrl": "https://work.kosingaff.com/#/?code=BNsA58Es",
    "referenceOffer": {
      "priceText": "¥9/月起",
      "trafficText": "45GB/月",
      "routeText": "IPLC",
      "protocolText": "主流协议",
      "priceKind": "monthly",
      "source": "https://jichang-tuijian.org/brands/kosing",
      "collectedAt": "2026-10-19"
    },
    "editorialNotes": [
      "参考站仅披露起步报价与基础流量，未提供完整套餐档位、流量倍率或当前可售状态；这些资料不参与自动成本排序。"
    ],
    "plans": [],
    "protocols": [],
    "regions": [],
    "advantages": [],
    "disadvantages": [],
    "suitableFor": [],
    "categories": [
      "premium",
      "budget",
      "beginner"
    ],
    "sources": [
      "https://jichang-tuijian.org/brands/kosing"
    ],
    "testStatus": "unverified"
  },
  {
    "id": "sujie",
    "name": "速界 SuJie",
    "slug": "sujie",
    "description": "速界 SuJie价格与流量资料：参考站列示¥25/月起、按套餐而定。保留付款周期与来源说明，当前价格请以下单页为准。",
    "affiliateUrl": "https://work.speedworldaff.cc/#/?code=wSjLCpIf",
    "referenceOffer": {
      "priceText": "¥25/月起",
      "trafficText": "按套餐而定",
      "routeText": "新手优化线路",
      "protocolText": "官方客户端",
      "priceKind": "monthly",
      "source": "https://jichang-tuijian.org/brands/sujie",
      "collectedAt": "2026-10-19"
    },
    "editorialNotes": [
      "参考站没有给出可计算的基础流量数值，不能从“多种套餐”或“大流量”等文字推断额度。",
      "参考站仅披露起步报价与基础流量，未提供完整套餐档位、流量倍率或当前可售状态；这些资料不参与自动成本排序。"
    ],
    "plans": [],
    "protocols": [],
    "regions": [],
    "advantages": [],
    "disadvantages": [],
    "suitableFor": [],
    "categories": [
      "beginner"
    ],
    "sources": [
      "https://jichang-tuijian.org/brands/sujie"
    ],
    "testStatus": "unverified"
  },
  {
    "id": "kuaili",
    "name": "快狸 KuaiLi",
    "slug": "kuaili",
    "description": "快狸 KuaiLi价格与流量资料：参考站列示¥10/月起（年付折算）、30GB/月。保留付款周期与来源说明，当前价格请以下单页为准。",
    "affiliateUrl": "https://work.kuailicloud.cc/#/?code=gVGJa0Mp",
    "referenceOffer": {
      "priceText": "¥10/月起（年付折算）",
      "trafficText": "30GB/月",
      "routeText": "IEPL专线",
      "protocolText": "自研客户端",
      "priceKind": "annual-equivalent",
      "source": "https://jichang-tuijian.org/brands/kuaili",
      "collectedAt": "2026-10-19"
    },
    "editorialNotes": [
      "参考价格为年付折算月均值，不代表可以按该金额购买一个月；实际年付总额尚未核实。",
      "参考站仅披露起步报价与基础流量，未提供完整套餐档位、流量倍率或当前可售状态；这些资料不参与自动成本排序。"
    ],
    "plans": [],
    "protocols": [],
    "regions": [],
    "advantages": [],
    "disadvantages": [],
    "suitableFor": [],
    "categories": [
      "premium",
      "budget"
    ],
    "sources": [
      "https://jichang-tuijian.org/brands/kuaili"
    ],
    "testStatus": "unverified"
  }
];
