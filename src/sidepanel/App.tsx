import { Plus, Settings as SettingsIcon } from 'lucide-react'
import { useState } from 'react'
import { useTabs } from '../hooks/useTabs'
import { SearchBar } from '../components/SearchBar'
import { TabItem } from '../components/TabItem'
import { PinnedUrlGrid } from '../components/PinnedUrlGrid'
import { ActionCenter } from '../components/ActionCenter'
import { Settings } from '../components/Settings'
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
    removePinnedUrl,
    openUrl,
    pinCurrentTab,
    updateGridSettings,
  } = useTabs()

  const [notification, setNotification] = useState<string | null>(null)
  const [showSettings, setShowSettings] = useState(false)

  const handleAddUrl = async () => {
    const success = await pinCurrentTab()
    if (!success) {
      setNotification('This URL is already pinned')
      setTimeout(() => setNotification(null), 2000)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background text-muted-foreground text-sm">
        Loading tabs...
      </div>
    )
  }

  const actionButtons = [
    {
      icon: <Plus size={16} />,
      label: 'New Tab',
      onClick: createNewTab,
    },
    {
      icon: <SettingsIcon size={16} />,
      label: 'Settings',
      onClick: () => setShowSettings(true),
    },
  ]

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
            />
          ))}
        </div>
      </div>

      <ActionCenter actions={actionButtons} />
    </div>
  )
}
