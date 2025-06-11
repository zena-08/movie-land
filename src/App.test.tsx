import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from "./test/utils"
import App from './App'

describe('App Component', () => {
    it('renders navigation links', () => {
        renderWithProviders(<App />)
        expect(screen.getByText(/watch later/i)).toBeInTheDocument()
        expect(screen.getByTestId('nav-starred')).toBeInTheDocument()
    })

    it('searches for movies and plays trailer', async () => {
        const user = userEvent.setup()
        renderWithProviders(<App />)
        const searchInput = screen.getByTestId('search-movies')

        await user.type(searchInput, 'forrest gump')

        await waitFor(() => {
            expect(screen.getAllByText('Through the Eyes of Forrest Gump')[0]).toBeInTheDocument()
        })

        // Click trailer button and verify player appears
        const viewTrailerBtn = screen.getAllByText('View Trailer')[0]
        await user.click(viewTrailerBtn)
        await waitFor(() => {
            expect(screen.getByTestId('youtube-player')).toBeInTheDocument()
        })
    })

    describe('Watch Later Page', () => {
        it('shows empty state message when no movies are saved', async () => {
            const user = userEvent.setup()
            renderWithProviders(<App />)
            await user.click(screen.getByText(/watch later/i))

            expect(screen.getByText(/You have no movies saved to watch later/i)).toBeInTheDocument()
            expect(screen.getByTestId('watch-later-div')).toBeInTheDocument()
        })
    })

    describe('Starred Page', () => {
        it('shows empty state message when no movies are starred', async () => {
            const user = userEvent.setup()
            renderWithProviders(<App />)
            await user.click(screen.getByTestId('nav-starred'))

            expect(screen.getByText(/You have no starred movies/i)).toBeInTheDocument()
            expect(screen.getByTestId('starred-div')).toBeInTheDocument()
        })
    })
}) 