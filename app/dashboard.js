import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import {BarChart} from 'react-native-charts'

export default class Dashboard extends Component{
    render(){
        return(
           <BarChart
                dataSets={[
                    {
                        fillColor: '#46b3f7',
                        data:[
                            { value: 15},
                            { value: 10},
                            { value: 12},
                            { value: 11}
                        ]
                    },
                    {
                        fillColor: '#3386b9',
                        data:[
                            { value: 14},
                            { value: 11},
                            { value: 14},
                            { value: 13}
                        ]
                    }
                ]}
                gradution={1}
                horizonal= {false}
                showGrid = {true}
                barSpacing={5}
                style={{
                    height: 300,
                    margin: 15
                }}
                />
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
