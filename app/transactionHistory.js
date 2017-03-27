import React,{Component} from 'react'
import {
    Image,
    ListView,
    Picker,
    Platform,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native'
import ActionButton from 'react-native-action-button'
import Firebase from 'firebase'
import TransactionRow from './transactionRow'

const sortIcon = require("../images/sort_white.png");
const background = require("../images/background.jpg");

export default class TransactionHistory extends Component {
    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            dataSource: ds,
            sortCategory: 'amount',
            tempTrans: [],
        }
        this.transRef = Firebase.database().ref().orderByChild('userId').equalTo(this.props.userInfo.userId)
    }

    addTransaction() {
        this.props.navigator.replace({
            title: 'Add Transaction',
            id: 'AddTransaction',
            userInfo: this.props.userInfo,
        })
    }

    componentWillMount() {        
        var tempRef = this.transRef.ref.orderByChild('amount')
        this.listenForTaskRef(tempRef)
    }

    listenForTaskRef(transRef) {
        transRef.on('value', (transactions) => {
            var newTransactions = [];
            transactions.forEach((transaction) => {
                if(transaction.val().userId === this.props.userInfo.userId) {
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
        var tempRef = this.transRef.ref.orderByChild(picker)
        this.listenForTaskRef(tempRef)
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
            <Image 
                style={styles.background}
                source={background}
                resizeMode="cover">
                <View style={styles.container}>
                <View style={styles.toolbar}>
                    <Text style={styles.label}>Sort by: </Text>
                    <Picker 
                        mode='dropdown' 
                        onValueChange={(picker) => {this.onPickerChange(picker)}}
                        selectedValue={this.state.sortCategory}
                        style={{width: 100}}
                        itemStyle={styles.itemStyle}>
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
        </Image>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    icon:{
        width: 20,
        height: 20,
    },
    label:{
        alignItems: 'center',
        justifyContent: 'center',
        color: "#ffffff",
        fontWeight: 'bold',
        fontSize: 20
    },
    list: {
        flex: 1, 
    },
    picker: {
        flexDirection: 'row-reverse',
        width: 100,
        justifyContent:'center',
    },
    toolbar: {
        marginTop: (Platform.OS === 'ios') ? 30 : 0,
        height:40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderColor: '#adadad',
        borderBottomWidth: 1,
        backgroundColor:"black"
    }, 
    background: {
        flex: 1,
        height: null,
        width: null,
    },
    itemStyle:{
        fontSize: 15,
        color:'#ffffff', 
        fontWeight:'bold'
    }
});