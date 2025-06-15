import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import Movie from './Movie'
import starredSlice from 'store/starredSlice'
import watchLaterSlice from 'store/watchLaterSlice'

// Mock the store
const createMockStore = (initialState = {}) => {
    return configureStore({
        reducer: {
            starred: starredSlice.reducer,
            watchLater: watchLaterSlice.reducer,
        },
        preloadedState: initialState,
    })
}

const mockMovie = {
    id: 1,
    title: 'Test Movie',
    overview: 'This is a test movie overview',
    poster_path: '/test-poster.jpg',
    isStarred: false,
    watchLater: false,
}

describe('Movie Component', () => {
    const mockViewTrailer = jest.fn()
    const store = createMockStore()

    it('should match snapshot with default state', () => {
        const { container } = render(
            <Provider store={store}>
                <Movie movie={mockMovie} viewTrailer={mockViewTrailer} />
            </Provider>
        )
        expect(container).toMatchSnapshot()
    })

    it('should match snapshot with starred movie', () => {
        const starredMovie = { ...mockMovie, isStarred: true }
        const { container } = render(
            <Provider store={store}>
                <Movie movie={starredMovie} viewTrailer={mockViewTrailer} />
            </Provider>
        )
        expect(container).toMatchSnapshot()
    })

    it('should match snapshot with watch later movie', () => {
        const watchLaterMovie = { ...mockMovie, watchLater: true }
        const { container } = render(
            <Provider store={store}>
                <Movie movie={watchLaterMovie} viewTrailer={mockViewTrailer} />
            </Provider>
        )
        expect(container).toMatchSnapshot()
    })
}) 