import { useState } from 'react'
import { BASE_URL, API_KEY } from 'utils/constants'

interface Movie {
    id: string | number;
    title: string;
}

interface MovieResponse {
    videos?: {
        results: Array<{
            key: string;
            type: string;
            site: string;
        }>;
    };
}

export const useMovieTrailer = () => {
    const [videoKey, setVideoKey] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const getMovieTrailer = async (movie: Movie) => {
        try {
            setIsLoading(true)
            setError(null)
            setVideoKey(null)

            const URL = `${BASE_URL}/movie/${movie.id}?api_key=${API_KEY}&append_to_response=videos`
            const response = await fetch(URL)

            if (!response.ok) {
                throw new Error(`Server error: ${response.status} - ${response.statusText}`)
            }

            const data: MovieResponse = await response.json()

            if (!data.videos) {
                throw new Error('No video data available')
            }

            if (!data.videos.results.length) {
                throw new Error('No trailers found for this movie')
            }

            const trailer = data.videos.results.find(vid => vid.type === 'Trailer')
            if (trailer) {
                setVideoKey(trailer.key)
            } else {
                // If no trailer is found, use the first video
                setVideoKey(data.videos.results[0].key)
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to load trailer'
            setError(errorMessage)
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