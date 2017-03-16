import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ListView
} from 'react-native'
import Separator from './Helpers/separator'

export default class Account extends Component{
    constructor(props){
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged:(row1, row2) => row1 !== row2})
        this.state ={
            dataSource: this.ds.cloneWithRows([{title: 'Name'}, {title: 'Email'},{title: 'Password'}])
        }
    }
     renderRow(rowData){
            return(
            <View style={styles.rowContainer}>
                <Text style={styles.rowTitle}>{rowData.title}</Text>
                <Separator />
            </View>
            )
        }
    render(){
        return(
            <View style={styles.container}>
                <ListView
                    enableEmptySections={true}
                    dataSource={this.state.dataSource}
                    renderRow = {this.renderRow}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginVertical: 50
  },
  rowContainer:{
      padding : 10,
      justifyContent:'center',
      marginVertical: 10
  },
  rowTitle:{
      color: '#48BBEC',
      fontSize: 16
  }
})