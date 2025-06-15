import { act } from 'react'
import { renderHook } from '@testing-library/react'
import { useSearch } from '../useSearch'
import { useDispatch } from 'react-redux'
import { useSearchParams, useLocation } from 'react-router-dom'
import { fetchMovies } from 'store/moviesSlice'

// Mock dependencies
jest.mock('react-redux', () => ({
    useDispatch: jest.fn()
}))

jest.mock('react-router-dom', () => ({
    useSearchParams: jest.fn(),
    useLocation: jest.fn()
}))

jest.mock('store/moviesSlice', () => ({
    fetchMovies: jest.fn()
}))

describe('useSearch', () => {
    const mockDispatch = jest.fn()
    const mockSetSearchParams = jest.fn()
    const mockSearchParams = new URLSearchParams()
    const mockLocation = { pathname: '/' }

    beforeEach(() => {
        jest.clearAllMocks()
        jest.useFakeTimers()
            ; (useDispatch as jest.Mock).mockReturnValue(mockDispatch)
            ; (useSearchParams as jest.Mock).mockReturnValue([mockSearchParams, mockSetSearchParams])
            ; (useLocation as jest.Mock).mockReturnValue(mockLocation)
    })

    afterEach(() => {
        jest.useRealTimers()
    })

    it('should initialize with empty search term', () => {
        const { result } = renderHook(() => useSearch())
        expect(result.current.searchTerm).toBe('')
    })

    it('should initialize with search param from URL', () => {
        mockSearchParams.set('search', 'test')
        const { result } = renderHook(() => useSearch())
        expect(result.current.searchTerm).toBe('test')
    })

    it('should update search term and URL when searching', () => {
        const { result } = renderHook(() => useSearch())

        act(() => {
            result.current.handleSearch('new search')
        })

        // Fast forward debounce timer
        act(() => {
            jest.advanceTimersByTime(300)
        })

        expect(result.current.searchTerm).toBe('new search')
        expect(mockSetSearchParams).toHaveBeenCalledWith({ search: 'new search' })
    })

    it('should fetch movies when search term changes', () => {
        const { result } = renderHook(() => useSearch())

        act(() => {
            result.current.handleSearch('test search')
        })

        // Fast forward debounce timer
        act(() => {
            jest.advanceTimersByTime(300)
        })

        expect(mockDispatch).toHaveBeenCalledWith(fetchMovies(expect.any(String)))
    })

    it('should clear search params when search term is empty', () => {
        const { result } = renderHook(() => useSearch())

        act(() => {
            result.current.handleSearch('')
        })

        // Fast forward debounce timer
        act(() => {
            jest.advanceTimersByTime(300)
        })

        expect(mockSetSearchParams).toHaveBeenCalledWith({})
    })

    it('should not fetch movies when not on home page', () => {
        ; (useLocation as jest.Mock).mockReturnValue({ pathname: '/starred' })
        const { result } = renderHook(() => useSearch())

        act(() => {
            result.current.handleSearch('test search')
        })

        // Fast forward debounce timer
        act(() => {
            jest.advanceTimersByTime(300)
        })

        expect(mockDispatch).not.toHaveBeenCalled()
    })
}) 