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
            // var settingRef = firebase.database().ref().child('settings').orderByChild('userId').equalTo(action.userId)
            // settingRef.on('value', (settings) => {
            //     settings.forEach((setting) => {
            //         var budget = setting.val().budget
            //         state = budget
            //     })
            // })
            console.log('budget in setting reducer ', action.budget)
            var newState = action.budget
        }
        return newState
    }
})

export const symbolCurrency = createReducer('', {
    [types.SYMBOLCURRENCY](state, action){
        if(action.userId !== undefined){
             console.log('symbol', action.symbolCurrency)
             var newState = action.symbolCurrency
        }
        return newState
    }
})

export const currency = createReducer('', {    
    [types.CURRENCY](state, action) {
        if(action.userId !== undefined) {
            // var settingRef = firebase.database().ref().child('settings').orderByChild('userId').equalTo(action.userId)
            // settingRef.on('value', (settings) => {
            //     settings.forEach((setting) => {
            //         var budget = setting.val().currency
            //         state = budget
            //     })
            // })
            console.log('currency in setting reducer ', action.currency)
        }
        return action.currency
    }
})

