import { X } from 'lucide-react'
import type { GridSettings } from '../types/tab'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

interface SettingsProps {
  settings: GridSettings
  onUpdateSettings: (settings: GridSettings) => void
  onClose: () => void
}

export function Settings({ settings, onUpdateSettings, onClose }: SettingsProps) {
  const handleIconSizeChange = (size: 'small' | 'medium' | 'large') => {
    onUpdateSettings({ ...settings, iconSize: size })
  }

  const handleColumnsChange = (columns: 2 | 3 | 4) => {
    onUpdateSettings({ ...settings, columns })
  }

  return (
    <div
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <Card
        className="w-full max-w-sm animate-in fade-in-0 zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-base font-semibold">Grid Settings</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onClose}
          >
            <X size={18} />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-3">
            <label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
              Icon Size
            </label>
            <div className="flex gap-2">
              <Button
                variant={settings.iconSize === 'small' ? 'default' : 'outline'}
                size="sm"
                className="flex-1"
                onClick={() => handleIconSizeChange('small')}
              >
                Small
              </Button>
              <Button
                variant={settings.iconSize === 'medium' ? 'default' : 'outline'}
                size="sm"
                className="flex-1"
                onClick={() => handleIconSizeChange('medium')}
              >
                Medium
              </Button>
              <Button
                variant={settings.iconSize === 'large' ? 'default' : 'outline'}
                size="sm"
                className="flex-1"
                onClick={() => handleIconSizeChange('large')}
              >
                Large
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
              Columns
            </label>
            <div className="flex gap-2">
              <Button
                variant={settings.columns === 2 ? 'default' : 'outline'}
                size="sm"
                className="flex-1"
                onClick={() => handleColumnsChange(2)}
              >
                2
              </Button>
              <Button
                variant={settings.columns === 3 ? 'default' : 'outline'}
                size="sm"
                className="flex-1"
                onClick={() => handleColumnsChange(3)}
              >
                3
              </Button>
              <Button
                variant={settings.columns === 4 ? 'default' : 'outline'}
                size="sm"
                className="flex-1"
                onClick={() => handleColumnsChange(4)}
              >
                4
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
