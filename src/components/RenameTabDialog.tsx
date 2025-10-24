import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'

interface RenameTabDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentTitle: string
  onRename: (newTitle: string) => void
}

export function RenameTabDialog({ open, onOpenChange, currentTitle, onRename }: RenameTabDialogProps) {
  const [newTitle, setNewTitle] = useState(currentTitle)

  // Update newTitle when dialog opens or currentTitle changes
  useEffect(() => {
    if (open) {
      setNewTitle(currentTitle)
    }
  }, [open, currentTitle])

  const handleRename = () => {
    if (newTitle.trim() && newTitle !== currentTitle) {
      onRename(newTitle.trim())
    }
    onOpenChange(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRename()
    } else if (e.key === 'Escape') {
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rename Tab</DialogTitle>
          <DialogDescription>
            Enter a new name for this tab
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="tab-name">Tab Name</Label>
            <Input
              id="tab-name"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter tab name"
              autoFocus
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleRename} disabled={!newTitle.trim()}>
            Rename
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
