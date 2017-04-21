import React, { Component } from 'react'
import {
    Image,
    Text,
    TextInput, 
    TouchableHighlight,
    TouchableWithoutFeedback,
    StyleSheet,
    View,
    Platform
} from 'react-native'
import firebase from 'firebase'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from './Actions'

const background = require("../images/background.jpg");
const dismissKeyboard = require('dismissKeyboard')

class Budget extends Component {
    constructor(props) {
        super(props)
        this.state = {
            budgets: [0, 0, 0, 0, 0],
            month: new Date().getMonth(),
            year:new Date().getFullYear() ,
            categories: ['Food & Beverage', 'Grocery & Amenities', 'Health', 'Entertainment', 'Transportation'],
            isExist: false,
            key: '',
        }
        this.budgetRef = firebase.database().ref('budgets')
    }

    componentWillMount(){
        this.listenForBudgets()
    }

    listenForBudgets(){
      var budgetRef = firebase.database().ref('budgets').orderByChild('userId').equalTo(this.props.userInfo.userId)
        budgetRef.on('value',(snap) =>{
            snap.forEach((child) =>{
                if (child.val().year == this.state.year && child.val().month == this.state.month){
                    this.setState({
                        month: child.val().month,
                        year: child.val().year,
                        budgets: child.val().budgets,
                        categories: child.val().categories,
                        isExist: true,
                        key: child.key,
                    })
                }
            })
        })
    }

    onCancelPressed() {
        this.props.navigator.replace({
            title: 'Settings',
            id: 'Tabbar',
            selectedTab: 'settings',
            userInfo: this.props.userInfo,
        })
    }

    onSavePressed() {
        var month= new Date().getMonth()
        var year= new Date().getFullYear()
        if(this.state.isExist && this.state.key !== '') {
            this.budgetRef.child(this.state.key).update({
                userId: this.props.userInfo.userId,
                month: month,
                year: year,
                categories: this.state.categories,
                budgets: this.state.budgets,
            })
        } else {
            this.budgetRef.push({
                userId: this.props.userInfo.userId,
                month: month,
                year: year,
                categories: this.state.categories,
                budgets: this.state.budgets,
            })
        }
        this.onCancelPressed()
    }

    setBudget(index, value) {
        var temp = this.state.budgets
        temp[index] = parseInt(value === '' ? 0 : value)
        this.setState({
            budgets: temp
        })
    }

    render() {
        return(
            <TouchableWithoutFeedback 
                onPress={() => dismissKeyboard()}
                style={{flex: 1}}>
                <Image 
                    style={[styles.background, styles.container]}
                    source={background}
                    resizeMode="cover">
                    <View style={styles.container}>
                        <View style={[styles.inputWrap, {marginTop: (Platform.OS === 'ios') ? 30 : 0, }]}>
                            <Text style={styles.label}>
                                {this.state.categories[0]}
                            </Text>
                            <TextInput 
                                selectTextOnFocus={true}
                                onChangeText={(budget) => this.setBudget(0, budget)}
                                value={this.state.budgets[0].toString()}
                                style={styles.input}
                                underlineColorAndroid="transparent"
                                keyboardType='numeric'/>
                        </View>
                        <View style={styles.inputWrap}>
                            <Text style={styles.label}>
                                {this.state.categories[1]}
                            </Text>
                            <TextInput 
                                selectTextOnFocus={true}
                                onChangeText={(budget) => this.setBudget(1, budget)}
                                value={this.state.budgets[1].toString()}
                                style={styles.input}
                                underlineColorAndroid="transparent"
                                keyboardType='numeric'/>
                        </View>
                        <View style={styles.inputWrap}>
                            <Text style={styles.label}>
                                {this.state.categories[2]}
                            </Text>
                            <TextInput 
                                selectTextOnFocus={true}
                                onChangeText={(budget) => this.setBudget(2, budget)}
                                value={this.state.budgets[2].toString()}
                                style={styles.input}
                                underlineColorAndroid="transparent"
                                keyboardType='numeric'/>
                        </View>
                        <View style={styles.inputWrap}>
                            <Text style={styles.label}>
                                {this.state.categories[3]}
                            </Text>
                            <TextInput 
                                selectTextOnFocus={true}
                                onChangeText={(budget) => this.setBudget(3, budget)}
                                value={this.state.budgets[3].toString()}
                                style={styles.input}
                                underlineColorAndroid="transparent"
                                keyboardType='numeric'/>
                        </View>
                        <View style={styles.inputWrap}>
                            <Text style={styles.label}>
                                {this.state.categories[4]}
                            </Text>
                            <TextInput 
                                selectTextOnFocus={true}
                                onChangeText={(budget) => this.setBudget(4, budget)}
                                value={this.state.budgets[4].toString()}
                                style={styles.input}
                                underlineColorAndroid="transparent"
                                keyboardType='numeric'/>
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
    label:{
        fontSize: 16,
        color: "#ffffff",
        width: 160,
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
        justifyContent:'space-between',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor:"transparent",
    },
    input:{
        flex: 1,
        backgroundColor: "#FFF"
    },
})

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch)
}

function mapStateToProps(state) {
    return {
        budget: state.budget
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Budget)