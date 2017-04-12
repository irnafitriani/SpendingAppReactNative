import * as types from '../Helpers/actionTypes'
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
            })
        })

        dispatch({
            type: types.BUDGET,
            userId,
            budget,
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
            })
        })

        console.log('acton get currency ', currency)
        dispatch({
            type: types.CURRENCY,
            userId,
            currency,
        })
    }
}
