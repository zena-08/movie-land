import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

// Mock IntersectionObserver
class MockIntersectionObserver {
    observe = jest.fn()
    disconnect = jest.fn()
    unobserve = jest.fn()
}

Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver
})

// Mock fetch
global.fetch = jest.fn()

// Mock axios
jest.mock('axios', () => ({
    get: jest.fn()
})) 
