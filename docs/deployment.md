# Cloudflare Pages 部署与 Bing 操作

## 1. 当前边界

代码与本地生产构建可以交付。当前会话没有 Cloudflare 账户连接、域名 DNS 控制或 Bing Webmaster Tools 登录态，因此不将线上部署、站点验证、IndexNow 正式提交或搜索收录标记为成功。

GitHub 推送状态以 `docs/qa/github.json` 与最终验收报告为准。品牌按维护者要求暂时全部留空，不影响知识博客发布；品牌推荐和真实榜单需要后续资料。

## 2. 接入 Cloudflare Pages

1. 登录 Cloudflare，进入 Workers & Pages，创建 Pages 项目并连接 GitHub。
2. 选择 `yinxingren588/sanmaojichang.rest`，生产分支 `main`。
3. 框架预设可选 Astro，根目录为仓库根目录。
4. 构建命令：`npm run build`。输出目录：`dist`。
5. 设置 `NODE_VERSION=24.18.0`；依赖由仓库的 package-lock.json 固定。
6. 部署后在自定义域名中添加 `sanmaojichang.rest`，按照控制台提示完成 DNS 与 HTTPS。
7. 如果需要 `www`，另行添加并配置重定向到根域；Canonical 始终使用 `https://sanmaojichang.rest/`。

本站为静态 SSG，无需 Astro Cloudflare SSR 适配器、数据库或服务端密钥。`wrangler.toml` 保留手动上传部署所需的输出目录说明；Git 集成部署并不要求安装 Wrangler。

生产前验证首页、文章、无效路径、`robots.txt`、`sitemap-index.xml`、`sitemap-0.xml` 和 IndexNow 根目录文本文件。无效路径应返回 HTTP 404，而非把首页以 200 返回。构建已生成 Cloudflare Pages 支持的 `404.html`。

预览域名应通过 Cloudflare 的访问控制或 `X-Robots-Tag: noindex` 防止索引；不要修改正式 Canonical 为预览域名。公开前检查生产项目没有继承预览访问限制。

## 3. Bing Webmaster Tools 验证

以下步骤需要你登录并具有站点所有权，无法仅靠代码代办。

1. 打开 [Bing Webmaster Tools](https://www.bing.com/webmasters/)，添加 `https://sanmaojichang.rest/`。
2. 按控制台提供的方式验证，优先使用 DNS 或 HTML Meta。
3. 使用 Meta 时，将提供的 `msvalidate.01` 内容值保存到 Cloudflare 构建环境变量 `PUBLIC_BING_VERIFICATION`，重新部署；不要把整个 meta 标签粘入变量。
4. 检查正式首页源代码包含验证标签，再回控制台验证。
5. 在 Sitemaps 中提交 `https://sanmaojichang.rest/sitemap-index.xml`，查看处理结果与错误。

不要在 `.env` 提交私人账户凭据。Bing 验证值本来就会出现在网页中；IndexNow Key 也用于公开文件校验，不是账户登录令牌。

## 4. IndexNow

实现依据：[IndexNow 官方协议](https://www.indexnow.org/documentation)。验证文件为根目录 UTF-8 文本，内容与文件名中的 Key 相同。构建第一次生成 Key 后保存在 `config/indexnow.json`；保持该文件与 public 下对应文本一起入库，避免每次部署换 Key。

若显式设置 `INDEXNOW_KEY`，使用 8–128 位字母、数字或连字符；重新构建并部署后再提交。代码会先访问正式域名 Key 文件，内容不匹配就停止。

首次先检查清单：

```sh
npm run build
npm run indexnow -- --bootstrap --dry-run
```

确认域名上线、31 个可索引 URL 真实可访问后，首次明确提交：

```sh
npm run indexnow -- --bootstrap
```

以后保留 `.indexnow/last-success.json`，更新内容、重新构建后：

```sh
npm run indexnow -- --dry-run
npm run indexnow
```

只提交新增、正文或主要 metadata 改变、已删除的 URL；无变化不发送请求。基线文件应保存在可信的本机工作目录或 CI 持久存储；如果丢失，不会自动把全站当成每次构建任务，需重新明确 bootstrap。不要把 IndexNow 加进普通 build 命令。

单 URL 与批量文件：

```sh
npm run indexnow -- --url https://sanmaojichang.rest/blog/cost-per-gb/ --dry-run
npm run indexnow -- --file changed-urls.json --dry-run
```

批量文件为 URL 字符串数组。仅接受当前可索引清单或历史删除清单中的本站规范 URL。每批最多 10,000 个；429、5xx 与网络异常最多三次尝试，其他错误停止。日志保存在 `.indexnow/http-log.jsonl`。明确指定 URL 的提交不会覆盖全站增量基线。

HTTP 200 表示已接收，202 表示接收且 Key 校验待完成，均不代表已被 Bing 收录或获得排名。

## 5. 上线后在 Bing 看什么

- **URL Inspection**：检查代表性首页、文章与专题的抓取及索引状态，确认 Canonical。
- **Search Performance**：观察真实展示、点击与查询词，不预填虚构搜索量。
- **索引与排除报告**：核查可索引页面及未收录原因，保留 noindex 空榜单的预期状态。实际菜单名称以当前控制台为准。
- **Crawl Issues / Site Scan**：查看访问失败、重复 metadata 与抓取问题；修复后重新构建验收。
- **IndexNow**：如控制台有相关记录，确认接收情况，并结合 URL Inspection 观察后续处理。

每次新增品牌或实测后，先运行 check、test、build、audit，再部署并增量提交。不要承诺 Bing 首页排名。

## 官方参考

- [Cloudflare Pages：Astro](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/)
- [Astro 安装与运行要求](https://docs.astro.build/en/install-and-setup/)
- [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a)
