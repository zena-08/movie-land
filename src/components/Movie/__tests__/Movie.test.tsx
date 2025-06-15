import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import Movie from '../Movie'
import starredSlice from 'store/starredSlice'
import watchLaterSlice from 'store/watchLaterSlice'
import { MovieType } from 'types'

// Mock the movie data
const mockMovie: MovieType = {
    id: 1,
    title: 'Test Movie',
    overview: 'This is a test movie overview',
    poster_path: '/test-poster.jpg',
    isStarred: false,
    watchLater: false,
}

// Create a mock store
const createMockStore = (initialState = {}) => {
    return configureStore({
        reducer: {
            starred: starredSlice.reducer,
            watchLater: watchLaterSlice.reducer,
        },
        preloadedState: initialState,
    })
}

describe('Movie Component', () => {
    const mockViewTrailer = jest.fn()

    it('should match snapshot', () => {
        const store = createMockStore()
        const { container } = render(
            <Provider store={store}>
                <Movie movie={mockMovie} viewTrailer={mockViewTrailer} />
            </Provider>
        )
        expect(container).toMatchSnapshot()
    })

    it('should match snapshot when movie is starred', () => {
        const store = createMockStore()
        const starredMovie: MovieType = {
            ...mockMovie,
            isStarred: true
        }
        const { container } = render(
            <Provider store={store}>
                <Movie movie={starredMovie} viewTrailer={mockViewTrailer} />
            </Provider>
        )
        expect(container).toMatchSnapshot()
    })

    it('should match snapshot when movie is in watch later', () => {
        const store = createMockStore()
        const watchLaterMovie: MovieType = {
            ...mockMovie,
            watchLater: true
        }
        const { container } = render(
            <Provider store={store}>
                <Movie movie={watchLaterMovie} viewTrailer={mockViewTrailer} />
            </Provider>
        )
        expect(container).toMatchSnapshot()
    })
}) 