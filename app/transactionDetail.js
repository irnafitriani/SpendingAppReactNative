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
            title: 'Transaction History',
            id: 'TransactionHistory'
        })
    }

    render() {
        return(
            <View>
                <View style={styles.row}>
                    <View style={styles.subRow}>
                        <Text style={styles.label}>Date</Text>
                        <Text style={styles.label}>:</Text>
                    </View>
                    <Text style={styles.label}>14/3/2017</Text>
                </View>
                <View style={styles.row}>
                    <View style={styles.subRow}>
                        <Text style={styles.label}>Amount</Text>
                        <Text style={styles.label}>:</Text>
                    </View>
                    <Text style={styles.label}>Rp. 10.000</Text>
                </View>
                <View style={styles.row}>
                    <View style={styles.subRow}>
                        <Text style={styles.label}>Description</Text>
                        <Text style={styles.label}>:</Text>
                    </View>
                    <Text style={styles.label}>Bought breakfast</Text>
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
        borderWidth: 0,
        borderBottomWidth: 2,
        borderColor: '#e7e7e7',
        padding: 20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        fontSize: 16,
        fontWeight: '300'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
    },
    subRow: {
        flexDirection: 'row',
        width: 100,
        justifyContent: 'space-between'
    },
    button:{
        backgroundColor: "#ffffff",
        paddingVertical: 15,
        marginVertical: 15,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText:{
        color:"#0d0d0d",
        fontSize: 18

    },
})