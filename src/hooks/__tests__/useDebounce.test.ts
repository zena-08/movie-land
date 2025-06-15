import { act } from 'react'
import { renderHook } from '@testing-library/react'
import { useDebounce } from '../useDebounce'

describe('useDebounce', () => {
    beforeEach(() => {
        jest.useFakeTimers()
    })

    afterEach(() => {
        jest.useRealTimers()
    })

    it('should return initial value immediately', () => {
        const { result } = renderHook(() => useDebounce('initial', 500))
        expect(result.current).toBe('initial')
    })

    it('should debounce value changes', () => {
        const { result, rerender } = renderHook(
            ({ value, delay }) => useDebounce(value, delay),
            { initialProps: { value: 'initial', delay: 500 } }
        )

        // Change the value
        rerender({ value: 'changed', delay: 500 })
        expect(result.current).toBe('initial') // Should still have old value

        // Fast forward time
        act(() => {
            jest.advanceTimersByTime(500)
        })

        expect(result.current).toBe('changed') // Should have new value
    })

    it('should cancel previous timeout when value changes', () => {
        const { result, rerender } = renderHook(
            ({ value, delay }) => useDebounce(value, delay),
            { initialProps: { value: 'initial', delay: 500 } }
        )

        // Change value multiple times
        rerender({ value: 'changed1', delay: 500 })
        act(() => {
            jest.advanceTimersByTime(200) // Advance partially
        })
        rerender({ value: 'changed2', delay: 500 })
        act(() => {
            jest.advanceTimersByTime(200) // Advance partially again
        })

        expect(result.current).toBe('initial') // Should still have initial value

        // Fast forward remaining time
        act(() => {
            jest.advanceTimersByTime(500)
        })

        expect(result.current).toBe('changed2') // Should have final value
    })
}) 