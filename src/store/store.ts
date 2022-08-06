import { configureStore } from '@reduxjs/toolkit'
import showSlice from './showSlice'
// eslint-disable-next-line import/no-named-as-default
import settingsSlice from './settingsSlice'

export const store = configureStore({
  reducer: {
    shows: showSlice,
    settings: settingsSlice
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
