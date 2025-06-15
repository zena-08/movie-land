module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '^types$': '<rootDir>/src/types',
        '^store$': '<rootDir>/src/store',
        '^hooks/(.*)$': '<rootDir>/src/hooks/$1',
        '^utils/(.*)$': '<rootDir>/src/utils/$1',
        '^context/(.*)$': '<rootDir>/src/context/$1',
        '^components/(.*)$': '<rootDir>/src/components/$1',
        '^pages/(.*)$': '<rootDir>/src/pages/$1',
        '^assets/(.*)$': '<rootDir>/src/assets/$1'
    },
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts']
} 