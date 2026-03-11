import { createContext, useContext } from 'react'

export type Theme = {
    background_primary: string
    background_secondary: string
    accent_primary: string
    accent_secondary: string
    text_primary: string
    text_secondary: string
}

export type ThemeType = "light" | "dark" | "system"

export type ThemeContextType = {
    theme: Theme
    currentTheme: ThemeType
    setTheme: (theme: ThemeType) => void
}

export const ThemeContext = createContext<ThemeContextType | null>(null)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return context
}