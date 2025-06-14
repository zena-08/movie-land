import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface StarredState {
    starredMovies: number[];
}

const initialState: StarredState = {
    starredMovies: []
}

const starredSlice = createSlice({
    name: 'starred',
    initialState,
    reducers: {
        starMovie: (state, action: PayloadAction<number>) => {
            if (!state.starredMovies.some(id => id === action.payload)) {
                state.starredMovies.push(action.payload);
            }
        },
        unstarMovie: (state, action: PayloadAction<number>) => {
            state.starredMovies = state.starredMovies.filter(
                id => id !== action.payload
            );
        },
        clearAllStarred: (state) => {
            state.starredMovies = [];
        }
    }
});

export default starredSlice; 