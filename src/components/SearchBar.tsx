import { Search } from 'lucide-react'
import { Input } from './ui/input'
import { cn } from '@/lib/utils'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative mb-4">
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
      />
      <Input
        type="text"
        placeholder="Search tabs..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          'pl-9 bg-secondary/50 border-border',
          'focus-visible:ring-primary'
        )}
      />
    </div>
  )
}
