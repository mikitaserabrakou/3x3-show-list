import React, { useState, useRef, useCallback } from 'react'
import './App.scss'

import {
  DndContext,
  useDroppable,
  closestCenter,
  MouseSensor,
  useSensor,
  useSensors,
  TouchSensor,
  PointerSensor,
  KeyboardSensor
} from '@dnd-kit/core'
import { rectSortingStrategy, SortableContext, arrayMove } from '@dnd-kit/sortable'
import { restrictToParentElement } from '@dnd-kit/modifiers'
import { toPng } from 'html-to-image'

import Card from '../Card/Card'
import SearchBox from '../SearchBox/SearchBox'
import Modal from '../Modal/Modal'

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
function App(): JSX.Element {
  const arr = Array(9).fill({
    id: null,
    listIndex: null,
    title: '',
    imageSrc: '',
    rating: 0,
    state: false,
    className: 'card'
  })
  const newArr = arr.map((item, index) => {
    const newID = index.toString()
    return { ...item, id: newID, listIndex: newID }
  })
  const [shows, setShows] = useState(newArr)
  const [showModal, setShowModal] = useState(false)
  const [image, setImage] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  const handleCreateImage = useCallback(
    async (bgColor?: string) => {
      if (ref.current === null) {
        return
      }
      const tempImage = await toPng(ref.current, {
        cacheBust: true,
        backgroundColor: bgColor || '#292d3e',
        width: 600
      })
      setImage(tempImage)
    },
    [ref]
  )

  const handleOpenModal = () => {
    handleCreateImage()
    setShowModal(true)
  }

  // dnd
  const sensor = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor))

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

  const onModalClose = () => {
    setShowModal(false)
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

  const cardsItem = shows.map((card, index) => (
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
      <button type="button" onClick={handleOpenModal}>
        Click
      </button>
      <Modal
        show={showModal}
        onClose={onModalClose}
        image={image}
        onCreateImage={handleCreateImage}
      />
    </div>
  )
}

export default App
