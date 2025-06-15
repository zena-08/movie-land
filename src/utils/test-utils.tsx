import React, { PropsWithChildren } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { MovieProvider } from '../context/MovieContext'
import moviesSlice from '../store/moviesSlice'
import starredSlice from '../store/starredSlice'
import watchLaterSlice from '../store/watchLaterSlice'
import { RootState } from 'store'

const rootReducer = combineReducers({
    movies: moviesSlice.reducer,
    starred: starredSlice.reducer,
    watchLater: watchLaterSlice.reducer
})

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: Partial<RootState>
    store?: ReturnType<typeof configureStore>
    route?: string
}

export function renderWithProviders(
    ui: React.ReactElement,
    {
        preloadedState,
        store = configureStore({
            reducer: rootReducer,
            preloadedState: preloadedState as any
        }),
        route = '/',
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    setupListeners(store.dispatch)

    // Set the initial route if provided
    if (route) {
        window.history.pushState({}, '', route)
    }

    function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <MovieProvider>{children}</MovieProvider>
                </BrowserRouter>
            </Provider>
        )
    }

    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
} 