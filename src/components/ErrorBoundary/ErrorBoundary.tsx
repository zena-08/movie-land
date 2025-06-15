import { Component, ErrorInfo, ReactNode } from 'react'
import styles from './errorBoundary.module.scss'

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            hasError: false,
            error: null
        }
    }

    static getDerivedStateFromError(error: Error): State {
        return {
            hasError: true,
            error
        }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Error caught by ErrorBoundary:', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback
            }

            return (
                <div className={styles['error-boundary']} data-testid="error-boundary">
                    <h2>Something went wrong</h2>
                    <p>We apologize for the inconvenience. Please try refreshing the page.</p>
                    <button
                        onClick={() => window.location.reload()}
                        className={styles['retry-button']}
                    >
                        Refresh Page
                    </button>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary 