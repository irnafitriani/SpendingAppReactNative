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
            tempTrans: [[{'x': 0, 'y': 0}]]
        }
        this.transRef = Firebase.database().ref();
    }
    componentWillMount() {        
        this.listenForTaskRef(this.transRef)
    }
    listenForTaskRef(transRef) {
        transRef.on('value', (transactions) => {
            var newTransactions = [{'x': 0, 'y': 0}];
            transactions.forEach((transaction) => {
                if(transaction.val().userId === this.props.userInfo.userId) {
                    console.log('equal user id ' + this.props.userInfo.userId)   
                    newTransactions.push({
                        "x": parseInt(transaction.val().date.substr(8)), "y": parseInt(transaction.val().amount)
                    })
                }
            })

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
                <Text style={styles.text}> {this.props.email} </Text>
                {this.setData(optionsLine, this.state.tempTrans)}
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
