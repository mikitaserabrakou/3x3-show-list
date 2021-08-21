import { useState } from 'react'
import './App.scss'
import Card from './card'
import SearchBox from './search_box'

// const cards = [
//   {
//     title: 'Breaking Bad',
//     imageSrc: 'https://static.tvmaze.com/uploads/images/medium_portrait/0/2400.jpg',
//     rating: 2,
//     state: true,
//     className: 'card--filled'
//   },
//   {
//     title: 'Game of Thrones',
//     imageSrc: 'https://static.tvmaze.com/uploads/images/medium_portrait/190/476117.jpg',
//     rating: 4,
//     state: true,
//     className: 'card--filled'
//   },
//   {
//     title: 'Horimiya',
//     imageSrc: 'https://static.tvmaze.com/uploads/images/medium_portrait/284/710358.jpg',
//     rating: 5,
//     state: true,
//     className: 'card--filled'
//   },
//   {
//     title: 'Modao Zushi',
//     imageSrc: 'https://static.tvmaze.com/uploads/images/medium_portrait/255/638453.jpg',
//     rating: 6,
//     state: true,
//     className: 'card--filled'
//   },
//   {
//     title: 'The Promised Neverland',
//     imageSrc: 'https://static.tvmaze.com/uploads/images/medium_portrait/177/444843.jpg',
//     rating: 7,
//     state: true,
//     className: 'card--filled'
//   },
//   {
//     title: 'Shameless (US)',
//     imageSrc: 'https://static.tvmaze.com/uploads/images/medium_portrait/284/712350.jpg',
//     rating: 8,
//     state: true,
//     className: 'card--filled'
//   },
//   {
//     title: 'That Time I Got Reincarnated as a Slime',
//     imageSrc: 'https://static.tvmaze.com/uploads/images/medium_portrait/165/413607.jpg',
//     rating: 9,
//     state: true,
//     className: 'card--filled'
//   },
//   {
//     title: 'Re: Zero kara hajimeru isekai seikatsu',
//     imageSrc: 'https://static.tvmaze.com/uploads/images/medium_portrait/49/122624.jpg',
//     rating: 0,
//     state: true,
//     className: 'card--filled'
//   },
//   {
//     title: '',
//     imageSrc: '',
//     rating: 0,
//     state: false,
//     className: 'card'
//   }
// ]

type TProps = {
  title: string
  imageSrc: any
  year: string
  onAddShow: (title: string, imageSrc: string) => void
}

type TCard = {
  title: string
  imageSrc: any
  rating?: number
  state: boolean
  classname: string
}

type TCards = {
  card: TCard[]
}

function App() {
  const [shows, setShows] = useState([
    ...Array(9).fill({
      title: '',
      imageSrc: '',
      rating: 0,
      state: false,
      className: 'card'
    })
  ])

  const onAddShow = (title: string, imageSrc: any) => {
    const findElement = (element: TCard) => element.state === false
    const index = shows.findIndex(findElement)
    if (index !== -1) {
      const newShows = [
        ...shows.slice(0, index),
        {
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
  }

  const cards_item = shows.map((card, index) => <Card {...card} key={index} />)

  return (
    <div className="container">
      <SearchBox onAddShow={onAddShow} />
      <div className="item_grid">{cards_item}</div>
    </div>
  )
}

export default App
