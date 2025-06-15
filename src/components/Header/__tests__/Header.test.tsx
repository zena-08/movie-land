import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Header from '../Header'

// Mock the useSearch hook
const mockUseSearch = jest.fn()
jest.mock('hooks/useSearch', () => ({
    useSearch: () => mockUseSearch()
}))

describe('Header Component', () => {
    beforeEach(() => {
        mockUseSearch.mockReset()
    })

    it('should match snapshot', () => {
        mockUseSearch.mockReturnValue({
            searchTerm: '',
            handleSearch: jest.fn(),
        })

        const { container } = render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        )
        expect(container).toMatchSnapshot()
    })

    it('should render with search term', () => {
        mockUseSearch.mockReturnValue({
            searchTerm: 'test search',
            handleSearch: jest.fn(),
        })

        const { container } = render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        )
        expect(container).toMatchSnapshot()
    })
}) 