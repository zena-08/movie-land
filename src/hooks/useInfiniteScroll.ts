import { useEffect, useRef, useState } from 'react'

export const useInfiniteScroll = (callback: () => void) => {
    const [isFetching, setIsFetching] = useState(false)
    const observerTarget = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsFetching(true)
                }
            },
            { threshold: 0.1 }
        )

        const currentTarget = observerTarget.current
        if (currentTarget) {
            observer.observe(currentTarget)
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget)
            }
        }
    }, [])

    useEffect(() => {
        if (!isFetching) return

        callback()
        setIsFetching(false)
    }, [isFetching, callback])

    return { observerTarget, isFetching }
} 