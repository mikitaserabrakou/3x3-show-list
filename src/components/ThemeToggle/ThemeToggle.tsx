import React from 'react'

import useTheme from 'utils/useTheme'
import './ThemeToggle.scss'

export function ThemeToggle(): JSX.Element {
  const [theme, ToggleTheme] = useTheme()
  return (
    <div className="theme_toggle">
      <span
        className="theme_label__light"
        onClick={() => {
          if (theme === 'dark-theme') ToggleTheme()
        }}
      >
        Light
      </span>
      <input
        type="checkbox"
        role="switch"
        aria-label="Toggle theme"
        aria-checked={theme === 'dark-theme'}
        checked={theme === 'dark-theme'}
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
    </div>
  )
}
