import React from 'react'

import './SearchResults.scss'
import Button from 'components/Button'
import { IShow } from 'types/Show'

type SearchResultsProps = {
  id: string
  title: string
  imageSrc?: string
  premiered?: string
  summary?: string
  onAddShow: (show: IShow) => void
}

export function SearchResults({
  id,
  title,
  imageSrc,
  premiered,
  summary,
  onAddShow
}: SearchResultsProps): JSX.Element {
  const handleClick = () => {
    onAddShow({ id, title, imageSrc, premiered, summary })
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
        <p className="results__premiered">{premiered ? premiered.split('-')[0] : ''}</p>
      </div>
      <div className="results__buttons">
        <Button onClick={handleClick}>Add</Button>
      </div>
    </>
  )
}
