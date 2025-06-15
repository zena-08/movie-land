import { act } from 'react'
import { renderHook } from '@testing-library/react'
import { useInfiniteScroll } from '../useInfiniteScroll'

describe('useInfiniteScroll', () => {
    let mockObserve: jest.Mock
    let mockDisconnect: jest.Mock
    let mockUnobserve: jest.Mock
    let mockCallback: (entries: { isIntersecting: boolean }[]) => void

    beforeEach(() => {
        mockObserve = jest.fn()
        mockDisconnect = jest.fn()
        mockUnobserve = jest.fn()

        // Mock IntersectionObserver
        Object.defineProperty(window, 'IntersectionObserver', {
            writable: true,
            configurable: true,
            value: jest.fn().mockImplementation((callback) => {
                mockCallback = callback
                return {
                    observe: mockObserve,
                    disconnect: mockDisconnect,
                    unobserve: mockUnobserve
                }
            })
        })
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should initialize with default values', async () => {
        const callback = jest.fn()
        let result: any

        await act(async () => {
            const rendered = renderHook(() => useInfiniteScroll(callback))
            result = rendered.result
            await Promise.resolve()
        })

        expect(result.current.isFetching).toBe(false)
        expect(typeof result.current.observerTarget).toBe('function')
    })

    it('should call callback when element is intersecting', async () => {
        const callback = jest.fn()
        let result: any

        await act(async () => {
            const rendered = renderHook(() => useInfiniteScroll(callback))
            result = rendered.result
            await Promise.resolve()
        })

        // Create a mock element
        const mockElement = document.createElement('div')

        // Set up the observer
        await act(async () => {
            result.current.observerTarget(mockElement)
            await Promise.resolve()
        })

        // Simulate intersection
        await act(async () => {
            if (mockCallback) {
                mockCallback([{ isIntersecting: true }])
            }
            await Promise.resolve()
        })

        // Wait for state updates and useEffect
        await act(async () => {
            await Promise.resolve()
        })

        // Wait for callback to be called
        await act(async () => {
            await Promise.resolve()
        })

        expect(result.current.isFetching).toBe(false) // Should be false after callback is called
        expect(callback).toHaveBeenCalled()
    })

    it('should not call callback when element is not intersecting', async () => {
        const callback = jest.fn()
        let result: any

        await act(async () => {
            const rendered = renderHook(() => useInfiniteScroll(callback))
            result = rendered.result
            await Promise.resolve()
        })

        // Create a mock element
        const mockElement = document.createElement('div')

        // Set up the observer
        await act(async () => {
            result.current.observerTarget(mockElement)
            await Promise.resolve()
        })

        // Simulate non-intersection
        await act(async () => {
            if (mockCallback) {
                mockCallback([{ isIntersecting: false }])
            }
            await Promise.resolve()
        })

        // Wait for state updates
        await act(async () => {
            await Promise.resolve()
        })

        expect(result.current.isFetching).toBe(false)
        expect(callback).not.toHaveBeenCalled()
    })

    it('should cleanup observer on unmount', async () => {
        const callback = jest.fn()
        let rendered: any

        await act(async () => {
            rendered = renderHook(() => useInfiniteScroll(callback))
            await Promise.resolve()
        })

        // Create a mock element and set up the observer
        const mockElement = document.createElement('div')
        await act(async () => {
            rendered.result.current.observerTarget(mockElement)
            await Promise.resolve()
        })

        // Ensure observer is initialized
        expect(mockObserve).toHaveBeenCalledWith(mockElement)

        // Set observer target to null to trigger cleanup
        await act(async () => {
            rendered.result.current.observerTarget(null)
            await Promise.resolve()
        })

        // Verify cleanup
        expect(mockDisconnect).toHaveBeenCalled()
        expect(mockObserve).toHaveBeenCalledTimes(1)
        expect(mockDisconnect).toHaveBeenCalledTimes(1)
    })
}) 