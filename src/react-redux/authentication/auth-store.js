import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth-slice'
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session'

// Browser Persistence Configuration
const persistConfig = {
  key: 'root',
  version: 1,
  storage: storageSession,
}

const persistedReducer = persistReducer(persistConfig, authSlice);

// Add authentication slice to React-Redux store
export default configureStore({
  reducer: {
    auth: persistedReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
  }),
})