import React, { Component } from 'react'
import{
    AppRegistry,
    StyleSheet,
    Text,
    Alert,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ActivityIndicator
} from 'react-native'
import Firebase from 'firebase'

const dismissKeyboard = require('dismissKeyboard');
const background = require("../images/background2.jpeg");
const lockIcon = require("../images/lock.png");
const personIcon = require("../images/person.png");
const mailIcon = require("../images/mail.png");

export default class ForgotPassword extends Component{
        constructor(props){
        super(props);
        this.state = {
            loading:false,
            email: '',
        }
    }
    goToSignIn(){
        this.props.navigator.replace({
            title: 'Login',
            id: 'Login'
        })
    }
    
    resetPassword(){
        this.setState({
            loading: true
        })
        Firebase.auth().sendPasswordResetEmail(this.state.email)
            .then(() =>{
                Alert.alert('Reset Password','Email has been sent!',[{text:'OK', onPress: () => 
                    this.setState({
                        loading: false
                    })
                }])
            })
            .catch(function(error){
                Alert.alert('Reset Password',error.message,[{text:'OK', onPress: () => 
                    this.setState({
                        loading: false
                    })
                }])
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
                                        source={mailIcon}
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
                            <TouchableOpacity activeOpacity={.5}
                                onPress={this.resetPassword.bind(this)}>
                                <View style={styles.button}>
                                    <Text style={styles.buttonText}>Reset Password</Text>
                                </View>
                            </TouchableOpacity>
                            <ActivityIndicator
                                animating = {this.state.loading}
                                color='#111'
                                size = 'large'></ActivityIndicator>
                            <TouchableOpacity activeOpacity={.5}
                                onPress={this.goToSignIn.bind(this)}>
                                <View>
                                    <Text style={styles.loginText}>Back to Sign In</Text>
                                </View>
                            </TouchableOpacity>
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
  loginText: {
      color:"#FFF",
      backgroundColor:"transparent",
      textAlign: "center"
  }
});