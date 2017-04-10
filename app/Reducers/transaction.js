import createReducer from '../Helpers/createReducer'
import * as types from '../Helpers/actionTypes'

export const addTransaction = createReducer({}, {
    [types.ADD_TRANSACTION](state, action) {
        let newState = {}
        console.log('transactionReducer - state ',state)
        console.log('transactionReducer - action ', action.transaction)
        return newState
    }
})

export const updateTransaction = createReducer({}, {
    [types.UPDATE_TRANSACTION](state, action) {
        let newState = {}
        console.log('transactionReducer - state ',state)
        console.log('transactionReducer - action ', action.transaction)
        return newState
    }
})

export const deleteTransaction = createReducer({}, {
    [types.DELETE_TRANSACTION](state, action) {
        let newState = {}
        console.log('transactionReducer - state ',state)
        console.log('transactionReducer - action ', action.transaction)
        return newState
    }
})

export const addToLog = createReducer(0, {
    [types.any](state, action){
        return state + ' add state'
    }
})