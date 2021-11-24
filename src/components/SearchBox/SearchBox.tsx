import React, { useState, useCallback, SyntheticEvent } from 'react'
import './SearchBox.scss'
import SearchResults from 'components/SearchResults/SearchResults'

import useAxios from './useAxios'

type TProps = {
  onAddShow: (id: string, title: string, imageSrc: any) => void
}

const useToggle = (initialState = false): [boolean, any] => {
  // Initialize the state
  const [state, setState] = useState<boolean>(initialState)

  // Define and memorize toggler function in case we pass down the comopnent,
  // This function change the boolean value to it's opposite value
  const toggle = useCallback((): void => setState(state => !state), [])

  return [state, toggle]
}

export default function SearchBox({ onAddShow }: TProps) {
  const [data, fetch, loading] = useAxios()

  const handleMouseDown = (event: SyntheticEvent) => {
    event.preventDefault()
  }

  const [isFocused, setIsFocused] = useToggle(false)

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
                year={item.show.premiered == null ? '' : item.show.premiered}
                onAddShow={onAddShow}
              />
            </li>
          ))}
        </ul>
      ) : null}
    </>
  )
}
