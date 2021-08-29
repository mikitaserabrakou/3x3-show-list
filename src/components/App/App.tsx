import { useState } from 'react'
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

  const onAddShow = (id: number, title: string, imageSrc: any) => {
    const checkShow = (element: TCard) => element.id == id
    if (shows.findIndex(checkShow) == -1) {
      const findElement = (element: TCard) => element.state === false
      const index = shows.findIndex(findElement)
      if (index !== -1) {
        const newShows = [
          ...shows.slice(0, index),
          {
            id: id,
            title: title,
            imageSrc: imageSrc,
            rating: 0,
            state: true,
            className: 'card--filled'
          },
          ...shows.slice(index, -1)
        ]
        setShows(newShows)
      }
    } else {
      alert('This show is already added.')
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

  const cards_item = shows.map((card, index) => (
    <Card {...card} key={card.id || index} onRemoveShow={onRemoveShow} />
  ))

  return (
    <div className="container">
      <SearchBox onAddShow={onAddShow} />
      <div className="item_grid">{cards_item}</div>
    </div>
  )
}

export default App
