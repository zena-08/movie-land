import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
}

interface MovieResponse {
    results: Movie[];
    page: number;
    total_pages: number;
}

interface MoviesState {
    movies: MovieResponse;
    fetchStatus: 'idle' | 'loading' | 'succeeded' | 'error';
}

const initialState: MoviesState = {
    movies: {
        results: [],
        page: 0,
        total_pages: 0
    },
    fetchStatus: 'idle'
}

export const fetchMovies = createAsyncThunk<MovieResponse, string>(
    'movies/fetchMovies',
    async (endpoint: string) => {
        const response = await axios.get<MovieResponse>(endpoint)
        return response.data
    }
)

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.fetchStatus = 'loading'
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.fetchStatus = 'succeeded'
                if (action.payload.page === 1) {
                    state.movies = action.payload
                } else {
                    state.movies.results = [...state.movies.results, ...action.payload.results]
                    state.movies.page = action.payload.page
                    state.movies.total_pages = action.payload.total_pages
                }
            })
            .addCase(fetchMovies.rejected, (state) => {
                state.fetchStatus = 'error'
            })
    },
})

export default moviesSlice 