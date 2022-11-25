import React, { SyntheticEvent, useState } from 'react'

import useAxios from 'utils/useAxios'
import useToggle from 'utils/useToggle'
import SearchResults from 'components/SearchResults'
import styles from './SearchBox.module.scss'

export function SearchBox() {
  const [data, fetch] = useAxios()
  const [isFocused, setIsFocused] = useToggle(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    fetch(`https://api.tvmaze.com/search/shows?q=${event.currentTarget.value}`)
  }

  const showData = () => {
    return data != '' && isFocused
  }

  return (
    <form className={styles.search}>
      <div className={styles.search_box}>
        <input
          type="search"
          className={styles.search_bar}
          onChange={handleChange}
          onFocus={setIsFocused}
          onBlur={setIsFocused}
          placeholder="Enter tv-show name"
        />
        <button type="reset">X</button>
      </div>
      <SearchResults data={data} setIsFocused={setIsFocused} visible={showData()} />
    </form>
  )
}
