export default function createReducer(initialState, handlers) {
    return function reducer(state = initialState, action) {
        if(handlers.hasOwnProperty(action.tyoe)) {
            return handlers[action.tyoe](state, action)
        } else {
            return state
        }
    }
}