import React from 'react'

import useTheme from 'utils/useTheme'

export function ThemeToggle(): JSX.Element {
  const { theme, ToggleTheme } = useTheme()
  return (
    <>
      <span
        onClick={() => {
          if (theme === 'dark-theme') ToggleTheme()
        }}
      >
        Light
      </span>
      <input
        type="checkbox"
        role="switch"
        checked={theme === 'dark-theme'}
        aria-label="Toggle theme"
        onChange={ToggleTheme}
      />
      <span
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
