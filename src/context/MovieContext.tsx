import { createContext, useContext, FC, ReactNode, useState } from 'react'
import { useSelector } from 'react-redux'
import { useMovieTrailer } from '../hooks/useMovieTrailer'

type Movie = {
    id: string;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    isStarred?: boolean;
    watchLater?: boolean;
}

type MovieContextType = {
    movies: {
        results: Movie[];
    };
    videoKey: string | null;
    isLoading: boolean;
    error: string | null;
    getMovieTrailer: (movie: Movie) => void;
    starredMovies: Movie[];
    watchLaterMovies: Movie[];
    isTrailerOpen: boolean;
    closeTrailer: () => void;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined)

type MovieProviderProps = {
    children: ReactNode;
}

export const MovieProvider: FC<MovieProviderProps> = ({ children }) => {
    const [isTrailerOpen, setIsTrailerOpen] = useState(false)
    const movies = useSelector((state: any) => state.movies.movies)
    const starredMovies = useSelector((state: any) => state.starred.starredMovies)
    const watchLaterMovies = useSelector((state: any) => state.watchLater.watchLaterMovies)
    const { videoKey, isLoading, error, getMovieTrailer: fetchTrailer } = useMovieTrailer()

    // Add isStarred and watchLater flags to movies
    const moviesWithFlags = {
        ...movies,
        results: movies?.results?.map((movie: Movie) => ({
            ...movie,
            isStarred: starredMovies.some((m: Movie) => m.id === movie.id),
            watchLater: watchLaterMovies.some((m: Movie) => m.id === movie.id)
        })) || []
    }

    const getMovieTrailer = (movie: Movie) => {
        setIsTrailerOpen(true)
        fetchTrailer(movie)
    }

    const closeTrailer = () => {
        setIsTrailerOpen(false)
    }

    const value = {
        movies: moviesWithFlags,
        videoKey,
        isLoading,
        error,
        getMovieTrailer,
        starredMovies,
        watchLaterMovies,
        isTrailerOpen,
        closeTrailer
    }

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    )
}

export const useMovies = () => {
    const context = useContext(MovieContext)
    if (!context) {
        throw new Error('useMovies must be used within a MovieProvider')
    }
    return context
} 