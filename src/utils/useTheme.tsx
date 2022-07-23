import { useEffect, useState } from 'react'

export default function useTheme() {
  const localTheme = localStorage.getItem('theme')
  const [theme, setTheme] = useState<string>(localTheme ?? 'dark-theme')

  const ToggleTheme = () => {
    setTheme(theme === 'light-theme' ? 'dark-theme' : 'light-theme')
    localStorage.setItem('theme', theme)
  }

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.className = theme
  }, [theme])

  return { theme, ToggleTheme }
}
