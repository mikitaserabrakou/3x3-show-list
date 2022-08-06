import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface SettingsState {
  border: {
    enabled: boolean
    borderRadius: string
  }
  shadow?: {
    enabled: boolean
    shadowColor: string
    shadowOffsetX: number
    shadowOffsetY: number
    shadowBlur: number
  }
}

const initialState: SettingsState = {
  border: {
    enabled: false,
    borderRadius: '0'
  },
  shadow: {
    enabled: true,
    shadowColor: '#00000078',
    shadowOffsetX: 0,
    shadowOffsetY: 0.43,
    shadowBlur: 0.625
  }
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    changeState: (state, action: PayloadAction<SettingsState>) => {
      state.border = action.payload.border
    },
    reset: () => initialState
  }
})

export const { changeState, reset } = settingsSlice.actions

export default settingsSlice.reducer
