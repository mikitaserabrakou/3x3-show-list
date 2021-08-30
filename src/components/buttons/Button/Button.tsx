import React from 'react'
import './Button.scss'

type TProps = {
  type?: string
  handleClick: () => void
  children?: React.ReactNode
}

export default function Button({ handleClick, type, children = '' }: TProps): JSX.Element {
  return (
    <button type="button" className={`btn--${type}`} onClick={handleClick}>
      {children}
    </button>
  )
}
