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
                    state.movies.results = [...state.movies.results, ...action.payload.results]
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