import React from 'react'
import {
    Image,
    ListView,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import ActionButton from 'react-native-action-button'
import TransactionRow from './transactionRow'

export default class TransactionHistory extends React.Component {
    constructor() {
        super()
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            dataSource: ds.cloneWithRows([
                {name: 'transaction 1', amount: 12000, date: '15/3/2017'}, 
                {name: 'transaction 2', amount: 20000, date: '16/3/2017'}
            ])
        }
    }

    addTransaction() {
        this.props.navigator.replace({
            title: 'Add Transaction',
            id: 'AddTransaction'
        })
    }

    renderRow(transaction) {
        return(
            <TransactionRow 
                navigator={this.props.navigator}
                transaction={transaction}/>
        )
    }

    render() {
        return(
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                />
                <ActionButton 
                    buttonColor='#9b59b6'
                    offsetX={15}
                    offsetY={15}
                    onPress={this.addTransaction.bind(this)} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});