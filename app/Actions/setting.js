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

export function setTotalBudget(budget){
    return (dispatch, getState) => {
        dispatch({
            type: types.BUDGET,
            budget
        })
    }
}
        
export function calculateTotalBudget(budgets){
        var totalBudget = 0
        for(let i = 0; i < budgets.length; i++){
            totalBudget += budgets[i]
        }
        return totalBudget
    }

export function getBudget(userId, year, month) {
    return (dispatch, getState) => {
        var counter = 0
        var budgetRef = firebase.database().ref('budgets').orderByChild('userId').equalTo(userId)
        budgetRef.on('value', (budgetArray) => {
            console.log('number of budget children ', budgetArray.numChildren())
            budgetArray.forEach((budgetChild) => {
                if (budgetChild.val().year == year && budgetChild.val().month == month){
                    var budget = calculateTotalBudget(budgetChild.val().budgets)
                    dispatch({
                        type: types.BUDGET,
                        userId,
                        budget,
                    })
                } else { 
                    counter++
                        if(counter === budgetArray.numChildren()) {
                        var budget = 0
                        dispatch({
                            type: types.BUDGET,
                            userId,
                            budget,
                        })
                    }
                }
            })
        })
    }
}

export function getBudgetSetting(userId) {
    console.log('get budget setting action')
    return (dispatch, getState) => {
        var budgetRef = firebase.database().ref('budgets').orderByChild('userId').equalTo(userId)
        budgetRef.on('value', (budgetArray) => {
            budgetArray.forEach((budgetChild) => {
                if (budgetChild.val().year == new Date().getFullYear() && budgetChild.val().month == new Date().getMonth()){
                    var budgetSetting = calculateTotalBudget(budgetChild.val().budgets)
                    dispatch({
                        type: types.BUDGET_SETTING,
                        userId,
                        budgetSetting,
                    })
                    console.log('get budget setting action ', budgetSetting)
                }
            })
        })
    }
}

export function getCurrency(userId) {
    return (dispatch, getState) => {
        var settingRef = firebase.database().ref().child('settings').orderByChild('userId').equalTo(userId)
        settingRef.on('value', (settings) => {
            settings.forEach((setting) => {
                console.log('acton get currency ', currency)
                var currency =getCurrencySymbol(setting.val().currency)
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
    var key = Utils.currency.filter((cur) => {
        if(cur.name === currency) {
            return cur
        }
    })[0].key
    return Utils.symbol[key]
}
