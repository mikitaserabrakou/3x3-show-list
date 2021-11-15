import React from 'react'
import Button from '../buttons/Button/Button'
import './SearchResults.scss'

type TProps = {
  id: string
  title: string
  imageSrc: any
  year: string
  onAddShow: (id: string, title: string, imageSrc: string) => void
}

export default function SearchResults({
  id,
  title,
  imageSrc,
  year,
  onAddShow
}: TProps): JSX.Element {
  const handleClick = () => {
    onAddShow(id.toString(), title, imageSrc)
  }
  return (
    <>
      <img
        src={imageSrc || `https://via.placeholder.com/252/292d3e/ffffff/?text=${title}`}
        alt=""
        height={72}
        width={51}
      />
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
