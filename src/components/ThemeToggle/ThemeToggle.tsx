import React from 'react'

import useTheme from 'utils/useTheme'
import styles from './ThemeToggle.module.scss'

export function ThemeToggle(): JSX.Element {
  const [theme, ToggleTheme] = useTheme()
  return (
    <div className={styles.themeToggle}>
      <span
        className={styles.labelLight}
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
        className={styles.labelDark}
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
