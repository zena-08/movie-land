import { createContext, useContext, FC, ReactNode, useState } from 'react'
import { useAppSelector } from 'store';
import { MovieType } from 'types';
import { useMovieTrailer } from 'hooks/useMovieTrailer'

type MovieContextType = {
    movies: {
        results: MovieType[];
        page: number;
        total_pages: number;
    };
    videoKey: string | null;
    isLoading: boolean;
    error: string | null;
    getMovieTrailer: (movie: MovieType) => void;
    starredMovies: number[];
    watchLaterMovies: number[];
    isTrailerOpen: boolean;
    closeTrailer: () => void;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined)

type MovieProviderProps = {
    children: ReactNode;
}

export const MovieProvider: FC<MovieProviderProps> = ({ children }) => {
    const [isTrailerOpen, setIsTrailerOpen] = useState(false)
    const movies = useAppSelector((state) => state.movies.movies)
    const starredMovies = useAppSelector((state) => state.starred.starredMovies)
    const watchLaterMovies = useAppSelector((state) => state.watchLater.watchLaterMovies)
    const { videoKey, isLoading, error, getMovieTrailer: fetchTrailer } = useMovieTrailer()

    // Add isStarred and watchLater flags to movies
    const moviesWithFlags = {
        ...movies,
        results: movies?.results?.map((movie) => ({
            ...movie,
            isStarred: starredMovies.some((m) => m === movie.id),
            watchLater: watchLaterMovies.some((m) => m === movie.id)
        })) || []
    }

    const getMovieTrailer = (movie: MovieType) => {
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