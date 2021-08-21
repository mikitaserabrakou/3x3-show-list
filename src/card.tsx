import { useState } from 'react'
import './card.scss'
import './AddButton'
import AddButton from './AddButton'

type TProps = {
  title: string
  imageSrc: string
  rating: number
  state: boolean
  className: string
}

export default function Card({ title, imageSrc, rating, state, className }: TProps) {
  return (
    <div className={className}>
      {state ? (
        <>
          <img className="card__image" src={imageSrc} alt={title} />
          <div className="card__content">
            <h1 className="card__title">{title}</h1>
          </div>
        </>
      ) : (
        <AddButton />
      )}
    </div>
  )
}
