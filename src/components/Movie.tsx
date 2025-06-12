import { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import starredSlice from '../data/starredSlice'
import watchLaterSlice from '../data/watchLaterSlice'
import fallbackImage from '../assets/not-found-500X750.jpeg'
import { IMAGE_BASE_URL } from '../constants'
import '../styles/movie.scss'

interface MovieType {
    id: string;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    isStarred?: boolean;
    watchLater?: boolean;
}

interface MovieProps {
    movie: MovieType;
    viewTrailer: (movie: MovieType) => void;
}

const StarIcon = ({ filled = false }: { filled?: boolean }) => (
    <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill={filled ? '#ffd700' : 'none'}
        stroke="#ffd700"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon star-icon"
    >
        <polygon points="12 2 15 8.5 22 9.3 17 14 18.2 21 12 17.3 5.8 21 7 14 2 9.3 9 8.5 12 2" />
    </svg>
)

const HeartIcon = ({ filled = false }: { filled?: boolean }) => (
    <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill={filled ? '#ff4d6d' : 'none'}
        stroke="#ff4d6d"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon heart-icon"
    >
        <path d="M12 21s-6.5-4.3-9.3-8.5C.8 9.3 3.1 5 7 5c2.3 0 3.8 1.6 5 3 1.2-1.4 2.7-3 5-3 3.9 0 6.2 4.3 4.3 7.5C18.5 16.7 12 21 12 21z" />
    </svg>
)

const Movie: FC<MovieProps> = ({ movie, viewTrailer }) => {
    const [showOverview, setShowOverview] = useState(false)
    const [imageError, setImageError] = useState(false)

    const dispatch = useDispatch()
    const { starMovie, unstarMovie } = starredSlice.actions
    const { addToWatchLater, removeFromWatchLater } = watchLaterSlice.actions

    return (
        <div className="movie" data-testid="movie-card">
            <img
                src={imageError ? fallbackImage : `${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                className="movie__poster"
                onError={() => setImageError(true)}
            />
            <div className="movie__info">
                <h3 title={movie.title}>{movie.title}</h3>

                <div className="content-wrapper">
                    <p className={`overview ${showOverview ? 'expanded' : ''}`}>
                        {movie.overview}
                    </p>
                    <div className={`fade-overlay ${showOverview ? 'hidden' : ''}`} />
                </div>

                <button
                    className="toggle-overview"
                    onClick={() => setShowOverview(!showOverview)}
                >
                    {showOverview ? 'Show less' : 'Read more'}
                </button>

                <div className="movie__actions">
                    <button
                        className="btn btn-primary"
                        onClick={() => viewTrailer(movie)}
                    >
                        View Trailer
                    </button>

                    <button
                        data-testid="star"
                        className={`btn-icon ${movie.isStarred ? 'active-star' : ''}`}
                        onClick={() =>
                            dispatch(movie.isStarred ? unstarMovie(movie) : starMovie(movie))
                        }
                        aria-label={movie.isStarred ? 'Remove from starred' : 'Add to starred'}
                    >
                        <StarIcon filled={movie.isStarred} />
                    </button>

                    <button
                        data-testid="watch-later"
                        className={`btn-icon ${movie.watchLater ? 'active-heart' : ''}`}
                        onClick={() =>
                            dispatch(
                                movie.watchLater
                                    ? removeFromWatchLater(movie)
                                    : addToWatchLater(movie)
                            )
                        }
                        aria-label={
                            movie.watchLater ? 'Remove from watch later' : 'Add to watch later'
                        }
                    >
                        <HeartIcon filled={movie.watchLater} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Movie
