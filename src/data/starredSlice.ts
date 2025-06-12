import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Movie {
    id: string;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
}

interface StarredState {
    starredMovies: Movie[];
}

const initialState: StarredState = {
    starredMovies: []
}

const starredSlice = createSlice({
    name: 'starred',
    initialState,
    reducers: {
        starMovie: (state, action: PayloadAction<Movie>) => {
            if (!state.starredMovies.some(movie => movie.id === action.payload.id)) {
                state.starredMovies.push(action.payload);
            }
        },
        unstarMovie: (state, action: PayloadAction<Movie>) => {
            state.starredMovies = state.starredMovies.filter(
                movie => movie.id !== action.payload.id
            );
        },
        clearAllStarred: (state) => {
            state.starredMovies = [];
        }
    }
});

export default starredSlice; 