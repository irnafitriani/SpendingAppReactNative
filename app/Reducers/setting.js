import createReducer from '../Helpers/createReducer'
import * as types from '../Helpers/actionTypes'

export const userId = createReducer('', {
    [types.USER_ID](state, action) {
        var newState = action.userId !== undefined ? action.userId : state
        console.log('new state ', newState)
        return newState
    }
})

export const budget = createReducer(0, {    
    [types.BUDGET](state, action) {
            console.log('budget in setting reducer ')
        if(action.userId !== undefined) {
            // var settingRef = firebase.database().ref().child('settings').orderByChild('userId').equalTo(action.userId)
            // settingRef.on('value', (settings) => {
            //     settings.forEach((setting) => {
            //         var budget = setting.val().budget
            //         state = budget
            //     })
            // })
            console.log('budget in setting reducer ', action.budget)
            state = action.budget
        }
        return state
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
            state = action.currency
        }
        return state
    }
})