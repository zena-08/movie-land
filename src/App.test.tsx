import { screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from "utils/test-utils"
import App from './App'

// Mock the MESSAGES constant
jest.mock('utils/constants', () => ({
    MESSAGES: {
        PAGE_NOT_FOUND: 'Page not found'
    }
}))

// Mock the Header component
jest.mock('components/Header', () => () => <header data-testid="header">Header</header>)

// Mock the lazy-loaded components
jest.mock('pages/HomePage', () => () => <div data-testid="home-page">Home Page</div>)
jest.mock('pages/StarredPage', () => () => <div data-testid="starred-page">Starred Page</div>)
jest.mock('pages/WatchLaterPage', () => () => <div data-testid="watch-later-page">Watch Later Page</div>)
jest.mock('components/TrailerModal', () => () => <div data-testid="trailer-modal">Trailer Modal</div>)

describe('App Component', () => {
    beforeEach(() => {
        // Reset the URL before each test
        window.history.pushState({}, '', '/')
    })

    it('renders the app with header', () => {
        renderWithProviders(<App />)
        expect(screen.getByTestId('header')).toBeInTheDocument()
    })

    it('renders home page by default', () => {
        renderWithProviders(<App />)
        expect(screen.getByTestId('home-page')).toBeInTheDocument()
    })

    it('renders starred page when navigating to /starred', async () => {
        renderWithProviders(<App />)
        window.history.pushState({}, '', '/starred')
        window.dispatchEvent(new Event('popstate'))

        await waitFor(() => {
            expect(screen.getByTestId('starred-page')).toBeInTheDocument()
        })
    })

    it('renders watch later page when navigating to /watch-later', async () => {
        renderWithProviders(<App />)
        window.history.pushState({}, '', '/watch-later')
        window.dispatchEvent(new Event('popstate'))

        await waitFor(() => {
            expect(screen.getByTestId('watch-later-page')).toBeInTheDocument()
        })
    })

    it('renders 404 page for unknown routes', async () => {
        renderWithProviders(<App />)
        window.history.pushState({}, '', '/unknown-route')
        window.dispatchEvent(new Event('popstate'))

        await waitFor(() => {
            expect(screen.getByText('Page not found')).toBeInTheDocument()
        })
    })
}) 