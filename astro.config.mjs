import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [
    react({
      include: ['**/react/*', '**/calculator/*'],
    }), 
    tailwind()
  ],
  site: 'https://solarfusion.hr',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto'
  },
  i18n: {
    defaultLocale: 'hr',
    locales: ['hr', 'en', 'sl', 'de', 'it', 'hu'],
    routing: {
      prefixDefaultLocale: true
    }
  },
  headers: {
    '/*': [
      {
        key: 'Cache-Control',
        value: 'no-store, no-cache, must-revalidate, max-age=0'
      }
    ],
    '/assets/*': [
      {
        key: 'Cache-Control',
        value: 'public, max-age=31536000, immutable'
      }
    ],
    '/_astro/*': [
      {
        key: 'Cache-Control',
        value: 'public, max-age=31536000, immutable'
      }
    ]
  }
});