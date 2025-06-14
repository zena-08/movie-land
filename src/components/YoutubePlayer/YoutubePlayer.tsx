import { FC } from 'react'
import ReactPlayer from 'react-player'

interface YoutubePlayerProps {
    videoKey: string;
}

const YoutubePlayer: FC<YoutubePlayerProps> = ({ videoKey }) => (
    <ReactPlayer
        url={`https://www.youtube.com/watch?v=${videoKey}`}
        controls={true}
        playing={true}
        data-testid="youtube-player"
        width='100%'
        height='100%'
    />
)

export default YoutubePlayer    