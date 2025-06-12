import { FC, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '../data/store'
import { useMovies } from '../context/MovieContext'
import Movie from '../components/Movie'
import LoadingState from '../components/LoadingState'
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

    if (fetchStatus === 'loading' && !movieData?.results?.length) {
        return <LoadingState message="Loading movies..." />
    }

    if (fetchStatus === 'error') {
        return (
            <div className="error-container">
                <p className="error">Error loading movies. Please try again.</p>
            </div>
        )
    }

    if (!movieData?.results?.length) {
        return (
            <div className="empty-state">
                <p>No movies found. Try a different search.</p>
            </div>
        )
    }

    return (
        <div className="movies-page">
            <div data-testid="movies" className="movies-grid">
                {movieData.results.map((movie: any) => (
                    <Movie
                        movie={movie}
                        key={movie.id}
                        viewTrailer={getMovieTrailer}
                    />
                ))}
            </div>
            <div ref={observerTarget} className="observer-element" />
            {isFetching && <LoadingState message="Loading more movies..." />}
        </div>
    )
}

export default HomePage 