import React, { SyntheticEvent } from 'react'
import cn from 'classnames'

import styles from './Button.module.scss'

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset'
  variant?: string
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  children: React.ReactNode
}

const handleMouseDown = (event: SyntheticEvent) => {
  event.preventDefault()
  event.stopPropagation()
}

export function Button({ onClick, type = 'button', variant, children }: ButtonProps): JSX.Element {
  return (
    <button
      type={type}
      className={cn(styles.btn, {
        [styles.btnCancel]: variant === 'cancel',
        [styles.btnRemove]: variant === 'remove'
      })}
      onMouseDown={handleMouseDown}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
