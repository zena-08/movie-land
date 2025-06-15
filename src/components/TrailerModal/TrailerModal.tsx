import { FC } from 'react'
import { useMovies } from 'context/MovieContext'
import YouTubePlayer from 'components/YoutubePlayer'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import { CloseIcon } from 'icons'
import styles from './trailerModal.module.scss'

const VideoPlayerWithErrorBoundary: FC<{ videoKey: string }> = ({ videoKey }) => (
    <ErrorBoundary
        fallback={
            <div className={styles['trailer-message']}>
                <h6>Failed to load video player. Please try again.</h6>
            </div>
        }
    >
        <YouTubePlayer videoKey={videoKey} />
    </ErrorBoundary>
)

const TrailerModal: FC = () => {
    const { videoKey, isLoading, error, isTrailerOpen, closeTrailer } = useMovies()

    if (!isTrailerOpen) return null;

    return (
        <div className={styles['trailer-modal-overlay']} onClick={closeTrailer}>
            <div className={styles['trailer-modal-content']} onClick={e => e.stopPropagation()}>
                <button className={styles['close-button']} onClick={closeTrailer}>
                    <CloseIcon />
                </button>

                <div className={styles['trailer-content']}>
                    {isLoading && (
                        <div className={styles['trailer-message']}>
                            <h6>Loading trailer...</h6>
                        </div>
                    )}

                    {error && (
                        <div className={styles['trailer-message']}>
                            <h6>{error}</h6>
                        </div>
                    )}

                    {!isLoading && !error && !videoKey && (
                        <div className={styles['trailer-message']}>
                            <h6>No trailer available. Try another movie.</h6>
                        </div>
                    )}

                    {videoKey && <VideoPlayerWithErrorBoundary videoKey={videoKey} />}
                </div>
            </div>
        </div>
    )
}

export default TrailerModal 