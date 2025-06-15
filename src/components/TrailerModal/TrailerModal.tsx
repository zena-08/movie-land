import { FC, useEffect, useRef } from 'react'
import { useMovies } from 'context/MovieContext'
import YouTubePlayer from 'components/YoutubePlayer'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import { CloseIcon } from 'icons'
import styles from './trailerModal.module.scss'

const VideoPlayerWithErrorBoundary: FC<{ videoKey: string }> = ({ videoKey }) => (
    <ErrorBoundary
        fallback={
            <div className={styles['trailer-message']} role="alert">
                <h6>Failed to load video player. Please try again.</h6>
            </div>
        }
    >
        <YouTubePlayer videoKey={videoKey} />
    </ErrorBoundary>
)

const TrailerModal: FC = () => {
    const { videoKey, isLoading, error, isTrailerOpen, closeTrailer } = useMovies()
    const modalRef = useRef<HTMLDivElement>(null)
    const closeButtonRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        if (isTrailerOpen) {
            // Focus the close button when modal opens
            closeButtonRef.current?.focus()

            // Handle keyboard events
            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'Escape') {
                    closeTrailer()
                }
            }

            document.addEventListener('keydown', handleKeyDown)
            return () => document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isTrailerOpen, closeTrailer])

    if (!isTrailerOpen) return null;

    return (
        <div
            ref={modalRef}
            className={styles['trailer-modal-overlay']}
            onClick={closeTrailer}
            role="dialog"
            aria-modal="true"
            aria-label="Movie trailer"
        >
            <div
                className={styles['trailer-modal-content']}
                onClick={e => e.stopPropagation()}
                role="document"
            >
                <button
                    ref={closeButtonRef}
                    className={styles['close-button']}
                    onClick={closeTrailer}
                    aria-label="Close trailer"
                    tabIndex={0}
                >
                    <CloseIcon aria-hidden="true" />
                </button>

                <div className={styles['trailer-content']}>
                    {isLoading && (
                        <div className={styles['trailer-message']} role="status" tabIndex={0}>
                            <h6>Loading trailer...</h6>
                        </div>
                    )}

                    {error && (
                        <div className={styles['trailer-message']} role="alert" tabIndex={0}>
                            <h6>{error}</h6>
                        </div>
                    )}

                    {!isLoading && !error && !videoKey && (
                        <div className={styles['trailer-message']} role="status" tabIndex={0}>
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