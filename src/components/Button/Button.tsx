import React, { SyntheticEvent } from 'react'
import cn from 'classnames'

import styles from './Button.module.scss'

interface ButtonProps {
  type?: string
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  children: React.ReactNode
}

const handleMouseDown = (event: SyntheticEvent) => {
  event.preventDefault()
  event.stopPropagation()
}

export function Button({ onClick, type, children }: ButtonProps): JSX.Element {
  return (
    <button
      type="button"
      className={cn(styles.btn, {
        [styles.btnCancel]: type === 'cancel',
        [styles.btnRemove]: type === 'remove'
      })}
      onMouseDown={handleMouseDown}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
