import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useSearchParams } from 'react-router-dom'
import { useAppSelector } from 'store'
import { useMovies } from 'context/MovieContext'
import starredSlice from 'store/starredSlice'
import Movie from 'components/Movie'
import { MESSAGES } from 'utils/constants'

import styles from './starredPage.module.scss'

const StarredPage = () => {
    const { starredMovies } = useAppSelector((state) => state.starred)
    const { watchLaterMovies } = useAppSelector((state) => state.watchLater)
    const { movies } = useAppSelector((state) => state.movies)
    const { getMovieTrailer } = useMovies()
    const { clearAllStarred } = starredSlice.actions
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()
    const searchQuery = searchParams.get('search')?.toLowerCase() || ''

    // Add isStarred flag and check watchLater status for all movies
    const moviesWithFlags = useMemo(() => movies.results
        .filter(movie => starredMovies.includes(movie.id))
        .map(movie => ({
            ...movie,
            isStarred: true,
            watchLater: watchLaterMovies.some(id => id === movie.id)
        }))
        .filter(movie =>
            searchQuery ?
                movie.title.toLowerCase().includes(searchQuery) ||
                movie.overview.toLowerCase().includes(searchQuery)
                : true
        )
        , [starredMovies, watchLaterMovies, searchQuery, movies.results]);

    if (moviesWithFlags.length === 0) {
        return (
            <div className={`${styles['empty-cart']} ${styles['text-center']}`} role="status" tabIndex={0}>
                {starredMovies.length === 0 ? (
                    <>
                        <p>{MESSAGES.NO_STARRED_MOVIES}</p>
                        <p>Start starring movies to see them here!</p>
                        <p>or <Link to='/watch-later' tabIndex={0}>view all watch later movies</Link></p>
                    </>
                ) : (
                    <>
                        <p>No starred movies match your search.</p>
                        <p>Try a different search term or <Link to='/watch-later' tabIndex={0}>view all watch later movies</Link></p>
                    </>
                )}
            </div>
        )
    }

    return (
        <main className={styles['starred-page']} data-testid="starred-div" role="main" tabIndex={-1}>
            <div data-testid="starred-movies" className={styles['starred-movies']}>
                <h6 className={styles['header']} tabIndex={0}>Starred Movies</h6>
                <div className={styles['movies-grid']}>
                    {moviesWithFlags.map((movie) => (
                        <Movie
                            movie={movie}
                            key={movie.id}
                            viewTrailer={getMovieTrailer}
                        />
                    ))}
                </div>

                <footer className={styles['text-center']}>
                    <button
                        className={styles['btn-primary']}
                        onClick={() => dispatch(clearAllStarred())}
                        tabIndex={0}
                        aria-label="Clear all starred movies"
                    >
                        Clear all
                    </button>
                </footer>
            </div>
        </main>
    )
}

export default StarredPage 