import { X } from 'lucide-react'
import type { GridSettings } from '../types/tab'

interface SettingsProps {
  settings: GridSettings
  onUpdateSettings: (settings: GridSettings) => void
  onClose: () => void
}

export function Settings({ settings, onUpdateSettings, onClose }: SettingsProps) {
  const handleIconSizeChange = (size: 'small' | 'medium' | 'large') => {
    onUpdateSettings({ ...settings, iconSize: size })
  }

  const handleColumnsChange = (columns: 2 | 3 | 4) => {
    onUpdateSettings({ ...settings, columns })
  }

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-panel" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <h3>Grid Settings</h3>
          <button className="settings-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="settings-content">
          <div className="settings-section">
            <label className="settings-label">Icon Size</label>
            <div className="settings-options">
              <button
                className={`settings-option ${settings.iconSize === 'small' ? 'active' : ''}`}
                onClick={() => handleIconSizeChange('small')}
              >
                Small
              </button>
              <button
                className={`settings-option ${settings.iconSize === 'medium' ? 'active' : ''}`}
                onClick={() => handleIconSizeChange('medium')}
              >
                Medium
              </button>
              <button
                className={`settings-option ${settings.iconSize === 'large' ? 'active' : ''}`}
                onClick={() => handleIconSizeChange('large')}
              >
                Large
              </button>
            </div>
          </div>

          <div className="settings-section">
            <label className="settings-label">Columns</label>
            <div className="settings-options">
              <button
                className={`settings-option ${settings.columns === 2 ? 'active' : ''}`}
                onClick={() => handleColumnsChange(2)}
              >
                2
              </button>
              <button
                className={`settings-option ${settings.columns === 3 ? 'active' : ''}`}
                onClick={() => handleColumnsChange(3)}
              >
                3
              </button>
              <button
                className={`settings-option ${settings.columns === 4 ? 'active' : ''}`}
                onClick={() => handleColumnsChange(4)}
              >
                4
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
