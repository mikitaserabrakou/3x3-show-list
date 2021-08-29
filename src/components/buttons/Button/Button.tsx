import { Children } from 'react'
import './Button.scss'

type TProps = {
  style: string
  handleClick: () => void
  children?: React.ReactNode
}

export default function Button({ handleClick, style, children }: TProps): JSX.Element {
  return (
    <button className={'btn--' + style} onClick={handleClick}>
      {children}
    </button>
  )
}
