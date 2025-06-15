import { Link, NavLink } from "react-router-dom"
import { useSearch } from 'hooks/useSearch'
import styles from './header.module.scss'

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
        aria-hidden="true"
        role="img"
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
        aria-hidden="true"
        role="img"
    >
        <path d="M12 21s-6.5-4.3-9.3-8.5C.8 9.3 3.1 5 7 5c2.3 0 3.8 1.6 5 3 1.2-1.4 2.7-3 5-3 3.9 0 6.2 4.3 4.3 7.5C18.5 16.7 12 21 12 21z" />
    </svg>
)

const MovieIcon = () => (
    <svg
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
        aria-hidden="true"
        role="img"
    >
        <path d="M4 4.5L20 3l-1.5 4L5.5 8.5 4 4.5z" />
        <path d="M20 3v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4" />
        <path d="M4 10h16" />
    </svg>
);

const Header = () => {
    const { searchTerm, handleSearch } = useSearch()

    return (
        <header className={styles.header} role="banner">
            <div className={styles['header-left']}>
                <Link
                    to="/"
                    data-testid="home"
                    aria-label="Go to home page"
                    tabIndex={0}
                >
                    <MovieIcon />
                </Link>
                <Link
                    to="/"
                    className={styles.logo}
                    aria-label="MovieLand home"
                    tabIndex={0}
                >
                    MovieLand
                </Link>
            </div>

            <nav className={styles.nav} role="navigation" aria-label="Main navigation">
                <NavLink
                    to="/starred"
                    data-testid="nav-starred"
                    className={styles['nav-link']}
                    aria-label="View starred movies"
                    tabIndex={0}
                >
                    <div className={styles['icon-wrapper']}>
                        <StarIcon filled />
                    </div>
                    <span className={styles['label-text']}>Starred</span>
                </NavLink>

                <NavLink
                    to="/watch-later"
                    className={styles['nav-link']}
                    aria-label="View watch later list"
                    tabIndex={0}
                >
                    <HeartIcon />
                    <span className={styles['label-text']}>Watch Later</span>
                </NavLink>
            </nav>

            <div className={styles['input-group']} role="search">
                <input
                    type="search"
                    data-testid="search-movies"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className={styles['search-input']}
                    placeholder="Search movies..."
                    aria-label="Search movies"
                    aria-describedby="search-description"
                    tabIndex={0}
                />
                <span id="search-description" className="sr-only">Search for movies by title</span>
            </div>
        </header>
    )
}

export default Header