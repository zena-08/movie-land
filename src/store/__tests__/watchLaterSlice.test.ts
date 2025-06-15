import watchLaterSlice from '../watchLaterSlice'

describe('watchLaterSlice', () => {
    const initialState = {
        watchLaterMovies: []
    }

    it('should handle initial state', () => {
        expect(watchLaterSlice.reducer(undefined, { type: 'unknown' })).toEqual(initialState)
    })

    it('should handle addToWatchLater', () => {
        const nextState = watchLaterSlice.reducer(initialState, watchLaterSlice.actions.addToWatchLater(1))
        expect(nextState.watchLaterMovies).toEqual([1])
    })

    it('should handle removeFromWatchLater', () => {
        const state = { watchLaterMovies: [1, 2, 3] }
        const nextState = watchLaterSlice.reducer(state, watchLaterSlice.actions.removeFromWatchLater(2))
        expect(nextState.watchLaterMovies).toEqual([1, 3])
    })

    it('should handle clearWatchLater', () => {
        const state = { watchLaterMovies: [1, 2, 3] }
        const nextState = watchLaterSlice.reducer(state, watchLaterSlice.actions.clearWatchLater())
        expect(nextState.watchLaterMovies).toEqual([])
    })

    it('should not add duplicate movies', () => {
        const state = { watchLaterMovies: [1] }
        const nextState = watchLaterSlice.reducer(state, watchLaterSlice.actions.addToWatchLater(1))
        expect(nextState.watchLaterMovies).toEqual([1])
    })
}) 