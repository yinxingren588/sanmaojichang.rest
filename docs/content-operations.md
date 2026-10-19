# 内容与品牌录入

## 唯一数据源

`src/data/airports.ts` 是所有品牌与套餐的唯一维护位置。当前含 29 个用户提供品牌、12 个优惠码与 28 份第三方摘要。不要往生产数组放虚构品牌或测试夹具。

收到品牌时先确认名称、主域名和来源链；搜索结果自称“官网”不等于身份已核实。`officialUrl` 只填已经确认的来源，不确定则省略。

## 品牌字段

按接口维护：id、英文 slug、说明、官方地址、套餐数组、协议、地区、线路、设备限制、AI 与流媒体资料、优点、注意事项、适合人群、专题分类、来源、核验日期和状态。未知数组保持空，未知可选值省略，界面会显示“尚未核实”。

- `unverified`：来源或关键资料未确认，不参与自动排序；具有可追溯第三方参考摘要的资料页可索引，缺少报价来源的详情 noindex。
- `official-data`：官方公开资料已核对，不等于实测。
- `tested`：存在原始测试记录，必须有 `stability` 环境、日期、次数、失败时长与来源。

`startingPrice` 仅作为接口兼容字段，已核验价格从套餐计算；无合格套餐时展示 referenceOffer.priceText 原文，参考摘要不能参与成本排序。默认月付起价为已核验 CNY 月付、每月流量重置套餐的最低实际金额。

`categories` 使用 budget、premium、beginner、stable、ai、streaming。目前 budget、premium、beginner 仅按参考起价/线路关联；分类不是适用性实测或质量分数。不要从分类自动推导支持能力。

## 套餐字段与计算

每份套餐记录实际付款金额与币种、billing（月付/年付/一次性）、trafficPeriod（月/年/总额）、trafficUnit（GB/GiB）、标称流量、倍率、销售状态、来源和核验日期。

未知流量、倍率、单位或来源时，不把该套餐标记 `verified: true`。GB 与 GiB 先统一，倍率必须大于 0；套餐不可购买时不进入自动排序。不同周期或币种分别比较。

默认排行榜比较 CNY 月付、每月流量组；工具函数支持显式传入其他组，但必须在页面说明组别。综合榜只按名称列示合格候选，不设评分；性价比榜按组内最低有效每 GB 成本；低预算榜按组内最低当期金额；稳定性只使用符合条件的实测记录。

## 独立评测

`reviewPublished` 默认省略。只有 `testStatus: tested` 且有完整记录时，才设为 true 并生成 `/review/[slug]/`。模板包含结论边界、基本介绍、套餐资料入口、线路、客户端、AI 与流媒体、优缺点、适用人群、购买注意、FAQ、对比、来源与日期。

原始测试记录必须可读、可追溯；不要只放无法访问的私人文件路径。模板不替你进行事实核验。发布前应补充实际观察、解释样本限制，并检查措辞与证据一致。未经测试的支持情况仍标为资料整理。

## 正文与更新日期

Markdown 位于 `src/content/articles`，必须有独立标题与摘要、section、slug、发布及更新日期、tags 和 sources。正文不要再写 H1，页面模板提供唯一 H1。

发布类型只有 guides、blog、glossary；草稿 `draft: true` 不生成页面。相关文章按照标签交集自动选取，不依靠全站关键词堆叠。

实质修改正文后才更新 `updated`；列表与政策内容实质变化时，维护 `src/data/site.ts` 中相关日期策略。构建不会用当天时间批量覆盖 lastmod。

## 商业关系

若录入 affiliateUrl，品牌资料页会显示推广披露并使用 sponsored 链接。必须同步检查编辑政策是否仍准确。联盟推广不能影响排名；不要把推广链接填为 officialUrl 来隐藏关系。

## 发布检查

```sh
npm run check
npm test
npm run build
npm run audit
```

录入后检查详情页、推荐专题、排名、对比及 Sitemap。品牌库不空且仍没有合格套餐时，榜单应继续保持无排名。正式部署后再执行 IndexNow dry-run 和明确提交。

## 本次品牌导入

用户原始名称、链接、优惠码见 docs/brand-input.json；逐项采集结果见 docs/brand-import.csv。referenceOffer 保留 priceText、trafficText、routeText、protocolText、priceKind、source、collectedAt；不要补写缺失流量周期。coupon 保留原始大小写、提供日期与 unverified 状态；未知折扣、期限、适用条件不推断。来源未给完整档位、倍率和可售状态，因此 plans 保持空，不计算成本或发布实测排名。
