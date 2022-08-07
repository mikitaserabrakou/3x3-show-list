import React from 'react'
import cn from 'classnames'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useDispatch } from 'react-redux'

import Button from 'components/Button'
import { ICard } from 'types/Show'
import styles from './Card.module.scss'
import { removeShow } from '../../store/showSlice'

export function Card({ show, state, id }: ICard) {
  const dispatch = useDispatch()
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
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={styles.flexDiv}>
      <div style={setBackground()} className={cn(styles.card, { [styles.cardFilled]: state })}>
        {!show.imageSrc && <h1 className={styles.title}>{show.title || id} </h1>}
        <div className={styles.body}>
          <h1 className={styles.bodyTitle}>{show.title || id}</h1>
          <Button variant="remove" onClick={() => dispatch(removeShow(id))}>
            Remove
          </Button>
        </div>
      </div>
    </div>
  )
}
