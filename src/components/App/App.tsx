import React, { useState } from 'react'
import './App.scss'
import Card from '../Card/Card'
import SearchBox from '../SearchBox/SearchBox'

type TProps = {
  title: string
  imageSrc: any
  year: string
  onAddShow: (id: number, title: string, imageSrc: string) => void
  onRemoveShow: () => void
}

type TCard = {
  id: number
  title: string
  imageSrc: any
  rating?: number
  state: boolean
  classname: string
}

function App(): JSX.Element {
  const [shows, setShows] = useState([
    ...Array(9).fill({
      id: null,
      title: '',
      imageSrc: '',
      rating: 0,
      state: false,
      className: 'card'
    })
  ])

  // TODO make a common method for search through objects of array
  const onAddShow = (id: number, title: string, imageSrc: any) => {
    const findElement = (element: TCard) => element.state === false
    const checkShow = (element: TCard) => element.id === id
    if (shows.findIndex(findElement) === -1) {
      alert('You have already filled all available slots')
    } else if (shows.findIndex(checkShow) !== -1) {
      alert('This show is already added.')
    } else {
      const index = shows.findIndex(findElement)
      if (index !== -1) {
        const newShows = [
          ...shows.slice(0, index),
          {
            id,
            title,
            imageSrc,
            rating: 0,
            state: true,
            className: 'card--filled'
          },
          ...shows.slice(index, -1)
        ]
        setShows(newShows)
      }
    }
  }

  const onRemoveShow = (id: number) => {
    const newShows = shows.filter(show => show.id !== id)
    setShows([
      ...newShows,
      {
        id: null,
        title: '',
        imageSrc: '',
        rating: 0,
        state: false,
        className: 'card'
      }
    ])
  }

  const cardsItem = shows.map((card, index) => (
    <Card {...card} key={card.id || index} onRemoveShow={onRemoveShow} />
  ))

  return (
    <div className="container">
      <SearchBox onAddShow={onAddShow} />
      <div className="item_grid">{cardsItem}</div>
    </div>
  )
}

export default App
