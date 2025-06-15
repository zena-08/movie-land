import { FC } from 'react'
import styles from './loading.module.scss'

interface LoadingStateProps {
    message?: string;
}

const LoadingState: FC<LoadingStateProps> = ({ message = 'Loading...' }) => (
    <div className={styles['loading-container']}>
        <div className={styles['loading-spinner']} data-testid="loading-spinner"></div>
        <p className={styles['loading-text']}>{message}</p>
    </div>
)

export default LoadingState 