import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ListView,
    TouchableHighlight,
    Navigator,
    TextInput,
    Image
} from 'react-native'
import Separator from './Helpers/separator'
import Firebase from 'firebase'
const background = require("../images/background.jpg");

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
            loading: false,
            data : []
        }
    }
    
    componentWillMount() {
        var user = Firebase.auth().currentUser;
        var accountData = [];
        if (user != null) {
            user.providerData.forEach(function (profile) {
                 accountData.push({
                    key: profile.key, name: profile.displayName, email: profile.email, userId: profile.uid
                })
            })

            this.setState({
                data : accountData
            })
            console.log(accountData)
            console.log(this.state.data)
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
             <Image 
                style={[styles.background, styles.container]}
                source={background}
                resizeMode="cover">
                    <View style={styles.container} />
                        <View style={styles.wrapper}>
                            <Text style={styles.rowTitle}>Name</Text>
                            <View style={styles.inputWrap}>
                                <TextInput
                                    placeholder="Name"
                                    style={styles.input}
                                    underlineColorAndroid="transparent"
                                    onChangeText={(name) => this.setState({name})}
                                    value={this.state.name}
                                />
                            </View>
                            <Text style={styles.rowTitle}>Email</Text>
                            <View style={styles.inputWrap}>
                                <TextInput
                                    placeholder="Email"
                                    style={styles.input}
                                    underlineColorAndroid="transparent"
                                    onChangeText={(name) => this.setState({email})}
                                    value={this.state.name}
                                />
                            </View>
                            <Text style={styles.rowTitle}>Password</Text>                          
                             <View style={styles.inputWrap}>

                                <TextInput
                                    placeholder="Password"
                                    style={styles.input}
                                    underlineColorAndroid="transparent"
                                    onChangeText={(name) => this.setState({password})}
                                    value={this.state.name}
                                />
                            </View>
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
                <View style={styles.container} />
            </Image>
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
  rowContainer:{
      padding : 10,
      justifyContent:'center',
      marginVertical: 10
  },
  rowTitle:{
      fontSize: 16
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
      marginVertical: 10,
      height: 40,
      backgroundColor:"transparent"
  },
  input:{
      flex : 1,
      paddingHorizontal: 10,
      backgroundColor: "#FFF"
  },
  wrapper:{
      paddingHorizontal: 15
  },
})