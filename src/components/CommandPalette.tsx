import { useState, useEffect, useRef } from 'react'
import { Dialog, DialogContent } from './ui/dialog'
import { Input } from './ui/input'
import { Search, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (input: string) => void
}

export function CommandPalette({ open, onOpenChange, onSubmit }: CommandPaletteProps) {
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus input when dialog opens
  useEffect(() => {
    if (open) {
      console.log('CommandPalette opened')
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [open])

  // Reset input when dialog closes
  useEffect(() => {
    if (!open) {
      setInput('')
    }
  }, [open])

  // Handle ESC key to close
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onOpenChange(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onOpenChange])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onSubmit(input.trim())
      onOpenChange(false)
    }
  }

  const isUrl = (text: string): boolean => {
    // Check if it's a URL (has protocol or looks like a domain)
    return /^(https?:\/\/|www\.)/.test(text) || /^[\w-]+\.[\w-.]+/.test(text)
  }

  const getDisplayText = (): string => {
    if (!input.trim()) return 'Type a URL or search query...'
    if (isUrl(input)) return `Open ${input}`
    return `Search for "${input}"`
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showClose={false} className="max-w-xs p-0 gap-0 overflow-hidden top-1/2 rounded-lg">
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative pt-2">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground z-10"
            />
            <Input
              ref={inputRef}
              type="text"
              placeholder="Enter URL or search query..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={cn(
                'border-0 border-b rounded-t-lg pl-12 pr-12 py-5 text-base',
                'focus-visible:ring-0 focus-visible:ring-offset-0',
                'bg-background',
                'flex items-center'
              )}
              autoComplete="off"
            />
          </div>

          {input.trim() && (
            <div className="p-3 pb-4">
              <button
                type="submit"
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-lg',
                  'hover:bg-accent transition-colors text-left',
                  'text-sm text-foreground'
                )}
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-secondary">
                  {isUrl(input) ? (
                    <Globe size={18} className="text-muted-foreground" />
                  ) : (
                    <Search size={18} className="text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{getDisplayText()}</div>
                  <div className="text-xs text-muted-foreground">
                    Press Enter to continue
                  </div>
                </div>
              </button>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}
