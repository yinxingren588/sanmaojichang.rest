export const SITE = {
  name: '三毛导航',
  domain: 'https://sanmaojichang.rest',
  repository: 'https://github.com/yinxingren588/sanmaojichang.rest',
  telegram: { handle: '@yinxingren_588', url: 'https://t.me/yinxingren_588' },
  published: '2026-10-19',
  description: '三毛机场主题博客：用清晰的选择指南、客户端教程与可核验资料，帮助你读懂机场订阅。'
};
export const sections: Record<string, {name: string; description: string; label: string}> = {
  guides: {name:'使用教程', description:'从客户端下载、订阅配置到分层排查，按设备与具体问题找到步骤、验证方法和恢复路径。', label:'GUIDES'},
  blog: {name:'博客文章', description:'阅读套餐决策、网络知识与使用场景分析，用清楚的概念、具体案例和来源理解每一次选择。', label:'JOURNAL'},
  glossary: {name:'知识百科', description:'读懂订阅、倍率、延迟与分流，少一点术语，多一点理解。', label:'GLOSSARY'}
};
export const topics = [
  {slug:'budget',name:'低预算',icon:'¥',desc:'把月费与流量一起算',headline:'低预算机场怎么选：先控制试错成本',intro:'低价只是一个条件。先核对实际支付周期、流量倍率与退款条件，再决定是否适合自己的用量。',checks:['设定每月可接受的总支出，包含客户端费用。','先选短周期试用，年付折算不能替代真实月付。','对照流量重置时间，避免月底才发现额度不足。'],related:['budget-checklist','cost-per-gb'],ranking:'budget'},
  {slug:'premium',name:'高端专线',icon:'↗',desc:'看清线路，也看证据',headline:'高端专线选择指南：线路标签需要哪些证据',intro:'IPLC、IEPL 等名称描述线路产品，不能单独证明端到端体验。应结合接入方式、负载与本地网络验证。',checks:['向服务商核实接入与出口，区分宣传标签和合同资料。','按同一设备、同一网络、同一时段做对照。','保存故障处理、维护通知和服务边界。'],related:['claims-and-evidence','trial-checklist'],ranking:'overall'},
  {slug:'beginner',name:'新手入门',icon:'◎',desc:'从第一份订阅开始',headline:'新手机场选择指南：先确认来源与客户端',intro:'先了解订阅与客户端的区别，再检查设备支持、短期套餐和帮助文档。新手不需要从复杂配置开始。',checks:['从项目官方发布渠道下载客户端。','不要向陌生人发送完整订阅地址。','先完成一次导入、更新和关闭代理的完整练习。'],related:['verify-address','trial-checklist'],ranking:'overall'},
  {slug:'stable',name:'稳定优先',icon:'≋',desc:'关注高峰与连续表现',headline:'稳定性怎么判断：用连续记录代替一次测速',intro:'一次高速度无法说明长期可用性。稳定性需要在多个时段反复观察，并记录故障持续时间与恢复情况。',checks:['记录日期、接入运营商、地区与节点，不采集敏感内容。','把握手延迟、吞吐和实际应用表现分开记录。','本地网络故障与服务端故障分开归因。'],related:['claims-and-evidence','trial-checklist'],ranking:'stable'},
  {slug:'ai',name:'AI 服务',icon:'✳',desc:'核对地区与账号条件',headline:'AI 服务网络选择：可访问不等于持续可用',intro:'访问条件还取决于服务支持地区、账号、付款方式与平台规则。节点名称或“解锁”宣传不能作为可用承诺。',checks:['先查目标平台官方支持地区及使用条款。','用自己的实际任务验证连接，不共享账号。','记录网页和 API 的不同表现，避免混为一谈。'],related:['claims-and-evidence','verify-address'],ranking:'overall'},
  {slug:'streaming',name:'流媒体',icon:'▷',desc:'关注片库与播放体验',headline:'流媒体网络选择：片库、清晰度与持续播放',intro:'看到首页并不代表能播放目标内容。账号地区、版权片库、播放设备与网络都可能影响结果。',checks:['使用自己有权访问的内容与账号进行验证。','固定清晰度与设备，观察缓冲及连续播放。','解锁状态会变化，保存日期而不是承诺永久有效。'],related:['trial-checklist','claims-and-evidence'],ranking:'stable'}
];
export const rankingTypes = [
  {slug:'overall',name:'综合排行榜',description:'比较资料完整度与可验证的使用条件。',rule:'不设主观总分。只有价格、周期、流量和来源全部可核验的品牌才进入候选表；资料完整度只衡量披露情况，不代表质量优劣。'},
  {slug:'value',name:'性价比排行榜',description:'在相同周期和币种内比较有效流量成本。',rule:'每 GB 成本 = 套餐价格 ÷（标称 GB ÷ 流量倍率）。GB 与 GiB 先统一；月付、年付与不限时分组，币种分组，不把年付等效月费当作月付价格。'},
  {slug:'budget',name:'低预算排行榜',description:'用真实月付金额比较入门门槛。',rule:'仅比较已核实、当前可购买的同币种月付套餐。按实际当期付款金额升序排列；年付总价折算值不混入月付榜，未公开的附加费用会注明。'},
  {slug:'stable',name:'稳定性排行榜',description:'依据有环境记录的长期测试，暂不接受营销测速图。',rule:'必须有不少于 7 天、每天不少于 3 次的记录，含晚高峰、本地运营商、设备、节点、失败次数与恢复时间。按成功率降序、失败总时长升序；只比较环境一致的记录。'}
];
