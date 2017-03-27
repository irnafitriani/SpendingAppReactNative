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

const arrowLeft = require('../images/arrow_left_black.png')
const arrowRight = require('../images/arrow_right_black.png')
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                'August', 'September', 'October', 'November', 'December']

export default class Dashboard extends Component{
     constructor(props) {
        super(props)
        this.state = {
            data: '',
            sortCategory: '',
            tempTrans: [[{'x': 0, 'y': 0}]],
            currentDate: new Date(),            
        }
        this.transRef = Firebase.database().ref().orderByChild('userId').equalTo(this.props.userInfo.userId);
    }
    componentWillMount() {
        this.listenForTaskRef(this.transRef)
    }
    listenForTaskRef(transRef) {
        transRef.on('value', (transactions) => {
            // initialize the graphic start point
            var newTransactions = [{'x': 0, 'y': 0}];
            transactions.forEach((transaction) => {
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

                // add transaction to the list
                newTransactions.push({
                    "x": date, "y": amount
                })
            })

            // add the graphic end point
            newTransactions.push({'x': 32, 'y': 0})

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
        console.log('Next is pressed')
    }
    onPrevPress() {
        console.log('Prev is pressed')
    }
    render(){
        let optionsLine = {
            width: 250,
            height: 250,
            color: '#2980B9',
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
                fill: '#34495E'
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
                fill: '#34495E'
                }
            }
        }
        return(
            <View style={styles.container}>
                <View style={styles.nav}>
                    <TouchableHighlight
                        onPress={this.onPrevPress.bind(this)}>
                        <View style={styles.buttonWrapper}>
                            <Image source={arrowLeft}/>
                            <Text>Prev</Text>
                        </View>
                    </TouchableHighlight>
                    <Text style={styles.text}> {months[this.state.currentDate.getMonth()]} </Text>
                    <TouchableHighlight
                        onPress={this.onNextPress.bind(this)}>
                        <View style={styles.buttonWrapper}>
                            <Text>Next</Text>
                            <Image source={arrowRight}/>
                        </View>
                    </TouchableHighlight>
                </View>
                {this.setData(optionsLine, this.state.tempTrans)}
            </View>
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
  buttonText: {},
  text:{
      paddingVertical: 30,
      textAlign: "center"
  }
})
