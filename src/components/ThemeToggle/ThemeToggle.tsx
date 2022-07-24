import React from 'react'

import useTheme from 'utils/useTheme'
import './ThemeToggle.scss'

export function ThemeToggle(): JSX.Element {
  const [theme, ToggleTheme] = useTheme()
  return (
    <>
      <span
        className="theme_label__light"
        onClick={() => {
          if (theme === 'dark-theme') ToggleTheme()
        }}
      >
        Light
      </span>
      <input
        className="theme_toggle"
        type="checkbox"
        role="switch"
        checked={theme === 'dark-theme'}
        aria-label="Toggle theme"
        onChange={ToggleTheme}
      />
      <span
        className="theme_label__dark"
        onClick={() => {
          if (theme === 'light-theme') ToggleTheme()
        }}
        aria-hidden="true"
      >
        Dark
      </span>
    </>
  )
}
