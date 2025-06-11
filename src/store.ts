import { configureStore } from '@reduxjs/toolkit'
import moviesSlice from './data/moviesSlice'
import starredSlice from './data/starredSlice'
import watchLaterSlice from './data/watchLaterSlice'

export const store = configureStore({
    reducer: {
        movies: moviesSlice.reducer,
        starred: starredSlice.reducer,
        watchLater: watchLaterSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 