import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { load } from 'cheerio';
import path from 'node:path';

const base = 'https://jichang-tuijian.org';
const output = path.resolve(process.argv[2] || '../../work/brand-import');
await mkdir(output, { recursive: true });
const index = load(await readFile(path.join(output, 'index.html'), 'utf8'));
const urls = [...new Set(index('a[href]').map((_, e) => index(e).attr('href')).get().filter(href => /^\/brands\/[-a-z0-9]+$/.test(href)))];
const results = [];
let next = 0;
await Promise.all(Array.from({ length: 5 }, async () => {
  while (next < urls.length) {
    const route = urls[next++];
    const url = base + route;
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(25000) });
      const html = await response.text();
      const $ = load(html);
      $('script,style,nav,footer,header').remove();
      const slug = route.split('/').pop();
      await writeFile(path.join(output, slug + '.html'), html);
      const tables = $('table').map((_, table) => ({
        headers: $(table).find('thead th').map((_, th) => $(th).text().trim()).get(),
        rows: $(table).find('tbody tr').map((_, tr) => [$(tr).find('th,td').map((_, td) => $(td).text().trim()).get()]).get()
      })).get();
      const record = { slug, url, status: response.status, title: $('h1').text().trim(), headings: $('h2,h3').map((_, e) => $(e).text().trim()).get(), tables, text: $('main').text().replace(/\s+/g, ' ').trim() || $('body').text().replace(/\s+/g, ' ').trim() };
      results.push(record);
      console.log(JSON.stringify({ slug, status: response.status, tables, excerpt: tables.length ? undefined : record.text.slice(0, 1000) }));
    } catch (error) { results.push({ url, error: String(error) }); console.log(JSON.stringify({ url, error: String(error) })); }
  }
}));
await writeFile(path.join(output, 'details.json'), JSON.stringify(results, null, 2) + '\n');
console.log(`Collected ${results.length} reference pages.`);
