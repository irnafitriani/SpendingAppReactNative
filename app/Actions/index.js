import * as TransactionActions from './transaction'
import * as SettingActions from './setting'
import * as AccountActions from './account'

export const ActionCreators = Object.assign({},
    TransactionActions,
    SettingActions,
    AccountActions
)