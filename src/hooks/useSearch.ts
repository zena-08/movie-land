import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams, useLocation } from 'react-router-dom'
import { fetchMovies } from '../data/moviesSlice'
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER } from '../constants'
import { AppDispatch } from '../data/store'
import { useDebounce } from './useDebounce'

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
        if (debouncedSearchTerm.trim() !== searchTerm.trim()) {
            return
        }

        if (debouncedSearchTerm.trim() !== '') {
            setSearchParams({ search: debouncedSearchTerm.trim() })
            if (location.pathname === '/') {
                dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=${encodeURIComponent(debouncedSearchTerm.trim())}`))
            }
        } else if (searchTerm.trim() === '') {
            setSearchParams({})
            if (location.pathname === '/') {
                dispatch(fetchMovies(ENDPOINT_DISCOVER))
            }
        }
    }, [debouncedSearchTerm, dispatch, location.pathname, setSearchParams])

    const handleSearch = (value: string) => {
        setSearchTerm(value)
    }

    return {
        searchTerm,
        handleSearch,
        searchQuery
    }
} 