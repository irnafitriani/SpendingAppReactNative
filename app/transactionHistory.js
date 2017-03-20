import React from 'react'
import {
    ListView,
    Picker,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native'
import ActionButton from 'react-native-action-button'
import Firebase from 'firebase'
import TransactionRow from './transactionRow'

export default class TransactionHistory extends React.Component {
    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            dataSource: ds,
        }
        this.transRef = Firebase.database().ref();
    }

    addTransaction() {
        this.props.navigator.replace({
            title: 'Add Transaction',
            id: 'AddTransaction',
        })
    }

    componentDidMount() {        
        this.listenForTaskRef(this.transRef.orderByChild('amount'))
    }

    listenForTaskRef(transRef) {
        transRef.on('value', (transactions) => {
            var newTransactions = [];
            transactions.forEach((transaction) => {
                newTransactions.push({
                    key: transaction.key, name: transaction.val().name, amount: transaction.val().amount, date: transaction.val().date
                })
            })

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(newTransactions)
            })
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
                <View style={styles.wrapPicker}>
                    <Picker mode='dropdown' style={styles.picker}>
                        <Picker.Item label='amount' value='amount' />
                        <Picker.Item label='date' value='date' />
                    </Picker>
                </View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    style={styles.list}
                />
                <ActionButton 
                    buttonColor='#9b59b6'
                    offsetX={15}
                    offsetY={15}
                    onPress={this.addTransaction.bind(this)} 
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        flex: 1,        
    },
    picker: {
        flexDirection: 'column-reverse',
        width: 100,

    },
    wrapPicker: {
        flex: 'row',
        flexDirection: 'flex-end',
    }
});