import { Plus } from 'lucide-react'
import { useTabs } from '../hooks/useTabs'
import { SearchBar } from '../components/SearchBar'
import { TabItem } from '../components/TabItem'
import { PinnedUrlGrid } from '../components/PinnedUrlGrid'
import './App.css'

export default function App() {
  const {
    pinnedTabs,
    unpinnedTabs,
    pinnedUrls,
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
  } = useTabs()

  if (loading) {
    return (
      <div className="sidebar-container">
        <div className="loading">Loading tabs...</div>
      </div>
    )
  }

  return (
    <div className="sidebar-container">
      <PinnedUrlGrid
        pinnedUrls={pinnedUrls}
        onOpenUrl={openUrl}
        onRemoveUrl={removePinnedUrl}
        onAddUrl={pinCurrentTab}
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

      <button className="new-tab-button" onClick={createNewTab}>
        <Plus size={16} />
        <span>New Tab</span>
      </button>
    </div>
  )
}
