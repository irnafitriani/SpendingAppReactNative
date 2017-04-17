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
<<<<<<< HEAD
            // var settingRef = firebase.database().ref().child('settings').orderByChild('userId').equalTo(action.userId)
            // settingRef.on('value', (settings) => {
            //     settings.forEach((setting) => {
            //         var budget = setting.val().budget
            //         state = budget
            //     })
            // })
            console.log('budget in setting reducer ', action.budget)
            var newState = action.budget
=======
            state = action.budget
>>>>>>> 2322f2a6575c93bef2d1c428db1f0c58ef8fb856
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
<<<<<<< HEAD
<<<<<<< HEAD
        if(action.userId !== undefined) {
            // var settingRef = firebase.database().ref().child('settings').orderByChild('userId').equalTo(action.userId)
            // settingRef.on('value', (settings) => {
            //     settings.forEach((setting) => {
            //         var budget = setting.val().currency
            //         state = budget
            //     })
            // })
            console.log('currency in setting reducer ', action.currency)
            var newState = action.currency
        }
        return newState
=======
=======
        console.log('currency reducer ', action.currency)
>>>>>>> 42ce6a3928b847da327a757c0f599d2e92f79a2a
        return action.currency
>>>>>>> 2322f2a6575c93bef2d1c428db1f0c58ef8fb856
    }
})

