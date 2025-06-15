import { useState } from 'react'
import { BASE_URL, API_KEY } from 'utils/constants'

interface Movie {
    id: string | number;
    title: string;
}

interface VideoResult {
    key: string;
    type: string;
}

interface MovieResponse {
    videos?: {
        results: VideoResult[];
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
            const data: MovieResponse = await response.json()

            if (data.videos && data.videos.results.length) {
                const trailer = data.videos.results.find(vid => vid.type === 'Trailer')
                setVideoKey(trailer ? trailer.key : data.videos.results[0].key)
            } else {
                setError('No trailer found')
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