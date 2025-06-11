import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { fetchMovies } from '../data/moviesSlice'
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER } from '../constants'

export const useMovieSearch = () => {
    const dispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams()
    const searchQuery = searchParams.get('search')

    const handleSearch = (query) => {
        if (query && query.trim() !== '') {
            dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=${encodeURIComponent(query.trim())}`))
            setSearchParams({ search: query })
        } else {
            dispatch(fetchMovies(ENDPOINT_DISCOVER))
            setSearchParams({})
        }
    }

    useEffect(() => {
        handleSearch(searchQuery)
    }, [])

    return {
        searchParams,
        setSearchParams,
        searchMovies: handleSearch,
        searchQuery
    }
} 