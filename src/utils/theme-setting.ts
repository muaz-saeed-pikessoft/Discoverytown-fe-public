import { THEMES } from '@/provider/theme-palettes'

export async function setTheme(theme: string) {
  const newTheme = await THEMES[theme]

  const root = document.documentElement
  Object.entries(newTheme).forEach(([key, value]) => root.style.setProperty(key, value as string))
}

export async function getThemeNames() {
  const themeNames = Object.keys(THEMES)

  return themeNames
}
