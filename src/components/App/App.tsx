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
import Header from 'components/Header'
import { IShow, ICard } from 'types/Show'
import logo from 'assets/images/GitHub-Mark-32px.png'

// initial list of show
const initialArr = Array(9)
  .fill({
    id: null,
    state: false,
    show: { showId: null, title: null, imageSrc: null, premiered: null, summary: null }
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
      backgroundColor: window.localStorage.getItem('theme') === 'dark-theme' ? '#292d3e' : '#fff',
      pixelRatio: 1
    })
      .then(dataUrl => {
        setImage(dataUrl)
      })
      .catch(err => {
        console.log(err)
      })
  }, [ref])

  const onAddShow = (show: IShow) => {
    // check if there any available slots
    const index = shows.findIndex((element: ICard) => element.state === false)
    if (index === -1) {
      alert('You have already filled all available slots')
      // check if show with this showId already added
    } else if (shows.findIndex((element: ICard) => element.show.id === show.id) !== -1) {
      alert('This show is already added.')
    } else {
      // replace available slot with show
      const newShows = shows.map((item, itemIndex) => {
        if (itemIndex === index)
          return {
            ...item,
            state: true,
            show
          }
        return item
      })
      setShows(newShows)
    }
  }

  const onRemoveShow = (id: string) => {
    const newShows = shows.map(item => {
      if (item.id === id)
        return {
          ...item,
          state: false,
          show: { id: null, title: null, imageSrc: null, premiered: null, summary: null }
        }
      return item
    })
    setShows(newShows)
  }

  const handleReset = () => {
    const newShows = shows.map(item => {
      return {
        ...item,
        state: false,
        show: { id: null, title: null, imageSrc: null, premiered: null, summary: null }
      }
    })
    setShows(newShows)
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (active.id !== over.id) {
      const oldIndex = shows.findIndex((element: ICard) => element.id === active.id)
      const newIndex = shows.findIndex((element: ICard) => element.id === over.id)
      const newShows = arrayMove(shows, oldIndex, newIndex)
      setShows(newShows)
    }
  }

  const handleOpenModal = async () => {
    await createImage()
    setShowModal(true)
  }

  return (
    <div className="container">
      <Header />
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
      <div className="footer">
        <div className="github">
          <img src={logo} alt="" />
          <a href="https://github.com/mikitaserabrakou/3x3-show-list">Github</a>
        </div>

        <a href="https://www.tvmaze.com/api">Data by TVMAZE API</a>
      </div>
    </div>
  )
}

export default App
