import React from 'react'
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
} from 'react-native'

export default class TransactionDetail extends React.Component {
    onGoBackPressed() {
        this.props.navigator.replace({
            title: 'Dashboard',
            id: 'Tabbar',
            selectedTab: 'transaction',
            transactions: this.props.transactions,
        })
    }

    render() {
        return(
            <View style={styles.container}>
                <View>
                    <View style={styles.row}>
                        <View style={styles.subRow}>
                            <Text style={styles.label}>Date</Text>
                            <Text style={styles.label}>:</Text>
                        </View>
                        <Text style={styles.label}>{this.props.transaction.date}</Text>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.subRow}>
                            <Text style={styles.label}>Amount</Text>
                            <Text style={styles.label}>:</Text>
                        </View>
                        <Text style={styles.label}>Rp. {this.props.transaction.amount}</Text>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.subRow}>
                            <Text style={styles.label}>Description</Text>
                            <Text style={styles.label}>:</Text>
                        </View>
                        <Text style={styles.label}>{this.props.transaction.name}</Text>
                    </View>
                </View>
                <TouchableHighlight 
                    style={styles.button}
                    onPress={this.onGoBackPressed.bind(this)}>
                    <Text style={styles.buttonText}>Go Back</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 20,
        flex: 1,
        justifyContent: 'space-between',
    },
    label: {
        fontSize: 16,
        fontWeight: '300'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
    },
    subRow: {
        flexDirection: 'row',
        width: 100,
        justifyContent: 'space-between'
    },
    button:{
        backgroundColor: "#9b59b6",
        borderRadius: 4,
        paddingVertical: 10,
        marginVertical: 15,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText:{
        color:"#fff",
        fontSize: 15

    },
})