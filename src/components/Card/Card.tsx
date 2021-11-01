import React from 'react'
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
  // const { attributes, listeners, transform, setNodeRef } = useDraggable({
  //   id: `draggable-${id}`
  // })
  const { attributes, listeners, transform, transition, setNodeRef } = useSortable({
    id: `${id}`
  })
  const handleClick = () => {
    onRemoveShow(id)
  }

  // const style = {
  //   '--translate-x': transform ? transform.x : 0,
  //   '--translate-y': transform ? transform.y : 0,
  //   '--transition': transition
  // }

  // const style = transform
  //   ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
  //   : undefined

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
              <Button type="remove" handleClick={handleClick}>
                Remove
              </Button>
            </div>
          </>
        ) : (
          <Button type="add" handleClick={() => console.log('add')} />
        )}
      </div>
    </div>
  )
}
