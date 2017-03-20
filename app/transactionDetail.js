import React from 'react'
import {
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native'
import Firebase from 'firebase'

export default class TransactionDetail extends React.Component {
    constructor() {
        super()
        this.taskRef = Firebase.database().ref();        
    }

    onGoBackPressed() {
        this.props.navigator.replace({
            title: 'Dashboard',
            id: 'Tabbar',
            selectedTab: 'transaction',
        })
    }

    onDeletePressed() {
        this.taskRef.child(this.props.transaction.key).remove()

        // return to transactions list screen
        this.onGoBackPressed()
    }

    onEditPressed() {
        this.props.navigator.replace({
            title: 'Edit Transaction',
            id: 'AddTransaction',
            transaction: this.props.transaction,
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

                <View style={styles.row}>
                    <TouchableHighlight 
                        style={styles.button}
                        onPress={this.onGoBackPressed.bind(this)}>
                        <Text style={styles.buttonText}>Go Back</Text>
                    </TouchableHighlight>
                    <TouchableHighlight 
                        style={styles.button}
                        onPress={this.onDeletePressed.bind(this)}>
                        <Text style={styles.buttonText}>Delete</Text>
                    </TouchableHighlight>
                    <TouchableHighlight 
                        style={styles.button}
                        onPress={this.onEditPressed.bind(this)}>
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableHighlight>
                </View>
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
        flex: 1,
        marginLeft: 10, 
        marginRight: 10, 
        marginVertical: 15,
        paddingVertical: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText:{
        color:"#fff",
        fontSize: 15

    },
})