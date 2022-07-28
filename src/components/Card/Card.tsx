import React from 'react'
import cn from 'classnames'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import Button from 'components/Button'
import { ICard } from 'types/Show'
import styles from './Card.module.scss'

export function Card({ show, state, id, onRemoveShow }: ICard) {
  const { attributes, listeners, transform, transition, setNodeRef } = useSortable({
    id
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  const setBackground = () => {
    if (show.imageSrc) {
      return { background: `center / cover no-repeat  url(${show.imageSrc})` }
    }
    return undefined
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={styles.flex_div}>
      <div style={setBackground()} className={cn(styles.card, { [styles.card__filled]: state })}>
        {!show.imageSrc && <h1 className={styles.card__title}>{show.title}</h1>}
        <div className={styles.card__body}>
          <h1 className={styles.body__title}>{show.title}</h1>
          <Button className="btn--remove" onClick={() => onRemoveShow(id)}>
            Remove
          </Button>
        </div>
      </div>
    </div>
  )
}
