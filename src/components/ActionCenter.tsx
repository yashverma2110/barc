import { Plus, Settings, Moon } from 'lucide-react'
import { Button } from './ui/button'

interface ActionCenterProps {
  onNewTab: () => void
  onSettings: () => void
  onTheme: () => void
}

export function ActionCenter({ onNewTab, onSettings, onTheme }: ActionCenterProps) {
  return (
    <div className="flex flex-col gap-2">
      {/* Full-width New Tab button */}
      <Button
        variant="outline"
        className="w-full justify-start gap-2 bg-secondary/50 hover:bg-secondary border-border"
        onClick={onNewTab}
      >
        <Plus size={16} />
        <span>New Tab</span>
      </Button>

      {/* Settings and Theme in a row */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          className="flex-1 bg-secondary/50 hover:bg-secondary border-border"
          onClick={onSettings}
        >
          <Settings size={18} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="flex-1 bg-secondary/50 hover:bg-secondary border-border"
          onClick={onTheme}
        >
          <Moon size={18} />
        </Button>
      </div>
    </div>
  )
}

// Export icon components for easy use
export { Plus, Settings }
