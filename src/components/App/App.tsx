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
  return { ...item, id: newID, listIndex: newID }
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
      quality: 0.95,
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

  // TODO make a common method for search through objects of array
  const onAddShow = (id: string, title: string, imageSrc: any) => {
    const index = shows.findIndex((element: TCard) => element.state === false)
    if (index === -1) {
      alert('You have already filled all available slots')
    } else if (shows.findIndex((element: TCard) => element.id === id) !== -1) {
      alert('This show is already added.')
    } else if (index !== -1) {
      const newShows: any = shows.map((show, showIndex) => {
        if (showIndex === index)
          return {
            ...show,
            id,
            title,
            imageSrc:
              imageSrc || `https://placehold.co/252/292d3e/ffffff?text=${title}&font=roboto`,
            state: true,
            className: 'card--filled'
          }
        return show
      })
      setShows(newShows)
    }
  }

  const onRemoveShow = (id: string) => {
    const newShows = shows.map((show, index) => {
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

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (active.id !== over.id) {
      const oldIndex = shows.findIndex((element: TCard) => element.id === active.id)
      const newIndex = shows.findIndex((element: TCard) => element.id === over.id)
      console.log(oldIndex, newIndex, active.id, over.id)
      if (oldIndex !== -1 && newIndex !== -1) {
        const newShows = arrayMove(shows, oldIndex, newIndex)
        setShows(newShows)
      }
    }
  }

  const handleOpenModal = async () => {
    await createImage()
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const cardsItem = shows.map(card => (
    <Card {...card} id={card.id} key={card.id} onRemoveShow={onRemoveShow} />
  ))

  return (
    <div>
      {showModal ? <Modal image={image} onClose={handleCloseModal} /> : null}
      <SearchBox onAddShow={onAddShow} />
      <DndContext
        sensors={sensor}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToParentElement]}
      >
        <SortableContext items={shows} strategy={rectSortingStrategy}>
          <div className="container">
            <div className="grid" ref={ref}>
              {cardsItem}
            </div>
            <div className="settings">
              <div>
                <h3>Save as image</h3>
                <Button type="save" handleClick={handleOpenModal}>
                  Save
                </Button>
              </div>
            </div>
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}

export default App
