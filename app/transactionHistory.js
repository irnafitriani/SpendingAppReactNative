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
    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        let transactions = [
                    {name: 'mock transaction', amount: 12000, date: '2017-03-15'}, 
                ]
        if(this.props.transactions !== undefined) {
            transactions = this.props.transactions
        }

        this.state = {
            dataSource: ds.cloneWithRows(transactions),
            transactions: transactions
        }
    }

    // componentWillReceiveProps(nextProps) {
    //     const dataSource = this.state.dataSource.cloneWithRows(nextProps.transactions)
    //     this.setState({dataSource})
    //     console.log('receive next props')
    // }

    addTransaction() {
        this.props.navigator.replace({
            title: 'Add Transaction',
            id: 'AddTransaction',
            transactions: this.state.transactions,
        })
    }

    renderRow(transaction) {
        return(
            <TransactionRow 
                navigator={this.props.navigator}
                transaction={transaction}
                transactions={this.state.transactions}/>
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