import { configureStore } from '@reduxjs/toolkit'
import moviezReducer from './MoviezSlice'

export const store = configureStore({
  reducer: {
    moviezData:moviezReducer
  },
})