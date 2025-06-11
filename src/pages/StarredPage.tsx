import { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useSearchParams } from 'react-router-dom'
import starredSlice from '../data/starredSlice'
import { useMovies } from '../context/MovieContext'
import Movie from '../components/Movie'
import { RootState } from '../test/utils'
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

const StarredPage: FC = () => {
    const { starredMovies } = useSelector((state: RootState) => state.starred)
    const { watchLaterMovies } = useSelector((state: RootState) => state.watchLater)
    const { getMovieTrailer } = useMovies()
    const { clearAllStarred } = starredSlice.actions
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()
    const searchQuery = searchParams.get('search')?.toLowerCase() || ''

    if (starredMovies.length === 0) {
        return (
            <div className="text-center empty-cart">
                <i className="bi bi-star" />
                <p>You have no starred movies.</p>
                <p>Go to <Link to='/'>Home</Link></p>
            </div>
        )
    }

    // Add isStarred flag and check watchLater status for all movies
    const moviesWithFlags = starredMovies
        .map(movie => ({
            ...movie,
            isStarred: true,
            watchLater: watchLaterMovies.some(m => m.id === movie.id)
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
                <p>No starred movies match your search.</p>
                <p>Try a different search term or <Link to='/starred'>view all starred movies</Link></p>
            </div>
        )
    }

    return (
        <div className="starred-page" data-testid="starred-div">
            <div data-testid="starred-movies" className="starred-movies">
                <h6 className="header">Starred Movies</h6>
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
                        onClick={() => dispatch(clearAllStarred())}
                    >
                        Clear all
                    </button>
                </footer>
            </div>
        </div>
    )
}

export default StarredPage 