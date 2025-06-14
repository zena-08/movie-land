import { FC, Suspense, lazy } from 'react'
import { Routes, Route } from "react-router-dom"
import 'reactjs-popup/dist/index.css'
import { MovieProvider } from 'context/MovieContext'
import Header from 'components/Header'
import { MESSAGES } from 'utils/constants'
import './app.scss'

// Lazy load page components
const HomePage = lazy(() => import('pages/HomePage'))
const StarredPage = lazy(() => import('pages/StarredPage'))
const WatchLaterPage = lazy(() => import('pages/WatchLaterPage'))
const TrailerModal = lazy(() => import('components/TrailerModal'))

// Loading component for Suspense fallback
const LoadingFallback = () => (
    <div className="loading-container">
        <div className="loading-spinner"></div>
    </div>
)

const AppRoutes: FC = () => (
    <Suspense fallback={<LoadingFallback />}>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/starred" element={<StarredPage />} />
            <Route path="/watch-later" element={<WatchLaterPage />} />
            <Route path="*" element={<h1 className="not-found">{MESSAGES.PAGE_NOT_FOUND}</h1>} />
        </Routes>
    </Suspense>
)

const App: FC = () => {
    return (
        <MovieProvider>
            <div className="App">
                <Header />
                <div className="container">
                    <AppRoutes />
                </div>
                <Suspense fallback={null}>
                    <TrailerModal />
                </Suspense>
            </div>
        </MovieProvider>
    )
}

export default App 