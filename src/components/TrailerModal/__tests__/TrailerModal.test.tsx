import { render, screen } from '@testing-library/react'
import { MovieProvider } from 'context/MovieContext'
import TrailerModal from '../TrailerModal'

// Mock the YouTubePlayer component
const mockYoutubePlayer = jest.fn()
jest.mock('components/YoutubePlayer', () => ({
    __esModule: true,
    default: (props: { videoKey: string }) => mockYoutubePlayer(props)
}))

// Mock the MovieContext
const mockUseMovies = jest.fn()
jest.mock('context/MovieContext', () => ({
    useMovies: () => mockUseMovies(),
    MovieProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>
}))

describe('TrailerModal', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        mockYoutubePlayer.mockImplementation(() => <div data-testid="youtube-player">Mock Player</div>)
    })

    it('should not render when isTrailerOpen is false', () => {
        mockUseMovies.mockReturnValue({
            videoKey: null,
            isLoading: false,
            error: null,
            isTrailerOpen: false,
            closeTrailer: jest.fn(),
            getMovieTrailer: jest.fn()
        })

        const { container } = render(
            <MovieProvider>
                <TrailerModal />
            </MovieProvider>
        )

        expect(container).toBeEmptyDOMElement()
    })

    it('should show loading state', () => {
        mockUseMovies.mockReturnValue({
            videoKey: null,
            isLoading: true,
            error: null,
            isTrailerOpen: true,
            closeTrailer: jest.fn(),
            getMovieTrailer: jest.fn()
        })

        render(
            <MovieProvider>
                <TrailerModal />
            </MovieProvider>
        )

        expect(screen.getByText('Loading trailer...')).toBeInTheDocument()
    })

    it('should show error message from context', () => {
        const errorMessage = 'Failed to fetch trailer'
        mockUseMovies.mockReturnValue({
            videoKey: null,
            isLoading: false,
            error: errorMessage,
            isTrailerOpen: true,
            closeTrailer: jest.fn(),
            getMovieTrailer: jest.fn()
        })

        render(
            <MovieProvider>
                <TrailerModal />
            </MovieProvider>
        )

        expect(screen.getByText(errorMessage)).toBeInTheDocument()
    })

    it('should show no trailer message when no video key is available', () => {
        mockUseMovies.mockReturnValue({
            videoKey: null,
            isLoading: false,
            error: null,
            isTrailerOpen: true,
            closeTrailer: jest.fn(),
            getMovieTrailer: jest.fn()
        })

        render(
            <MovieProvider>
                <TrailerModal />
            </MovieProvider>
        )

        expect(screen.getByText('No trailer available. Try another movie.')).toBeInTheDocument()
    })

    it('should render YouTubePlayer when video key is available', () => {
        mockUseMovies.mockReturnValue({
            videoKey: 'test-video-key',
            isLoading: false,
            error: null,
            isTrailerOpen: true,
            closeTrailer: jest.fn(),
            getMovieTrailer: jest.fn()
        })

        render(
            <MovieProvider>
                <TrailerModal />
            </MovieProvider>
        )

        expect(screen.getByTestId('youtube-player')).toBeInTheDocument()
    })
}) 