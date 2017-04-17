import * as types from '../Helpers/actionTypes'
import Utils from '../Helpers/utils'
import firebase from 'firebase'

export function setUserId(userId) {
    console.log('setting action user id ', userId   )
    return (dispatch, getState) => {
        dispatch({
            type: types.USER_ID,
            userId
        })
    }
}

export function getBudget(userId) {
    return (dispatch, getState) => {
        var settingRef = firebase.database().ref().child('settings').orderByChild('userId').equalTo(userId)
        settingRef.on('value', (settings) => {
            settings.forEach((setting) => {
<<<<<<< HEAD
                budget = setting.val().budget
=======
                var budget = setting.val().budget
>>>>>>> 2322f2a6575c93bef2d1c428db1f0c58ef8fb856
                dispatch({
                    type: types.BUDGET,
                    userId,
                    budget,
                })
            })
        })
    }
}

<<<<<<< HEAD
export function setSymbolCurrency(symbolCurrency) {
    console.log('setting action symbol currency ', symbolCurrency   )
    return (dispatch, getState) => {
        dispatch({
            type: types.SYMBOLCURRENCY,
            symbolCurrency
        })
=======
>>>>>>> 2322f2a6575c93bef2d1c428db1f0c58ef8fb856
    }
}

export function getCurrencySymbol(currency) {
        var curr = Utils.currency.filter((cur) => {
            if(cur.name === currency) {
                return cur
            }
        })

        if(curr !== undefined && curr.length === 1) {
            var symbol = Utils.symbol[curr[0].key]
             dispatch({
            type: types.SYMBOLCURRENCY,
            symbolCurrency,
        })
        }
    }

export function getCurrency(userId) {
    return (dispatch, getState) => {
        var settingRef = firebase.database().ref().child('settings').orderByChild('userId').equalTo(userId)
        settingRef.on('value', (settings) => {
            settings.forEach((setting) => {
<<<<<<< HEAD
                currency = setting.val().currency
                console.log('acton get currency ', currency)
=======
                var currency = this.getCurrencySymbol(setting.val().currency)
>>>>>>> 2322f2a6575c93bef2d1c428db1f0c58ef8fb856
                dispatch({
                    type: types.CURRENCY,
                    userId,
                    currency,
                })
            })
        })
    }
}

export function getCurrencySymbol(currency) {
    return Utils.currency.filter((cur) => {
        if(cur.name === this.props.currency) {
            return cur
        }
    })
}
