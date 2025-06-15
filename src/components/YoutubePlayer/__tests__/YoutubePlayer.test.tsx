import { render, screen } from '@testing-library/react'
import YoutubePlayer from '../YoutubePlayer'

// Mock react-player since we don't want to actually load YouTube videos in tests
jest.mock('react-player', () => {
    return function MockReactPlayer(props: any) {
        return <div data-testid="youtube-player" {...props} />
    }
})

describe('YoutubePlayer', () => {
    it('renders with correct video key', () => {
        const videoKey = 'test123'
        render(<YoutubePlayer videoKey={videoKey} />)

        const player = screen.getByTestId('youtube-player')
        expect(player).toBeInTheDocument()
        expect(player).toHaveAttribute('url', `https://www.youtube.com/watch?v=${videoKey}`)
        expect(player).toHaveAttribute('width', '100%')
        expect(player).toHaveAttribute('height', '100%')
    })
}) 