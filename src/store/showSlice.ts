import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IShow, ICard } from 'types/Show'

import { arrayMove } from '@dnd-kit/sortable'

export interface ShowsState {
  shows: ICard[]
}

const initialState: ShowsState = {
  shows: Array(9)
    .fill({
      id: null,
      state: false,
      show: { id: '', title: '', imageSrc: '', premiered: '', summary: '' }
    })
    .map((item, index) => {
      return {
        ...item,
        id: index.toString()
      }
    })
}

export const showsSlice = createSlice({
  name: 'shows',
  initialState,
  reducers: {
    addShow: (state, action: PayloadAction<IShow>) => {
      const index = state.shows.findIndex((element: ICard) => element.state === false)
      if (index === -1) {
        return state
      }
      if (state.shows.findIndex((element: ICard) => element.show.id === action.payload.id) !== -1) {
        return state
      }
      state.shows[index].state = true
      state.shows[index].show = action.payload
    },
    reset: () => initialState,
    removeShow: (state, action: PayloadAction<string>) => {
      const index = state.shows.findIndex((element: ICard) => element.id === action.payload)
      state.shows[index].state = false
      state.shows[index].show = {
        id: '',
        title: '',
        imageSrc: '',
        premiered: '',
        summary: ''
      }
    },
    swapShows: (state, action: PayloadAction<{ from: string; to: string }>) => {
      const from = state.shows.findIndex((element: ICard) => element.id === action.payload.from)
      const to = state.shows.findIndex((element: ICard) => element.id === action.payload.to)
      state.shows = arrayMove(state.shows, from, to)
    }
  }
})

export const { addShow, removeShow, reset, swapShows } = showsSlice.actions

export default showsSlice.reducer
