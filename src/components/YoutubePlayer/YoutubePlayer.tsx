import { FC } from 'react'
import ReactPlayer from 'react-player'
import styles from './youtubePlayer.module.scss'

interface YoutubePlayerProps {
    videoKey: string;
}

const YoutubePlayer: FC<YoutubePlayerProps> = ({ videoKey }) => (
    <div className={styles['video-player']} role="region" aria-label="Movie trailer video player">
        <ReactPlayer
            url={`https://www.youtube.com/watch?v=${videoKey}`}
            controls={true}
            playing={true}
            data-testid="youtube-player"
            width='100%'
            height='100%'
            config={{
                youtube: {
                    playerVars: {
                        modestbranding: 1,
                        rel: 0,
                        title: 'Movie trailer'
                    }
                }
            }}
        />
    </div>
)

export default YoutubePlayer    