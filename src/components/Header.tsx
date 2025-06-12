import { FC } from 'react'
import { Link, NavLink } from "react-router-dom"
import { useSelector } from 'react-redux'
import { RootState } from '../test/utils'
import { useSearch } from '../hooks/useSearch'
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
    const { searchTerm, handleSearch } = useSearch()

    return (
        <header className="header">
            <div className="header-left">
                <Link to="/" data-testid="home">
                    <i className="bi bi-film film-icon" />
                </Link>
                <Link to="/" className="logo">MovieLand</Link>
            </div>

            <nav className="nav">
                <NavLink to="/starred" data-testid="nav-starred" className="nav-link">
                    <div className="icon-wrapper">
                        <StarIcon filled={starredMovies.length > 0} />
                        {starredMovies.length > 0 && (
                            <sup className="star-number">{starredMovies.length}</sup>
                        )}
                    </div>
                    <span className="label-text">Starred</span>
                </NavLink>

                <NavLink to="/watch-later" className="nav-link">
                    <HeartIcon />
                    <span className="label-text">Watch Later</span>
                </NavLink>
            </nav>

            <div className="input-group">
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