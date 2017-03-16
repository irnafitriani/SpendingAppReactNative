import React from 'react'
import {
    DatePickerAndroid,
    Text,
    TextInput,
    TouchableHighlight,
    StyleSheet,
    View,
} from 'react-native'
import DatePicker from 'react-native-datepicker'

export default class AddTransaction extends React.Component {
    constructor() {
        super()
        this.state = {date: ''}
    }

    onCancelPressed() {
        this.props.navigator.replace({
            title: 'Dashboard',
            id: 'Tabbar',
            selectedTab: 'transaction' 
        })
    }

    onSavePressed() {

    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.rowContainer}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Date</Text>
                        <DatePicker
                            style={{flex: 1}}
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
                                    marginRight: 36
                                }
                            }}
                            onDateChange={(date) => {this.setState({date: date})}}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Amount</Text>
                        <TextInput
                            keyboardType='numeric'
                            style={styles.input}
                            underlineColorAndroid="transparent"
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Description</Text>
                        <TextInput
                            multiline={true}
                            style={styles.inputMultiLine}
                            underlineColorAndroid="transparent"
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