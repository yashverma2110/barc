import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Label } from './ui/label'
import { Switch } from './ui/switch'
import { getModifierKey } from '@/lib/utils'

interface ShortcutsSettingsProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface ShortcutSettings {
  searchFocus: boolean
  quickAction: boolean
}

const STORAGE_KEY = 'shortcut-settings'
const SETTINGS_CHANGE_EVENT = 'shortcut-settings-changed'

export function ShortcutsSettings({ open, onOpenChange }: ShortcutsSettingsProps) {
  const [settings, setSettings] = useState<ShortcutSettings>({
    searchFocus: true,
    quickAction: true,
  })
  const modifierKey = getModifierKey()

  // Load settings from localStorage on mount and when modal opens
  useEffect(() => {
    const loadSettings = () => {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        try {
          setSettings(JSON.parse(stored))
        } catch (error) {
          console.error('Failed to parse shortcut settings:', error)
        }
      }
    }

    loadSettings()
  }, [open])

  // Save settings to localStorage whenever they change
  const updateSetting = <K extends keyof ShortcutSettings>(
    key: K,
    value: ShortcutSettings[K]
  ) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings))

    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent(SETTINGS_CHANGE_EVENT, { detail: newSettings }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xs p-5">
        <DialogHeader className="space-y-1.5">
          <DialogTitle className="text-lg">Keyboard Shortcuts</DialogTitle>
          <DialogDescription className="text-sm">
            Enable or disable keyboard shortcuts for quick actions.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 space-y-1">
              <Label htmlFor="search-focus" className="text-sm font-medium cursor-pointer">
                Focus Search
              </Label>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Press <kbd className="px-1.5 py-0.5 text-xs bg-secondary border border-border rounded font-mono">{modifierKey}+K</kbd> to focus the search bar
              </p>
            </div>
            <Switch
              id="search-focus"
              checked={settings.searchFocus}
              onCheckedChange={(checked) => updateSetting('searchFocus', checked)}
            />
          </div>

          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 space-y-1">
              <Label htmlFor="quick-action" className="text-sm font-medium cursor-pointer">
                Quick Action
              </Label>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Press <kbd className="px-1.5 py-0.5 text-xs bg-secondary border border-border rounded font-mono">Ctrl+T</kbd> to open URL or search
              </p>
            </div>
            <Switch
              id="quick-action"
              checked={settings.quickAction}
              onCheckedChange={(checked) => updateSetting('quickAction', checked)}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Hook to get current shortcut settings
export function useShortcutSettings() {
  const [settings, setSettings] = useState<ShortcutSettings>({
    searchFocus: true,
    quickAction: true,
  })

  useEffect(() => {
    // Load initial settings
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setSettings(JSON.parse(stored))
      } catch (error) {
        console.error('Failed to parse shortcut settings:', error)
      }
    }

    // Listen for custom event when settings change
    const handleSettingsChange = (e: Event) => {
      const customEvent = e as CustomEvent<ShortcutSettings>
      if (customEvent.detail) {
        setSettings(customEvent.detail)
      }
    }

    window.addEventListener(SETTINGS_CHANGE_EVENT, handleSettingsChange)
    return () => window.removeEventListener(SETTINGS_CHANGE_EVENT, handleSettingsChange)
  }, [])

  return settings
}
