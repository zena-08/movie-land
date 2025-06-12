import { useEffect, useRef, useState, useCallback } from 'react'

export const useInfiniteScroll = (callback: () => void) => {
    const [isFetching, setIsFetching] = useState(false)
    const observer = useRef<IntersectionObserver | null>(null)

    const observerTarget = useCallback((node: HTMLDivElement | null) => {
        if (observer.current) observer.current.disconnect()
        if (node) {
            observer.current = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) {
                        setIsFetching(true)
                    }
                },
                { threshold: 0.1 }
            )
            observer.current.observe(node)
        }
    }, [])

    useEffect(() => {
        if (!isFetching) return
        callback()
        setIsFetching(false)
    }, [isFetching, callback])

    return { observerTarget, isFetching }
}