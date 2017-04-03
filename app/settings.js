import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ListView,
    TouchableHighlight,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Navigator,
    TextInput,
    Image,
    AsyncStorage,
    ActivityIndicator
} from 'react-native'
import Prompt from 'react-native-prompt'
import Separator from './Helpers/separator'
import Firebase from 'firebase'
import ReactNativePicker from 'react-native-picker'
const background = require("../images/background.jpg");
const dismissKeyboard = require('dismissKeyboard')
import Utils from './Helpers/utils'

export default class Settings extends Component{
     constructor(props){
        super(props);
        this.state ={
            key:'IDR',
            symbol : 'IDR',
            name : 'Indonesian Rupiah(IDR)',
            budget: '',
            currencyList: [],
            selectedCurrency: 'Indonesian Rupiah(IDR)'
        }
    }

    componentWillMount(){
        var listCurrency = []
        Utils.currency.forEach((currency) =>{
           listCurrency.push(currency.name ) 
        })
        this.setState({currencyList : listCurrency})
    }

    showCurrencyPicker() {
        ReactNativePicker.init({
            pickerData: this.state.currencyList,
            onPickerConfirm: pickedValue => {
                if (pickedValue[0] !== '') {
                    this.setState({
                        selectedCurrency: pickedValue[0]
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
        ReactNativePicker.show()
        this.setCatPickerShow(true)
    }

    setCatPickerShow(isDisplayed) {
        this.setState({
            isCatPickerOpen: isDisplayed
        })
    }

    render(){

        return(
            <TouchableWithoutFeedback
                onPress={() => dismissKeyboard()}
                style={{flex: 1}}>
                <Image 
                    style={[styles.background, styles.container]}
                    source={background}
                    resizeMode="cover">
                        <View style={styles.container} />
                            <View style={styles.wrapper}>
                                <Text style={styles.rowTitle}>Currency</Text>
                                <View style={styles.inputWrap}>
                                    <TouchableOpacity onPress={this.showCurrencyPicker.bind(this)} style={{flex: 1}}>
                                    <TextInput
                                        placeholder="Currency"
                                        editable={false}
                                        style={styles.input}
                                        underlineColorAndroid="transparent"
                                        value={this.state.selectedCurrency}
                                    />
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.rowTitle}>Budget</Text>
                                <View style={styles.inputWrap}>
                                    <TextInput
                                        placeholder="Budget"
                                        style={styles.input}
                                        underlineColorAndroid="transparent"
                                        onChangeText={(budget) => this.setState({budget})}
                                        value={this.state.budget}
                                    />
                                </View>
                        </View>
                        <View style={styles.buttonContainer}>
                                <TouchableHighlight 
                                    style={styles.button}>
                                    <Text style={styles.buttonText}>Save</Text>
                                </TouchableHighlight>
                            </View>
                    <View style={styles.container} />
                </Image>
            </TouchableWithoutFeedback>
        )
    }

}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  background: {
    width: null,
    height: null
  },
  rowContainer:{
      padding : 10,
      justifyContent:'center',
      marginVertical: 10
  },
  rowTitle:{
      fontSize: 16,
      color: "#ffffff"
  }, 
  buttonContainer: {
        flexDirection: 'row',
        paddingVertical: 5,
        justifyContent: 'space-between',
        marginVertical: 15
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
    inputWrap:{
      flexDirection: "row",
      marginVertical: 10,
      height: 40,
      backgroundColor:"transparent"
  },
  input:{
      flex : 1,
      paddingHorizontal: 10,
      backgroundColor: "#FFF"
  },
  wrapper:{
      paddingHorizontal: 15
  },
})