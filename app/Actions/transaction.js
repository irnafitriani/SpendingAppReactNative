import * as types from '../Helpers/actionTypes'

export function addNewTransaction(transaction) {
    console.log('add new transaction action')
    return (dispatch, getState) => {
        dispatch({
            type: types.ADD_TRANSACTION,
            transaction,
        })
    }
}

export function printToLog(text) {
    console.log(text)
    return (dispatch, getState) => {
        dispatch({
            type: types.any,
            text
        })
    }
}