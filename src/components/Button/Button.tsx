import React, { SyntheticEvent } from 'react'
import './Button.scss'
import cn from 'classnames'

interface ButtonProps {
  className?: string
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  children: React.ReactNode
}

const handleMouseDown = (event: SyntheticEvent) => {
  event.preventDefault()
  event.stopPropagation()
}

export function Button({ onClick, className, children }: ButtonProps): JSX.Element {
  return (
    <button
      type="button"
      className={cn('btn', className)}
      onMouseDown={handleMouseDown}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
