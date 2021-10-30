import React, { useState } from 'react'
import './App.scss'

import {
  DndContext,
  useDroppable,
  closestCenter,
  MouseSensor,
  useSensor,
  useSensors,
  TouchSensor
} from '@dnd-kit/core'
import { rectSortingStrategy, SortableContext, arrayMove } from '@dnd-kit/sortable'

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

  // dnd
  // const { setNodeRef } = useDroppable({ id: 'droppableGrid' })
  const [activeId, setActiveId] = useState(null)
  const sensor = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))

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

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (active.id !== over.id) {
      setShows(() => {
        const oldIndex = shows.indexOf(active.id)
        const newIndex = shows.indexOf(over.id)

        return arrayMove(shows, oldIndex, newIndex)
      })
      setActiveId(null)
    }
  }

  const handleDragCancel = () => {
    setActiveId(null)
  }

  const cardsItem = shows.map((card, index) => (
    <Card {...card} id={card.id || index} key={card.id || index} onRemoveShow={onRemoveShow} />
  ))

  return (
    <div className="container">
      <SearchBox onAddShow={onAddShow} />
      <DndContext
        sensors={sensor}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={shows} strategy={rectSortingStrategy}>
          <div className="item_grid">{cardsItem}</div>
        </SortableContext>
      </DndContext>
    </div>
  )
}

export default App
