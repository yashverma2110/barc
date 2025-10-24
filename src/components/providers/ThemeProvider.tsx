import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light' | 'system' | string

export interface CustomTheme {
  id: string
  name: string
  cssVariables: Record<string, string>
  isDark?: boolean
}

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  customThemes: CustomTheme[]
  addCustomTheme: (theme: CustomTheme) => void
  removeCustomTheme: (themeId: string) => void
}

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
  customThemes: [],
  addCustomTheme: () => null,
  removeCustomTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = 'dark',
  storageKey = 'barc-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )

  const [customThemes, setCustomThemes] = useState<CustomTheme[]>(() => {
    const stored = localStorage.getItem(`${storageKey}-custom-themes`)
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    // Check if it's a custom theme
    const customTheme = customThemes.find(t => t.id === theme)

    if (customTheme) {
      // Apply custom theme CSS variables
      Object.entries(customTheme.cssVariables).forEach(([key, value]) => {
        root.style.setProperty(`--${key}`, value)
      })
      // Add appropriate class for dark/light mode
      root.classList.add(customTheme.isDark ? 'dark' : 'light')
      return
    }

    // Default theme logic
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light'

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme, customThemes])

  const addCustomTheme = (newTheme: CustomTheme) => {
    const updatedThemes = [...customThemes, newTheme]
    setCustomThemes(updatedThemes)
    localStorage.setItem(`${storageKey}-custom-themes`, JSON.stringify(updatedThemes))
  }

  const removeCustomTheme = (themeId: string) => {
    const updatedThemes = customThemes.filter(t => t.id !== themeId)
    setCustomThemes(updatedThemes)
    localStorage.setItem(`${storageKey}-custom-themes`, JSON.stringify(updatedThemes))

    // If the removed theme was active, switch to default
    if (theme === themeId) {
      setTheme(defaultTheme)
    }
  }

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
    customThemes,
    addCustomTheme,
    removeCustomTheme,
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
