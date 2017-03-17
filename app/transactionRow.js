import React from 'react'
import {
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native'

export default class TransactionRow extends React.Component {
    openTransactionDetail() {
        this.props.navigator.replace({
            title: 'Transaction Detail',
            id: 'TransactionDetail',
            transaction: this.props.transaction,
        })
    }

    render() {
        return(
            <TouchableHighlight 
                style={styles.container}
                onPress={this.openTransactionDetail.bind(this)}>
                <View style={styles.rowWrapper}>
                    <View style={styles.row}>
                        <Text>Amount : Rp {this.props.transaction.amount}</Text>
                        <Text>{this.props.transaction.date}</Text>
                    </View>
                    <Text style={styles.label}>{this.props.transaction.name}</Text>
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderWidth: 0,
        borderBottomWidth: 2,
        borderColor: '#e7e7e7',
        padding: 20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        fontSize: 20,
        fontWeight: '300',
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowWrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
});