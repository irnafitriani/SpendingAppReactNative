import createReducer from '../Helpers/createReducer'
import * as types from '../Helpers/actionTypes'
import firebase from 'firebase'

export const userId = createReducer('', {
    [types.USER_ID](state, action) {
        var newState = action.userId !== undefined ? action.userId : state
        console.log('new state ', newState)
        return newState
    }
})

export const budget = createReducer(0, {    
    [types.BUDGET](state, action) {
        if(action.userId !== undefined) {
            state = action.budget
        }
        return state
    }
})

export const currency = createReducer('', {    
    [types.CURRENCY](state, action) {
        return action.currency
    }
})

