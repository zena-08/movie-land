import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

import { useMovies } from 'context/MovieContext'
import { useInfiniteScroll } from 'hooks/useInfiniteScroll'
import { AppDispatch, useAppSelector } from 'store'
import { fetchMovies } from 'store/moviesSlice'
import { ENDPOINT_DISCOVER, ENDPOINT_SEARCH } from 'utils/constants'
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary'

import LoadingState from 'components/LoadingState'
import Movie from 'components/Movie'

import styles from './homePage.module.scss'

const HomePageContent = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { movies: movieData, getMovieTrailer } = useMovies()
    const { fetchStatus } = useAppSelector((state) => state.movies)
    const [searchParams] = useSearchParams()
    const searchQuery = searchParams.get('search')

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
            <div className={styles['error-container']}>
                <p className={styles['error']}>Error loading movies. Please try again.</p>
            </div>
        )
    }

    if (!movieData?.results?.length) {
        return (
            <div className={styles['empty-state']}>
                <p>No movies found. Try a different search.</p>
            </div>
        )
    }

    return (
        <div className={styles['movies-page']}>
            <div data-testid="movies" className={styles['movies-grid']}>
                {movieData.results.map((movie: any) => (
                    <Movie
                        movie={movie}
                        key={movie.id}
                        viewTrailer={getMovieTrailer}
                    />
                ))}
            </div>
            <div ref={observerTarget} className={styles['observer-element']} />
            {isFetching && <LoadingState message="Loading more movies..." />}
        </div>
    )
}

const HomePage = () => {
    return (
        <ErrorBoundary>
            <HomePageContent />
        </ErrorBoundary>
    )
}

export default HomePage 