import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test-utils'
import HomePage from '../HomePage'
import { RootState } from 'store'
import { MovieProvider } from 'context/MovieContext'

// Mock the Movie component
jest.mock('components/Movie', () => {
    return function MockMovie({ movie }: { movie: any }) {
        return <div data-testid="movie-card">{movie.title}</div>
    }
})

// Mock useMovieTrailer hook
jest.mock('hooks/useMovieTrailer', () => ({
    useMovieTrailer: () => ({
        videoKey: null,
        isLoading: false,
        error: null,
        getMovieTrailer: jest.fn()
    })
}))

describe('HomePage Component', () => {
    const mockMovies = {
        results: [
            { id: 1, title: 'Movie 1', overview: 'Overview 1', poster_path: '/test1.jpg' },
            { id: 2, title: 'Movie 2', overview: 'Overview 2', poster_path: '/test2.jpg' }
        ],
        page: 1,
        total_pages: 2
    }

    const initialPreloadedState: Partial<RootState> = {
        movies: {
            movies: mockMovies,
            fetchStatus: 'idle'
        },
        starred: { starredMovies: [] },
        watchLater: { watchLaterMovies: [] }
    }

    it('displays loading state', () => {
        const preloadedState: Partial<RootState> = {
            ...initialPreloadedState,
            movies: {
                movies: { results: [], page: 0, total_pages: 0 },
                fetchStatus: 'loading'
            }
        }

        renderWithProviders(
            <MovieProvider>
                <HomePage />
            </MovieProvider>,
            { preloadedState }
        )

        expect(screen.getByText('Loading movies...')).toBeInTheDocument()
    })

    it('displays error state', () => {
        const preloadedState: Partial<RootState> = {
            ...initialPreloadedState,
            movies: {
                movies: { results: [], page: 0, total_pages: 0 },
                fetchStatus: 'error'
            }
        }

        renderWithProviders(
            <MovieProvider>
                <HomePage />
            </MovieProvider>,
            { preloadedState }
        )

        expect(screen.getByText('Error loading movies. Please try again.')).toBeInTheDocument()
    })

    it('displays empty state', () => {
        const preloadedState: Partial<RootState> = {
            ...initialPreloadedState,
            movies: {
                movies: { results: [], page: 1, total_pages: 1 },
                fetchStatus: 'idle'
            }
        }

        renderWithProviders(
            <MovieProvider>
                <HomePage />
            </MovieProvider>,
            { preloadedState }
        )

        expect(screen.getByText('No movies found. Try a different search.')).toBeInTheDocument()
    })

    it('displays movies when available', () => {
        renderWithProviders(
            <MovieProvider>
                <HomePage />
            </MovieProvider>,
            { preloadedState: initialPreloadedState }
        )

        expect(screen.getByText('Movie 1')).toBeInTheDocument()
        expect(screen.getByText('Movie 2')).toBeInTheDocument()
    })
}) 