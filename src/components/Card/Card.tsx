import React from 'react'
import cn from 'classnames'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useDispatch, useSelector } from 'react-redux'

import Button from 'components/Button'
import { ICard } from 'types/Show'
import { RootState } from 'store/store'
import styles from './Card.module.scss'
import { removeShow } from '../../store/showSlice'

export function Card({ show, state, id }: ICard) {
  const dispatch = useDispatch()
  const { border, shadow } = useSelector((state: RootState) => state.settings)

  const { attributes, listeners, transform, transition, setNodeRef } = useSortable({
    id
  })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  const setStyles = () => {
    let styles = {}
    if (border.enabled)
      styles = {
        border: '1px solid var(--btn_border)',
        borderRadius: `${border.borderRadius}px`
      }
    if (shadow.enabled)
      styles = {
        ...styles,
        boxShadow: `${shadow.offsetX}em ${shadow.offsetY}em ${shadow.blur}em rgba(0,0,0, 0.5)`
      }
    if (show.imageSrc) {
      styles = { ...styles, background: `center / cover no-repeat  url(${show.imageSrc})` }
    }
    return styles
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={styles.flexDiv}>
      <div style={setStyles()} className={cn(styles.card, { [styles.cardFilled]: state })}>
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
