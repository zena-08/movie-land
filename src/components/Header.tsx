import { FC, useState, useEffect } from 'react'
import { Link, NavLink, useNavigate, useLocation, useSearchParams } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '../store'
import { RootState } from '../test/utils'
import { fetchMovies } from '../data/moviesSlice'
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER } from '../constants'
import '../styles/header.scss'

const StarIcon = ({ filled = false }: { filled?: boolean }) => (
    <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill={filled ? '#ffd700' : 'none'}
        stroke="#ffd700"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon star-icon"
    >
        <polygon points="12 2 15 8.5 22 9.3 17 14 18.2 21 12 17.3 5.8 21 7 14 2 9.3 9 8.5 12 2" />
    </svg>
)

const HeartIcon = () => (
    <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="#ff4d6d"
        stroke="none"
        className="icon"
    >
        <path d="M12 21s-6.5-4.3-9.3-8.5C.8 9.3 3.1 5 7 5c2.3 0 3.8 1.6 5 3 1.2-1.4 2.7-3 5-3 3.9 0 6.2 4.3 4.3 7.5C18.5 16.7 12 21 12 21z" />
    </svg>
)

const Header: FC = () => {
    const { starredMovies } = useSelector((state: RootState) => state.starred)
    const [searchParams, setSearchParams] = useSearchParams()
    const searchQuery = searchParams.get('search') || ''
    const [searchTerm, setSearchTerm] = useState(searchQuery)
    const location = useLocation()
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (location.pathname === '/' && !searchQuery) {
            dispatch(fetchMovies(ENDPOINT_DISCOVER))
        }
    }, [dispatch, location.pathname])

    useEffect(() => {
        setSearchTerm(searchQuery)
    }, [searchQuery])

    const handleSearch = (value: string) => {
        setSearchTerm(value)
        if (value.trim() !== '') {
            setSearchParams({ search: value.trim() })
            if (location.pathname === '/') {
                dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=${encodeURIComponent(value.trim())}`))
            }
        } else {
            setSearchParams({})
            if (location.pathname === '/') {
                dispatch(fetchMovies(ENDPOINT_DISCOVER))
            }
        }
    }

    return (
        <header>
            <div className="header-left">
                <Link to="/" data-testid="home">
                    <i className="bi bi-film" />
                </Link>
                <div className="logo">
                    <Link to="/">MovieLand</Link>
                </div>
            </div>

            <nav className="header-nav">
                <NavLink to="/starred" data-testid="nav-starred" className="nav-starred">
                    {starredMovies.length > 0 ? (
                        <>
                            <StarIcon filled />
                            <sup className="star-number">{starredMovies.length}</sup>
                        </>
                    ) : (
                        <StarIcon />
                    )}
                </NavLink>

                <NavLink to="/watch-later" className="nav-fav">
                    <HeartIcon />
                    <span className="label-text">Watch Later</span>
                </NavLink>
            </nav>

            <div className="search-container">
                <input
                    type="search"
                    data-testid="search-movies"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="search-input"
                    placeholder="Search movies..."
                    aria-label="Search movies"
                />
            </div>
        </header>
    )
}

export default Header