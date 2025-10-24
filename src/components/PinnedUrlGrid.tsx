import { useState } from 'react'
import { X, Plus } from 'lucide-react'
import type { PinnedUrl, GridSettings } from '../types/tab'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { cn } from '@/lib/utils'

interface PinnedUrlGridProps {
  pinnedUrls: PinnedUrl[]
  gridSettings: GridSettings
  onOpenUrl: (url: string) => void
  onRemoveUrl: (id: string) => void
  onAddUrl: () => void
}

const ICON_SIZES = {
  small: { icon: 24, plus: 20 },
  medium: { icon: 32, plus: 24 },
  large: { icon: 40, plus: 28 },
}

function PinnedUrlItem({
  pinnedUrl,
  iconSize,
  onOpenUrl,
  onRemoveUrl
}: {
  pinnedUrl: PinnedUrl
  iconSize: { icon: number; plus: number }
  onOpenUrl: (url: string) => void
  onRemoveUrl: (id: string) => void
}) {
  const [faviconError, setFaviconError] = useState(false)

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Card
          className={cn(
            'relative aspect-square flex items-center justify-center cursor-pointer transition-all hover:scale-105',
            'bg-secondary/50 hover:bg-secondary',
            pinnedUrl.isActive && 'bg-primary border-primary shadow-lg ring-2 ring-primary/30'
          )}
          onClick={() => onOpenUrl(pinnedUrl.url)}
        >
          <div
            className="flex items-center justify-center"
            style={{ width: iconSize.icon, height: iconSize.icon }}
          >
            {pinnedUrl.favicon && !faviconError ? (
              <img
                src={pinnedUrl.favicon}
                alt={pinnedUrl.title}
                className="rounded-lg object-cover"
                style={{ width: iconSize.icon, height: iconSize.icon }}
                onError={() => setFaviconError(true)}
              />
            ) : (
              <div
                className={cn(
                  'flex items-center justify-center font-semibold rounded-lg',
                  'bg-muted text-muted-foreground',
                  pinnedUrl.isActive && 'bg-primary-foreground text-primary'
                )}
                style={{
                  width: iconSize.icon,
                  height: iconSize.icon,
                  fontSize: iconSize.icon / 2
                }}
              >
                {pinnedUrl.title.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'absolute top-1 right-1 h-5 w-5 opacity-0 hover:opacity-100 transition-opacity',
              'bg-background/90 hover:bg-destructive hover:text-destructive-foreground',
              'group-hover:opacity-100'
            )}
            onClick={(e) => {
              e.stopPropagation()
              onRemoveUrl(pinnedUrl.id)
            }}
          >
            <X size={12} />
          </Button>
        </Card>
      </TooltipTrigger>
      <TooltipContent>
        <p>{pinnedUrl.isActive ? `${pinnedUrl.title} (Active)` : pinnedUrl.title}</p>
      </TooltipContent>
    </Tooltip>
  )
}

export function PinnedUrlGrid({ pinnedUrls, gridSettings, onOpenUrl, onRemoveUrl, onAddUrl }: PinnedUrlGridProps) {
  const iconSize = ICON_SIZES[gridSettings.iconSize]

  return (
    <TooltipProvider>
      <div className="mb-5 pb-5 border-b border-border">
        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: `repeat(${gridSettings.columns}, 1fr)` }}
        >
          {pinnedUrls.map((pinnedUrl) => (
            <PinnedUrlItem
              key={pinnedUrl.id}
              pinnedUrl={pinnedUrl}
              iconSize={iconSize}
              onOpenUrl={onOpenUrl}
              onRemoveUrl={onRemoveUrl}
            />
          ))}

          <Tooltip>
            <TooltipTrigger asChild>
              <Card
                className={cn(
                  'aspect-square flex items-center justify-center cursor-pointer transition-all hover:scale-105',
                  'bg-secondary/50 hover:bg-secondary border-dashed border-2 border-muted-foreground/30 hover:border-muted-foreground/50'
                )}
                onClick={onAddUrl}
              >
                <Plus size={iconSize.plus} className="text-muted-foreground" strokeWidth={2} />
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add pinned URL</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  )
}
