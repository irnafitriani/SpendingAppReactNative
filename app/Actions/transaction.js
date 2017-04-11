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

