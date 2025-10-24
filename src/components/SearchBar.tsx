import { useEffect, useRef } from 'react'
import { Search } from 'lucide-react'
import { Input } from './ui/input'
import { cn } from '@/lib/utils'
import { useShortcutSettings } from './ShortcutsSettings'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const settings = useShortcutSettings()

  useEffect(() => {
    if (!settings.searchFocus) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Cmd+K (Mac) or Ctrl+K (Windows/Linux)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [settings.searchFocus])

  return (
    <div className="relative mb-4">
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
      />
      <Input
        ref={inputRef}
        type="text"
        placeholder="Search tabs..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          'pl-9 bg-secondary/50 border-border',
          settings.searchFocus && 'pr-16',
          'focus-visible:ring-primary'
        )}
      />
      {settings.searchFocus && (
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none px-2 py-1 text-xs bg-muted border border-border rounded font-mono text-muted-foreground">
          ⌘K
        </kbd>
      )}
    </div>
  )
}
