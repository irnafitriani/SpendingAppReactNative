import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ListView,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Navigator,
    TextInput,
    Image,
    ActivityIndicator
} from 'react-native'
import Prompt from 'react-native-prompt'
import Separator from './Helpers/separator'
import Firebase from 'firebase'
const background = require("../images/background.jpg");
const dismissKeyboard = require('dismissKeyboard')

export default class Account extends Component{
    constructor(props){
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged:(row1, row2) => row1 !== row2})
        this.state ={
            name:'',
            email:'',
            password:'',
            confirmPassword: '',
            userId:'',
            loading: false,
            promptVisible: false,
            message: '',
        }
    }
    
    componentWillMount() {
        var user = Firebase.auth().currentUser;
        var accountData = []
        if (user != null) {
            user.providerData.forEach(function (profile) {
                console.log(profile)
                 accountData.push({
                    key: profile.key, name: profile.displayName, email: profile.email, userId: profile.uid
                })
            })
            this.state.email = accountData[0].email
            this.state.name = accountData[0].name
            this.state.userId = accountData[0].userId
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
    validateForm() {
        if(this.state.name === '' || this.state.email === '' || this.state.password === '' || this.state.confirmPassword === '') {
            alert('Please fill all fields.')
            return false
        } else {
            return true
        }
    }
    validatePassword(password, confirmPassword) {
        if(password !== confirmPassword) {
            alert('Passwords invalid, confirm password is not equal.')
            return false
        } else {
            return true
        }
    }
    onSubmitPassword(value){
        if(value === this.state.password){
            var user = Firebase.auth().currentUser
            user.updatePassword(this.state.password)
            .then(() =>{
                //Update Success
                user.updateProfile({
                displayName: this.state.name,
                email: this.state.email
                    }).then(() => {
                        this.setState({
                        loading : false,
                        promptVisible : false
                    })
                    alert("Data has been saved!")
                }, function(error) {
                    alert(error.message)
                });  
            })
            .catch((error) => {
                alert(error.message)
                 this.setState({
                        loading : false,
                        promptVisible : false
                    })
            }) 
        }else{
             alert('xxx')
              this.setState({
                        loading : false,
                        promptVisible : false
                    })
        }
       
    }    
    onSavePressed() {
        if (this.state.password !== ""){
           this.setState({
               promptVisible: true,
               loading: true
           })
        }else{
           var user = Firebase.auth().currentUser
             user.updateProfile({
                displayName: this.state.name,
                email: this.state.email
                    }).then(() => {
                        this.setState({
                        loading : false,
                    })
                    alert("Data has been saved!")
                }, function(error) {
                    alert(error.message)
                });  
        }
    }
    setData(profile){
        console.log(profile.email);
        this.setState({
            name: profile.displayName,
            email: profile.email,
            userId: profile.uid, 
        })
    }
    render(){
        var userInfo = this.props.userInfo;
        return(
            <TouchableWithoutFeedback
                onPress={() => dismissKeyboard()}
                style={{flex: 1}}>
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
                                        onChangeText={(email) => this.setState({email})}
                                        value={this.state.email}
                                    />
                                </View>
                                <Text style={styles.rowTitle}>Change Password</Text>                          
                                <View style={styles.inputWrap}>

                                    <TextInput
                                        placeholder="Change Password"
                                        secureTextEntry
                                        style={styles.input}
                                        underlineColorAndroid="transparent"
                                        onChangeText={(password) => this.setState({password})}
                                        value={this.state.password}
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
                            <Prompt
                                title="Confirm Password"
                                placeholder="Password"
                                secureTextEntry
                                visible={this.state.promptVisible}
                                onCancel={() => this.setState({ promptVisible: false, message: "You cancelled" })}
                                onSubmit={(value) => {
                                    this.setState({
                                        promptVisible: false
                                    })
                                    if(value === this.state.password){
                                        var user = Firebase.auth().currentUser
                                        user.updatePassword(this.state.password)
                                        .then(() =>{
                                            //Update Success
                                            user.updateProfile({
                                            displayName: this.state.name,
                                            email: this.state.email
                                                }).then(() => {
                                                    this.setState({
                                                    loading : false,
                                                    promptVisible : false
                                                })
                                                alert("Data has been saved!")
                                            }, function(error) {
                                                this.setState({
                                                    loading : false,
                                                    promptVisible : false
                                                })
                                                alert(error.message)
                                            });  
                                        })
                                        .catch((error) => {
                                            this.setState({
                                                    loading : false,
                                                    promptVisible : false
                                                })
                                            alert(error.message)
                                        }) 
                                    }else{
                                        this.setState({
                                                loading : false,
                                                promptVisible : false
                                                })
                                        alert('Passwords invalid, confirm password is not equal.')
                                    }
                                }}
                                        />
                        </View>
                    <View style={styles.container} />
                    <ActivityIndicator
                            animating = {this.state.loading}
                            color='#111'
                            size = 'large'></ActivityIndicator>
                </Image>
            </TouchableWithoutFeedback>
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
      fontSize: 16,
      color: "#ffffff"
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