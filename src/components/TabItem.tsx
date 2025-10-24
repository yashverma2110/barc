import * as React from 'react'
import { Globe, Pin, PinOff, X } from 'lucide-react'
import type { TabItem as TabItemType } from '../types/tab'
import { Button } from './ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { cn } from '@/lib/utils'

interface TabItemProps {
  tab: TabItemType
  isPinned: boolean
  onSwitch: (tabId: number) => void
  onClose: (tabId: number) => void
  onTogglePin: (tabId: number) => void
}

export function TabItem({ tab, isPinned, onSwitch, onClose, onTogglePin }: TabItemProps) {
  const [faviconError, setFaviconError] = React.useState(false)

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

  return (
    <TooltipProvider>
      <div
        className={cn(
          'group flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer transition-colors',
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

        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={handlePin}
              >
                {isPinned ? <Pin size={14} /> : <PinOff size={14} />}
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
                className="h-6 w-6 hover:bg-destructive/10 hover:text-destructive"
                onClick={handleClose}
              >
                <X size={14} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Close tab</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  )
}
