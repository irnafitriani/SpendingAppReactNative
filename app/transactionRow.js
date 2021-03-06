import React from 'react'
import {
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { ActionCreators } from './Actions'

class TransactionRow extends React.Component {
    openTransactionDetail() {
        console.log('key :' + this.props.transaction.key),
        this.props.navigator.replace({
            title: 'Transaction Detail',
            id: 'TransactionDetail',
            selectedTab : this.props.selectedTab,
            transaction: this.props.transaction,
            userInfo: this.props.userInfo,
        })
    }

    render() {
        return(
            <TouchableHighlight 
                style={styles.container}
                onPress={this.openTransactionDetail.bind(this)}>
                <View style={styles.rowWrapper}>
                    <View style={styles.row}>
                        <Text style={styles.titleText}>Amount : {this.props.currency} {this.props.transaction.amount}</Text>
                        <Text style={styles.titleText}>{this.props.transaction.date}</Text>
                    </View>
                    <Text style={styles.label}>{this.props.transaction.name}</Text>
                    <Text style={[styles.label, {fontSize: 12}]}>{this.props.transaction.category}</Text>
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    container: {
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
        color: "#ffffff"
    },
    titleText:{
        color: "#ffffff"
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

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch)
}

function mapStateToProps(state) {
    return {
        budget: state.budget,
        currency: state.currency,
        userId: state.userId,
        symbolCurrency : state.symbolCurrency
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionRow)