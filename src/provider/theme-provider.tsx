import { createContext, useEffect, useState } from 'react'
import { setTheme as setThemeInCSS } from '@/utils/theme-setting'

export const ThemeContext = createContext({} as any)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    setThemeInCSS(theme)
  }, [theme])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}
