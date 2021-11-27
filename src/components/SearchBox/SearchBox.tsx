import React, { SyntheticEvent } from 'react'
import './SearchBox.scss'

import useAxios from 'utils/useAxios'
import useToggle from 'utils/useToggle'
import SearchResults from 'components/SearchResults'
import { IShow } from 'types/Show'

interface SBProps {
  onAddShow: (show: IShow) => void
}

export function SearchBox({ onAddShow }: SBProps) {
  const [data, fetch] = useAxios()
  const [isFocused, setIsFocused] = useToggle(false)

  const handleMouseDown = (event: SyntheticEvent) => {
    event.preventDefault()
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    fetch(`https://api.tvmaze.com/search/shows?q=${event.currentTarget.value}`)
  }

  return (
    <>
      <input
        type="text"
        className="search_bar"
        onChange={handleChange}
        onFocus={setIsFocused}
        onBlur={setIsFocused}
        placeholder="Enter tv-show name"
      />
      {data && isFocused ? (
        <ul className="results" onFocus={setIsFocused} onBlur={setIsFocused}>
          {data.map((item: any) => (
            <li key={item.show.id} onMouseDown={handleMouseDown}>
              <SearchResults
                id={item.show.id}
                title={item.show.name}
                imageSrc={item.show.image == null ? '' : item.show.image.medium}
                premiered={item.show.premiered == null ? '' : item.show.premiered}
                onAddShow={onAddShow}
              />
            </li>
          ))}
        </ul>
      ) : null}
    </>
  )
}
