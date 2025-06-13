import { FC } from 'react'
import ReactPlayer from 'react-player'
import styles from './youtube.module.scss'

interface YoutubePlayerProps {
    videoKey: string;
}

const YoutubePlayer: FC<YoutubePlayerProps> = ({ videoKey }) => (
    <ReactPlayer
        className={styles['video-player']}
        url={`https://www.youtube.com/watch?v=${videoKey}`}
        controls={true}
        playing={true}
        data-testid="youtube-player"
    />
)

export default YoutubePlayer    