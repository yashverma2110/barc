import * as React from 'react'
import { motion } from 'framer-motion'
import { Globe, Pin, PinOff, X, Pencil } from 'lucide-react'
import type { TabItem as TabItemType } from '../types/tab'
import { Button } from './ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { RenameTabDialog } from './RenameTabDialog'
import { cn } from '@/lib/utils'

interface TabItemProps {
  tab: TabItemType
  isPinned: boolean
  onSwitch: (tabId: number) => void
  onClose: (tabId: number) => void
  onTogglePin: (tabId: number) => void
  onRename: (tabId: number, newTitle: string) => void
}

export function TabItem({ tab, isPinned, onSwitch, onClose, onTogglePin, onRename }: TabItemProps) {
  const [faviconError, setFaviconError] = React.useState(false)
  const [showRenameDialog, setShowRenameDialog] = React.useState(false)

  const handleClick = () => {
    onSwitch(tab.id)
  }

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClose(tab.id)
  }

  const handlePin = (e: React.MouseEvent) => {
    e.stopPropagation()
    onTogglePin(tab.id)
  }

  const handleRenameClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowRenameDialog(true)
  }

  const handleRename = (newTitle: string) => {
    onRename(tab.id, newTitle)
  }

  return (
    <TooltipProvider>
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, x: -20 }}
        transition={{
          duration: 0.2,
          ease: "easeOut"
        }}
        className={cn(
          'group relative flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer transition-colors',
          'hover:bg-secondary/80',
          tab.active && 'bg-secondary'
        )}
        onClick={handleClick}
      >
        <div className="flex-shrink-0 w-4 h-4 flex items-center justify-center">
          {tab.favIconUrl && !faviconError ? (
            <img
              src={tab.favIconUrl}
              alt=""
              className="w-4 h-4 rounded-sm"
              onError={() => setFaviconError(true)}
            />
          ) : (
            <Globe size={16} className="text-muted-foreground" />
          )}
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex-1 text-sm text-foreground truncate text-left">
              {tab.title}
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p className="max-w-xs truncate">{tab.title}</p>
          </TooltipContent>
        </Tooltip>

        {/* Buttons overlay with gradient background */}
        <div className="absolute right-0 top-0 bottom-0 flex items-center gap-1 pr-2 pl-8 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-l from-secondary via-secondary to-transparent">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={handleRenameClick}
              >
                <Pencil size={14} className="text-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Rename tab</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={handlePin}
              >
                {isPinned ? <Pin size={14} className="text-foreground" /> : <PinOff size={14} className="text-foreground" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>{isPinned ? 'Unpin tab' : 'Pin tab'}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={handleClose}
              >
                <X size={14} className="text-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Close tab</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </motion.div>

      <RenameTabDialog
        open={showRenameDialog}
        onOpenChange={setShowRenameDialog}
        currentTitle={tab.title}
        onRename={handleRename}
      />
    </TooltipProvider>
  )
}
