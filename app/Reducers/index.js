import {combineReducers} from 'redux'
import * as transactionReducer from './transaction'
import * as settingReducer from './setting'
import * as accountReducer from './account'

export default combineReducers(Object.assign(
    transactionReducer,
    settingReducer,
    accountReducer
))