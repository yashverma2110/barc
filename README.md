# 🌟 Barc

> A beautiful, feature-rich Chrome extension for managing tabs with style

Barc is a modern Chrome extension that transforms your tab management experience with a sleek side panel interface. Inspired by Arc browser's elegant design philosophy, Barc brings the same refined user experience to any Chromium-based browser, enabling seamless exploration of new AI-powered browsers without compromising on familiar, intuitive tab management.

Built with React 19, TypeScript, and Tailwind CSS, it offers powerful features like pinned URLs, customizable themes, keyboard shortcuts, and more.

## ✨ Features

### 🎯 Core Features
- **📌 Pinned URLs Grid** - Quick access to your favorite websites with customizable grid layouts
- **🔍 Instant Search** - Search through all your open tabs with lightning-fast filtering
- **⚡ Smart Tab Management** - Pin/unpin tabs, switch between tabs, and close tabs with ease
- **📋 Command Palette** - Quick access to URLs and search with `Ctrl+T` (or `Cmd+T` on Mac)

### 🎨 Customization
- **🌈 Theme System**
  - Light, Dark, and System themes
  - 8 beautiful pre-made themes (Zinc, Slate, Rose, Blue, Green, Orange, Violet, Yellow)
  - Import custom themes from [tweakcn.com](https://tweakcn.com)
  - Create and save your own custom themes
- **🔧 Grid Settings** - Adjust pinned URLs grid columns and row height
- **⌨️ Keyboard Shortcuts** - Customizable shortcuts for power users
  - `Cmd+K` / `Ctrl+K` - Focus search bar
  - `Ctrl+T` / `Cmd+T` - Open command palette

### 💡 Additional Features
- **🌙 Dark Mode** - Seamless dark mode support across all themes
- **📱 Side Panel UI** - Modern Chrome side panel interface
- **💾 Persistent Storage** - All settings, themes, and pinned URLs are saved locally
- **🎯 Context Actions** - Right-click menu on tabs for quick actions
- **🔄 Real-time Updates** - Tabs update automatically when you open/close them

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Chrome browser (version 114+)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/barc.git
cd barc
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Load in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable **Developer mode** (toggle in top right)
   - Click **Load unpacked**
   - Select the `dist` directory from the project

5. **Open the side panel**
   - Click the Barc icon in your Chrome toolbar
   - The extension will open in Chrome's side panel

### Production Build

```bash
npm run build
```

The production build will be created in the `dist` directory and a zip file will be generated in the `release` directory.

## 🎨 Themes

Barc comes with 8 beautiful pre-made themes inspired by popular shadcn/ui color schemes:

### Dark Themes
- **Zinc** - Clean monochrome dark theme
- **Slate** - Rich blue-tinted dark theme
- **Violet** - Vibrant purple dark theme

### Light Themes
- **Rose** - Warm pink accent theme
- **Blue** - Classic bright blue theme
- **Green** - Fresh green accent theme
- **Orange** - Energetic orange theme
- **Yellow** - Bright and cheerful theme

### Custom Themes

1. Visit [tweakcn.com](https://tweakcn.com) to create your custom theme
2. Copy the CSS variables from the theme editor
3. In Barc, open Theme Settings → Click the **+** button
4. Paste your CSS variables, give it a name, and save!

## 📁 Project Structure

```
barc/
├── src/
│   ├── sidepanel/          # Main side panel UI
│   │   ├── App.tsx         # Main app component
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

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) with TypeScript
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Chrome Extension Plugin**: [CRXJS Vite Plugin](https://crxjs.dev/vite-plugin)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Component Library**: [shadcn/ui](https://ui.shadcn.com/)

## ⌨️ Keyboard Shortcuts

| Shortcut | Action | Customizable |
|----------|--------|--------------|
| `Cmd+K` / `Ctrl+K` | Focus search bar | ✅ |
| `Ctrl+T` / `Cmd+T` | Open command palette | ✅ |

All shortcuts can be enabled/disabled in the Keyboard Shortcuts settings.

## 🎯 Usage

### Managing Tabs
- **Switch to Tab**: Click on any tab in the list
- **Close Tab**: Click the X icon on the tab
- **Pin/Unpin Tab**: Click the pin icon on the tab

### Pinned URLs
- **Add Current URL**: Click the + button in the pinned URLs grid
- **Open URL**: Click on any pinned URL card
- **Remove URL**: Click the X icon on the pinned URL card
- **Customize Grid**: Open Settings → Adjust columns and row height

### Themes
- **Change Theme**: Click the moon icon → Select a theme from the dropdown
- **Add Custom Theme**: Click the + button → Import from tweakcn.com
- **Delete Custom Theme**: Click the trash icon next to custom themes

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Use TypeScript for all new code
- Follow the existing code style
- Add comments for complex logic
- Test your changes in Chrome before submitting

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - For the beautiful UI components
- [tweakcn.com](https://tweakcn.com) - For the theme editor inspiration
- [Lucide](https://lucide.dev/) - For the icon set
- [Radix UI](https://www.radix-ui.com/) - For the accessible component primitives

## 📧 Support

If you have any questions or need help, feel free to:
- Open an issue on GitHub
- Check existing issues for solutions

---

<p align="center">Made with ❤️ by Yash Verma</p>
