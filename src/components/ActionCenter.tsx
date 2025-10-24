import { Plus, Settings } from 'lucide-react'

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
    <div className="action-center">
      {actions.map((action, index) => (
        <button key={index} className="action-button" onClick={action.onClick}>
          {action.icon}
          <span>{action.label}</span>
        </button>
      ))}
    </div>
  )
}

// Export icon components for easy use
export { Plus, Settings }
