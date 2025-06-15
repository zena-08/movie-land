import { render, screen } from '@testing-library/react'
import LoadingState from '../LoadingState'

describe('LoadingState', () => {
    it('renders with default message', () => {
        render(<LoadingState />)

        const loadingText = screen.getByText('Loading...')
        expect(loadingText).toBeInTheDocument()
        expect(loadingText).toHaveClass('loading-text')
    })

    it('renders with custom message', () => {
        const customMessage = 'Custom loading message'
        render(<LoadingState message={customMessage} />)

        const loadingText = screen.getByText(customMessage)
        expect(loadingText).toBeInTheDocument()
        expect(loadingText).toHaveClass('loading-text')
    })

    it('renders loading spinner', () => {
        render(<LoadingState />)

        const spinner = screen.getByTestId('loading-spinner')
        expect(spinner).toBeInTheDocument()
        expect(spinner).toHaveClass('loading-spinner')
    })
}) 