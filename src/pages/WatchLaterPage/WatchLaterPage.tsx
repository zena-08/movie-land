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
        , [watchLaterMovies, starredMovies, searchQuery]);


    if (moviesWithFlags.length === 0) {
        return (
            <div className={`${styles['empty-cart']} ${styles['text-center']}`}>
                <p>No watch later movies match your search.</p>
                <p>Try a different search term or <Link to='/starred'>view all starred movies</Link></p>
            </div>
        )
    }

    return (
        <div className={styles['watch-later-page']} data-testid="watch-later-div">
            <div data-testid="watch-later-movies" className={styles['starred-movies']}>
                <h6 className={styles['header']}>Watch Later List</h6>
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
                    >
                        Empty list
                    </button>
                </footer>
            </div>
        </div>
    )
}

export default WatchLaterPage 