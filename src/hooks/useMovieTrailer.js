import { useState } from 'react'
import { ENDPOINT, API_KEY } from '../constants'

export const useMovieTrailer = () => {
    const [videoKey, setVideoKey] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const getMovieTrailer = async (movie) => {
        try {
            setIsLoading(true)
            setError(null)
            setVideoKey(null)

            const URL = `${ENDPOINT}/movie/${movie.id}?api_key=${API_KEY}&append_to_response=videos`
            const response = await fetch(URL)
            const data = await response.json()

            if (data.videos && data.videos.results.length) {
                const trailer = data.videos.results.find(vid => vid.type === 'Trailer')
                setVideoKey(trailer ? trailer.key : data.videos.results[0].key)
            }
        } catch (err) {
            setError('Failed to load trailer')
            console.error('Error loading trailer:', err)
        } finally {
            setIsLoading(false)
        }
    }

    return {
        videoKey,
        isLoading,
        error,
        getMovieTrailer
    }
} 