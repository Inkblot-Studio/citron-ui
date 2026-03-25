import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type CitronTheme = 'light' | 'dark'

export const CITRON_THEME_STORAGE_KEY = 'citron-ui-theme'

export interface ThemeContextValue {
  theme: CitronTheme
  setTheme: (theme: CitronTheme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function getStoredTheme(): CitronTheme | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(CITRON_THEME_STORAGE_KEY)
    if (raw === 'light' || raw === 'dark') return raw
  } catch {
    /* ignore */
  }
  return null
}

function getPreferredTheme(): CitronTheme {
  if (typeof window === 'undefined') return 'light'
  if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) return 'dark'
  return 'light'
}

function applyThemeToDocument(theme: CitronTheme) {
  if (typeof document === 'undefined') return
  document.documentElement.setAttribute('data-theme', theme)
}

export interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<CitronTheme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = getStoredTheme()
    const initial = stored ?? getPreferredTheme()
    setThemeState(initial)
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    applyThemeToDocument(theme)
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem(CITRON_THEME_STORAGE_KEY, theme)
    } catch {
      /* ignore */
    }
  }, [theme, mounted])

  const setTheme = useCallback((next: CitronTheme) => {
    setThemeState(next)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState((t) => (t === 'light' ? 'dark' : 'light'))
  }, [])

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return ctx
}
