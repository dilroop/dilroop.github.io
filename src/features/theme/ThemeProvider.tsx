/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useContext,
  useEffect,
  useEffectEvent,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'

type Theme = 'dark' | 'light'

type ThemeContextValue = {
  setTheme: (theme: Theme) => void
  theme: Theme
  toggleTheme: () => void
}

const THEME_STORAGE_KEY = 'portfolio-theme'

const ThemeContext = createContext<ThemeContextValue | null>(null)

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)

  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme())

  const syncTheme = useEffectEvent((nextTheme: Theme) => {
    document.documentElement.dataset.theme = nextTheme
    document.documentElement.style.colorScheme = nextTheme
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
  })

  useEffect(() => {
    syncTheme(theme)
  }, [theme])

  const value = useMemo(
    () => ({
      setTheme,
      theme,
      toggleTheme: () => setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light')),
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const theme = useContext(ThemeContext)

  if (!theme) {
    throw new Error('Theme context is not available.')
  }

  return theme
}
