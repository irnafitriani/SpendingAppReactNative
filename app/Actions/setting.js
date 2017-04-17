import * as types from '../Helpers/actionTypes'
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
                var budget = setting.val().budget
                dispatch({
                    type: types.BUDGET,
                    userId,
                    budget,
                })
            })
        })

    }
}

export function getCurrency(userId) {
    return (dispatch, getState) => {
        var settingRef = firebase.database().ref().child('settings').orderByChild('userId').equalTo(userId)
        settingRef.on('value', (settings) => {
            settings.forEach((setting) => {
                var currency = this.getCurrencySymbol(setting.val().currency)
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
