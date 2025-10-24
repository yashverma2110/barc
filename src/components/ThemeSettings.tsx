import { X, Sun, Moon, Monitor, Plus, Trash2, ExternalLink, Palette, type LucideIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { useTheme, type CustomTheme, PREDEFINED_THEMES } from './providers/ThemeProvider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { useState } from 'react'
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
import { Textarea } from './ui/textarea'
import { Separator } from './ui/separator'

interface ThemeOption {
  value: string
  label: string
  icon: LucideIcon
  description: string
  isCustom?: boolean
  isPredefined?: boolean
}

interface ThemeSettingsProps {
  onClose: () => void
}

export function ThemeSettings({ onClose }: ThemeSettingsProps) {
  const { theme, setTheme, customThemes, addCustomTheme, removeCustomTheme } = useTheme()
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [themeName, setThemeName] = useState('')
  const [themeCSS, setThemeCSS] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [error, setError] = useState('')

  const defaultThemes: ThemeOption[] = [
    { value: 'light', label: 'Light', icon: Sun, description: 'Bright and clear interface' },
    { value: 'dark', label: 'Dark', icon: Moon, description: 'Easy on the eyes' },
    { value: 'system', label: 'System', icon: Monitor, description: 'Follows your OS preference' }
  ]

  const predefinedThemes: ThemeOption[] = PREDEFINED_THEMES.map(theme => ({
    value: theme.id,
    label: theme.name,
    icon: Palette,
    description: `${theme.isDark ? 'Dark' : 'Light'} theme`,
    isPredefined: true
  }))

  const allThemes: ThemeOption[] = [
    ...defaultThemes,
    ...predefinedThemes,
    ...customThemes.map(ct => ({
      value: ct.id,
      label: ct.name,
      icon: ct.isDark ? Moon : Sun,
      description: 'Custom theme',
      isCustom: true
    }))
  ]

  const currentThemeInfo = allThemes.find(t => t.value === theme)

  const handleAddTheme = () => {
    setError('')

    if (!themeName.trim()) {
      setError('Please enter a theme name')
      return
    }

    if (!themeCSS.trim()) {
      setError('Please paste the CSS variables from tweakcn.com')
      return
    }

    try {
      // Parse CSS variables from the pasted content
      const cssVariables: Record<string, string> = {}
      const lines = themeCSS.split('\n')

      lines.forEach(line => {
        const trimmed = line.trim()
        // Match CSS variable declarations: --variable-name: value;
        const match = trimmed.match(/--([^:]+):\s*([^;]+);?/)
        if (match) {
          const [, key, value] = match
          cssVariables[key.trim()] = value.trim()
        }
      })

      if (Object.keys(cssVariables).length === 0) {
        setError('No valid CSS variables found. Please paste CSS from tweakcn.com')
        return
      }

      const newTheme: CustomTheme = {
        id: `custom-${Date.now()}`,
        name: themeName,
        cssVariables,
        isDark: isDarkMode
      }

      addCustomTheme(newTheme)
      setTheme(newTheme.id)
      setShowAddDialog(false)
      setThemeName('')
      setThemeCSS('')
      setIsDarkMode(false)
      setError('')
    } catch (err) {
      setError('Failed to parse theme CSS. Please check the format.')
    }
  }

  const handleRemoveTheme = (themeId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    removeCustomTheme(themeId)
  }

  const handleOpenTweakcn = () => {
    window.open('https://tweakcn.com', '_blank')
  }

  return (
    <>
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

          <CardContent className="space-y-4 px-6 pb-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Select Theme</Label>
              <div className="flex gap-2">
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger className="flex-1">
                    <SelectValue>
                      <div className="flex items-center gap-2">
                        {currentThemeInfo?.icon && <currentThemeInfo.icon size={16} />}
                        <span>{currentThemeInfo?.label || 'Select theme'}</span>
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {/* Default themes */}
                    {defaultThemes.map((themeOption) => (
                      <SelectItem
                        key={themeOption.value}
                        value={themeOption.value}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2 flex-1">
                          <themeOption.icon size={16} />
                          <div className="flex flex-col">
                            <span className="font-medium text-sm">{themeOption.label}</span>
                            <span className="text-xs text-muted-foreground">
                              {themeOption.description}
                            </span>
                          </div>
                        </div>
                      </SelectItem>
                    ))}

                    {/* Predefined themes separator and items */}
                    {predefinedThemes.length > 0 && (
                      <>
                        <Separator className="my-1" />
                        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                          Pre-made Themes
                        </div>
                        {predefinedThemes.map((themeOption) => (
                          <SelectItem
                            key={themeOption.value}
                            value={themeOption.value}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2 flex-1">
                              <themeOption.icon size={16} />
                              <div className="flex flex-col">
                                <span className="font-medium text-sm">{themeOption.label}</span>
                                <span className="text-xs text-muted-foreground">
                                  {themeOption.description}
                                </span>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </>
                    )}

                    {/* Custom themes separator and items */}
                    {customThemes.length > 0 && (
                      <>
                        <Separator className="my-1" />
                        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                          Custom Themes
                        </div>
                        {customThemes.map((ct) => {
                          const Icon = ct.isDark ? Moon : Sun
                          return (
                            <div key={ct.id} className="relative">
                              <SelectItem
                                value={ct.id}
                                className="pr-10"
                              >
                                <div className="flex items-center gap-2">
                                  <Icon size={16} />
                                  <div className="flex flex-col">
                                    <span className="font-medium text-sm">{ct.name}</span>
                                    <span className="text-xs text-muted-foreground">
                                      Custom theme
                                    </span>
                                  </div>
                                </div>
                              </SelectItem>
                              <button
                                className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 flex items-center justify-center rounded-sm bg-muted/50 hover:bg-destructive/10 transition-colors z-10"
                                onClick={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                  handleRemoveTheme(ct.id, e)
                                }}
                                title="Delete theme"
                              >
                                <Trash2 size={14} className="text-muted-foreground hover:text-destructive transition-colors" />
                              </button>
                            </div>
                          )
                        })}
                      </>
                    )}
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowAddDialog(true)}
                  title="Add custom theme"
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>

            <div className="pt-2 border-t">
              <p className="text-xs text-muted-foreground">
                Create custom themes at{' '}
                <button
                  onClick={handleOpenTweakcn}
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  tweakcn.com
                  <ExternalLink size={12} />
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Custom Theme</DialogTitle>
            <DialogDescription>
              Create your theme on{' '}
              <button
                onClick={handleOpenTweakcn}
                className="text-primary hover:underline inline-flex items-center gap-1"
              >
                tweakcn.com
                <ExternalLink size={12} />
              </button>
              {' '}and paste the CSS variables here.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="theme-name">Theme Name</Label>
              <Input
                id="theme-name"
                placeholder="My Custom Theme"
                value={themeName}
                onChange={(e) => setThemeName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="theme-css">CSS Variables</Label>
              <Textarea
                id="theme-css"
                placeholder={`:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --primary: 0 0% 9%;
  ...
}`}
                value={themeCSS}
                onChange={(e) => setThemeCSS(e.target.value)}
                className="font-mono text-xs min-h-[200px]"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is-dark"
                checked={isDarkMode}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIsDarkMode(e.target.checked)}
                className="h-4 w-4 rounded border-input"
              />
              <Label htmlFor="is-dark" className="cursor-pointer">
                This is a dark theme
              </Label>
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTheme}>Add Theme</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
