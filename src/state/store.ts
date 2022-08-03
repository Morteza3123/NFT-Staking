import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import counterReducer from "./counterSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
})