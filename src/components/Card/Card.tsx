import React, { SyntheticEvent } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import './Card.scss'
import Button from '../buttons/Button/Button'

type TProps = {
  id: string
  title: string
  imageSrc: string
  rating: number
  state: boolean
  className: string
  onRemoveShow: (id: string) => void
}

export default function Card({
  id,
  title,
  imageSrc,
  rating,
  state,
  className,
  onRemoveShow
}: TProps) {
  const { attributes, listeners, transform, transition, setNodeRef } = useSortable({
    id: `${id}`
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className={className}>
        {state ? (
          <>
            <img className="card__image" src={imageSrc} alt={title} />
            <div className="card__content">
              <h1 className="card__title">{title}</h1>
              <Button type="remove" handleClick={() => onRemoveShow(id)}>
                Remove
              </Button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}
