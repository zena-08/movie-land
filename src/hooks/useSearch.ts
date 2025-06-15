import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams, useLocation } from 'react-router-dom'
import { fetchMovies } from 'store/moviesSlice'
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER } from 'utils/constants'
import { AppDispatch } from 'store'
import { useDebounce } from 'hooks/useDebounce'
import { sanitizeSearchQuery } from 'utils/sanitize'

export const useSearch = (delay = 300) => {
    const dispatch = useDispatch<AppDispatch>()
    const [searchParams, setSearchParams] = useSearchParams()
    const location = useLocation()
    const searchQuery = searchParams.get('search') || ''
    const [searchTerm, setSearchTerm] = useState(searchQuery)
    const debouncedSearchTerm = useDebounce(searchTerm, delay)

    // Update search term when URL search param changes
    useEffect(() => {
        setSearchTerm(searchQuery)
    }, [searchQuery])

    // Handle debounced search
    useEffect(() => {
        const sanitizedTerm = sanitizeSearchQuery(debouncedSearchTerm)

        if (sanitizedTerm !== sanitizeSearchQuery(searchTerm)) {
            return
        }

        if (sanitizedTerm !== '') {
            setSearchParams({ search: sanitizedTerm })
            if (location.pathname === '/') {
                dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=${encodeURIComponent(sanitizedTerm)}`))
            }
        } else if (sanitizeSearchQuery(searchTerm) === '') {
            setSearchParams({})
            if (location.pathname === '/') {
                dispatch(fetchMovies(ENDPOINT_DISCOVER))
            }
        }
    }, [debouncedSearchTerm, dispatch, location.pathname, setSearchParams, searchTerm])

    const handleSearch = (value: string) => {
        setSearchTerm(value)
    }

    return {
        searchTerm,
        handleSearch,
        searchQuery
    }
} 