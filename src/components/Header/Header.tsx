import React from 'react'

import ThemeToggle from 'components/ThemeToggle'
import styles from './Header.module.scss'

export function Header(): JSX.Element {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>3x3 showlist</div>
      <ThemeToggle />
    </div>
  )
}
