import React from 'react'
import {
    Image,
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

const sortIcon = require("../images/sort.png");

export default class TransactionHistory extends React.Component {
    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            dataSource: ds,
            sortCategory: '',
            tempTrans: []
        }
        this.transRef = Firebase.database().ref();
    }

    addTransaction() {
        this.props.navigator.replace({
            title: 'Add Transaction',
            id: 'AddTransaction',
            userInfo: this.props.userInfo,
        })
    }

    componentDidMount() {        
        this.listenForTaskRef(this.transRef.orderByChild('amount'))
    }

    setTransList() {
        console.log('set transaction list')
    }

    listenForTaskRef(transRef) {
        transRef.on('value', (transactions) => {
            var newTransactions = [];
            transactions.forEach((transaction) => {
                if(transaction.val().userId === this.props.userInfo.userId) {
                    console.log('equal user id ' + this.props.userInfo.userId)   
                    newTransactions.push({
                        key: transaction.key, userId: transaction.val().userId, name: transaction.val().name, amount: transaction.val().amount, date: transaction.val().date
                    })
                }
            })

            this.setState({
                tempTrans: newTransactions,
                dataSource: this.state.dataSource.cloneWithRows(newTransactions)
            })
        })
    }

    onPickerChange(picker) {
        this.setState({sortCategory: picker})
        this.listenForTaskRef(this.transRef.orderByChild(picker))
    }

    onSortPressed() {
        console.log('sorting is pressed')
        var temp = []
        var i = this.state.tempTrans.length - 1
        this.state.tempTrans.forEach((trans) => {
            temp[i] = trans
            i--
        })

        this.setState({
            tempTrans: temp,
            dataSource: this.state.dataSource.cloneWithRows(temp)
        })
    }

    renderRow(transaction) {
        return(
            <TransactionRow 
                navigator={this.props.navigator}
                userInfo={this.props.userInfo}
                transaction={transaction}/>
        )
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.toolbar}>
                    <Text style={styles.label}>Sort by: </Text>
                    <Picker 
                        mode='dropdown' 
                        onValueChange={(picker) => this.onPickerChange(picker)}
                        selectedValue={this.state.sortCategory}
                        style={styles.picker}>
                        <Picker.Item label='amount' value='amount' />
                        <Picker.Item label='date' value='date' />
                    </Picker>
                    <TouchableHighlight
                        onPress={this.onSortPressed.bind(this)}>
                        <Image 
                            source={sortIcon}
                            style = {styles.icon}
                            resizeMode="contain"/>
                    </TouchableHighlight>
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
    icon:{
        width: 20,
        height: 20
    },
    label:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    list: {
        flex: 1,        
    },
    picker: {
        flexDirection: 'row-reverse',
        width: 100,

    },
    toolbar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderColor: '#adadad',
        borderBottomWidth: 1,
    }
});