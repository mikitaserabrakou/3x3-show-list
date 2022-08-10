import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface SettingsState {
  border: {
    enabled: boolean
    borderRadius: string
  }
  shadow: {
    enabled: boolean
    color?: string
    offsetX: string
    offsetY: string
    blur: string
  }
  menuOpen?: boolean
}

const initialState: SettingsState = {
  border: {
    enabled: false,
    borderRadius: '1'
  },
  shadow: {
    enabled: true,
    color: 'rgba(0, 0, 0, 0.5)',
    offsetX: '0',
    offsetY: '0.43',
    blur: '0.625'
  },
  menuOpen: false
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    changeState: (state, action: PayloadAction<SettingsState>) => {
      state.border = action.payload.border
      state.shadow = action.payload.shadow
    },
    resetSettings: state => {
      state.border = initialState.border
      state.shadow = initialState.shadow
    },
    toggleMenu: state => {
      state.menuOpen = !state.menuOpen
    }
  }
})

export const { changeState, resetSettings, toggleMenu } = settingsSlice.actions

export default settingsSlice.reducer
