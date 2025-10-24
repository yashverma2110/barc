import { X, Plus } from 'lucide-react'
import type { PinnedUrl } from '../types/tab'

interface PinnedUrlGridProps {
  pinnedUrls: PinnedUrl[]
  onOpenUrl: (url: string) => void
  onRemoveUrl: (id: string) => void
  onAddUrl: () => void
}

export function PinnedUrlGrid({ pinnedUrls, onOpenUrl, onRemoveUrl, onAddUrl }: PinnedUrlGridProps) {
  return (
    <div className="pinned-url-section">
      <div className="pinned-url-grid">
        {pinnedUrls.map((pinnedUrl) => (
          <div
            key={pinnedUrl.id}
            className="pinned-url-item"
            onClick={() => onOpenUrl(pinnedUrl.url)}
            title={pinnedUrl.title}
          >
            <div className="pinned-url-icon">
              {pinnedUrl.favicon ? (
                <img src={pinnedUrl.favicon} alt={pinnedUrl.title} />
              ) : (
                <div className="pinned-url-placeholder">
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
            <Plus size={24} strokeWidth={2} />
          </div>
        </div>
      </div>
    </div>
  )
}
