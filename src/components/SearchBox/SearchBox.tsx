import React, { useState, useCallback, SyntheticEvent } from 'react'
import './SearchBox.scss'
import axios from 'axios'
import SearchResults from '../SearchResults/SearchResults'

type TProps = {
  onAddShow: (id: string, title: string, imageSrc: any) => void
}

const useToggle = (initialState = false): [boolean, any] => {
  // Initialize the state
  const [state, setState] = useState<boolean>(initialState)

  // Define and memorize toggler function in case we pass down the comopnent,
  // This function change the boolean value to it's opposite value
  // eslint-disable-next-line
  const toggle = useCallback((): void => setState(state => !state), [])

  return [state, toggle]
}

export default function SearchBox({ onAddShow }: TProps) {
  const [results, setResulst] = useState([])
  const [isLoaded, setIsLoadead] = useState(false)
  // const [error, setError] = useState(null)

  const handleMouseDown = (event: SyntheticEvent) => {
    event.preventDefault()
  }

  const [isFocused, setIsFocused] = useToggle(false)

  const fetchData = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setIsLoadead(false)
    axios
      .get(`http://api.tvmaze.com/search/shows?q=${e.currentTarget.value}`)
      .then(res => {
        if (res.data.length > 0) {
          setResulst(res.data)
          console.log(res.data)
          setIsLoadead(true)
        } else setIsLoadead(false)
      })
      .catch(err => {
        setIsLoadead(false)
        console.log(err)
      })
  }
  return (
    <div className="search_box">
      <input
        type="text"
        className="search_bar"
        onChange={fetchData}
        onFocus={setIsFocused}
        onBlur={setIsFocused}
        placeholder="Movie/show/anime name, e.g. Attack on Titan"
      />
      {isLoaded && isFocused ? (
        <ul className="results" onFocus={setIsFocused} onBlur={setIsFocused}>
          {results.map((item: any, index) => (
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
    </div>
  )
}
