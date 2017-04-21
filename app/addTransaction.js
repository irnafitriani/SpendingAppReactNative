import React from 'react'
import {
    BackAndroid,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native'
import DatePicker from 'react-native-datepicker'
import ReactNativePicker from 'react-native-picker'
import Firebase from 'firebase'
import { connect } from 'react-redux';

const background = require('../images/background.jpg')
const dismissKeyboard = require('dismissKeyboard')

class AddTransaction extends React.Component {
    constructor(props) {
        super(props)
        this.state = {addToLog: 'initialize', key: '', date: '', amount: '', description: '', mode: '', category: '', isCatPickerOpen: false}
        this.taskRef = Firebase.database().ref();        

        BackAndroid.removeEventListener('hardwareBackPress', () => {})
        BackAndroid.addEventListener('hardwareBackPress', () => {
            if(this.state.isCatPickerOpen) {
                ReactNativePicker.hide()
                this.setCatPickerShow(false)
            } else {
                console.log('selected tab ', this.props.selectedTab)
                this.props.navigator.replace({
                    title: 'Tabbar',
                    id: 'Tabbar',
                    selectedTab : this.props.selectedTab,
                    userInfo: this.props.userInfo,
                });
                return true;
            }
        })
    }

    componentWillMount() {
        this.state.mode = this.props.mode
        if(this.state.mode === 'Edit Transaction') {
            this.state.key = this.props.transaction.key
            this.state.date = this.props.transaction.date
            this.state.amount = this.props.transaction.amount.toString()
            this.state.description = this.props.transaction.name
            this.state.category = this.props.transaction.category
        }
    }

    onCancelPressed() {
        ReactNativePicker.hide()
        this.props.navigator.replace({
            title: 'Dashboard',
            id: 'Tabbar',
            selectedTab: 'transaction',
            userInfo: this.props.userInfo,
        })
    }

    onSavePressed() {
        if((this.state.description !== '' && this.state.description !== undefined) && (this.state.amount !== '' && this.state.amount !== undefined) && (this.state.date !== '' && this.state.date !== undefined) && (this.state.category !== '' && this.state.category !== undefined)) {
            if(this.state.mode === 'Edit Transaction') {
                this.taskRef.child(this.props.transaction.key).update({
                    userId: this.props.userInfo.userId, name: this.state.description, 
                    amount: parseInt(this.state.amount), date: this.state.date, category: this.state.category,
                })
            } else {
                this.taskRef.push({
                    userId: this.props.userInfo.userId, name: this.state.description, 
                    amount: parseInt(this.state.amount), date: this.state.date, category: this.state.category,
                })
            }

            // return to transactions list screen
            this.onCancelPressed()
        } else {
            alert('Please fill all fields.')
        }
    }

    showCategoryPicker() {
        ReactNativePicker.init({
            pickerData: ['Food & Beverage', 'Grocey & Amenities', 'Healt', 'Entertainment', 'Transportation'],
            selectedValue: [this.state.category],
            onPickerConfirm: pickedValue => {
                if (pickedValue[0] !== '') {
                    this.setState({
                        category: pickedValue[0]
                    })
                }
            },
            onPickerCancel: pickedValue => {
                console.log('category cancel ', pickedValue)
            },
            onPickerSelect: pickedValue => {
                console.log('category select ', pickedValue)
            }
        })
        ReactNativePicker.show();
        this.setCatPickerShow(true)
    }

    setCatPickerShow(isDisplayed) {
        this.setState({
            isCatPickerOpen: isDisplayed
        })
    }

    render() {
        return(
            <TouchableWithoutFeedback
                onPress={() => dismissKeyboard()}
                style={{flex: 1}}>
                <Image 
                    style={styles.background}
                    source={background}
                    resizeMode="cover">
                    <View style={styles.container}>
                        <View style={styles.rowContainer}>
                            <View style={styles.row}>
                                <Text style={styles.label}>Date</Text>
                                <DatePicker
                                    style={{flex: 1, alignItems:'flex-start'}}
                                    date={this.state.date}
                                    mode="date"
                                    placeholder="select date"
                                    format="YYYY-MM-DD"
                                    confirmBtnText="Select"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                        dateIcon: {
                                            position: 'absolute',
                                            right: 0,
                                            top: 4,
                                        },
                                        dateInput: {
                                            alignItems: 'flex-start',
                                            marginRight: 36,
                                            paddingLeft: 8, 
                                            backgroundColor: '#fff'
                                        }
                                    }}
                                    onDateChange={(date) => {this.setState({date: date})}}
                                />
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Amount</Text>
                                <TextInput
                                    onChangeText={(amount) => {this.setState({amount})}}
                                    keyboardType='numeric'
                                    style={styles.input}
                                    underlineColorAndroid="transparent"
                                    value={this.state.amount}
                                />
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Category</Text>
                                <TouchableOpacity onPress={this.showCategoryPicker.bind(this)} style={{flex: 1}}>
                                    <TextInput
                                        editable={false}
                                        style={styles.input}
                                        underlineColorAndroid="transparent"
                                        value={this.state.category}/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Description</Text>
                                <TextInput
                                    onChangeText={(description) => {this.setState({description})}}
                                    multiline={true}
                                    style={styles.inputMultiLine}
                                    underlineColorAndroid="transparent"
                                    value={this.state.description}
                                />
                            </View>
                        <View style={styles.buttonContainer}>
                            <TouchableHighlight 
                                onPress={this.onCancelPressed.bind(this)}
                                style={styles.button}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableHighlight>
                            <TouchableHighlight 
                                onPress={this.onSavePressed.bind(this)}
                                style={styles.button}>
                                <Text style={styles.buttonText}>Save</Text>
                            </TouchableHighlight>
                        </View>
                        </View>
                    </View>
                </Image>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        height: null,
        width: null,
    },
    container: {        
        flex: 1,
        padding: 10,
    },
    row: {
        padding: 5,
        flexDirection: 'row'
    },
    rowContainer: {
        flex: 1,
    },
    label: {
        marginTop: 10,
        width: 100,
        color: '#ffffff',
    },
    input:{
        backgroundColor: "#fff",
        borderColor: '#adadad',
        borderWidth: 1,
        flex: 1,
    },
    inputMultiLine: {
        backgroundColor: "#fff",
        borderColor: '#adadad',
        borderWidth: 1,
        flex: 1,
        height: 120,
        justifyContent: 'flex-start',
        textAlignVertical: 'top',
    },
    buttonContainer: {
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'space-between'
    },
    button:{
        borderRadius: 4,
        backgroundColor: "#9b59b6",
        flex: 1, 
        padding: 10,
        margin: 15,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText:{
        color:"#fff",
        fontSize: 15
    },
});

export default connect()(AddTransaction)