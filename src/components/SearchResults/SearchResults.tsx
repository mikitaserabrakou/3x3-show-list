import React, { SyntheticEvent } from 'react'

import { useDispatch } from 'react-redux'

import Button from 'components/Button'
import { IShow } from 'types/Show'
import styles from './SearchResults.module.scss'
import { addShow } from '../../store/showSlice'

type SearchResultsProps = {
  data: IShow[]
  setIsFocused: () => void
  visible: boolean
}

const handleMouseDown = (event: SyntheticEvent) => {
  // event.stopPropagation()
  event.preventDefault()
}

export function SearchResults({ data, setIsFocused, visible }: SearchResultsProps): JSX.Element {
  const dispatch = useDispatch()

  const [bg, text] =
    window.localStorage.getItem('theme') === 'dark-theme'
      ? ['292d3e', 'ffffff']
      : ['ffffff', '292d3e']
  return (
    <ul
      className={styles.results}
      onFocus={setIsFocused}
      onBlur={setIsFocused}
      data-visible={visible}
    >
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
          <div className={styles.info}>
            <p className={styles.title}>{item.show.name}</p>
            <p className={styles.premiered}>
              {item.show.premiered ? item.show.premiered.split('-')[0] : ''}
            </p>
          </div>
          <Button
            onClick={() =>
              dispatch(
                addShow({
                  id: item.show.id,
                  title: item.show.name,
                  imageSrc: item.show.image == null ? '' : item.show.image.medium,
                  premiered: item.show.premiered ? item.show.premiered.split('-')[0] : ''
                })
              )
            }
          >
            Add
          </Button>
        </li>
      ))}
    </ul>
  )
}
