import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
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

const initialState: MoviesState = {
    movies: {
        results: [],
        page: 0,
        total_pages: 0
    },
    fetchStatus: 'idle',
    errorMessage: null
}

export const fetchMovies = createAsyncThunk<MovieResponse, string, { rejectValue: string }>(
    'movies/fetchMovies',
    async (endpoint: string, { rejectWithValue }) => {
        try {
            const response = await axios.get<MovieResponse>(endpoint)
            return response.data
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch movies'
            return rejectWithValue(errorMessage)
        }
    }
)

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        clearError: (state) => {
            state.errorMessage = null
            state.fetchStatus = 'idle'
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.fetchStatus = 'loading'
                state.errorMessage = null
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.fetchStatus = 'succeeded'
                state.errorMessage = null
                if (action.payload.page === 1) {
                    state.movies = action.payload
                } else {
                    // Create a Map to track unique movie IDs
                    const uniqueMovies = new Map<number, MovieType>()

                    // Add existing movies to the Map
                    state.movies.results.forEach(movie => {
                        uniqueMovies.set(movie.id, movie)
                    })

                    // Add new movies to the Map (this will overwrite any duplicates)
                    action.payload.results.forEach(movie => {
                        uniqueMovies.set(movie.id, movie)
                    })

                    // Convert Map values back to array
                    state.movies.results = Array.from(uniqueMovies.values())
                    state.movies.page = action.payload.page
                    state.movies.total_pages = action.payload.total_pages
                }
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.fetchStatus = 'error'
                state.errorMessage = action.payload || 'An unexpected error occurred'
            })
    },
})

export const { clearError } = moviesSlice.actions
export default moviesSlice 