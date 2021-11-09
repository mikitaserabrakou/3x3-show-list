import React, { useState, useRef, useCallback } from 'react'
import './App.scss'

// Drag-and-Drop
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor
} from '@dnd-kit/core'
import { rectSortingStrategy, SortableContext, arrayMove } from '@dnd-kit/sortable'
import { restrictToParentElement } from '@dnd-kit/modifiers'

import { toPng } from 'html-to-image'

import Card from '../Card/Card'
import SearchBox from '../SearchBox/SearchBox'

type TProps = {
  title: string
  imageSrc: any
  year: string
  onAddShow: (id: string, title: string, imageSrc: string) => void
  onRemoveShow: () => void
}

type TCard = {
  id: string
  title: string
  imageSrc: any
  rating?: number
  state: boolean
  className: string
  index: number
}

const arr = Array(9).fill({
  id: null,
  listIndex: null,
  title: '',
  imageSrc: '',
  rating: 0,
  state: false,
  className: 'card'
})
const indexedArr = arr.map((item, index) => {
  const newID = index.toString()
  return { ...item, id: newID, listIndex: newID }
})

function App(): JSX.Element {
  const [shows, setShows] = useState(indexedArr)
  const ref = useRef<HTMLDivElement>(null)

  const sensor = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor))

  const createImage = useCallback(() => {
    if (ref.current === null) {
      return
    }
    toPng(ref.current, {
      cacheBust: true,
      backgroundColor: '#292d3e',
      width: 600
    })
      .then(dataUrl => {
        const link = document.createElement('a')
        link.download = '3x3-show-list.png'
        link.href = dataUrl
        link.click()
      })
      .catch(err => {
        console.log(err)
      })
  }, [ref])

  // TODO make a common method for search through objects of array
  const onAddShow = (id: string, title: string, imageSrc: any) => {
    console.log(id)
    const findElement = (element: TCard) => element.state === false
    const checkShow = (element: TCard) => element.id === id
    if (shows.findIndex(findElement) === -1) {
      alert('You have already filled all available slots')
    } else if (shows.findIndex(checkShow) !== -1) {
      alert('This show is already added.')
    } else {
      const index = shows.findIndex(findElement)
      console.log(index)
      if (index !== -1) {
        const newShows: any = shows.map((show, showIndex) => {
          if (showIndex === index)
            return { ...show, id, title, imageSrc, state: true, className: 'card--filled' }
          return show
        })
        setShows(newShows)
      }
    }
  }

  const onRemoveShow = (id: string) => {
    const newShows = shows.map((show, index) => {
      if (show.id === id)
        return {
          ...show,
          id: show.listIndex,
          title: '',
          imageSrc: '',
          rating: 0,
          state: false,
          className: 'card'
        }
      return show
    })
    setShows(newShows)
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (active.id !== over.id) {
      const checkActiveId = (element: TCard) => element.id === active.id
      const checkOverId = (element: TCard) => element.id === over.id
      const oldIndex = shows.findIndex(checkActiveId)
      const newIndex = shows.findIndex(checkOverId)
      console.log(oldIndex, newIndex, active.id, over.id)
      if (oldIndex !== -1 && newIndex !== -1) {
        const newShows = arrayMove(shows, oldIndex, newIndex)
        setShows(newShows)
      }
    }
  }

  const cardsItem = shows.map(card => (
    <Card {...card} id={card.id} key={card.id} onRemoveShow={onRemoveShow} />
  ))

  return (
    <div className="container">
      <SearchBox onAddShow={onAddShow} />
      <DndContext
        sensors={sensor}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToParentElement]}
      >
        <SortableContext items={shows} strategy={rectSortingStrategy}>
          <div className="item_grid" ref={ref}>
            {cardsItem}
          </div>
        </SortableContext>
      </DndContext>
      <button type="button" onClick={createImage}>
        Click
      </button>
    </div>
  )
}

export default App
