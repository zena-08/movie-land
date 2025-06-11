import { FC, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '../store'
import Movie from '../components/Movie'
import { useMovies } from '../context/MovieContext'
import { RootState } from '../test/utils'
import { fetchMovies } from '../data/moviesSlice'
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER } from '../constants'
import { useInfiniteScroll } from '../hooks/useInfiniteScroll'
import '../styles/movies.scss'

interface MovieResponse {
    results: any[];
    page: number;
    total_pages: number;
}

const HomePage: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { movies, getMovieTrailer } = useMovies()
    const { fetchStatus } = useSelector((state: RootState) => state.movies)
    const searchParams = new URLSearchParams(window.location.search)
    const searchQuery = searchParams.get('search')
    const movieData = movies as MovieResponse

    const loadMoreMovies = useCallback(() => {
        if (fetchStatus === 'loading' || movieData.page >= movieData.total_pages) return

        const nextPage = movieData.page + 1
        const baseEndpoint = searchQuery ? ENDPOINT_SEARCH : ENDPOINT_DISCOVER
        const endpoint = `${baseEndpoint}${searchQuery ? `&query=${encodeURIComponent(searchQuery)}` : ''}&page=${nextPage}`
        dispatch(fetchMovies(endpoint))
    }, [dispatch, movieData.page, movieData.total_pages, fetchStatus, searchQuery])

    const { observerTarget, isFetching } = useInfiniteScroll(loadMoreMovies)

    return (
        <div className="movies-page">
            <div data-testid="movies" className="movies-grid">
                {movieData?.results?.map((movie: any) => (
                    <Movie
                        movie={movie}
                        key={movie.id}
                        viewTrailer={getMovieTrailer}
                    />
                ))}
            </div>
            <div ref={observerTarget} className="observer-element" />
            {isFetching && (
                <div className="loading">Loading more movies...</div>
            )}
            {fetchStatus === 'error' && (
                <div className="error">Error loading movies. Please try again.</div>
            )}
        </div>
    )
}

export default HomePage 