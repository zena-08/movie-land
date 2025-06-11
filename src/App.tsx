import { FC } from 'react'
import { Routes, Route } from "react-router-dom"
import 'reactjs-popup/dist/index.css'
import { MovieProvider } from './context/MovieContext'
import Header from './components/Header'
import TrailerModal from './components/TrailerModal'
import { HomePage, StarredPage, WatchLaterPage } from './pages/index'
import { MESSAGES } from './constants'
import './app.scss'

const AppRoutes: FC = () => (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/starred" element={<StarredPage />} />
        <Route path="/watch-later" element={<WatchLaterPage />} />
        <Route path="*" element={<h1 className="not-found">{MESSAGES.PAGE_NOT_FOUND}</h1>} />
    </Routes>
)

const App: FC = () => {
    return (
        <MovieProvider>
            <div className="App">
                <Header />
                <div className="container">
                    <AppRoutes />
                </div>
                <TrailerModal />
            </div>
        </MovieProvider>
    )
}

export default App 