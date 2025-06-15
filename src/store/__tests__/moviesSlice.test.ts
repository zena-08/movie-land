import moviesSlice, { fetchMovies } from '../moviesSlice'
import { MovieType } from 'types'

interface MovieResponse {
    results: MovieType[];
    page: number;
    total_pages: number;
}

interface MoviesState {
    movies: MovieResponse;
    fetchStatus: 'idle' | 'loading' | 'succeeded' | 'error';
    errorMessage: string | null;
}

const mockMovieResponse: MovieResponse = {
    results: [
        { id: 1, title: 'Movie 1', overview: 'Overview 1', poster_path: '/poster1.jpg' },
        { id: 2, title: 'Movie 2', overview: 'Overview 2', poster_path: '/poster2.jpg' }
    ],
    page: 1,
    total_pages: 1
}

describe('moviesSlice', () => {
    const initialState: MoviesState = {
        movies: {
            results: [],
            page: 0,
            total_pages: 0
        },
        fetchStatus: 'idle',
        errorMessage: null
    }

    it('should handle initial state', () => {
        expect(moviesSlice.reducer(undefined, { type: 'unknown' })).toEqual(initialState)
    })

    it('should handle fetchMovies.pending', () => {
        const nextState = moviesSlice.reducer(initialState, fetchMovies.pending)
        expect(nextState.fetchStatus).toBe('loading')
        expect(nextState.errorMessage).toBe(null)
    })

    it('should handle fetchMovies.fulfilled', () => {
        const nextState = moviesSlice.reducer(
            initialState,
            fetchMovies.fulfilled(mockMovieResponse, 'requestId', 'endpoint')
        )
        expect(nextState.movies).toEqual(mockMovieResponse)
        expect(nextState.fetchStatus).toBe('succeeded')
        expect(nextState.errorMessage).toBe(null)
    })

    it('should handle fetchMovies.rejected', () => {
        const errorMessage = 'Failed to fetch movies'
        const nextState = moviesSlice.reducer(
            initialState,
            fetchMovies.rejected(new Error(errorMessage), 'requestId', 'endpoint', errorMessage)
        )
        expect(nextState.fetchStatus).toBe('error')
        expect(nextState.errorMessage).toBe(errorMessage)
    })
}) 