import { useState, useEffect } from 'react'
import { useTabs } from '../hooks/useTabs'
import { SearchBar } from '../components/SearchBar'
import { TabItem } from '../components/TabItem'
import { PinnedUrlGrid } from '../components/PinnedUrlGrid'
import { ActionCenter } from '../components/ActionCenter'
import { Settings } from '../components/Settings'
import { ThemeSettings } from '../components/ThemeSettings'
import { CommandPalette } from '../components/CommandPalette'
import { useShortcutSettings } from '../components/ShortcutsSettings'
import './App.css'

export default function App() {
  const {
    pinnedTabs,
    unpinnedTabs,
    pinnedUrls,
    gridSettings,
    searchQuery,
    loading,
    setSearchQuery,
    switchToTab,
    closeTab,
    createNewTab,
    togglePin,
    renameTab,
    removePinnedUrl,
    openUrl,
    pinCurrentTab,
    updateGridSettings,
  } = useTabs()

  const [notification, setNotification] = useState<string | null>(null)
  const [showSettings, setShowSettings] = useState(false)
  const [showThemeSettings, setShowThemeSettings] = useState(false)
  const [showCommandPalette, setShowCommandPalette] = useState(false)
  const shortcutSettings = useShortcutSettings()

  // Listen for Alt+T keyboard shortcut
  useEffect(() => {
    if (!shortcutSettings.quickAction) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Alt+T (both lowercase and uppercase to handle different browsers)
      if (e.ctrlKey && (e.key === 't' || e.key === 'T')) {
        e.preventDefault()
        console.log('Alt+T pressed, opening command palette')
        setShowCommandPalette(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [shortcutSettings.quickAction])

  const handleAddUrl = async () => {
    const success = await pinCurrentTab()
    if (!success) {
      setNotification('This URL is already pinned')
      setTimeout(() => setNotification(null), 2000)
    }
  }

  const handleCommandSubmit = async (input: string) => {
    // Check if input is a URL
    const isUrl = /^(https?:\/\/|www\.)/.test(input) || /^[\w-]+\.[\w-.]+/.test(input)

    let url: string
    if (isUrl) {
      // Add protocol if missing
      url = input.startsWith('http') ? input : `https://${input}`
    } else {
      // Use Google search as default search engine
      url = `https://www.google.com/search?q=${encodeURIComponent(input)}`
    }

    // Open URL in new tab
    await chrome.tabs.create({ url, active: true })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background text-muted-foreground text-sm">
        Loading tabs...
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen w-full bg-background text-foreground p-3 overflow-y-auto">
      {notification && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium shadow-lg animate-in slide-in-from-top-2">
          {notification}
        </div>
      )}

      {showSettings && (
        <Settings
          settings={gridSettings}
          onUpdateSettings={updateGridSettings}
          onClose={() => setShowSettings(false)}
        />
      )}

      {showThemeSettings && (
        <ThemeSettings onClose={() => setShowThemeSettings(false)} />
      )}

      <CommandPalette
        open={showCommandPalette}
        onOpenChange={setShowCommandPalette}
        onSubmit={handleCommandSubmit}
      />

      <PinnedUrlGrid
        pinnedUrls={pinnedUrls}
        gridSettings={gridSettings}
        onOpenUrl={openUrl}
        onRemoveUrl={removePinnedUrl}
        onAddUrl={handleAddUrl}
      />

      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {pinnedTabs.length > 0 && (
        <div className="mb-6">
          <div className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2 px-2">
            Pinned
          </div>
          <div className="flex flex-col gap-1">
            {pinnedTabs.map((tab) => (
              <TabItem
                key={tab.id}
                tab={tab}
                isPinned={true}
                onSwitch={switchToTab}
                onClose={closeTab}
                onTogglePin={togglePin}
                onRename={renameTab}
              />
            ))}
          </div>
        </div>
      )}

      <div className="mb-6 flex-1">
        <div className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2 px-2">
          All Tabs
        </div>
        <div className="flex flex-col gap-1">
          {unpinnedTabs.map((tab) => (
            <TabItem
              key={tab.id}
              tab={tab}
              isPinned={false}
              onSwitch={switchToTab}
              onClose={closeTab}
              onTogglePin={togglePin}
              onRename={renameTab}
            />
          ))}
        </div>
      </div>

      <div className="mt-auto">
        <ActionCenter
          onNewTab={createNewTab}
          onSettings={() => setShowSettings(true)}
          onTheme={() => setShowThemeSettings(true)}
        />
      </div>
    </div>
  )
}
