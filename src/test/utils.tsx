import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { MovieProvider } from '../context/MovieContext'
import moviesSlice from '../data/moviesSlice'
import starredSlice from '../data/starredSlice'
import watchLaterSlice from '../data/watchLaterSlice'
import { RenderOptions } from '@testing-library/react'

export interface MovieType {
    id: string;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    isStarred?: boolean;
    watchLater?: boolean;
}

export interface RootState {
    movies: {
        movies: {
            results: MovieType[];
        };
        fetchStatus: string;
    };
    starred: {
        starredMovies: MovieType[];
    };
    watchLater: {
        watchLaterMovies: MovieType[];
    };
}

const rootReducer = combineReducers({
    movies: moviesSlice.reducer,
    starred: starredSlice.reducer,
    watchLater: watchLaterSlice.reducer
});

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: Partial<RootState>;
    store?: ReturnType<typeof configureStore>;
}

export function renderWithProviders(
    ui: React.ReactElement,
    {
        preloadedState,
        store = configureStore({
            reducer: rootReducer,
            preloadedState: preloadedState as any
        }),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    setupListeners(store.dispatch)

    function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <MovieProvider>{children}</MovieProvider>
                </BrowserRouter>
            </Provider>
        );
    }

    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
} 