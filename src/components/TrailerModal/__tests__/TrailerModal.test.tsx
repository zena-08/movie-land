import { render } from '@testing-library/react'
import { MovieProvider } from 'context/MovieContext'
import TrailerModal from '../TrailerModal'

// Mock the YouTubePlayer component
jest.mock('components/YoutubePlayer', () => {
    return function MockYouTubePlayer({ videoKey }: { videoKey: string }) {
        return <div data-testid="youtube-player">Mock YouTube Player: {videoKey}</div>
    }
})

// Mock the useAppSelector hook
jest.mock('store', () => ({
    useAppSelector: () => ({
        movies: {
            results: [],
            page: 1,
            total_pages: 1
        },
        starred: {
            starredMovies: []
        },
        watchLater: {
            watchLaterMovies: []
        }
    })
}))

describe('TrailerModal Component', () => {
    it('should not render when isTrailerOpen is false', () => {
        const { container } = render(
            <MovieProvider>
                <TrailerModal />
            </MovieProvider>
        )
        expect(container).toBeEmptyDOMElement()
    })

    it('should match snapshot when loading', () => {
        // Mock the useMovieTrailer hook
        jest.mock('hooks/useMovieTrailer', () => ({
            useMovieTrailer: () => ({
                videoKey: null,
                isLoading: true,
                error: null,
                getMovieTrailer: jest.fn()
            })
        }))

        const { container } = render(
            <MovieProvider>
                <TrailerModal />
            </MovieProvider>
        )
        expect(container).toMatchSnapshot()
    })

    it('should match snapshot when there is an error', () => {
        // Mock the useMovieTrailer hook
        jest.mock('hooks/useMovieTrailer', () => ({
            useMovieTrailer: () => ({
                videoKey: null,
                isLoading: false,
                error: 'Failed to load trailer',
                getMovieTrailer: jest.fn()
            })
        }))

        const { container } = render(
            <MovieProvider>
                <TrailerModal />
            </MovieProvider>
        )
        expect(container).toMatchSnapshot()
    })

    it('should match snapshot when no video key is available', () => {
        // Mock the useMovieTrailer hook
        jest.mock('hooks/useMovieTrailer', () => ({
            useMovieTrailer: () => ({
                videoKey: null,
                isLoading: false,
                error: null,
                getMovieTrailer: jest.fn()
            })
        }))

        const { container } = render(
            <MovieProvider>
                <TrailerModal />
            </MovieProvider>
        )
        expect(container).toMatchSnapshot()
    })

    it('should match snapshot when video key is available', () => {
        // Mock the useMovieTrailer hook
        jest.mock('hooks/useMovieTrailer', () => ({
            useMovieTrailer: () => ({
                videoKey: 'test-video-key',
                isLoading: false,
                error: null,
                getMovieTrailer: jest.fn()
            })
        }))

        const { container } = render(
            <MovieProvider>
                <TrailerModal />
            </MovieProvider>
        )
        expect(container).toMatchSnapshot()
    })
}) 