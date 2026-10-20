import type { CollectionEntry } from 'astro:content';

type Article = CollectionEntry<'articles'>;
export const guideTopics = ['Windows','macOS','Android','iOS','客户端','订阅','排查'];
export function articleTopics(article: Article): string[] {
  const { section, slug, tags } = article.data;
  if (section !== 'blog') return tags;
  if (slug.startsWith('buy-') || ['budget-checklist','cost-per-gb'].includes(slug)) return ['套餐决策'];
  if (slug.startsWith('net-') || slug === 'claims-and-evidence') return ['网络知识'];
  return ['使用场景'];
}
export function primaryTopic(article: Article): string {
  if (article.data.section === 'blog') return articleTopics(article)[0];
  if (article.data.section === 'guides') return guideTopics.find(topic => article.data.tags.includes(topic)) || '';
  return '';
}
export function articleUrl(article: Article): string {
  return `/${article.data.section}/${article.data.slug}/`;
}
export function directoryUrl(article: Article): string {
  const topic = primaryTopic(article);
  return `/${article.data.section}/${topic ? `?topic=${encodeURIComponent(topic)}` : ''}`;
}
export function sortArticles(articles: Article[]): Article[] {
  return [...articles].sort((a,b) => b.data.updated.localeCompare(a.data.updated) || a.id.localeCompare(b.id));
}
export function readingNavigation(entry: Article, articles: Article[]) {
  const topic = primaryTopic(entry);
  const sequenceTopic = entry.data.section === 'blog' ? topic : '';
  const topicCount = articles.filter(a => a.data.section === entry.data.section && articleTopics(a).includes(topic)).length;
  const series = sortArticles(articles.filter(a => a.data.section === entry.data.section && (!sequenceTopic || primaryTopic(a) === sequenceTopic)));
  const position = series.findIndex(a => a.id === entry.id);
  const generic = new Set(['套餐决策','网络知识','使用场景','选购分析','使用维护']);
  const keywords = entry.data.slug.split('-').slice(1);
  const related = articles.filter(a => a.id !== entry.id).map(a => {
    const sharedTags = a.data.tags.filter(tag => !generic.has(tag) && entry.data.tags.includes(tag)).length;
    const linked = (entry.body || '').includes(`(${articleUrl(a)})`);
    const sharedWords = a.data.slug.split('-').slice(1).filter(word => keywords.includes(word)).length;
    const sameTopic = a.data.section === entry.data.section && (!topic || articleTopics(a).includes(topic));
    return { article:a, score: (linked ? 20 : 0) + sharedTags * 6 + sharedWords * 3 + (sameTopic ? 2 : 0) };
  }).filter(a => a.score > 0).sort((a,b) => b.score-a.score || a.article.id.localeCompare(b.article.id)).slice(0,6).map(a => a.article);
  return { topic, topicCount, sequenceTopic, series, position, previous:series[position-1], next:series[position+1], related };
}
