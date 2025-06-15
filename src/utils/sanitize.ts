/**
 * Sanitizes a search query by:
 * 1. Trimming whitespace
 * 2. Removing special characters that could be used for injection
 * 3. Limiting length to prevent abuse
 * 4. Converting to lowercase for consistency
 */
export const sanitizeSearchQuery = (query: string | null | undefined): string => {
    if (query == null) {
        return '';
    }

    // Remove any HTML tags and their content
    const withoutHtml = query.replace(/<[^>]*>.*?<\/[^>]*>/g, '');

    // Remove any remaining special characters
    const withoutSpecialChars = withoutHtml.replace(/[<>{}[\]\\]/g, '');

    // Trim whitespace and limit length
    const sanitized = withoutSpecialChars.trim().slice(0, 100);

    return sanitized.toLowerCase();
}; 