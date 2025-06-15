import starredSlice from '../starredSlice'

describe('starredSlice', () => {
    const initialState = {
        starredMovies: []
    }

    it('should handle initial state', () => {
        expect(starredSlice.reducer(undefined, { type: 'unknown' })).toEqual(initialState)
    })

    it('should handle starMovie', () => {
        const nextState = starredSlice.reducer(initialState, starredSlice.actions.starMovie(1))
        expect(nextState.starredMovies).toEqual([1])
    })

    it('should handle unstarMovie', () => {
        const state = { starredMovies: [1, 2, 3] }
        const nextState = starredSlice.reducer(state, starredSlice.actions.unstarMovie(2))
        expect(nextState.starredMovies).toEqual([1, 3])
    })

    it('should handle clearAllStarred', () => {
        const state = { starredMovies: [1, 2, 3] }
        const nextState = starredSlice.reducer(state, starredSlice.actions.clearAllStarred())
        expect(nextState.starredMovies).toEqual([])
    })

    it('should not add duplicate movies', () => {
        const state = { starredMovies: [1] }
        const nextState = starredSlice.reducer(state, starredSlice.actions.starMovie(1))
        expect(nextState.starredMovies).toEqual([1])
    })
}) 