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

import { toJpeg } from 'html-to-image'

import Card from '../Card/Card'
import SearchBox from '../SearchBox/SearchBox'
import Button from '../buttons/Button/Button'
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
  state: boolean
  className: string
  index: number
}

// initial list of show
const arr = Array(9).fill({
  id: null,
  listIndex: null,
  title: '',
  imageSrc: null,
  state: false,
  className: 'card'
})
const indexedArr = arr.map((item, index) => {
  const newID = index.toString()
  return {
    ...item,
    id: newID,
    listIndex: newID
  }
})

function App(): JSX.Element {
  const [shows, setShows] = useState(indexedArr)
  const [showModal, setShowModal] = useState(false)
  const [image, setImage] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  const sensor = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5
      }
    }),
    useSensor(KeyboardSensor)
  )

  const createImage = useCallback(async () => {
    if (ref.current === null) {
      return
    }
    await toJpeg(ref.current, {
      cacheBust: true,
      quality: 0.7,
      backgroundColor: '#292d3e',
      width: 600
    })
      .then(dataUrl => {
        setImage(dataUrl)
      })
      .catch(err => {
        console.log(err)
      })
  }, [ref])

  const onAddShow = (id: string, title: string, imageSrc: any) => {
    // check if there any available slots
    const index = shows.findIndex((element: TCard) => element.state === false)
    if (index === -1) {
      alert('You have already filled all available slots')
      // check if show with this id already added
    } else if (shows.findIndex((element: TCard) => element.id === id) !== -1) {
      alert('This show is already added.')
    } else {
      // replace available slot with show
      const newShows: any = shows.map((show, showIndex) => {
        if (showIndex === index)
          return {
            ...show,
            id,
            title,
            imageSrc,
            state: true,
            className: 'card card--filled'
          }
        return show
      })
      setShows(newShows)
    }
  }

  const onRemoveShow = (id: string) => {
    const newShows = shows.map(show => {
      if (show.id === id)
        return {
          ...show,
          id: show.listIndex,
          title: '',
          imageSrc: null,
          state: false,
          className: 'card'
        }
      return show
    })
    setShows(newShows)
  }

  const handleReset = () => {
    const newShows = shows.map(show => {
      return {
        ...show,
        id: show.listIndex,
        title: '',
        imageSrc: null,
        state: false,
        className: 'card'
      }
    })
    setShows(newShows)
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (active.id !== over.id) {
      const oldIndex = shows.findIndex((element: TCard) => element.id === active.id)
      const newIndex = shows.findIndex((element: TCard) => element.id === over.id)
      const newShows = arrayMove(shows, oldIndex, newIndex)
      setShows(newShows)
    }
  }

  const handleOpenModal = async () => {
    await createImage()
    setShowModal(true)
  }
  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <div className="container">
      {showModal ? <Modal image={image} onClose={() => setShowModal(false)} /> : null}
      <div className="search_box">
        <SearchBox onAddShow={onAddShow} />
      </div>
      <div className="main" ref={ref}>
        <DndContext
          sensors={sensor}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToParentElement]}
        >
          <SortableContext items={shows} strategy={rectSortingStrategy}>
            <div className="grid">
              {shows.map(card => (
                <Card {...card} id={card.id} key={card.listIndex} onRemoveShow={onRemoveShow} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
      <div className="settings">
        <Button type="save" handleClick={handleReset}>
          Reset
        </Button>
        <Button type="save" handleClick={handleOpenModal}>
          Save
        </Button>
      </div>
    </div>
  )
}

export default App
