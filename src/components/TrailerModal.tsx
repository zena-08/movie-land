import { FC } from 'react'
import { useMovies } from '../context/MovieContext'
import YouTubePlayer from './YoutubePlayer'
import { CloseIcon } from '../icons'
import '../styles/trailerModal.scss'

const TrailerModal: FC = () => {
    const { videoKey, isLoading, error, isTrailerOpen, closeTrailer } = useMovies()

    if (!isTrailerOpen) return null;

    return (
        <div className="trailer-modal-overlay" onClick={closeTrailer}>
            <div className="trailer-modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-button" onClick={closeTrailer}>
                    <CloseIcon />
                </button>

                <div className="trailer-content">
                    {isLoading && (
                        <div className="trailer-message">
                            <h6>Loading trailer...</h6>
                        </div>
                    )}

                    {error && (
                        <div className="trailer-message">
                            <h6>{error}</h6>
                        </div>
                    )}

                    {!isLoading && !error && !videoKey && (
                        <div className="trailer-message">
                            <h6>No trailer available. Try another movie.</h6>
                        </div>
                    )}

                    {videoKey && <YouTubePlayer videoKey={videoKey} />}
                </div>
            </div>
        </div>
    )
}

export default TrailerModal 