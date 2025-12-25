import { createContext, useContext } from 'react'

// Global theme type
export type AppTheme = 'light' | 'dark'

// Theme context for global state
interface ThemeContextType {
  theme: AppTheme
  setTheme: (theme: AppTheme) => void
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  setTheme: () => {},
})

export const useTheme = () => useContext(ThemeContext)
