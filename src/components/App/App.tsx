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

import Card from 'components/Card'
import SearchBox from 'components/SearchBox'
import Button from 'components/Button/'
import Modal from 'components/Modal'
import { builtinModules } from 'module'

type TProps = {
  title: string
  imageSrc: any
  year: string
  onAddShow: (showId: string, title: string, imageSrc: string) => void
  onRemoveShow: (showId: string) => null
}

type TCard = {
  id: string
  showId: string
  title: string
  imageSrc: any
  state: boolean
  index: number
}

// initial list of show
const initialArr = Array(9)
  .fill({
    id: null,
    showId: null,
    title: '',
    imageSrc: null,
    state: false
  })
  .map((item, index) => {
    return {
      ...item,
      id: index.toString()
    }
  })

function App(): JSX.Element {
  const [shows, setShows] = useState(initialArr)
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
      quality: 0.8,
      backgroundColor: '#292d3e',
      pixelRatio: 1
    })
      .then(dataUrl => {
        setImage(dataUrl)
      })
      .catch(err => {
        console.log(err)
      })
  }, [ref])

  const onAddShow = (showId: string, title: string, imageSrc: any) => {
    // check if there any available slots
    const index = shows.findIndex((element: TCard) => element.state === false)
    if (index === -1) {
      alert('You have already filled all available slots')
      // check if show with this showId already added
    } else if (shows.findIndex((element: TCard) => element.showId === showId) !== -1) {
      alert('This show is already added.')
    } else {
      // replace available slot with show
      const newShows: any = shows.map((show, showIndex) => {
        if (showIndex === index)
          return {
            ...show,
            showId,
            title,
            imageSrc,
            state: true
          }
        return show
      })
      setShows(newShows)
    }
  }

  const onRemoveShow = (showId: string) => {
    const newShows = shows.map(show => {
      if (show.showId === showId)
        return {
          ...show,
          showId: null,
          title: '',
          imageSrc: null,
          state: false
        }
      return show
    })
    setShows(newShows)
  }

  const handleReset = () => {
    const newShows = shows.map(show => {
      return {
        ...show,
        showId: null,
        title: '',
        imageSrc: null,
        state: false
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
      <div className="main">
        <DndContext
          sensors={sensor}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToParentElement]}
        >
          <SortableContext items={shows} strategy={rectSortingStrategy}>
            <div className="grid" ref={ref}>
              {shows.map(card => (
                <Card {...card} key={card.id} onRemoveShow={onRemoveShow} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
      <div className="settings">
        <Button className="btn--cancel" onClick={handleReset}>
          Reset
        </Button>
        <Button onClick={handleOpenModal}>Save</Button>
      </div>
    </div>
  )
}

export default App
