import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface WatchLaterState {
    watchLaterMovies: number[];
}

const initialState: WatchLaterState = {
    watchLaterMovies: []
}

const watchLaterSlice = createSlice({
    name: 'watchLater',
    initialState,
    reducers: {
        addToWatchLater: (state, action: PayloadAction<number>) => {
            if (!state.watchLaterMovies.some(id => id === action.payload)) {
                state.watchLaterMovies.push(action.payload);
            }
        },
        removeFromWatchLater: (state, action: PayloadAction<number>) => {
            state.watchLaterMovies = state.watchLaterMovies.filter(
                id => id !== action.payload
            );
        },
        clearWatchLater: (state) => {
            state.watchLaterMovies = [];
        }
    }
});

export default watchLaterSlice; 