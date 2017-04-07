import * as types from '../Helpers/actionTypes'

export function addNewTransaction({transaction}) {
    return {
        type: types.ADD_TRANSACTION,
        transaction,
    }
}