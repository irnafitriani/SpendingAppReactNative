import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ListView,
    TouchableHighlight,
    Navigator
} from 'react-native'
import Separator from './Helpers/separator'
import Firebase from 'firebase'

export default class Account extends Component{
    constructor(props){
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged:(row1, row2) => row1 !== row2})
        this.state ={
            dataSource: this.ds.cloneWithRows([{title: 'Name', value:''}, 
                                                {title: 'Email',value: ''}
                                                ,{title: 'Password', value: ''}]),
            name:'',
            email:'',
            password:'',
            userId:'',
            loading: false
        }
    }

    onLogoutPressed() {
        this.setState({
            loading : true
        })
        this.props.navigator.replace({
            title: 'Login',
            id: 'Login',
        })
        Firebase.auth().signOut()
            .then(function(){
                alert('User has been sign out')
            }).catch(function(error){
                alert(error.message);
            })
    }

    onSavePressed() {
    }
    setData(profile){
        console.log(profile.email);
        this.setState({
            name: profile.displayName,
            email: profile.email,
            userId: profile.uid, 
        })
    }
     renderRow(rowData){
            return(
            <View style={styles.rowContainer}>
                <Text style={styles.rowTitle}>{rowData.title}</Text>
                <Text style={styles.rowContent}>{rowData.value}</Text>
                <Separator />
            </View>
            )
        }
    render(){
        var userInfo = this.props.userInfo;
        return(
            <View style={styles.container}>
                <ListView
                    enableEmptySections={true}
                    dataSource={this.state.dataSource}
                    renderRow = {this.renderRow}
                />
                 <View style={styles.buttonContainer}>
                    <TouchableHighlight 
                        onPress={this.onLogoutPressed.bind(this)}
                        style={styles.button}>
                        <Text style={styles.buttonText}>Logout</Text>
                    </TouchableHighlight>
                    <TouchableHighlight 
                        onPress={this.onSavePressed.bind(this)}
                        style={styles.button}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableHighlight>
                </View>
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
  }, 
  buttonContainer: {
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'space-between'
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
})