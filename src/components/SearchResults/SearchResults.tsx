import React, { SyntheticEvent } from 'react'

import Button from 'components/Button'
import { IShow } from 'types/Show'
import styles from './SearchResults.module.scss'

type SearchResultsProps = {
  data: IShow[]
  setIsFocused: () => void
  onAddShow: (show: IShow) => void
}

const handleMouseDown = (event: SyntheticEvent) => {
  event.preventDefault()
}

export function SearchResults({ data, onAddShow, setIsFocused }: SearchResultsProps): JSX.Element {
  // const handleClick = () => {
  //   onAddShow({ id, title, imageSrc, premiered, summary })
  // }
  const [bg, text] =
    window.localStorage.getItem('theme') === 'dark-theme'
      ? ['292d3e', 'ffffff']
      : ['ffffff', '292d3e']
  return (
    <ul className={styles.results} onFocus={setIsFocused} onBlur={setIsFocused}>
      {data.map((item: any) => (
        <li key={item.show.id} onMouseDown={handleMouseDown}>
          <img
            src={
              (item.show.image == null ? '' : item.show.image.medium) ||
              `https://via.placeholder.com/252/${bg}/${text}/?text=${item.show.name}`
            }
            alt=""
            height={72}
            width={51}
          />
          <div className={styles.results__info}>
            <p className={styles.results__title}>{item.show.name}</p>
            <p className={styles.results__premiered}>
              {item.show.premiered ? item.show.premiered.split('-')[0] : ''}
            </p>
          </div>
          <div className={styles.results__buttons}>
            <Button
              onClick={() =>
                onAddShow({
                  id: item.show.id,
                  title: item.show.name,
                  imageSrc: item.show.image == null ? '' : item.show.image.medium,
                  premiered: item.show.premiered ? item.show.premiered.split('-')[0] : ''
                })
              }
            >
              Add
            </Button>
          </div>
          {/* <SearchResults
            id={item.show.id}
            title={}
            imageSrc={item.show.image == null ? '' : item.show.image.medium}
            premiered={ == null ? '' : item.show.premiered}
            setIsFocused={setIsFocused}
            onAddShow={onAddShow}
          /> */}
        </li>
      ))}
    </ul>
  )
}
