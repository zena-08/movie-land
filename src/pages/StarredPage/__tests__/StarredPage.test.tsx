import { screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from 'utils/test-utils'
import StarredPage from '../StarredPage'
import { MovieType } from 'types'

// Mock the Movie component
jest.mock('components/Movie', () => {
    return function MockMovie({ movie }: { movie: any }) {
        return <div data-testid="movie-card">{movie.title}</div>
    }
})

describe('StarredPage Component', () => {
    it('shows empty state when no movies are starred', () => {
        renderWithProviders(<StarredPage />)
        expect(screen.getByText('No starred movies match your search.')).toBeInTheDocument()
    })

    it('displays starred movies', async () => {
        // Mock the store with starred movies
        const preloadedState = {
            starred: {
                starredMovies: [1, 2]
            },
            movies: {
                movies: {
                    results: [
                        {
                            id: 1,
                            title: 'Starred Movie 1',
                            overview: 'Test overview 1',
                            poster_path: '/test1.jpg'
                        },
                        {
                            id: 2,
                            title: 'Starred Movie 2',
                            overview: 'Test overview 2',
                            poster_path: '/test2.jpg'
                        }
                    ] as MovieType[],
                    page: 1,
                    total_pages: 1
                },
                fetchStatus: 'succeeded' as const
            },
            watchLater: {
                watchLaterMovies: []
            }
        }

        renderWithProviders(<StarredPage />, { preloadedState })

        await waitFor(() => {
            expect(screen.getByText('Starred Movie 1')).toBeInTheDocument()
            expect(screen.getByText('Starred Movie 2')).toBeInTheDocument()
        })
    })

    it('filters starred movies based on search', async () => {
        // Mock the store with starred movies
        const preloadedState = {
            starred: {
                starredMovies: [1, 2]
            },
            movies: {
                movies: {
                    results: [
                        {
                            id: 1,
                            title: 'Starred Movie 1',
                            overview: 'Test overview 1',
                            poster_path: '/test1.jpg'
                        },
                        {
                            id: 2,
                            title: 'Starred Movie 2',
                            overview: 'Test overview 2',
                            poster_path: '/test2.jpg'
                        }
                    ] as MovieType[],
                    page: 1,
                    total_pages: 1
                },
                fetchStatus: 'succeeded' as const
            },
            watchLater: {
                watchLaterMovies: []
            }
        }

        // Render with search parameter
        renderWithProviders(<StarredPage />, {
            preloadedState,
            route: '/starred?search=Movie%201'
        })

        // Should only show the matching movie
        await waitFor(() => {
            expect(screen.getByText('Starred Movie 1')).toBeInTheDocument()
            expect(screen.queryByText('Starred Movie 2')).not.toBeInTheDocument()
        })
    })
}) 