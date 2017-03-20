import React from 'react'
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View,
} from 'react-native'
import DatePicker from 'react-native-datepicker'
import Firebase from 'firebase'

export default class AddTransaction extends React.Component {
    constructor() {
        super()
        this.state = {key: '', date: '', amount: '', description: '', mode: ''}
        this.taskRef = Firebase.database().ref();        
    }

    componentWillMount() {
        this.state.mode = this.props.mode
        if(this.state.mode === 'Edit Transaction') {
            this.state.key = this.props.transaction.key
            this.state.date = this.props.transaction.date
            this.state.amount = this.props.transaction.amount
            this.state.description = this.props.transaction.name
        }
    }

    onCancelPressed() {
        this.props.navigator.replace({
            title: 'Dashboard',
            id: 'Tabbar',
            selectedTab: 'transaction',
        })
    }

    onSavePressed() {
        if(this.state.description !== '' && this.state.amount !== '' && this.state.date !== '') {
            if(this.state.mode === 'Edit Transaction') {
                this.taskRef.child(this.props.transaction.key).update({
                    name: this.state.description, amount: this.state.amount, date: this.state.date,
                })
            } else {
                this.taskRef.push({
                    name: this.state.description, amount: this.state.amount, date: this.state.date,
                })
            }

            // return to transactions list screen
            this.onCancelPressed()
        } else {
            alert('Please fill all fields.')
        }
    }

    render() {
        return(
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
                        <Text style={styles.label}>Description</Text>
                        <TextInput
                        onChangeText={(description) => {this.setState({description})}}
                            multiline={true}
                            style={styles.inputMultiLine}
                            underlineColorAndroid="transparent"
                            value={this.state.description}
                        />
                    </View>
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
        )
    }
}

const styles = StyleSheet.create({
    container: {        
        flex: 1,
        padding: 10
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
        color: '#000',
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