import React, { SyntheticEvent } from 'react'
import './Button.scss'

type TProps = {
  type?: string
  handleClick: (event: SyntheticEvent) => void
  children?: React.ReactNode
}

export default function Button({ handleClick, type, children = '' }: TProps): JSX.Element {
  return (
    <button type="button" className={`btn btn--${type}`} onMouseDown={handleClick}>
      {children}
    </button>
  )
}
