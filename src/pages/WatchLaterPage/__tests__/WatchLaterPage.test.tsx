import { act } from 'react'
import { screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from 'utils/test-utils'
import WatchLaterPage from '../WatchLaterPage'
import { MovieType } from 'types'

// Mock the Movie component
jest.mock('components/Movie', () => {
    return function MockMovie({ movie }: { movie: any }) {
        return <div data-testid="movie-card">{movie.title}</div>
    }
})

describe('WatchLaterPage Component', () => {
    it('shows empty state when no movies are saved', async () => {
        await act(async () => {
            renderWithProviders(<WatchLaterPage />)
        })
        expect(screen.getByText('No watch later movies match your search.')).toBeInTheDocument()
    })

    it('displays watch later movies', async () => {
        // Mock the store with watch later movies
        const preloadedState = {
            watchLater: {
                watchLaterMovies: [1, 2]
            },
            movies: {
                movies: {
                    results: [
                        {
                            id: 1,
                            title: 'Watch Later Movie 1',
                            overview: 'Test overview 1',
                            poster_path: '/test1.jpg'
                        },
                        {
                            id: 2,
                            title: 'Watch Later Movie 2',
                            overview: 'Test overview 2',
                            poster_path: '/test2.jpg'
                        }
                    ] as MovieType[],
                    page: 1,
                    total_pages: 1
                },
                fetchStatus: 'succeeded' as const
            },
            starred: {
                starredMovies: []
            }
        }

        await act(async () => {
            renderWithProviders(<WatchLaterPage />, { preloadedState })
        })

        await waitFor(() => {
            expect(screen.getByText('Watch Later Movie 1')).toBeInTheDocument()
            expect(screen.getByText('Watch Later Movie 2')).toBeInTheDocument()
        })
    })

    it('filters watch later movies based on search', async () => {
        // Mock the store with watch later movies
        const preloadedState = {
            watchLater: {
                watchLaterMovies: [1, 2]
            },
            movies: {
                movies: {
                    results: [
                        {
                            id: 1,
                            title: 'Watch Later Movie 1',
                            overview: 'Test overview 1',
                            poster_path: '/test1.jpg'
                        },
                        {
                            id: 2,
                            title: 'Watch Later Movie 2',
                            overview: 'Test overview 2',
                            poster_path: '/test2.jpg'
                        }
                    ] as MovieType[],
                    page: 1,
                    total_pages: 1
                },
                fetchStatus: 'succeeded' as const
            },
            starred: {
                starredMovies: []
            }
        }

        // Render with search parameter
        await act(async () => {
            renderWithProviders(<WatchLaterPage />, {
                preloadedState,
                route: '/watch-later?search=Movie%201'
            })
        })

        // Should only show the matching movie
        await waitFor(() => {
            expect(screen.getByText('Watch Later Movie 1')).toBeInTheDocument()
            expect(screen.queryByText('Watch Later Movie 2')).not.toBeInTheDocument()
        })
    })
}) 