import { useState } from 'react'
import { Plus, Settings, Moon, Keyboard } from 'lucide-react'
import { Button } from './ui/button'
import { ShortcutsSettings, useShortcutSettings } from './ShortcutsSettings'

interface ActionCenterProps {
  onNewTab: () => void
  onSettings: () => void
  onTheme: () => void
}

export function ActionCenter({ onNewTab, onSettings, onTheme }: ActionCenterProps) {
  const [shortcutsOpen, setShortcutsOpen] = useState(false)
  const shortcutSettings = useShortcutSettings()

  return (
    <>
      <div className="flex flex-col gap-2">
        {/* Full-width New Tab button */}
        <Button
          variant="outline"
          className="w-full justify-between gap-2 bg-secondary/50 hover:bg-secondary border-border"
          onClick={onNewTab}
        >
          <div className="flex items-center gap-2">
            <Plus size={16} />
            <span>New Tab</span>
          </div>
          {shortcutSettings.quickAction && (
            <kbd className="px-1.5 py-0.5 text-xs bg-background/50 border border-border rounded font-mono text-muted-foreground">
              Ctrl+T
            </kbd>
          )}
        </Button>

        {/* Settings, Shortcuts, and Theme in a row */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="flex-1 bg-secondary/50 hover:bg-secondary border-border"
            onClick={onSettings}
            title="Settings"
          >
            <Settings size={18} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="flex-1 bg-secondary/50 hover:bg-secondary border-border"
            onClick={() => setShortcutsOpen(true)}
            title="Keyboard Shortcuts"
          >
            <Keyboard size={18} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="flex-1 bg-secondary/50 hover:bg-secondary border-border"
            onClick={onTheme}
            title="Theme"
          >
            <Moon size={18} />
          </Button>
        </div>
      </div>

      <ShortcutsSettings open={shortcutsOpen} onOpenChange={setShortcutsOpen} />
    </>
  )
}

// Export icon components for easy use
export { Plus, Settings }
