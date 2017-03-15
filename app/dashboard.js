import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'

export default class Dashboard extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.text}> this is dashboard </Text>
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
