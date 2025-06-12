import { FC } from 'react'
import '../styles/loading.scss'

interface LoadingStateProps {
    message?: string;
}

const LoadingState: FC<LoadingStateProps> = ({ message = 'Loading...' }) => (
    <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">{message}</p>
    </div>
)

export default LoadingState 