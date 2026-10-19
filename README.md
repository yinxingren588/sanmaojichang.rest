# 三毛导航 · 三毛机场主题博客

以静态 HTML 为核心的中文资讯博客。正式域名为 **https://sanmaojichang.rest/**，仓库为 **yinxingren588/sanmaojichang.rest**。

当前版本遵循维护者最新要求：**全部品牌留空，等待提供真实品牌**。没有示例品牌、虚构价格、评分或实测；品牌资料和评测模板保留，收到资料后可生成独立页面。

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

- `src/content/articles/`：15 篇 Markdown 正文，由 Astro Content Collections 校验。
- `src/data/airports.ts`：唯一品牌与套餐数据源，当前为空。
- `src/data/site.ts`：站点信息、六个需求专题与四种排行榜规则。
- `src/pages/airport/[slug].astro` / `review/[slug].astro`：品牌与独立评测模板。
- `src/lib/airports.ts`：有效 GB、成本和分组排序；未核实数据不参与计算。
- `scripts/`：SEO、内链、内容、浏览器验收及 IndexNow 工具。

完整站点生成 41 个 HTML 页面，包含 404；31 个当前可索引 URL。无品牌数据的列表、榜单、评测和比较工具，以及搜索与 404 标记 noindex，从 Sitemap 排除。加入有效数据后按实际页面状态生成 Sitemap。

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

真实品牌的有数据交互在隔离测试响应中验证，测试品牌不写入生产数据库。自动内容检查只验证结构与字段，不能替代人工事实核查。详细结果和未测试项目均在最终报告中标明。
