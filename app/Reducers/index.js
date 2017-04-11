import {combineReducers} from 'redux'
import * as transactionReducer from './transaction'
import * as settingReducer from './setting'

export default combineReducers(Object.assign(
    transactionReducer,
    settingReducer,
))