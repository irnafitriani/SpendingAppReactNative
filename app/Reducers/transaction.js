import createReducer from '../Helpers/createReducer'
import * as types from '../Helpers/actionTypes'

export const addTransaction = createReducer({}, {
    [types.ADD_TRANSACTION](state, action) {
        let newState = {}
        console.log(action.transaction)
        return action.transaction
    }
})