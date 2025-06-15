import { act } from 'react'
import { renderHook } from '@testing-library/react'
import { useMovieTrailer } from '../useMovieTrailer'
import { MovieType } from 'types'
import { BASE_URL, API_KEY } from 'utils/constants'

// Mock the fetch function
global.fetch = jest.fn()

describe('useMovieTrailer', () => {
    const mockMovie: MovieType = {
        id: 1,
        title: 'Test Movie',
        overview: 'Test Overview',
        poster_path: '/test.jpg'
    }

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should initialize with default values', () => {
        const { result } = renderHook(() => useMovieTrailer())

        expect(result.current.videoKey).toBe(null)
        expect(result.current.isLoading).toBe(false)
        expect(result.current.error).toBe(null)
    })

    it('should fetch movie trailer successfully', async () => {
        const mockTrailerData = {
            videos: {
                results: [
                    {
                        key: 'test-key-1',
                        type: 'Trailer',
                        site: 'YouTube'
                    }
                ]
            }
        }

        global.fetch = jest.fn().mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockTrailerData)
        })

        const { result } = renderHook(() => useMovieTrailer())

        await act(async () => {
            await result.current.getMovieTrailer(mockMovie)
        })

        expect(result.current.videoKey).toBe('test-key-1')
        expect(result.current.isLoading).toBe(false)
        expect(result.current.error).toBe(null)
        expect(global.fetch).toHaveBeenCalledWith(
            `${BASE_URL}/movie/${mockMovie.id}?api_key=${API_KEY}&append_to_response=videos`
        )
    })

    it('should handle API error', async () => {
        const errorMessage = 'Failed to load trailer'
        const originalConsoleError = console.error
        console.error = jest.fn()

        global.fetch = jest.fn().mockRejectedValueOnce(new Error(errorMessage))

        const { result } = renderHook(() => useMovieTrailer())

        await act(async () => {
            await result.current.getMovieTrailer(mockMovie)
        })

        expect(result.current.videoKey).toBe(null)
        expect(result.current.isLoading).toBe(false)
        expect(result.current.error).toBe(errorMessage)
        expect(console.error).toHaveBeenCalledWith('Error loading trailer:', expect.any(Error))

        // Restore console.error
        console.error = originalConsoleError
    })

    it('should handle no trailer found', async () => {
        const mockTrailerData = {
            videos: {
                results: []
            }
        }

        global.fetch = jest.fn().mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockTrailerData)
        })

        const { result } = renderHook(() => useMovieTrailer())

        await act(async () => {
            await result.current.getMovieTrailer(mockMovie)
        })

        expect(result.current.videoKey).toBe(null)
        expect(result.current.isLoading).toBe(false)
        expect(result.current.error).toBe('No trailers found for this movie')
    })
}) 