import React, { useState, useRef, useCallback } from 'react'

import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor
} from '@dnd-kit/core'
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import { restrictToParentElement } from '@dnd-kit/modifiers'
import { toJpeg } from 'html-to-image'
import { useSelector, useDispatch } from 'react-redux'

import Card from 'components/Card'
import SearchBox from 'components/SearchBox'
import Header from 'components/Header'
import type { RootState } from 'store/store'
import { reset, swapShows } from 'store/showSlice'
import logo from 'assets/images/GitHub-Mark-32px.png'
import Settings from 'components/Settings'
import styles from './App.module.scss'

function App(): JSX.Element {
  const shows = useSelector((state: RootState) => state.shows.shows)
  const dispatch = useDispatch()
  const ref = useRef<HTMLDivElement>(null)
  const sensor = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5
      }
    }),
    useSensor(KeyboardSensor)
  )

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (active.id !== over.id) {
      dispatch(swapShows({ from: active.id, to: over.id }))
    }
  }

  const handleClickSave = useCallback(() => {
    if (ref.current === null) {
      return
    }
    toJpeg(ref.current, {
      cacheBust: true,
      quality: 0.8,
      backgroundColor: window.localStorage.getItem('theme') === 'dark-theme' ? '#292d3e' : '#fff',
      pixelRatio: 1
    }).then(dataUrl => {
      const link = document.createElement('a')
      link.download = '3x3-show-list.png'
      link.href = dataUrl
      link.click()
    })
  }, [ref])

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.layout}>
          <Header />
          <SearchBox />
          <DndContext
            sensors={sensor}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToParentElement]}
          >
            <SortableContext items={shows} strategy={rectSortingStrategy}>
              <div className={styles.grid} ref={ref}>
                {shows.map(card => (
                  <Card {...card} key={card.id} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
          <div className={styles.footer}>
            <div className={styles.github}>
              <img src={logo} alt="" />
              <a href="https://github.com/mikitaserabrakou/3x3-show-list">Github</a>
            </div>
            <a href="https://www.tvmaze.com/api">Data by TVMAZE API</a>
          </div>
        </div>
        <Settings
          onSaveClick={() => {
            handleClickSave()
          }}
          onResetClick={() => {
            dispatch(reset())
          }}
        />
      </div>
    </div>
  )
}

export default App
