import React, { Component } from 'react'
import{
    View,
    StyleSheet
} from 'react-native'

export default class Separator extends Component{
    render(){
        return(
            <View style={styles.separator} />
        )
    }
}

const styles = StyleSheet.create({
    separator:{
        height: 3,
        backgroundColor: '#E4E4E4',
        flex: 1,
    }
})