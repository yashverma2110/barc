import { Plus, Settings } from 'lucide-react'
import { Button } from './ui/button'

interface ActionButton {
  icon: React.ReactNode
  label: string
  onClick: () => void
}

interface ActionCenterProps {
  actions: ActionButton[]
}

export function ActionCenter({ actions }: ActionCenterProps) {
  return (
    <div className="mt-auto flex flex-col gap-2">
      {actions.map((action, index) => (
        <Button
          key={index}
          variant="outline"
          className="w-full justify-start gap-2 bg-secondary/50 hover:bg-secondary border-border"
          onClick={action.onClick}
        >
          {action.icon}
          <span>{action.label}</span>
        </Button>
      ))}
    </div>
  )
}

// Export icon components for easy use
export { Plus, Settings }
