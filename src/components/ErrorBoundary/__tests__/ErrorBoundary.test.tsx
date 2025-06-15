import { render, screen, fireEvent } from '@testing-library/react'
import ErrorBoundary from '../ErrorBoundary'

const ThrowError = () => {
    throw new Error('Test error')
}

describe('ErrorBoundary', () => {
    beforeEach(() => {
        // Suppress console.error for expected error throws
        jest.spyOn(console, 'error').mockImplementation(() => { })
    })

    afterEach(() => {
        jest.restoreAllMocks()
    })

    it('renders children when there is no error', () => {
        render(
            <ErrorBoundary>
                <div>Test content</div>
            </ErrorBoundary>
        )

        expect(screen.getByText('Test content')).toBeInTheDocument()
    })

    it('renders error UI when there is an error', () => {
        render(
            <ErrorBoundary>
                <ThrowError />
            </ErrorBoundary>
        )

        expect(screen.getByTestId('error-boundary')).toBeInTheDocument()
        expect(screen.getByText('Something went wrong')).toBeInTheDocument()
        expect(screen.getByText('We apologize for the inconvenience. Please try refreshing the page.')).toBeInTheDocument()
        expect(screen.getByText('Refresh Page')).toBeInTheDocument()
    })

    it('renders custom fallback when provided', () => {
        const fallback = <div>Custom error message</div>

        render(
            <ErrorBoundary fallback={fallback}>
                <ThrowError />
            </ErrorBoundary>
        )

        expect(screen.getByText('Custom error message')).toBeInTheDocument()
    })

    it('calls window.location.reload when refresh button is clicked', () => {
        const originalLocation = window.location
        const mockReload = jest.fn()
        Object.defineProperty(window, 'location', {
            value: { reload: mockReload },
            writable: true
        })

        render(
            <ErrorBoundary>
                <ThrowError />
            </ErrorBoundary>
        )

        fireEvent.click(screen.getByText('Refresh Page'))
        expect(mockReload).toHaveBeenCalled()

        Object.defineProperty(window, 'location', {
            value: originalLocation,
            writable: true
        })
    })
}) 