import React, { SyntheticEvent } from 'react'
import Button from '../buttons/Button/Button'
import './SearchResults.scss'

type TProps = {
  id: number
  title: string
  imageSrc: any
  year: string
  onAddShow: (id: number, title: string, imageSrc: string) => void
}

export default function SearchResults({
  id,
  title,
  imageSrc,
  year,
  onAddShow
}: TProps): JSX.Element {
  const handleClick = (event: SyntheticEvent) => {
    event.preventDefault()
    onAddShow(id, title, imageSrc)
  }
  return (
    <>
      <img src={imageSrc} alt="" />
      <div className="results__info">
        <p className="results__title">{title}</p>
        <p className="results__year">{year.split('-')[0]}</p>
      </div>
      <div className="results__buttons">
        <Button type="add" handleClick={handleClick}>
          Add
        </Button>
      </div>
    </>
  )
}
