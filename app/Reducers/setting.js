import createReducer from '../Helpers/createReducer'
import * as types from '../Helpers/actionTypes'
import firebase from 'firebase'

export const userId = createReducer('', {
    [types.USER_ID](state, action) {
        var newState = action.userId !== undefined ? action.userId : state
        return newState
    }
})

export const budget = createReducer(0, {    
    [types.BUDGET](state, action) {
        var newState = action.budget !== undefined ? action.budget : state
        return newState
    }
})

export const budgetSetting = createReducer(0, {    
    [types.BUDGET_SETTING](state, action) {
        var newState = action.budgetSetting !== undefined ? action.budgetSetting : state
        return newState
    }
})

export const symbolCurrency = createReducer('', {
    [types.SYMBOLCURRENCY](state, action){
        if(action.userId !== undefined){
             var newState = action.symbolCurrency
        }
        return newState
    }
})

export const forexRate = createReducer('', {
    [types.FOREX_RATE](state, action){
        return action.rate
    }
})

export const currency = createReducer('', {    
    [types.CURRENCY](state, action) {
        return action.currency
    }
})

