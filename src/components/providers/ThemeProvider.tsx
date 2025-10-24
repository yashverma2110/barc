import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light' | 'system' | string

export interface CustomTheme {
  id: string
  name: string
  cssVariables: Record<string, string>
  isDark?: boolean
}

// Pre-made themes inspired by popular shadcn/ui themes
export const PREDEFINED_THEMES: CustomTheme[] = [
  {
    id: 'zinc',
    name: 'Zinc',
    isDark: true,
    cssVariables: {
      'background': '240 10% 3.9%',
      'foreground': '0 0% 98%',
      'card': '240 10% 3.9%',
      'card-foreground': '0 0% 98%',
      'popover': '240 10% 3.9%',
      'popover-foreground': '0 0% 98%',
      'primary': '0 0% 98%',
      'primary-foreground': '240 5.9% 10%',
      'secondary': '240 3.7% 15.9%',
      'secondary-foreground': '0 0% 98%',
      'muted': '240 3.7% 15.9%',
      'muted-foreground': '240 5% 64.9%',
      'accent': '240 3.7% 15.9%',
      'accent-foreground': '0 0% 98%',
      'destructive': '0 62.8% 30.6%',
      'destructive-foreground': '0 0% 98%',
      'border': '240 3.7% 15.9%',
      'input': '240 3.7% 15.9%',
      'ring': '240 4.9% 83.9%',
    },
  },
  {
    id: 'slate',
    name: 'Slate',
    isDark: true,
    cssVariables: {
      'background': '222.2 84% 4.9%',
      'foreground': '210 40% 98%',
      'card': '222.2 84% 4.9%',
      'card-foreground': '210 40% 98%',
      'popover': '222.2 84% 4.9%',
      'popover-foreground': '210 40% 98%',
      'primary': '210 40% 98%',
      'primary-foreground': '222.2 47.4% 11.2%',
      'secondary': '217.2 32.6% 17.5%',
      'secondary-foreground': '210 40% 98%',
      'muted': '217.2 32.6% 17.5%',
      'muted-foreground': '215 20.2% 65.1%',
      'accent': '217.2 32.6% 17.5%',
      'accent-foreground': '210 40% 98%',
      'destructive': '0 62.8% 30.6%',
      'destructive-foreground': '210 40% 98%',
      'border': '217.2 32.6% 17.5%',
      'input': '217.2 32.6% 17.5%',
      'ring': '212.7 26.8% 83.9%',
    },
  },
  {
    id: 'rose',
    name: 'Rose',
    isDark: false,
    cssVariables: {
      'background': '0 0% 100%',
      'foreground': '240 10% 3.9%',
      'card': '0 0% 100%',
      'card-foreground': '240 10% 3.9%',
      'popover': '0 0% 100%',
      'popover-foreground': '240 10% 3.9%',
      'primary': '346.8 77.2% 49.8%',
      'primary-foreground': '355.7 100% 97.3%',
      'secondary': '240 4.8% 95.9%',
      'secondary-foreground': '240 5.9% 10%',
      'muted': '240 4.8% 95.9%',
      'muted-foreground': '240 3.8% 46.1%',
      'accent': '240 4.8% 95.9%',
      'accent-foreground': '240 5.9% 10%',
      'destructive': '0 84.2% 60.2%',
      'destructive-foreground': '0 0% 98%',
      'border': '240 5.9% 90%',
      'input': '240 5.9% 90%',
      'ring': '346.8 77.2% 49.8%',
    },
  },
  {
    id: 'blue',
    name: 'Blue',
    isDark: false,
    cssVariables: {
      'background': '0 0% 100%',
      'foreground': '222.2 84% 4.9%',
      'card': '0 0% 100%',
      'card-foreground': '222.2 84% 4.9%',
      'popover': '0 0% 100%',
      'popover-foreground': '222.2 84% 4.9%',
      'primary': '221.2 83.2% 53.3%',
      'primary-foreground': '210 40% 98%',
      'secondary': '210 40% 96.1%',
      'secondary-foreground': '222.2 47.4% 11.2%',
      'muted': '210 40% 96.1%',
      'muted-foreground': '215.4 16.3% 46.9%',
      'accent': '210 40% 96.1%',
      'accent-foreground': '222.2 47.4% 11.2%',
      'destructive': '0 84.2% 60.2%',
      'destructive-foreground': '210 40% 98%',
      'border': '214.3 31.8% 91.4%',
      'input': '214.3 31.8% 91.4%',
      'ring': '221.2 83.2% 53.3%',
    },
  },
  {
    id: 'green',
    name: 'Green',
    isDark: false,
    cssVariables: {
      'background': '0 0% 100%',
      'foreground': '240 10% 3.9%',
      'card': '0 0% 100%',
      'card-foreground': '240 10% 3.9%',
      'popover': '0 0% 100%',
      'popover-foreground': '240 10% 3.9%',
      'primary': '142.1 76.2% 36.3%',
      'primary-foreground': '355.7 100% 97.3%',
      'secondary': '240 4.8% 95.9%',
      'secondary-foreground': '240 5.9% 10%',
      'muted': '240 4.8% 95.9%',
      'muted-foreground': '240 3.8% 46.1%',
      'accent': '240 4.8% 95.9%',
      'accent-foreground': '240 5.9% 10%',
      'destructive': '0 84.2% 60.2%',
      'destructive-foreground': '0 0% 98%',
      'border': '240 5.9% 90%',
      'input': '240 5.9% 90%',
      'ring': '142.1 76.2% 36.3%',
    },
  },
  {
    id: 'orange',
    name: 'Orange',
    isDark: false,
    cssVariables: {
      'background': '0 0% 100%',
      'foreground': '20 14.3% 4.1%',
      'card': '0 0% 100%',
      'card-foreground': '20 14.3% 4.1%',
      'popover': '0 0% 100%',
      'popover-foreground': '20 14.3% 4.1%',
      'primary': '24.6 95% 53.1%',
      'primary-foreground': '60 9.1% 97.8%',
      'secondary': '60 4.8% 95.9%',
      'secondary-foreground': '24 9.8% 10%',
      'muted': '60 4.8% 95.9%',
      'muted-foreground': '25 5.3% 44.7%',
      'accent': '60 4.8% 95.9%',
      'accent-foreground': '24 9.8% 10%',
      'destructive': '0 84.2% 60.2%',
      'destructive-foreground': '60 9.1% 97.8%',
      'border': '20 5.9% 90%',
      'input': '20 5.9% 90%',
      'ring': '24.6 95% 53.1%',
    },
  },
  {
    id: 'violet',
    name: 'Violet',
    isDark: true,
    cssVariables: {
      'background': '224 71.4% 4.1%',
      'foreground': '210 20% 98%',
      'card': '224 71.4% 4.1%',
      'card-foreground': '210 20% 98%',
      'popover': '224 71.4% 4.1%',
      'popover-foreground': '210 20% 98%',
      'primary': '263.4 70% 50.4%',
      'primary-foreground': '210 20% 98%',
      'secondary': '215 27.9% 16.9%',
      'secondary-foreground': '210 20% 98%',
      'muted': '215 27.9% 16.9%',
      'muted-foreground': '217.9 10.6% 64.9%',
      'accent': '215 27.9% 16.9%',
      'accent-foreground': '210 20% 98%',
      'destructive': '0 62.8% 30.6%',
      'destructive-foreground': '210 20% 98%',
      'border': '215 27.9% 16.9%',
      'input': '215 27.9% 16.9%',
      'ring': '263.4 70% 50.4%',
    },
  },
  {
    id: 'yellow',
    name: 'Yellow',
    isDark: false,
    cssVariables: {
      'background': '0 0% 100%',
      'foreground': '20 14.3% 4.1%',
      'card': '0 0% 100%',
      'card-foreground': '20 14.3% 4.1%',
      'popover': '0 0% 100%',
      'popover-foreground': '20 14.3% 4.1%',
      'primary': '47.9 95.8% 53.1%',
      'primary-foreground': '26 83.3% 14.1%',
      'secondary': '60 4.8% 95.9%',
      'secondary-foreground': '24 9.8% 10%',
      'muted': '60 4.8% 95.9%',
      'muted-foreground': '25 5.3% 44.7%',
      'accent': '60 4.8% 95.9%',
      'accent-foreground': '24 9.8% 10%',
      'destructive': '0 84.2% 60.2%',
      'destructive-foreground': '60 9.1% 97.8%',
      'border': '20 5.9% 90%',
      'input': '20 5.9% 90%',
      'ring': '20 14.3% 4.1%',
    },
  },
]

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

    // Check if it's a predefined theme
    const predefinedTheme = PREDEFINED_THEMES.find(t => t.id === theme)
    if (predefinedTheme) {
      // Apply predefined theme CSS variables
      Object.entries(predefinedTheme.cssVariables).forEach(([key, value]) => {
        root.style.setProperty(`--${key}`, value)
      })
      // Add appropriate class for dark/light mode
      root.classList.add(predefinedTheme.isDark ? 'dark' : 'light')
      return
    }

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
