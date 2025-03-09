import { configureStore } from '@reduxjs/toolkit'
import watermarkReducer from './watermarkSlice'

export const store = configureStore({
  reducer: {
    watermark: watermarkReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
