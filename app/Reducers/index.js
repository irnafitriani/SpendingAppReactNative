import {combineReducers} from 'redux'
import * as transactionReducers from './transaction'

export default combineReducers(Object.assign(
    transactionReducers,
))