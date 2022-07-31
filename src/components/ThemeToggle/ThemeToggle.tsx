import React from 'react'

import useTheme from 'utils/useTheme'
import styles from './ThemeToggle.module.scss'

export function ThemeToggle(): JSX.Element {
  const [theme, ToggleTheme] = useTheme()
  return (
    <div className={styles.themeToggle}>
      <label
        className={styles.labelLight}
        onClick={() => {
          if (theme === 'dark-theme') ToggleTheme()
        }}
      >
        Light
      </label>
      <input
        type="checkbox"
        role="switch"
        aria-label={`Switch theme to ${theme === 'dark-theme' ? 'light' : 'dark'}`}
        aria-checked={theme === 'dark-theme'}
        checked={theme === 'dark-theme'}
        onChange={ToggleTheme}
      />
      <label
        className={styles.labelDark}
        onClick={() => {
          if (theme === 'light-theme') ToggleTheme()
        }}
        aria-hidden="true"
      >
        Dark
      </label>
    </div>
  )
}
