import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://sanmaojichang.rest',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap({
    filter: (url) => !/^\/(404|airport|review|ranking|compare)(\/|$)/.test(new URL(url).pathname)
  })],
  vite: { plugins: [tailwindcss()] },
  devToolbar: { enabled: false }
});
