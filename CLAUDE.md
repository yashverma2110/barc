# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Chrome Extension built with React 19, TypeScript, and Vite, using the CRXJS Vite plugin for Chrome extension development. The extension has three entry points: a popup UI, a side panel, and content scripts that inject into web pages.

## Essential Commands

### Development
```bash
npm install          # Install dependencies
npm run dev         # Start development server with hot reload
npm run build       # Build for production (runs TypeScript check first)
npm run preview     # Preview production build
```

### Loading the Extension in Chrome
1. Run `npm run dev` to generate the `dist` directory
2. Navigate to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the `dist` directory
5. The extension will auto-reload when you make changes during development

## Architecture

### Extension Entry Points

The extension has three distinct UIs that run in different contexts:

1. **Popup** ([src/popup/](src/popup/))
   - Entry: [src/popup/main.tsx](src/popup/main.tsx) → [src/popup/index.html](src/popup/index.html)
   - Activated when clicking the extension icon
   - Standard React app mounted to `#root`

2. **Side Panel** ([src/sidepanel/](src/sidepanel/))
   - Entry: [src/sidepanel/main.tsx](src/sidepanel/main.tsx) → [src/sidepanel/index.html](src/sidepanel/index.html)
   - Chrome side panel interface
   - Standard React app mounted to `#root`

3. **Content Scripts** ([src/content/](src/content/))
   - Entry: [src/content/main.tsx](src/content/main.tsx)
   - Injected into all HTTPS pages (see `manifest.config.ts`)
   - Creates a `#crxjs-app` div and mounts React to it
   - Main component: [src/content/views/App.tsx](src/content/views/App.tsx)

### Configuration

- [manifest.config.ts](manifest.config.ts): Chrome extension manifest (MV3) configuration
  - Permissions: `sidePanel`, `contentSettings`
  - Content scripts match pattern: `https://*/*`
  - Uses package.json for name and version

- [vite.config.ts](vite.config.ts): Build configuration
  - Path alias: `@/` maps to `src/`
  - Plugins: React, CRXJS, zip-pack (creates release zip in `release/` directory)
  - CORS enabled for chrome-extension:// origins

### Shared Components

Common components live in [src/components/](src/components/) and can be imported across all entry points.

## Key Implementation Notes

- **Content Script Injection**: Content scripts dynamically create their own container div (`#crxjs-app`) to avoid conflicts with host pages
- **Extension Permissions**: Currently configured with `sidePanel` and `contentSettings` permissions
- **Build Output**: Production builds create a zip file in `release/` named `crx-{name}-{version}.zip`
- **TypeScript**: Strict mode enabled, includes type definitions for Chrome APIs via `@types/chrome`
