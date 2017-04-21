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
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from './Actions'
import Api from './Helpers/api'

const background = require("../images/background.jpg");
const info = require("../images/info.png")
const dismissKeyboard = require('dismissKeyboard')
import Utils from './Helpers/utils'

class Settings extends Component{
     constructor(props){
        super(props);
        this.state ={
            key:'',
            symbol : 'IDR',
            currency : 'Indonesian Rupiah(IDR)',
            exchangeCurrency: '',
            exchangeRate: '',
            currencyList: [],
            isExist: false
        }
    }

    componentWillMount(){
        this.props.getBudgetSetting(this.props.userId)
        console.log('setting will mount')
        var listCurrency = []
        Utils.currency.forEach((currency) =>{
           listCurrency.push(currency.name ) 
        })
        this.setState({currencyList : listCurrency})
    }
    componentDidMount(){
        console.log('setting did mount')
        this.listenForSettings()
    }

    listenForSettings(){
      var settingRef = Firebase.database().ref('settings').orderByChild('userId').equalTo(this.props.userInfo.userId)
        settingRef.on('value',(snap) =>{
            var settings = []
            snap.forEach((child) =>{
                settings.push({
                    key : child.key,
                    userId : child.val().userId,
                    currency: child.val().currency,
                    // budget : child.val().budget.toString()
                })
            })
            if(settings.length > 0 && settings[0].userId === this.props.userInfo.userId){
                this.setState({
                    isExist : true,
                    currency: settings[0].currency,
                    // budget: settings[0].budget,
                    key : settings[0].key
                })
            }
        })
    }

    showCurrencyPicker(type) {
        ReactNativePicker.init({
            pickerData: this.state.currencyList,
            onPickerConfirm: pickedValue => {
                if (pickedValue[0] !== '') {
                    if(type !== 'forex') {
                        this.setState({
                            currency: pickedValue[0]
                        })
                    } else {
                        var index = this.state.currencyList.indexOf(pickedValue[0])
                        this.setExchangeRate('USD')
                        this.setState({
                            exchangeCurrency: pickedValue[0]
                        })
                    }
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

    onSavePressed(){
        var settingRef = Firebase.database().ref().child('settings')
        if (this.state.isExist === true){
            if(this.state.currency !== '' && this.props.userInfo !== '' && this.state.budget !== '') {
                    settingRef.child(this.state.key).update({
                        userId: this.props.userInfo.userId, 
                        currency: this.state.currency, 
                        // budget: parseInt(this.state.budget), 
                    })
                // return to transactions list screen
            } else {
                alert('Please fill all fields.')
            }

        }else{
                if(this.state.currency !== '' && this.props.userInfo !== '') {
                    settingRef.push({
                        userId: this.props.userInfo.userId, 
                        currency: this.state.currency, 
                        // budget: parseInt(this.state.budget), 
                    })

                // return to transactions list screen
            } else {
                alert('Please fill all fields.')
            }
        }
    }

    setCatPickerShow(isDisplayed) {
        this.setState({
            isCatPickerOpen: isDisplayed
        })
    }

    openBudgetDetail() {
        console.log('open budget detail')
        this.props.navigator.replace({
            title: 'Budget Setting',
            id: 'BudgetSetting',
            userInfo: this.props.userInfo,
            selectedTab : this.props.selectedTab,
        })
    }

    setExchangeRate(base) {
        var json = Api.get('?base='+base)
        console.log(json)
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
                                        value={this.state.currency}
                                    />
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.rowTitle}>Budget</Text>
                                <View style={styles.inputWrap}>
                                    <TextInput
                                        placeholder="Budget"
                                        style={styles.input}
                                        underlineColorAndroid="transparent"
                                        value={this.props.budgetSetting.toString()}
                                    />
                                    <TouchableHighlight onPress={this.openBudgetDetail.bind(this)}>
                                        <Image source={info}/>
                                    </TouchableHighlight>
                                </View>

                                <Text style={styles.rowTitle}>Foreign Exchange Rate</Text>
                                <View style={{height: 120}} >
                                    <TouchableOpacity onPress={this.showCurrencyPicker.bind(this, 'forex')} style={{flex: 1}}>
                                        <TextInput
                                            placeholder="Currency"
                                            editable={false}
                                            style={[styles.input, {marginTop: 10}]}
                                            value={this.state.exchangeCurrency}
                                            underlineColorAndroid="transparent"/>
                                    </TouchableOpacity>
                                    <TextInput
                                        placeholder='Rate'
                                        editable={false}
                                        value={this.state.exchangeRate}
                                        style={[styles.input, {marginTop: 10}]}
                                        underlineColorAndroid='transparent'/>
                                </View>
                        </View>
                        <View style={styles.buttonContainer}>
                                <TouchableHighlight
                                    onPress={this.onSavePressed.bind(this)} 
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

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch)
}

function mapStateToProps(state) {
    return {
        userId: state.userId,
        budget: state.budget,
        budgetSetting: state.budgetSetting,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)