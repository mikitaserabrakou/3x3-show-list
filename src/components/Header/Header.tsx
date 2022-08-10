import React from 'react'

import { useDispatch } from 'react-redux'

import ThemeToggle from 'components/ThemeToggle'
import { toggleMenu } from 'store/settingsSlice'

import styles from './Header.module.scss'

export function Header(): JSX.Element {
  const dispatch = useDispatch()

  return (
    <div className={styles.header}>
      <div className={styles.logo}>3x3</div>
      <div>
        <ThemeToggle />
        <button className={styles.menu} onClick={() => dispatch(toggleMenu())}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 6h18m-10 6h10M6 18h15" />
          </svg>
        </button>
      </div>
    </div>
  )
}
