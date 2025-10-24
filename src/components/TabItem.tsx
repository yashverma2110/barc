import { Globe, Pin, PinOff, X } from 'lucide-react'
import type { TabItem as TabItemType } from '../types/tab'

interface TabItemProps {
  tab: TabItemType
  isPinned: boolean
  onSwitch: (tabId: number) => void
  onClose: (tabId: number) => void
  onTogglePin: (tabId: number) => void
}

export function TabItem({ tab, isPinned, onSwitch, onClose, onTogglePin }: TabItemProps) {
  const handleClick = () => {
    onSwitch(tab.id)
  }

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClose(tab.id)
  }

  const handlePin = (e: React.MouseEvent) => {
    e.stopPropagation()
    onTogglePin(tab.id)
  }

  return (
    <div
      className={`tab-item ${tab.active ? 'active' : ''}`}
      onClick={handleClick}
      title={tab.title}
    >
      <div className="tab-favicon">
        {tab.favIconUrl ? (
          <img src={tab.favIconUrl} alt="" width={16} height={16} />
        ) : (
          <Globe size={16} className="favicon-icon" />
        )}
      </div>
      <div className="tab-title">{tab.title}</div>
      <div className="tab-actions">
        <button
          className="tab-pin-button"
          onClick={handlePin}
          title={isPinned ? 'Unpin tab' : 'Pin tab'}
        >
          {isPinned ? <Pin size={14} /> : <PinOff size={14} />}
        </button>
        <button className="tab-close-button" onClick={handleClose} title="Close tab">
          <X size={14} />
        </button>
      </div>
    </div>
  )
}
