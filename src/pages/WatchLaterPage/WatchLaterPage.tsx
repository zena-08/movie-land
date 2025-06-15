import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useSearchParams } from 'react-router-dom'

import { useMovies } from 'context/MovieContext'
import { useAppSelector } from 'store'
import watchLaterSlice from 'store/watchLaterSlice'
import Movie from 'components/Movie'

import styles from './watchLaterPage.module.scss'

const WatchLaterPage = () => {
    const { watchLaterMovies } = useAppSelector((state) => state.watchLater)
    const { starredMovies } = useAppSelector((state) => state.starred)
    const { movies } = useAppSelector((state) => state.movies)
    const { getMovieTrailer } = useMovies()
    const { clearWatchLater } = watchLaterSlice.actions
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()
    const searchQuery = searchParams.get('search')?.toLowerCase() || ''

    const moviesWithFlags = useMemo(() => movies.results
        .filter(movie => watchLaterMovies.includes(movie.id))
        .map(movie => ({
            ...movie,
            watchLater: true,
            isStarred: starredMovies.some(m => m === movie.id)
        }))
        .filter(movie =>
            searchQuery ?
                movie.title.toLowerCase().includes(searchQuery) ||
                movie.overview.toLowerCase().includes(searchQuery)
                : true
        )
        , [watchLaterMovies, starredMovies, searchQuery, movies.results]);


    if (moviesWithFlags.length === 0) {
        return (
            <div className={`${styles['empty-cart']} ${styles['text-center']}`} role="status" tabIndex={0}>
                <p>No watch later movies match your search.</p>
                <p>Try a different search term or <Link to='/starred' tabIndex={0}>view all starred movies</Link></p>
            </div>
        )
    }

    return (
        <main className={styles['watch-later-page']} data-testid="watch-later-div" role="main" tabIndex={-1}>
            <div data-testid="watch-later-movies" className={styles['starred-movies']}>
                <h6 className={styles['header']} tabIndex={0}>Watch Later List</h6>
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
                        onClick={() => dispatch(clearWatchLater())}
                        tabIndex={0}
                        aria-label="Clear all watch later movies"
                    >
                        Empty list
                    </button>
                </footer>
            </div>
        </main>
    )
}

export default WatchLaterPage 