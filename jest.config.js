module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    moduleNameMapper: {
        '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js',
    },
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
        '^.+\\.(js|jsx)$': 'babel-jest'
    }
} 