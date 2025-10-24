import { X, Sun, Moon, Monitor } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { useTheme } from './providers/ThemeProvider'
import { cn } from '@/lib/utils'

interface ThemeSettingsProps {
  onClose: () => void
}

export function ThemeSettings({ onClose }: ThemeSettingsProps) {
  const { theme, setTheme } = useTheme()

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <Card
        className="w-full max-w-md animate-in fade-in-0 zoom-in-95 shadow-xl border-border/50"
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 px-6 pt-6">
          <CardTitle className="text-lg font-semibold">Theme</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 -mr-2 hover:bg-secondary"
            onClick={onClose}
          >
            <X size={16} />
          </Button>
        </CardHeader>

        <CardContent className="space-y-1.5 px-6 pb-6">
          <Button
            variant={theme === 'light' ? 'default' : 'ghost'}
            className={cn(
              'w-full justify-start gap-3 h-auto py-3 px-4',
              theme === 'light' && 'bg-primary text-primary-foreground hover:bg-primary/90'
            )}
            onClick={() => setTheme('light')}
          >
            <Sun size={20} className="shrink-0" />
            <div className="flex flex-col items-start text-left">
              <span className="font-medium text-sm">Light</span>
              <span className={cn(
                'text-xs',
                theme === 'light' ? 'text-primary-foreground/70' : 'text-muted-foreground'
              )}>
                Bright and clear interface
              </span>
            </div>
          </Button>

          <Button
            variant={theme === 'dark' ? 'default' : 'ghost'}
            className={cn(
              'w-full justify-start gap-3 h-auto py-3 px-4',
              theme === 'dark' && 'bg-primary text-primary-foreground hover:bg-primary/90'
            )}
            onClick={() => setTheme('dark')}
          >
            <Moon size={20} className="shrink-0" />
            <div className="flex flex-col items-start text-left">
              <span className="font-medium text-sm">Dark</span>
              <span className={cn(
                'text-xs',
                theme === 'dark' ? 'text-primary-foreground/70' : 'text-muted-foreground'
              )}>
                Easy on the eyes
              </span>
            </div>
          </Button>

          <Button
            variant={theme === 'system' ? 'default' : 'ghost'}
            className={cn(
              'w-full justify-start gap-3 h-auto py-3 px-4',
              theme === 'system' && 'bg-primary text-primary-foreground hover:bg-primary/90'
            )}
            onClick={() => setTheme('system')}
          >
            <Monitor size={20} className="shrink-0" />
            <div className="flex flex-col items-start text-left">
              <span className="font-medium text-sm">System</span>
              <span className={cn(
                'text-xs',
                theme === 'system' ? 'text-primary-foreground/70' : 'text-muted-foreground'
              )}>
                Follows your OS preference
              </span>
            </div>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
