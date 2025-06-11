// API Configuration
export const API_KEY = process.env.REACT_APP_API_KEY
if (!API_KEY) {
    console.error('REACT_APP_API_KEY is not defined in .env file')
}

export const ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'https://api.themoviedb.org/3'
export const IMAGE_BASE_URL = process.env.REACT_APP_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p/w500'

// API Endpoints
export const ENDPOINT_DISCOVER = `${ENDPOINT}/discover/movie?api_key=${API_KEY}&sort_by=vote_count.desc`
export const ENDPOINT_SEARCH = `${ENDPOINT}/search/movie?api_key=${API_KEY}`
export const ENDPOINT_MOVIE = `${ENDPOINT}/movie/507086?api_key=${API_KEY}&append_to_response=videos`

// Error Messages
export const ERROR_MESSAGES = {
    FETCH_FAILED: 'Failed to fetch data. Please try again later.',
    SEARCH_FAILED: 'Search failed. Please try again.',
    MOVIE_NOT_FOUND: 'Movie not found.',
    TRAILER_NOT_AVAILABLE: 'Trailer not available for this movie.'
}

export const MESSAGES = {
    NO_MOVIES_FOUND: 'No movies found',
    PAGE_NOT_FOUND: 'Page not found',
}