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
      <div className="sidebar-container">
        <div className="loading">Loading tabs...</div>
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
    <div className="sidebar-container">
      {notification && <div className="notification">{notification}</div>}

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
        <div className="tab-section">
          <div className="section-header">Pinned</div>
          <div className="tab-list">
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

      <div className="tab-section">
        <div className="section-header">All Tabs</div>
        <div className="tab-list">
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
