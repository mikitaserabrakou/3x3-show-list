import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import './Card.scss'
import Button from '../buttons/Button/Button'

type TProps = {
  id: string
  title: string
  imageSrc: string
  state: boolean
  className: string
  onRemoveShow: (id: string) => void
}

export default function Card({ id, title, imageSrc, state, className, onRemoveShow }: TProps) {
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

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className={className}>
        {state ? (
          <>
            <img className="card__image" src={imageSrc} alt="" />
            <div className="card__content">
              <h1 className="card__title">{title}</h1>
              <Button type="remove" handleClick={handleClick}>
                Remove
              </Button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}
