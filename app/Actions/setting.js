import * as types from '../Helpers/actionTypes'
import Utils from '../Helpers/utils'
import firebase from 'firebase'

/*
export function setUserId(userId) {
    console.log('setting action user id ', userId   )
    return (dispatch, getState) => {
        dispatch({
            type: types.USER_ID,
            userId
        })
    }
}*/

export function getBudget(userId) {
    console.log('get budget action')
    return (dispatch, getState) => {
        var budget = 0
        var settingRef = firebase.database().ref().child('settings').orderByChild('userId').equalTo(userId)
        settingRef.on('value', (settings) => {
            settings.forEach((setting) => {
                budget = setting.val().budget
                dispatch({
                    type: types.BUDGET,
                    userId,
                    budget,
                })
            })
        })
    }
}

export function setSymbolCurrency(symbolCurrency) {
    console.log('setting action symbol currency ', symbolCurrency   )
    return (dispatch, getState) => {
        dispatch({
            type: types.SYMBOLCURRENCY,
            symbolCurrency
        })
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
    console.log('get currency action with user id ', userId)
    return (dispatch, getState) => {
        var currency = ''
        var settingRef = firebase.database().ref().child('settings').orderByChild('userId').equalTo(userId)
        settingRef.on('value', (settings) => {
            settings.forEach((setting) => {
                currency = setting.val().currency
                console.log('acton get currency ', currency)
                dispatch({
                    type: types.CURRENCY,
                    userId,
                    currency,
                })
            })
        })
    }
}
