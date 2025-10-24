# Barc

**A modern Chrome extension for elegant tab management**

<p align="left">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=white" alt="React 19">
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-7.0-646CFF?style=flat&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat" alt="MIT License">
</p>

Barc transforms your tab management experience with a sleek side panel interface. Inspired by Arc browser's elegant design philosophy, Barc brings the same refined user experience to any Chromium-based browser, enabling seamless exploration of new AI-powered browsers without compromising on familiar, intuitive tab management.

---

## Features

### Core Functionality
- **Pinned URLs Grid** — Quick access to your favorite websites with customizable grid layouts
- **Instant Search** — Search through all your open tabs with lightning-fast filtering
- **Smart Tab Management** — Pin/unpin tabs, switch between tabs, and close tabs with ease
- **Command Palette** — Quick access to URLs and search with keyboard shortcuts

### Customization
- **Theme System**
  - Light, Dark, and System themes
  - 8 pre-made themes: Zinc, Slate, Rose, Blue, Green, Orange, Violet, Yellow
  - Import custom themes from [tweakcn.com](https://tweakcn.com)
  - Create and save your own custom themes
- **Grid Settings** — Adjust pinned URLs grid columns and row height
- **Keyboard Shortcuts** — Customizable shortcuts for power users
  - `Cmd+K` / `Ctrl+K` to focus search bar
  - `Ctrl+T` / `Cmd+T` to open command palette

### Additional Capabilities
- Dark mode support across all themes
- Modern Chrome side panel interface
- Persistent local storage for all settings, themes, and pinned URLs
- Context actions via right-click menu
- Real-time tab updates

---

## Getting Started

### Prerequisites
- Node.js 18 or higher
- Chrome browser (version 114 or higher)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/barc.git
cd barc
npm install
```

Start the development server:

```bash
npm run dev
```

Load the extension in Chrome:
1. Navigate to `chrome://extensions/`
2. Enable Developer mode (toggle in top right)
3. Click Load unpacked
4. Select the `dist` directory from the project

The extension will open in Chrome's side panel when you click the Barc icon in your toolbar.

### Building for Production

```bash
npm run build
```

The production build will be created in the `dist` directory with a zip file in the `release` directory.

---

## Themes

Barc includes 8 carefully crafted themes inspired by popular shadcn/ui color schemes.

**Dark Themes**
- Zinc — Clean monochrome aesthetic
- Slate — Blue-tinted elegance
- Violet — Vibrant purple accents

**Light Themes**
- Rose — Warm pink tones
- Blue — Classic bright palette
- Green — Fresh natural accents
- Orange — Energetic warmth
- Yellow — Bright optimism

### Custom Themes

Create your own themes:
1. Visit [tweakcn.com](https://tweakcn.com) to design your theme
2. Copy the CSS variables from the theme editor
3. Open Theme Settings in Barc and click the + button
4. Paste your CSS variables, name your theme, and save

---

## Architecture

```
barc/
├── src/
│   ├── sidepanel/          # Main side panel UI
│   │   ├── App.tsx         # Main application component
│   │   └── index.html      # Side panel entry point
│   ├── content/            # Content scripts (injected into pages)
│   ├── background/         # Background service worker
│   ├── components/         # Shared React components
│   │   ├── ActionCenter.tsx
│   │   ├── CommandPalette.tsx
│   │   ├── PinnedUrlGrid.tsx
│   │   ├── SearchBar.tsx
│   │   ├── Settings.tsx
│   │   ├── ShortcutsSettings.tsx
│   │   ├── TabItem.tsx
│   │   ├── ThemeSettings.tsx
│   │   ├── providers/
│   │   │   └── ThemeProvider.tsx
│   │   └── ui/             # shadcn/ui components
│   ├── hooks/              # Custom React hooks
│   │   └── useTabs.ts
│   └── lib/                # Utility functions
│       └── utils.ts
├── manifest.config.ts      # Chrome extension manifest
├── vite.config.ts         # Vite configuration
└── tailwind.config.js     # Tailwind CSS configuration
```

---

## Technology

- [React 19](https://react.dev/) with TypeScript
- [Vite](https://vitejs.dev/) for build tooling
- [CRXJS Vite Plugin](https://crxjs.dev/vite-plugin) for Chrome extension development
- [Tailwind CSS v4](https://tailwindcss.com/) for styling
- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [Lucide React](https://lucide.dev/) for icons
- [shadcn/ui](https://ui.shadcn.com/) component library

---

## Keyboard Shortcuts

| Shortcut | Action | Configurable |
|----------|--------|--------------|
| `Cmd+K` / `Ctrl+K` | Focus search bar | Yes |
| `Ctrl+T` / `Cmd+T` | Open command palette | Yes |

All shortcuts can be enabled or disabled in the Keyboard Shortcuts settings.

---

## Usage

### Managing Tabs
- Click any tab to switch to it
- Click the X icon to close a tab
- Click the pin icon to pin or unpin a tab

### Working with Pinned URLs
- Click the + button in the pinned URLs grid to add the current URL
- Click any pinned URL card to open it
- Click the X icon on a card to remove it
- Access Settings to adjust grid columns and row height

### Customizing Themes
- Click the moon icon to open Theme Settings
- Select a theme from the dropdown menu
- Click the + button to add a custom theme from tweakcn.com
- Click the trash icon to delete custom themes

---

## Contributing

We welcome contributions. To get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

### Guidelines
- Write TypeScript for all new code
- Follow the existing code style and conventions
- Add clear comments for complex logic
- Test thoroughly in Chrome before submitting

---

## License

MIT License — see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

Built with [shadcn/ui](https://ui.shadcn.com/), [tweakcn.com](https://tweakcn.com), [Lucide](https://lucide.dev/), and [Radix UI](https://www.radix-ui.com/).

---

Made by Yash Verma
