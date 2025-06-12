import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Movie {
    id: string;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
}

interface WatchLaterState {
    watchLaterMovies: Movie[];
}

const initialState: WatchLaterState = {
    watchLaterMovies: []
}

const watchLaterSlice = createSlice({
    name: 'watchLater',
    initialState,
    reducers: {
        addToWatchLater: (state, action: PayloadAction<Movie>) => {
            if (!state.watchLaterMovies.some(movie => movie.id === action.payload.id)) {
                state.watchLaterMovies.push(action.payload);
            }
        },
        removeFromWatchLater: (state, action: PayloadAction<Movie>) => {
            state.watchLaterMovies = state.watchLaterMovies.filter(
                movie => movie.id !== action.payload.id
            );
        },
        clearWatchLater: (state) => {
            state.watchLaterMovies = [];
        }
    }
});

export default watchLaterSlice; 