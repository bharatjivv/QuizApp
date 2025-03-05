import { configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import createWebStorage from "redux-persist/lib/storage/createWebStorage"

const createNoopStorage = () => {
  return {
    getItem: (_key) => Promise.resolve(null),
    setItem: (_key, value) => Promise.resolve(value),
    removeItem: (_key) => Promise.resolve(),
  }
}

// Check if window is available (browser) or not (server)
const storage = typeof window !== "undefined" 
  ? createWebStorage("local")
  : createNoopStorage()
import { combineReducers } from "redux"
import authReducer from "./slices/authSlice"
import quizReducer from "./slices/quizSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  quiz: quizReducer,
})

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "quiz"], // only persist these reducers
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

