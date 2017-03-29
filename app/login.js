import React, { Component } from 'react'
import{
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Navigator,
    AsyncStorage,
    ActivityIndicator,
    Alert
} from 'react-native'
import Registration from './registration'
import Firebase from 'firebase'

const dismissKeyboard = require('dismissKeyboard');
const background = require("../images/background.jpg");
const lockIcon = require("../images/lock.png");
const personIcon = require("../images/person.png");
const mailIcon = require("../images/mail.png");

export default class Login extends Component{
    constructor(props){
        super(props)
        this.state ={
            loading: false,
            email: '',
            password: ''
        }
    }

    goToSignUp(){
        this.props.navigator.replace({
            title: 'Registration',
            id: 'Registration'
        })
    }

    gotToForgotPassword(){
        this.props.navigator.replace({
            title: 'Forgot Password',
            id: 'ForgotPassword'
        })
    }

    signIn(){
        this.setState({
            loading: true
        })
        Firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((userData) => {
                this.setState({
                    loading: false
                })
                AsyncStorage.setItem('userData', JSON.stringify(userData));
                this.props.navigator.replace({
                    title: 'Dashboard',
                    id: 'Tabbar',
                    selectedTab: 'dashboard',
                    userInfo:{
                        userId: userData.uid,
                        email: userData.email,
                        name: userData.displayName,
                    }
                })
            })
            .catch((error) => {
                this.setState({
                    loading: false
                })
                alert(error.message)
            })
    }

    render(){
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
                            <View style={styles.inputWrap}>
                                <View style={styles.iconWrap}>
                                    <Image
                                        source={personIcon}
                                        style = {styles.icon}
                                        resizeMode="contain"
                                    />
                                </View>
                                <TextInput
                                    placeholder="Email"
                                    style={styles.input}
                                    underlineColorAndroid="transparent"
                                    onChangeText={(email) => this.setState({email})}
                                    value={this.state.email}
                                />
                            </View>
                            <View style={styles.inputWrap}>
                                <View style={styles.iconWrap}>
                                    <Image
                                        source={lockIcon}
                                        style = {styles.icon}
                                        resizeMode="contain"
                                    />
                                </View>
                                <TextInput
                                    placeholder="Password"
                                    secureTextEntry
                                    style={styles.input}
                                    underlineColorAndroid="transparent"
                                    onChangeText={(password) => this.setState({password})}
                                    value={this.state.password}
                                />
                            </View>
                            <TouchableOpacity activeOpacity={.5}
                                onPress= {this.signIn.bind(this)}>
                                <View style={styles.button}>
                                    <Text style={styles.buttonText}>Sign In</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={.5}
                                onPress={ this.goToSignUp.bind(this) }>
                                <View>
                                    <Text style={styles.signUp}>Do not have an account, Sign Up!</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={.5}
                                onPress={ this.gotToForgotPassword.bind(this) }>
                                <View>
                                    <Text style={styles.signUp}>Forgot Password?</Text>
                                </View>
                            </TouchableOpacity>
                            <ActivityIndicator
                                animating = {this.state.loading}
                                color='#111'
                                size = 'large'></ActivityIndicator>
                        </View>
                    <View style={styles.container} />
                </Image>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  background: {
      width: null,
      height: null
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
  iconWrap:{
      paddingHorizontal: 7,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#ffffff"
  },
  icon:{
      width: 20,
      height: 20
  },
  button:{
      backgroundColor: "#ffffff",
      paddingVertical: 15,
      marginVertical: 15,
      alignItems: "center",
      justifyContent: "center"
  },
  buttonText:{
      color:"#0d0d0d",
      fontSize: 18

  },
  signUp: {
      color:"#FFF",
      backgroundColor:"transparent",
      textAlign: "center"
  }
});