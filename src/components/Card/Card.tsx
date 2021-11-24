import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import './Card.scss'
import Button from 'components/Button'

type TProps = {
  id: string
  title: string
  imageSrc: string
  state: boolean
  className: string
  onRemoveShow: (id: string) => void
}

export function Card({ id, title, imageSrc, state, className, onRemoveShow }: TProps) {
  const { attributes, listeners, transform, transition, setNodeRef } = useSortable({
    id: `${id}`
  })

  const handleClick = () => {
    onRemoveShow(id)
  }

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  const setBackground = () => {
    if (imageSrc) {
      return { background: `center / cover no-repeat  url(${imageSrc})` }
    }
    return undefined
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="flex_div">
      <div style={setBackground()} className={className}>
        {!imageSrc && <h1 className="card__title">{title}</h1>}
        <div className="card__body">
          <h1 className="body__title">{title}</h1>
          <Button className="btn--remove" onClick={handleClick}>
            Remove
          </Button>
        </div>
      </div>
    </div>
  )
}
