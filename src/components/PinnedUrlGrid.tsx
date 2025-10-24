import { X, Plus } from 'lucide-react'
import type { PinnedUrl, GridSettings } from '../types/tab'

interface PinnedUrlGridProps {
  pinnedUrls: PinnedUrl[]
  gridSettings: GridSettings
  onOpenUrl: (url: string) => void
  onRemoveUrl: (id: string) => void
  onAddUrl: () => void
}

const ICON_SIZES = {
  small: { icon: 24, plus: 20 },
  medium: { icon: 32, plus: 24 },
  large: { icon: 40, plus: 28 },
}

export function PinnedUrlGrid({ pinnedUrls, gridSettings, onOpenUrl, onRemoveUrl, onAddUrl }: PinnedUrlGridProps) {
  const iconSize = ICON_SIZES[gridSettings.iconSize]

  return (
    <div className="pinned-url-section">
      <div
        className={`pinned-url-grid cols-${gridSettings.columns} size-${gridSettings.iconSize}`}
        style={{ gridTemplateColumns: `repeat(${gridSettings.columns}, 1fr)` }}
      >
        {pinnedUrls.map((pinnedUrl) => (
          <div
            key={pinnedUrl.id}
            className={`pinned-url-item ${pinnedUrl.isActive ? 'is-open' : ''}`}
            onClick={() => onOpenUrl(pinnedUrl.url)}
            title={pinnedUrl.isActive ? `${pinnedUrl.title} (Active)` : pinnedUrl.title}
          >
            <div className="pinned-url-icon" style={{ width: iconSize.icon, height: iconSize.icon }}>
              {pinnedUrl.favicon ? (
                <img
                  src={pinnedUrl.favicon}
                  alt={pinnedUrl.title}
                  style={{ width: iconSize.icon, height: iconSize.icon }}
                />
              ) : (
                <div
                  className="pinned-url-placeholder"
                  style={{ width: iconSize.icon, height: iconSize.icon, fontSize: iconSize.icon / 2 }}
                >
                  {pinnedUrl.title.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <button
              className="pinned-url-remove"
              onClick={(e) => {
                e.stopPropagation()
                onRemoveUrl(pinnedUrl.id)
              }}
              title="Remove from pinned"
            >
              <X size={12} />
            </button>
          </div>
        ))}
        <div className="pinned-url-item add-pinned" onClick={onAddUrl} title="Add pinned URL">
          <div className="pinned-url-icon">
            <Plus size={iconSize.plus} strokeWidth={2} />
          </div>
        </div>
      </div>
    </div>
  )
}
