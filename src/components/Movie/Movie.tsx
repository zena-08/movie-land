import { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { MovieType } from 'types'
import starredSlice from 'store/starredSlice'
import watchLaterSlice from 'store/watchLaterSlice'
import fallbackImage from 'assets/not-found-500X750.jpeg'
import { IMAGE_BASE_URL } from 'utils/constants'

import styles from './movie.module.scss'

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
        aria-hidden="true"
        role="img"
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
        aria-hidden="true"
        role="img"
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
        <article className={styles.movie} data-testid="movie-card" role="article">
            <img
                src={imageError ? fallbackImage : `${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={`Poster for ${movie.title}`}
                className={styles['movie__poster']}
                onError={() => setImageError(true)}
            />
            <div className={styles['movie__info']}>
                <h3 title={movie.title} id={`movie-title-${movie.id}`}>{movie.title}</h3>

                <div className={styles['content-wrapper']}>
                    <p
                        className={`${styles.overview} ${showOverview ? styles.expanded : ''}`}
                        aria-expanded={showOverview}
                        aria-labelledby={`movie-title-${movie.id}`}
                    >
                        {movie.overview}
                    </p>
                    <div
                        className={`${styles['fade-overlay']} ${showOverview ? styles.hidden : ''}`}
                        aria-hidden="true"
                    />
                </div>

                <button
                    className={styles['toggle-overview']}
                    onClick={() => setShowOverview(!showOverview)}
                    aria-expanded={showOverview}
                    aria-controls={`movie-overview-${movie.id}`}
                >
                    {showOverview ? 'Show less' : 'Read more'}
                </button>

                <div className={styles['movie__actions']} role="group" aria-label="Movie actions">
                    <button
                        className={`${styles.btn} ${styles['btn-primary']}`}
                        onClick={() => viewTrailer(movie)}
                        aria-label={`Watch trailer for ${movie.title}`}
                    >
                        View Trailer
                    </button>

                    <button
                        data-testid="star"
                        className={`${styles.btn} ${styles['btn-icon']} ${movie.isStarred ? styles.activeStar : ''}`}
                        onClick={() =>
                            dispatch(movie.isStarred ? unstarMovie(movie.id) : starMovie(movie.id))
                        }
                        aria-label={movie.isStarred ? `Remove ${movie.title} from starred` : `Add ${movie.title} to starred`}
                        aria-pressed={movie.isStarred}
                    >
                        <StarIcon filled={movie.isStarred} />
                    </button>

                    <button
                        data-testid="watch-later"
                        className={`${styles['btn-icon']} ${movie.watchLater ? styles['active-heart'] : ''}`}
                        onClick={() =>
                            dispatch(
                                movie.watchLater
                                    ? removeFromWatchLater(movie.id)
                                    : addToWatchLater(movie.id)
                            )
                        }
                        aria-label={
                            movie.watchLater
                                ? `Remove ${movie.title} from watch later`
                                : `Add ${movie.title} to watch later`
                        }
                        aria-pressed={movie.watchLater}
                    >
                        <HeartIcon filled={movie.watchLater} />
                    </button>
                </div>
            </div>
        </article>
    )
}

export default Movie
