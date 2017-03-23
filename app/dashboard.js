import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import Firebase from 'firebase'
import { Bar, StockLine, SmoothLine } from 'react-native-pathjs-charts'

export default class Dashboard extends Component{
     constructor(props) {
        super(props)
        this.state = {
            data: '',
            sortCategory: '',
            tempTrans: []
        }
        this.transRef = Firebase.database().ref();
    }
    componentWillMount() {        
        this.listenForTaskRef(this.transRef)
    }
    listenForTaskRef(transRef) {
        transRef.on('value', (transactions) => {
            var newTransactions = [];
            transactions.forEach((transaction) => {
                if(transaction.val().userId === this.props.userInfo.userId) {
                    console.log('equal user id ' + this.props.userInfo.userId)   
                    newTransactions.push({
                        key: transaction.key, userId: transaction.val().userId, name: transaction.val().name, amount: transaction.val().amount, date: transaction.val().date
                    })
                }
            })

            this.setState({
                tempTrans: newTransactions,
            })
        })
    }
    setData(){
        console.log(this.tempTrans)
        return this.tempTrans.map((trans, i) =>{
            return(
                <View key={i}>
                 <StockLine data={trans} options={optionsLine} xKey={trans.date} yKey={trans.amount}  />
                </View>
            )
        })
    }
    render(){
        let dataLine = [
      [{
        "x": this.state.tempTrans[0].amount,
        "y": this.state.tempTrans[0].amount
      }, {
        "x": this.state.tempTrans[1].date,
        "y": this.state.tempTrans[1].amount,
      }, {
        "x": 2,
        "y": 77128
      }, {
        "x": 3,
        "y": 73413
      }, {
        "x": 4,
        "y": 58257
      }, {
        "x": 5,
        "y": 40579
      }, {
        "x": 6,
        "y": 72893
      }, {
        "x": 7,
        "y": 60663
      }, {
        "x": 8,
        "y": 15715
      }, {
        "x": 9,
        "y": 40305
      }, {
        "x": 10,
        "y": 68592
      }, {
        "x": 11,
        "y": 95664
      }, {
        "x": 12,
        "y": 17908
      }, {
        "x": 13,
        "y": 22838
      }, {
        "x": 14,
        "y": 32153
      }, {
        "x": 15,
        "y": 56594
      }, {
        "x": 16,
        "y": 76348
      }, {
        "x": 17,
        "y": 46222
      }, {
        "x": 18,
        "y": 59304
      }]
    ]
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
            <View>
                {this.setData()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  text:{
      paddingVertical: 30,
      textAlign: "center"
  }
})
