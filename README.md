# 三毛导航 · 三毛机场主题博客

以静态 HTML 为核心的中文资讯博客。正式域名为 **https://sanmaojichang.rest/**，仓库为 **yinxingren588/sanmaojichang.rest**。

当前版本已录入维护者提供的 **29 个品牌推广入口、12 个优惠码**，以及来自 jichang-tuijian.org 的 28 份起价与流量参考摘要。保留原始付款周期和未知字段，不将第三方摘要写成官网核验或实测。大佬云参考价格 ¥19.9、流量 100GB 由维护者提供，付款和流量周期待补充。

全站视觉采用原创动漫天空与海岸插画，搭配半透明阅读底板和缓慢飘动云层；系统开启减少动态效果时停用动画。桌面背景约 151 KB，手机背景约 40 KB。素材与生成提示词见 [背景说明](docs/background-art.md)。

## 启动与构建

使用 Node.js 24.18.0（最低 22.22.0），依赖由 package-lock.json 固定。

```sh
npm ci
npm run dev
npm run check
npm test
npm run build
npm run audit
npm run preview
```

构建输出 `dist/`，可直接部署到 Cloudflare Pages。构建会准备公开的 IndexNow 验证文件与变化清单，**不会自动提交搜索引擎**。

## 内容与资料

- `src/content/articles/`：235 篇 Markdown 正文（30 教程、200 博客、5 百科），由 Astro Content Collections 校验。
- `src/data/airports.ts`：唯一品牌与套餐数据源，含推广入口、优惠码与独立的 referenceOffer 参考摘要。
- `src/data/site.ts`：站点信息、六个需求专题与四种排行榜规则。
- `src/data/brand-editorials.ts`：29 篇独立品牌选购分析，含具体预算、流量、客户端、FAQ 与比较理由。
- `src/pages/airport/[slug].astro` / `review/[slug].astro`：品牌与独立评测模板。
- `src/lib/airports.ts`：有效 GB、成本和分组排序；未核实数据不参与计算。
- `scripts/`：SEO、内链、内容、浏览器验收及 IndexNow 工具。

完整站点生成 291 个 HTML 页面，包含 29 个品牌详情与优惠码汇总。大佬云缺少报价来源，详情暂设 noindex；无核验数据的榜单、评测、搜索与 404 按页面条件排除，Sitemap 数量以 docs/qa/build.json 为准。

## 文档

- [最终验收](docs/final-audit.md)
- [部署与 Bing 操作](docs/deployment.md)
- [品牌录入规则](docs/content-operations.md)
- [关键词地图](docs/keyword-map.csv)
- [执行记录](docs/progress.md)

## 测试范围

```sh
npm run indexnow -- --bootstrap --dry-run
```

浏览器验收需可访问本地预览。Windows 默认使用已安装 Chrome，可通过 `BROWSER_PATH` 指定其他兼容 Chromium 可执行文件，通过 `QA_BASE_URL` 指定实际预览 URL。

```sh
npm run test:browser
npm run report
```

浏览器验收覆盖真实品牌搜索、对比和优惠码复制；成本计算和候选上限另用隔离测试响应验证，夹具不写入生产数据。自动内容检查只验证结构与字段，不能替代人工事实核查。详细结果和未测试项目均在最终报告中标明。
