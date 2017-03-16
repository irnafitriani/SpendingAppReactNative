import React from 'react'
import {
    DatePickerAndroid,
    Text,
    TextInput,
    TouchableHighlight,
    StyleSheet,
    View,
} from 'react-native'

export default class AddTransaction extends React.Component {
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
                <View style={styles.rowWrapper}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Date</Text>
                        <Text>14/3/2017</Text>
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
    row: {
        flexDirection: 'row'
    },
    label: {
        width: 100,
        color: '#000',
    },
    container: {        
        flex: 1,
        padding: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between'
    },
    background: {
        width: null,
        height: null
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
        justifyContent: 'flex-start',
    },
    button:{
        backgroundColor: "#9b59b6",
        flex: 1, 
        padding: 15,
        margin: 15,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText:{
        color:"#0d0d0d",
        fontSize: 18
    },
    rowWrapper: {
        flex: 1,
    },
});