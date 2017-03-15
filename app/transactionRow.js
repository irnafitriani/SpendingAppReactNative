import React from 'react'
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
} from 'react-native'

export default class TransactionRow extends React.Component {
    openTransactionDetail() {
        this.props.navigator.replace({
            title: 'Transaction Detail',
            id: 'TransactionDetail'
        })
    }

    render() {
        return(
            <TouchableHighlight 
                style={styles.container}
                onPress={this.openTransactionDetail.bind(this)}>
                <Text style={styles.label}>{this.props.transaction.name}</Text>
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
        fontWeight: '300'
    },
});