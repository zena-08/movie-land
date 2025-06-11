export const API_KEY = process.env.REACT_APP_TMDB_API_KEY
export const BASE_URL = 'https://api.themoviedb.org/3'

export const ENDPOINT_SEARCH = `${BASE_URL}/search/movie?api_key=${API_KEY}`
export const ENDPOINT_DISCOVER = `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`

export const MESSAGES = {
    PAGE_NOT_FOUND: 'Page Not Found',
    ERROR_LOADING_MOVIES: 'Error loading movies',
    NO_MOVIES_FOUND: 'No movies found',
    NO_STARRED_MOVIES: 'No starred movies yet',
    NO_WATCH_LATER: 'No movies in watch later list'
} 