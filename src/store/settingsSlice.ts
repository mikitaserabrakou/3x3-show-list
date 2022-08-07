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
  }
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    changeState: (state, action: PayloadAction<SettingsState>) => {
      state.border = action.payload.border
      state.shadow = action.payload.shadow
    },
    resetSettings: () => initialState
  }
})

export const { changeState, resetSettings } = settingsSlice.actions

export default settingsSlice.reducer
