import createReducer from '../Helpers/createReducer'
import * as types from '../Helpers/actionTypes'
import firebase from 'firebase'

export const addTransaction = createReducer({}, {
    [types.ADD_TRANSACTION](state, action) {
        let newState = {}
        return newState
    }
})

export const updateTransaction = createReducer({}, {
    [types.UPDATE_TRANSACTION](state, action) {
        let newState = {}
        return newState
    }
})

export const deleteTransaction = createReducer({}, {
    [types.DELETE_TRANSACTION](state, action) {
        let newState = {}
        return newState
    }
})
