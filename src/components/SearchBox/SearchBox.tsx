import React, { SyntheticEvent } from 'react'

import useAxios from 'utils/useAxios'
import useToggle from 'utils/useToggle'
import SearchResults from 'components/SearchResults'
import { IShow } from 'types/Show'
import styles from './SearchBox.module.scss'

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
    <div className={styles.search_box}>
      <input
        type="text"
        className={styles.search_bar}
        onChange={handleChange}
        onFocus={setIsFocused}
        onBlur={setIsFocused}
        placeholder="Enter tv-show name"
      />
      {data && isFocused ? (
        <SearchResults data={data} onAddShow={onAddShow} setIsFocused={setIsFocused} />
      ) : null}
    </div>
  )
}
