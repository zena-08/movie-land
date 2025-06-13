import { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useSearchParams } from 'react-router-dom'
import watchLaterSlice from '../data/watchLaterSlice'
import { useMovies } from '../context/MovieContext'
import Movie from '../components/Movie'
import { RootState } from '../test/utils'
import { HeartIcon } from '../icons'
import '../styles/starred.scss'

type MovieType = {
    id: string;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    isStarred?: boolean;
    watchLater?: boolean;
}

const WatchLaterPage: FC = () => {
    const { watchLaterMovies } = useSelector((state: RootState) => state.watchLater)
    const { starredMovies } = useSelector((state: RootState) => state.starred)
    const { getMovieTrailer } = useMovies()
    const { clearWatchLater } = watchLaterSlice.actions
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()
    const searchQuery = searchParams.get('search')?.toLowerCase() || ''

    if (watchLaterMovies.length === 0) {
        return (
            <div className="text-center empty-cart">
                <HeartIcon />
                <p>You have no movies saved to watch later.</p>
                <p>Go to <Link to='/'>Home</Link></p>
            </div>
        )
    }

    const moviesWithFlags = watchLaterMovies
        .map(movie => ({
            ...movie,
            watchLater: true,
            isStarred: starredMovies.some(m => m.id === movie.id)
        }))
        .filter(movie =>
            searchQuery ?
                movie.title.toLowerCase().includes(searchQuery) ||
                movie.overview.toLowerCase().includes(searchQuery)
                : true
        )

    if (searchQuery && moviesWithFlags.length === 0) {
        return (
            <div className="text-center empty-cart">
                <i className="bi bi-search" />
                <p>No watch later movies match your search.</p>
                <p>Try a different search term or <Link to='/starred'>view all starred movies</Link></p>
            </div>
        )
    }

    return (
        <div className="watch-later-page" data-testid="watch-later-div">
            <div data-testid="watch-later-movies" className="starred-movies">
                <h6 className="header">Watch Later List</h6>
                <div className="movies-grid">
                    {moviesWithFlags.map((movie: MovieType) => (
                        <Movie
                            movie={movie}
                            key={movie.id}
                            viewTrailer={getMovieTrailer}
                        />
                    ))}
                </div>

                <footer className="text-center">
                    <button
                        className="btn btn-primary"
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