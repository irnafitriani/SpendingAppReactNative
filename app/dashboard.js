import React, { Component } from 'react'
import {
    Image,
    View,
    Text,
    Platform,
    StyleSheet,
    TouchableHighlight,
} from 'react-native'
import Firebase from 'firebase'
import { Bar, StockLine, SmoothLine } from 'react-native-pathjs-charts'
const background = require("../images/background.jpg");

const arrowLeft = require('../images/arrow_left_white.png')
const arrowRight = require('../images/arrow_right_white.png')
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                'August', 'September', 'October', 'November', 'December']
const maxDates = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

export default class Dashboard extends Component{
     constructor(props) {
        super(props)
        this.state = {
            data: '',
            sortCategory: '',
            tempTrans: [[{'x': 0, 'y': 0}]],
            currentMonth: new Date().getMonth(), 
            nextDisable: true,
            prevDisable: false,
        }
        this.transRef = Firebase.database().ref().orderByChild('userId').equalTo(this.props.userInfo.userId);
        console.log('constructor')
    }
    componentWillMount() {
        this.getSelectedMonthData(this.state.currentMonth)
        this.disablePrevButtonNav(this.state.currentMonth)
    }

    listenForTaskRef(transRef) {
        transRef.on('value', (transactions) => {
            // initialize the graphic start point
            var newTransactions = [{'x': 0, 'y': 0}];

            // add transactions to the graphic
            transactions.forEach((transaction) => {
                if(transaction.val().userId === this.props.userInfo.userId) {
                    // check if its on the same day with the last pushed transaction
                    var date = transaction.val().date.substr(8)
                    var amount = parseInt(transaction.val().amount)
                    var latest = newTransactions[ newTransactions.length - 1].x                    
                    if(latest === date) {
                        // its on the same day, then sum the amount
                        amount = newTransactions[ newTransactions.length - 1].y + amount

                        // remove the old transaction
                        newTransactions.pop()
                    }

                    // add transaction as point
                    newTransactions.push({
                        "x": date, "y": amount
                    })
                }
            })

            // add the graphic end point
            newTransactions.push({'x': this.state.currentMonth === 1 ? 30 : 35, 'y': 0})

            // update tempTrans state
            this.setState({
                tempTrans: [newTransactions],
            })
        })
    }
    setData(optionsLine, dataLine){
            return(
                <View>
                 <StockLine data={this.state.tempTrans} options={optionsLine} xKey='x' yKey='y'  />
                </View>
            )
    }
    onNextPress() {
        if(!this.state.nextDisable) {
            var month = this.state.currentMonth + 1;
            if(month > 11) {
                month = month - 12
            }
            this.setState({currentMonth: month})
            this.getSelectedMonthData(month)
            this.disablePrevButtonNav(month)
            this.disableNextButtonNav(month)
        }
    }
    onPrevPress() {
        if(!this.state.prevDisable){
            var month = this.state.currentMonth - 1;
            if(month < 0) {
                month = month + 12
            }
            this.setState({currentMonth: month})
            this.getSelectedMonthData(month)
            this.disableNextButtonNav(month)
            this.disablePrevButtonNav(month)
        }
    }
    disablePrevButtonNav(month){
        var result = month === 0 ? true : false
        this.setState({prevDisable: result})
    }
    disableNextButtonNav(month) {
        var result = month === new Date().getMonth() ? true : false
        this.setState({nextDisable: result})
    }
    getSelectedMonthData(month) {
        // get min date
        var minDate = new Date()        
        minDate.setDate(1)
        minDate.setMonth(month)
        console.log('Min Date ' + minDate.toISOString())

        // get max date
        var maxDate = new Date()
        var max = (month !== 1) ? maxDates[month] : (maxDate.getFullYear() % 4 === 0) ? 29 : 28
        maxDate.setDate(max)
        maxDate.setMonth(month)
        console.log('Max Date ' + maxDate.toISOString())

        // get the data filtered by current month
        this.listenForTaskRef(this.transRef.ref.orderByChild('date').startAt(minDate.toISOString()).endAt(maxDate.toISOString()))
    }
    render(){
        let optionsLine = {
            width: 250,
            height: 250,
            color: '#ffffff',
            margin: {
                top: 10,
                left: 35,
                bottom: 30,
                right: 10
            },
            animate: {
                type: 'delayed',
                duration: 200
            },
            axisX: {
                showAxis: true,
                showLines: true,
                showLabels: true,
                showTicks: true,
                zeroAxis: false,
                orient: 'bottom',
                tickValues: [],
                label: {
                fontFamily: 'Arial',
                fontSize: 8,
                fontWeight: true,
                fill: '#ffffff'
                }
            },
            axisY: {
                showAxis: true,
                showLines: true,
                showLabels: true,
                showTicks: true,
                zeroAxis: false,
                orient: 'left',
                tickValues: [],
                label: {
                fontFamily: 'Arial',
                fontSize: 8,
                fontWeight: true,
                fill: '#ffffff'
                }
            }
        }
        return(
            <Image 
                style={[styles.background, styles.container]}
                source={background}
                resizeMode="cover">
                <View style={styles.container}>
                    <View style={styles.nav}>
                        <TouchableHighlight
                            onPress={this.onPrevPress.bind(this)}
                            underlayColor='#adadad'>
                            <View style={styles.buttonWrapper}>
                                <Image source={arrowLeft} style={{tintColor: this.state.prevDisable? '#adadad' : '#ffffff'}}/>
                                <Text style={{color: this.state.prevDisable? '#adadad' : '#ffffff'}}>Prev</Text>
                            </View>
                        </TouchableHighlight>
                        <Text style={styles.text}> {months[this.state.currentMonth]} </Text>
                        <TouchableHighlight
                            onPress={this.onNextPress.bind(this)}
                            underlayColor='#adadad'>
                            <View style={styles.buttonWrapper}>
                                <Text style={{color: this.state.nextDisable? '#adadad' : '#ffffff'}}>Next</Text>
                                <Image source={arrowRight} style={{tintColor: this.state.nextDisable? '#adadad' : '#ffffff'}}/>
                            </View>
                        </TouchableHighlight>
                    </View>
                    {this.setData(optionsLine, this.state.tempTrans)}
                </View>
            </Image>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    nav: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: (Platform.OS === 'ios') ? 30 : 0,   
    },
    buttonWrapper: {
        flexDirection: 'row',
        margin: 10,
    },
    text:{
      paddingVertical: 30,
      textAlign: "center",
      color: "#ffffff"
    },
    image:{
        tintColor: '#fff',
    },
    background: {
        flex: 1,
        height: null,
        width: null,
    },
    label:{
        color: "#ffffff"
    },

})
