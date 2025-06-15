import { act } from 'react'
import { screen, render } from '@testing-library/react'
import { MovieProvider, useMovies } from '../MovieContext'
import { renderWithProviders } from '../../utils/test-utils'

// Mock the useMovieTrailer hook
jest.mock('hooks/useMovieTrailer', () => ({
    useMovieTrailer: () => ({
        videoKey: 'test-video-key',
        isLoading: false,
        error: null,
        getMovieTrailer: jest.fn()
    })
}))

// Test component that uses the context
const TestComponent = () => {
    const context = useMovies()
    return (
        <div>
            <div data-testid="movies-count">{context.movies.results.length}</div>
            <div data-testid="starred-count">{context.starredMovies.length}</div>
            <div data-testid="watch-later-count">{context.watchLaterMovies.length}</div>
            <button onClick={() => context.getMovieTrailer({
                id: 1,
                title: 'Movie 1',
                overview: 'Overview 1',
                poster_path: '/poster1.jpg'
            })}>
                View Trailer
            </button>
            <button onClick={context.closeTrailer}>Close Trailer</button>
        </div>
    )
}

describe('MovieContext', () => {
    const preloadedState = {
        movies: {
            movies: {
                results: [
                    { id: 1, title: 'Movie 1', overview: 'Overview 1', poster_path: '/poster1.jpg' },
                    { id: 2, title: 'Movie 2', overview: 'Overview 2', poster_path: '/poster2.jpg' }
                ],
                page: 1,
                total_pages: 1
            },
            fetchStatus: 'succeeded' as const
        },
        starred: {
            starredMovies: [1]
        },
        watchLater: {
            watchLaterMovies: [2]
        }
    }

    it('provides movies with starred and watch later flags', () => {
        renderWithProviders(
            <MovieProvider>
                <TestComponent />
            </MovieProvider>,
            { preloadedState }
        )

        expect(screen.getByTestId('movies-count')).toHaveTextContent('2')
        expect(screen.getByTestId('starred-count')).toHaveTextContent('1')
        expect(screen.getByTestId('watch-later-count')).toHaveTextContent('1')
    })

    it('throws error when used outside provider', () => {
        const consoleError = console.error
        console.error = jest.fn() // Suppress React error logging

        expect(() => {
            render(<TestComponent />)
        }).toThrow('useMovies must be used within a MovieProvider')

        console.error = consoleError
    })

    it('handles trailer modal state', () => {
        renderWithProviders(
            <MovieProvider>
                <TestComponent />
            </MovieProvider>,
            { preloadedState }
        )

        // Open trailer modal
        act(() => {
            screen.getByText('View Trailer').click()
        })

        // Close trailer modal
        act(() => {
            screen.getByText('Close Trailer').click()
        })
    })
}) 