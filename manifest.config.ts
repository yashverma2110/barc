import { defineManifest } from '@crxjs/vite-plugin'
import pkg from './package.json'

export default defineManifest({
  manifest_version: 3,
  name: pkg.name,
  version: pkg.version,
  description: 'A beautiful Chrome extension that brings Arc browser-style tab management to any browser. Organize tabs with pinned URLs, custom themes, and powerful search.',
  icons: {
    16: 'public/icon16.png',
    32: 'public/icon32.png',
    48: 'public/icon48.png',
    128: 'public/icon128.png',
  },
  action: {
    default_icon: {
      16: 'public/icon16.png',
      32: 'public/icon32.png',
      48: 'public/icon48.png',
      128: 'public/icon128.png',
    },
  },
  background: {
    service_worker: 'src/background/main.ts',
    type: 'module',
  },
  permissions: [
    'sidePanel',
    'tabs',
    'storage',
  ],
  content_scripts: [{
    js: ['src/content/main.tsx'],
    matches: ['https://*/*'],
  }],
  side_panel: {
    default_path: 'src/sidepanel/index.html',
  },
})
