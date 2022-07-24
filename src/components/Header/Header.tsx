import React from 'react'
import './Header.scss'

import ThemeToggle from 'components/ThemeToggle'

export function Header(): JSX.Element {
  return (
    <div className="header">
      <div className="header__logo">3x3</div>
      <div className="header__links">
        <ThemeToggle />
      </div>
    </div>
  )
}
