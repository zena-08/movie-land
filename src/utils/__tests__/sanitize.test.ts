import { sanitizeSearchQuery } from '../sanitize'

describe('sanitizeSearchQuery', () => {
    it('should trim whitespace', () => {
        expect(sanitizeSearchQuery('  test  ')).toBe('test')
    })

    it('should remove HTML tags', () => {
        expect(sanitizeSearchQuery('<script>alert("test")</script>test')).toBe('test')
    })

    it('should remove special characters', () => {
        expect(sanitizeSearchQuery('test<script>alert("test")</script>')).toBe('test')
        expect(sanitizeSearchQuery('test{test}')).toBe('testtest')
        expect(sanitizeSearchQuery('test[test]')).toBe('testtest')
    })

    it('should limit length to 100 characters', () => {
        const longString = 'a'.repeat(150)
        expect(sanitizeSearchQuery(longString).length).toBe(100)
    })

    it('should convert to lowercase', () => {
        expect(sanitizeSearchQuery('TEST')).toBe('test')
    })

    it('should handle empty string', () => {
        expect(sanitizeSearchQuery('')).toBe('')
    })

    it('should handle null or undefined', () => {
        expect(sanitizeSearchQuery(null as any)).toBe('')
        expect(sanitizeSearchQuery(undefined as any)).toBe('')
    })
}) 