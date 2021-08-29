import { useState } from 'react'
import './Card.scss'
import Button from '../buttons/Button/Button'
import { ReactComponent as DeleteIcon } from '../../assets/delete.svg'

type TProps = {
  id: number
  title: string
  imageSrc: string
  rating: number
  state: boolean
  className: string
  onRemoveShow: (id: number) => void
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
  const handleClick = () => {
    onRemoveShow(id)
  }
  return (
    <div className={className}>
      {state ? (
        <>
          <img className="card__image" src={imageSrc} alt={title} />
          <div className="card__content">
            <h1 className="card__title">{title}</h1>
            {/* <Button style="more" handleClick={() => console.log('more')}>
              More
            </Button> */}
            <Button style="remove" handleClick={handleClick}>
              Remove
            </Button>
            {/* <button className="button__more">More</button>
            <button className="button__delete">
              Remove
            </button> */}
          </div>
        </>
      ) : (
        <Button style="add" handleClick={() => console.log('add')} />
      )}
    </div>
  )
}
